/* ═══════════════════════════════════════════════
   business-userdata.js — Business Mode API Helper
   Add <script src="business-userdata.js"></script>
   to every BUSINESS page BEFORE other scripts
   ═══════════════════════════════════════════════
   How it works:
   - Personal mode uses localStorage (userdata.js)
   - Business mode uses MongoDB via /api/business
   - This file gives helper functions to call API
   - Token is read from localStorage automatically
   - All business pages use window.BusinessData.*
   ═══════════════════════════════════════════════ */

(function () {

  /* ── GET AUTH TOKEN FROM localStorage ── */
  function getToken() {
    return localStorage.getItem('token') || '';
  }

  /* ── BASE API URL ── */
  const API_BASE = '/api/business';

  /* ── COMMON HEADERS ── */
  function getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    };
  }

  /* ══════════════════════════════════════════════
     GET ALL TRANSACTIONS
     Returns: array of transaction objects
     Usage: const txns = await BusinessData.getAll();
     ══════════════════════════════════════════════ */
  async function getAll() {
    try {
      const res = await fetch(API_BASE, {
        method: 'GET',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch business data');
      const data = await res.json();
      return data; /* array of transactions */
    } catch (err) {
      console.error('❌ BusinessData.getAll:', err);
      return [];
    }
  }

  /* ══════════════════════════════════════════════
     ADD NEW TRANSACTION
     txnObj = { type, amount, fromTo, category, note, date }
     type = 'in' or 'out'
     Returns: saved transaction object or null
     Usage: const saved = await BusinessData.add({ type:'in', amount:500, ... });
     ══════════════════════════════════════════════ */
  async function add(txnObj) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(txnObj)
      });
      if (!res.ok) throw new Error('Failed to add transaction');
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('❌ BusinessData.add:', err);
      return null;
    }
  }

  /* ══════════════════════════════════════════════
     DELETE TRANSACTION BY ID
     Returns: true if deleted, false if failed
     Usage: const ok = await BusinessData.remove('64abc...');
     ══════════════════════════════════════════════ */
  async function remove(id) {
    try {
      const res = await fetch(API_BASE + '/' + id, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to delete transaction');
      return true;
    } catch (err) {
      console.error('❌ BusinessData.remove:', err);
      return false;
    }
  }

  /* ══════════════════════════════════════════════
     GET SUMMARY STATS
     Returns: { totalIn, totalOut, netProfit, count }
     Usage: const stats = await BusinessData.getSummary();
     ══════════════════════════════════════════════ */
  async function getSummary() {
    try {
      const txns = await getAll();
      let totalIn  = 0;
      let totalOut = 0;

      txns.forEach(t => {
        if (t.type === 'in')  totalIn  += Number(t.amount) || 0;
        if (t.type === 'out') totalOut += Number(t.amount) || 0;
      });

      return {
        totalIn:    totalIn,
        totalOut:   totalOut,
        netProfit:  totalIn - totalOut,
        count:      txns.length
      };
    } catch (err) {
      console.error('❌ BusinessData.getSummary:', err);
      return { totalIn: 0, totalOut: 0, netProfit: 0, count: 0 };
    }
  }

  /* ══════════════════════════════════════════════
     GET TRANSACTIONS BY MONTH
     month = 'YYYY-MM' e.g. '2025-06'
     Returns: array of transactions for that month
     Usage: const june = await BusinessData.getByMonth('2025-06');
     ══════════════════════════════════════════════ */
  async function getByMonth(month) {
    try {
      const txns = await getAll();
      return txns.filter(t => {
        const d = new Date(t.date);
        const m = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        return m === month;
      });
    } catch (err) {
      console.error('❌ BusinessData.getByMonth:', err);
      return [];
    }
  }

  /* ══════════════════════════════════════════════
     CLEAR ALL USER BUSINESS DATA
     Deletes every transaction one by one
     Used in business-profile.html Clear Data button
     Usage: await BusinessData.clearAll();
     ══════════════════════════════════════════════ */
  async function clearAll() {
    try {
      const txns = await getAll();
      for (const t of txns) {
        await remove(t._id);
      }
      return true;
    } catch (err) {
      console.error('❌ BusinessData.clearAll:', err);
      return false;
    }
  }

  /* ── ATTACH TO window so all business pages can use ── */
  window.BusinessData = {
    getAll:      getAll,
    add:         add,
    remove:      remove,
    getSummary:  getSummary,
    getByMonth:  getByMonth,
    clearAll:    clearAll
  };

  console.log('✅ BusinessData: ready for user =', localStorage.getItem('userEmail') || 'guest');

})();