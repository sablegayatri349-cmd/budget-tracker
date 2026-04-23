
/* ── AUTH GUARD ── */
if (!localStorage.getItem('token')) {
  window.location.href = 'login.html';
}

/* ── MIGRATE LEGACY DATA ──
   If the user had expenses saved under the old "expenses" key,
   move them to the new "bt_expenses" key automatically          */
(function migrateLegacy() {
  const legacy = localStorage.getItem('expenses');
  const current = localStorage.getItem('bt_expenses');
  if (legacy && !current) {
    try {
      const old = JSON.parse(legacy);
      const migrated = old.map((e, i) => ({
        id:       String(Date.now() + i),
        title:    e.title    || 'Expense',
        amount:   parseFloat(e.amount) || 0,
        category: e.category || 'Other',
        date:     e.date     || new Date().toISOString().split('T')[0],
      }));
      localStorage.setItem('bt_expenses', JSON.stringify(migrated));
    } catch(err) {
      console.warn('Migration failed:', err);
    }
  }
})();

/* ── STATE ── */
let expenses = [];
let budget   = parseFloat(localStorage.getItem('bt_budget') || localStorage.getItem('budget') || '0');
let activeFilter = 'All';
let pieChart  = null;
let barChart  = null;

/* ── CATEGORY CONFIG ── */
const CAT_ICONS = {
  Food: '🛒', Transport: '🚌', Housing: '🏠', Health: '💊',
  Shopping: '🛍️', Entertainment: '🎬', Bills: '💡', Education: '📚', Other: '📌'
};
const CAT_COLORS = {
  Food: '#52b052', Transport: '#c9a84c', Housing: '#e8a030', Health: '#f06292',
  Shopping: '#b07aff', Entertainment: '#26d4ee', Bills: '#ff8c42', Education: '#7eb8ff', Other: '#8a9bb0'
};

/* ────────────────────────────────────────────
   INIT — runs on page load
──────────────────────────────────────────── */
function init() {
  loadProfile();
  setDefaultDate();
  loadExpensesFromServer();
}

function loadProfile() {
  const name  = localStorage.getItem('userName')  || 'User';
  const email = localStorage.getItem('userEmail') || '';

  const avatar = document.getElementById('avatarLetter');
  const pName  = document.getElementById('profileName');
  const pEmail = document.getElementById('profileEmail');
  const pPopN  = document.getElementById('popupName');
  const pPopE  = document.getElementById('popupEmail');
  const greet  = document.getElementById('greetName');
  const topDate= document.getElementById('topDate');

  if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
  if (pName)  pName.textContent  = name;
  if (pEmail) pEmail.textContent = email;
  if (pPopN)  pPopN.textContent  = name;
  if (pPopE)  pPopE.textContent  = email;
  if (greet)  greet.textContent  = name.split(' ')[0];
  if (topDate) topDate.textContent = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

function setDefaultDate() {
  const dateInput = document.getElementById('date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
}

/* ────────────────────────────────────────────
   RENDER ALL
──────────────────────────────────────────── */
function render() {
  renderStats();
  renderCharts();
  renderFilters();
  renderList();
  renderInsights();
  checkBudget();
  syncLegacyKey();
}

/* ── SYNC: keep old "expenses" key updated for barchart/monthly pages ── */
function syncLegacyKey() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

/* ────────────────────────────────────────────
   STATS
──────────────────────────────────────────── */
function renderStats() {
  const now = new Date();
  const m = now.getMonth(), y = now.getFullYear();
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const monthExp = expenses.filter(e => {
    const d = new Date(e.date + 'T00:00:00');
    return d.getMonth() === m && d.getFullYear() === y;
  });
  const monthTotal = monthExp.reduce((s, e) => s + e.amount, 0);
  const rem = budget - total;
  const avg = expenses.length ? total / expenses.length : 0;

  setText('s-total',  fmt(total));
  setText('s-count',  expenses.length + ' expense' + (expenses.length !== 1 ? 's' : ''));
  setText('s-month',  fmt(monthTotal));
  setText('s-mcount', monthExp.length + ' this month');
  setText('s-budget', budget > 0 ? fmt(Math.max(0, rem)) : '—');
  setText('s-bsub',   budget > 0 ? (rem >= 0 ? 'remaining' : 'exceeded!') : 'not set');
  setText('s-avg',    expenses.length ? fmt(avg) : '—');
  setText('txnCount', expenses.length + ' item' + (expenses.length !== 1 ? 's' : ''));

  /* Legacy DOM IDs (original index.html) */
  setText('totalAmount',     fmt(total));
  setText('totalExpense',    fmt(total));
  setText('remainingBudget', budget > 0 ? fmt(Math.max(0, rem)) : '₹0');
}

/* ────────────────────────────────────────────
   CHARTS
──────────────────────────────────────────── */
function renderCharts() {
  renderPieChart();
  renderBarChart();
}

function renderPieChart() {
  const canvas = document.getElementById('expenseChart') || document.getElementById('pieChart');
  if (!canvas) return;

  const catMap = {};
  expenses.forEach(e => { catMap[e.category] = (catMap[e.category] || 0) + e.amount; });
  const labels = Object.keys(catMap);
  const data   = Object.values(catMap);
  const colors = labels.map(l => CAT_COLORS[l] || '#888');

  const noMsg = document.getElementById('noChartMsg');
  if (noMsg) noMsg.style.display = labels.length ? 'none' : 'block';
  canvas.style.display = labels.length ? 'block' : 'none';

  if (pieChart) pieChart.destroy();
  if (!labels.length) return;

  pieChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#141f14', hoverOffset: 8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '62%',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ' ' + c.label + ': ' + fmt(c.raw) } }
      }
    }
  });
}

function renderBarChart() {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;

  const days = [], totals = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    days.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
    totals.push(expenses.filter(e => e.date === key).reduce((s, e) => s + e.amount, 0));
  }

  const hasBar = totals.some(v => v > 0);
  const noBar  = document.getElementById('noBar');
  if (noBar) noBar.style.display = hasBar ? 'none' : 'block';
  canvas.style.display = hasBar ? 'block' : 'none';

  if (barChart) barChart.destroy();
  if (!hasBar) return;

  barChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        data: totals,
        backgroundColor: 'rgba(201,168,76,0.35)',
        borderColor: '#c9a84c',
        borderWidth: 1.5,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#3a5030', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#3a5030', font: { size: 11 }, callback: v => '₹' + v } }
      },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => fmt(c.raw) } } }
    }
  });
}

/* ────────────────────────────────────────────
   FILTER PILLS
──────────────────────────────────────────── */
function renderFilters() {
  const container = document.getElementById('filterRow');
  if (!container) return;

  const cats = ['All', ...Object.keys(CAT_ICONS).filter(c => expenses.some(e => e.category === c))];
  container.innerHTML = cats.map(c => `
    <div class="fpill ${activeFilter === c ? 'on' : ''}" onclick="setFilter('${c}')">
      ${c !== 'All' ? `<span class="cdot" style="background:${CAT_COLORS[c]};"></span>` : ''}
      ${c} <span style="opacity:.4;">${c === 'All' ? expenses.length : expenses.filter(e => e.category === c).length}</span>
    </div>`).join('');
}

function setFilter(cat) {
  activeFilter = cat;
  renderFilters();
  renderList();
}

/* ────────────────────────────────────────────
   EXPENSE LIST
──────────────────────────────────────────── */
function renderList() {
  /* New dashboard uses #expRows */
  const newBox = document.getElementById('expRows');
  if (newBox) renderNewList(newBox);

  /* Legacy dashboard uses #expenseList */
  const legacyBox = document.getElementById('expenseList');
  if (legacyBox) renderLegacyList(legacyBox);
}

function renderNewList(box) {
  const q = (document.getElementById('searchBox') ? document.getElementById('searchBox').value : '').toLowerCase();
  let list = [...expenses].reverse();
  if (activeFilter !== 'All') list = list.filter(e => e.category === activeFilter);
  if (q) list = list.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));

  setText('listBadge', list.length + ' item' + (list.length !== 1 ? 's' : ''));

  if (!list.length) {
    box.innerHTML = `<div class="exp-empty"><div class="exp-empty-ico">📭</div>${q || activeFilter !== 'All' ? 'No matching expenses.' : 'No expenses yet — add one!'}</div>`;
    return;
  }
  box.innerHTML = list.map(e => `
    <div class="exp-row">
      <div class="exp-ico" style="background:${CAT_COLORS[e.category] || '#888'}20;">${CAT_ICONS[e.category] || '📌'}</div>
      <div class="exp-info">
        <div class="exp-name">${esc(e.title)}</div>
        <div class="exp-meta">${e.category}</div>
      </div>
      <div class="exp-right">
        <span class="exp-date-badge">${fmtDate(e.date)}</span>
        <span class="exp-amt">−${fmt(e.amount)}</span>
        <button class="del-btn" onclick="deleteExpense('${e.id}')">✕</button>
      </div>
    </div>`).join('');
}

function renderLegacyList(box) {
  box.innerHTML = '';
  expenses.forEach((e, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div><b>${esc(e.title)}</b><br>
      ${fmt(e.amount)} | ${e.category} | ${fmtDate(e.date)}</div>
      <div>
        <button class="edit-btn"   onclick="editExpense(${i})">Edit</button>
        <button class="delete-btn" onclick="deleteByIndex(${i})">Delete</button>
      </div>`;
    box.appendChild(li);
  });
}

/* ────────────────────────────────────────────
   ADD EXPENSE
──────────────────────────────────────────── */
function addExpense() {
  const title    = (document.getElementById('title')?.value || '').trim();
  const amount   = parseFloat(document.getElementById('amount')?.value);
  const category = document.getElementById('category')?.value || 'Other';
  const date     = document.getElementById('date')?.value || new Date().toISOString().split('T')[0];

  if (!title)            return showToast('Enter an expense name', true);
  if (!amount || amount <= 0) return showToast('Enter a valid amount', true);

  const exp = { id: Date.now().toString(), title, amount, category, date };
 expenses.push(exp);

  // --- NEW: SYNC WITH SAVINGS GOALS ---
  let goals = JSON.parse(localStorage.getItem('bt_goals') || '[]');
  
  // Find if the title you just typed matches a Goal Title
  const goalIndex = goals.findIndex(g => 
    g.title.toLowerCase().trim() === title.toLowerCase().trim()
  );

  if (goalIndex !== -1) {
    // Add the money to the goal progress
    goals[goalIndex].saved = Number(goals[goalIndex].saved || 0) + Number(amount);
    localStorage.setItem('bt_goals', JSON.stringify(goals));
    showToast(`₹${amount} added to your "${goals[goalIndex].title}" goal!`);
  }
  // ------------------------------------

  save();
  render();

  document.getElementById('title').value  = '';
  document.getElementById('amount').value = '';
  showToast('Added: ' + title + ' — ' + fmt(amount));

  /* Sync to backend if available */
  const token = localStorage.getItem('token');
  if (token) {
    fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(exp)
    }).catch(() => {});
  }
}

/* Legacy form submit handler */
const form = document.getElementById('expenseForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    addExpense();
    form.reset();
    setDefaultDate();
  });
}

/* Enter key shortcut */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement === document.getElementById('title')) {
    addExpense();
  }
});

/* ────────────────────────────────────────────
   DELETE / EDIT
──────────────────────────────────────────── */
function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  save(); render();
  showToast('Expense removed');
}

function deleteByIndex(index) {
  expenses.splice(index, 1);
  save(); render();
  showToast('Expense removed');
}

function editExpense(index) {
  const newAmount = prompt('Enter new amount:', expenses[index].amount);
  if (newAmount !== null && !isNaN(newAmount) && parseFloat(newAmount) > 0) {
    expenses[index].amount = parseFloat(newAmount);
    save(); render();
    showToast('Expense updated');
  }
}

/* ────────────────────────────────────────────
   BUDGET WARNING
──────────────────────────────────────────── */
function checkBudget() {
  const warning = document.getElementById('budgetWarning') || document.getElementById('warnStrip');
  if (!warning) return;

  budget = parseFloat(localStorage.getItem('bt_budget') || localStorage.getItem('budget') || '0');
  if (!budget) { warning.style.display = 'none'; return; }

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const pct   = (total / budget) * 100;

  if (pct >= 100) {
    warning.style.display = 'flex';
    warning.textContent = '🚨 Budget exceeded! You have spent ' + fmt(total) + ' of your ' + fmt(budget) + ' budget.';
  } else if (pct >= 80) {
    warning.style.display = 'flex';
    warning.textContent = '⚠️ You\'ve used ' + Math.round(pct) + '% of your budget — consider cutting back.';
  } else {
    warning.style.display = 'none';
  }
}

/* ────────────────────────────────────────────
   SMART INSIGHTS
──────────────────────────────────────────── */
function renderInsights() {
  /* New dashboard */
  const newBox = document.getElementById('insBox');
  if (newBox) renderNewInsights(newBox);

  /* Legacy dashboard */
  generateInsights(expenses);
}

function renderNewInsights(box) {
  if (!expenses.length) {
    box.innerHTML = '<div class="ins-row"><span class="ins-ico">💡</span><span>Add an expense to see insights.</span></div>';
    return;
  }
  const total  = expenses.reduce((s, e) => s + e.amount, 0);
  const catMap = {};
  expenses.forEach(e => { catMap[e.category] = (catMap[e.category] || 0) + e.amount; });
  const top = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0];
  const avg = total / expenses.length;

  const rows = [
    { i: '🏆', t: `Top: <b style="color:var(--gold-light)">${top[0]}</b> — ${fmt(top[1])} (${Math.round(top[1] / total * 100)}%)` },
    { i: '📊', t: `Avg: <b style="color:var(--gold-light)">${fmt(avg)}</b> per transaction` },
    { i: '💡', t: budget > 0 ? `Budget: <b style="color:var(--green-bright)">${Math.round(total / budget * 100)}%</b> used` : `<a href="budget.html" style="color:var(--gold);font-weight:600;">Set a budget →</a>` },
    { i: '💰', t: `Potential saving: <b style="color:var(--green-bright)">${fmt(total * 0.15)}</b> (15% of total)` },
  ];
  box.innerHTML = rows.map((r, i) =>
    `<div class="ins-row" ${i === 0 ? 'style="border-top:none;padding-top:0;"' : ''}><span class="ins-ico">${r.i}</span><span>${r.t}</span></div>`
  ).join('');
}

/* Legacy insight elements */
function generateInsights(expList) {
  if (!expList || !expList.length) return;

  const total   = expList.reduce((s, e) => s + Number(e.amount), 0);
  const catMap  = {};
  expList.forEach(e => {
    catMap[e.category] = (catMap[e.category] || 0) + Number(e.amount);
  });

  let topCat = '', max = 0;
  for (const cat in catMap) { if (catMap[cat] > max) { max = catMap[cat]; topCat = cat; } }

  const avg             = (total / 30).toFixed(0);
  const suggestedSaving = Math.round(total * 0.15);

  setText('topCategoryInsight', '📊 You spend most on: ' + topCat);
  setText('avgSpendInsight',    '💰 Daily average: ₹' + avg);
  setText('savingInsight',      '💡 You could save ₹' + suggestedSaving + ' this month');
}

/* ────────────────────────────────────────────
   UI HELPERS
──────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('overlay')?.classList.toggle('open');
  /* Legacy class name */
  document.getElementById('sidebar')?.classList.toggle('active');
}

function toggleProfile() {
  const popup = document.getElementById('profilePopup');
  if (!popup) return;
  popup.classList.toggle('open');
  /* Legacy toggle */
  popup.style.display = popup.classList.contains('open') ? 'block' : 'none';
}

function logout() {
    // This single line instantly wipes the token, expenses, budget, and name
    localStorage.clear(); 
    
    window.location.href = 'login.html';
}

function showToast(msg, err) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent  = msg;
  t.className    = 'toast' + (err ? ' err' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ────────────────────────────────────────────
   FORMAT HELPERS
──────────────────────────────────────────── */
function fmt(n) {
  return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
async function loadExpensesFromServer() {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const res = await fetch('http://localhost:5000/api/expenses', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    if (data.success) {
      expenses = data.expenses.map(e => ({
        id:       e._id || e.id,
        title:    e.title,
        amount:   e.amount,
        category: e.category,
        date:     e.date ? e.date.split('T')[0] : '',
      }));
      localStorage.setItem('bt_expenses', JSON.stringify(expenses));
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  } catch(e) {
    console.log('Using local data');
    expenses = [];
  }
  render();
}

/* ── SAVE ── */
function save() {
  localStorage.setItem('bt_expenses', JSON.stringify(expenses));
  syncLegacyKey();
}

/* ────────────────────────────────────────────
   BOOT
──────────────────────────────────────────── */
init();