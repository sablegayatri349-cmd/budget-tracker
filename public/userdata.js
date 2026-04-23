/* ═══════════════════════════════════════════════
   userdata.js — Per-User Data Isolation + MongoDB Sync
   Saves to BOTH localStorage AND MongoDB
   ═══════════════════════════════════════════════ */

(function () {

  const API = 'http://localhost:5000/api';

  /* ── GET TOKEN ── */
  function getToken() {
    return window._rawLocalStorage
      ? window._rawLocalStorage.getItem('token')
      : null;
  }

  /* ── GET CURRENT USER KEY PREFIX ── */
  function getUserPrefix() {
    const email = localStorage.getItem('userEmail') || localStorage.getItem('email') || 'guest';
    return email.replace(/[^a-zA-Z0-9]/g, '_') + '_';
  }

  /* ── ALL DATA KEYS USED IN APP ── */
  const DATA_KEYS = [
    'bt_expenses', 'bt_budget', 'bt_goals', 'bt_bills', 'bt_incomes',
    'bt_accounts', 'bt_currency', 'bt_currency_sym', 'bt_pin',
    'bt_last_backup', 'bt_game', 'expenses', 'budget', 'salary', 'saving',
  ];

  /* ── SAVE RAW localStorage METHODS BEFORE OVERRIDE ── */
  const _setItem    = localStorage.setItem.bind(localStorage);
  const _getItem    = localStorage.getItem.bind(localStorage);
  const _removeItem = localStorage.removeItem.bind(localStorage);

  /* Expose raw methods so getToken() works without infinite loop */
  window._rawLocalStorage = { getItem: _getItem };

  /* ── MIGRATE: move existing data to user-specific keys ── */
  function migrateToUserKeys() {
    const prefix = getUserPrefix();
    if (prefix === 'guest_') return;
    if (_getItem(prefix + 'bt_migrated')) return;
    DATA_KEYS.forEach(key => {
      const existing = _getItem(key);
      const userKey  = prefix + key;
      if (existing && !_getItem(userKey)) {
        _setItem(userKey, existing);
      }
    });
    _setItem(prefix + 'bt_migrated', '1');
  }

  /* ── TRACK PREVIOUS EXPENSES to detect add/delete ── */
  let _prevExpenses = [];

  function initPrevExpenses() {
    const prefix = getUserPrefix();
    if (prefix === 'guest_') return;
    const raw = _getItem(prefix + 'bt_expenses');
    _prevExpenses = raw ? JSON.parse(raw) : [];
  }

  /* ══════════════════════════════════════════
     SYNC TO MONGODB — called when bt_expenses changes
  ══════════════════════════════════════════ */
  async function syncToMongo(newValue) {
    const token = getToken();
    if (!token) return;

    try {
      const newItems = JSON.parse(newValue) || [];
      const oldItems = _prevExpenses || [];

      /* Find ADDED items — no _mongoId means never saved to MongoDB */
      const addedItems = newItems.filter(e => !e._mongoId);

      /* Find DELETED items — in old but not in new */
      const newLocalIds = new Set(newItems.map(e => e.id));
      const deletedItems = oldItems.filter(e => e._mongoId && !newLocalIds.has(e.id));

      /* POST new items to MongoDB */
      for (const item of addedItems) {
        try {
          const res = await fetch(`${API}/expenses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              title:         item.title || item.name || 'Expense',
              amount:        Number(item.amount),
              category:      item.category || 'Other',
              date:          item.date || new Date().toISOString().split('T')[0],
              type:          item.type || 'expense',
              description:   item.note || item.description || '',
              paymentMethod: item.paymentMethod || 'Cash',
            })
          });
          if (res.ok) {
            const data = await res.json();
            /* Save MongoDB _id into the item so we can delete later */
            item._mongoId = data.data?._id || data._id;
          }
        } catch (e) { /* Network error — skip silently */ }
      }

      /* DELETE removed items from MongoDB */
      for (const item of deletedItems) {
        try {
          await fetch(`${API}/expenses/${item._mongoId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } catch (e) { /* Network error — skip silently */ }
      }

      /* Update localStorage with _mongoId values saved above */
      const prefix = getUserPrefix();
      _setItem(prefix + 'bt_expenses', JSON.stringify(newItems));
      _prevExpenses = newItems;

    } catch (e) {
      console.log('syncToMongo error:', e.message);
    }
  }

  /* ══════════════════════════════════════════
     SYNC FROM MONGODB — called on page load
     Fetches all expenses and merges into localStorage
  ══════════════════════════════════════════ */
  async function syncFromMongo() {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API}/expenses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;

      const data = await res.json();
      const mongoExpenses = data.data || data.expenses || [];
      if (mongoExpenses.length === 0) return;

      /* Convert MongoDB items to local format */
      const mongoMapped = mongoExpenses.map(e => ({
        id:            e._id,
        _mongoId:      e._id,
        title:         e.title,
        amount:        e.amount,
        category:      e.category,
        date:          e.date ? e.date.split('T')[0] : new Date().toISOString().split('T')[0],
        type:          e.type || 'expense',
        description:   e.description || '',
        paymentMethod: e.paymentMethod || 'Cash',
      }));

      /* Get existing localStorage expenses */
      const prefix = getUserPrefix();
      const localRaw = _getItem(prefix + 'bt_expenses');
      const localExpenses = localRaw ? JSON.parse(localRaw) : [];

      /* Keep local-only items (not yet synced to MongoDB) */
      const mongoIds  = new Set(mongoMapped.map(e => e._mongoId));
      const localOnly = localExpenses.filter(e => !e._mongoId && !mongoIds.has(e.id));

      /* Merged = MongoDB (source of truth) + local-only new items */
      const merged = [...mongoMapped, ...localOnly];

      /* Save merged to localStorage directly (bypass override) */
      _setItem(prefix + 'bt_expenses', JSON.stringify(merged));
      _prevExpenses = merged;

      console.log(`✅ MongoDB sync: ${mongoMapped.length} expenses loaded`);

      /* Refresh dashboard if function exists */
      if (typeof window.loadExpenses === 'function') window.loadExpenses();
      if (typeof window.renderAll    === 'function') window.renderAll();

    } catch (e) {
      console.log('syncFromMongo failed (offline?):', e.message);
    }
  }

  /* Expose for manual call from other pages */
  window.syncExpensesFromMongo = syncFromMongo;

  /* ══════════════════════════════════════════
     OVERRIDE localStorage METHODS
  ══════════════════════════════════════════ */
  localStorage.setItem = function (key, value) {
    if (DATA_KEYS.includes(key)) {
      const prefix = getUserPrefix();
      if (prefix !== 'guest_') {
        _setItem(prefix + key, value);

        /* If expenses changed → sync to MongoDB */
        if (key === 'bt_expenses') {
          syncToMongo(value); /* async, runs in background */
        }
        return;
      }
    }
    _setItem(key, value);
  };

  localStorage.getItem = function (key) {
    if (DATA_KEYS.includes(key)) {
      const prefix = getUserPrefix();
      if (prefix !== 'guest_') {
        return _getItem(prefix + key);
      }
    }
    return _getItem(key);
  };

  localStorage.removeItem = function (key) {
    if (DATA_KEYS.includes(key)) {
      const prefix = getUserPrefix();
      if (prefix !== 'guest_') {
        _removeItem(prefix + key);
        return;
      }
    }
    _removeItem(key);
  };

  /* ── CLEAR SESSION ON LOGOUT ── */
  window.clearUserSession = function () {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  };

  /* ── RUN ON LOAD ── */
  migrateToUserKeys();
  initPrevExpenses();

  /* Sync from MongoDB after short delay (let page load first) */
  setTimeout(syncFromMongo, 800);

  console.log('✅ UserData: prefix =', getUserPrefix());

})();