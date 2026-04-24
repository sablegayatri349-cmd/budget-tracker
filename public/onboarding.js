/* ═══════════════════════════════════════════════
   onboarding.js — Beautiful Welcome Guide
   ═══════════════════════════════════════════════ */

(function () {

  function isNewUser() {
    const email  = localStorage.getItem('userEmail') || 'guest';
    const prefix = email.replace(/[^a-zA-Z0-9]/g, '_') + '_';
    const done   = localStorage.getItem(prefix + 'bt_onboarded');
    return !done;
  }

  const CURRENCIES = [
    { sym: '₹', code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { sym: '$', code: 'USD', name: 'US Dollar',    flag: '🇺🇸' },
    { sym: '€', code: 'EUR', name: 'Euro',         flag: '🇪🇺' },
    { sym: '£', code: 'GBP', name: 'British Pound',flag: '🇬🇧' },
    { sym: '¥', code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { sym: 'د.إ', code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
  ];

 let currentStep  = 1;
 const TOTAL_STEPS = 4;
  let selectedCurr = CURRENCIES[0];
let selectedMode = 'personal';

  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'onboardingOverlay';
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,0.82);
      display:flex;align-items:center;justify-content:center;
      font-family:'DM Sans',sans-serif;
      backdrop-filter:blur(6px);
      animation:obFadeIn .5s ease;
      padding:16px;
    `;

    overlay.innerHTML = `
    <style>
      @keyframes obFadeIn   { from{opacity:0} to{opacity:1} }
      @keyframes obSlideUp  { from{opacity:0;transform:translateY(40px) scale(.96)} to{opacity:1;transform:none} }
      @keyframes obFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes obShimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
      @keyframes obPop      { 0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }

      #obCard {
        background: linear-gradient(160deg, #0f1a0f 0%, #141f14 60%, #0c1a0c 100%);
        border: 1px solid rgba(201,168,76,0.35);
        border-radius: 28px;
        width: 100%;
        max-width: 500px;
        overflow: hidden;
        box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.12), inset 0 1px 0 rgba(201,168,76,0.1);
        animation: obSlideUp .5s cubic-bezier(.175,.885,.32,1.275);
        position: relative;
      }
      #obCard::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, transparent, #c9a84c, #f5d87a, #c9a84c, transparent);
        background-size: 200% auto;
        animation: obShimmer 3s linear infinite;
      }
      #obHeader {
        padding: 36px 36px 28px;
        background: linear-gradient(135deg, #1a3d1a 0%, #0f2a0f 100%);
        border-bottom: 1px solid rgba(201,168,76,0.12);
        position: relative; overflow: hidden; text-align: center;
      }
      .ob-bg-c1 { position:absolute;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%);top:-60px;right:-40px;pointer-events:none; }
      .ob-bg-c2 { position:absolute;width:150px;height:150px;border-radius:50%;background:radial-gradient(circle,rgba(82,176,82,0.06) 0%,transparent 70%);bottom:-40px;left:-30px;pointer-events:none; }

      .ob-progress { display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:24px;position:relative;z-index:1; }
      .ob-sc { width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid rgba(201,168,76,0.2);background:rgba(0,0,0,0.3);color:#3a5030;transition:all .4s;font-family:'DM Sans',sans-serif; }
      .ob-sc.active { border-color:#c9a84c;background:linear-gradient(135deg,#c9a84c,#e8c86a);color:#0c0c00;box-shadow:0 0 16px rgba(201,168,76,0.4);animation:obPop .3s ease; }
      .ob-sc.done   { border-color:rgba(82,176,82,0.5);background:rgba(82,176,82,0.15);color:#52b052; }
      .ob-sl { width:40px;height:2px;background:rgba(201,168,76,0.15);border-radius:1px;transition:background .4s; }
      .ob-sl.done { background:rgba(201,168,76,0.4); }

      #obEmoji { font-size:52px;display:block;margin-bottom:14px;animation:obFloat 3s ease-in-out infinite;position:relative;z-index:1;filter:drop-shadow(0 4px 12px rgba(201,168,76,0.3)); }
      #obTitle { font-family:'DM Serif Display',serif;font-size:26px;color:#e8f0e0;margin-bottom:8px;position:relative;z-index:1; }
      #obSubtitle { font-size:14px;color:#7a9870;line-height:1.6;position:relative;z-index:1; }

      #obBody { padding:28px 36px; }

      .ob-feature { display:flex;align-items:center;gap:16px;padding:14px 18px;border-radius:14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);margin-bottom:10px;transition:all .2s; }
      .ob-feature:hover { background:rgba(201,168,76,0.04);border-color:rgba(201,168,76,0.15);transform:translateX(4px); }
      .ob-feature:last-child { margin-bottom:0; }
      .ob-fic { width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0; }
      .ob-ftxt strong { display:block;font-size:14px;color:#e8f0e0;margin-bottom:3px;font-weight:600; }
      .ob-ftxt span   { font-size:12px;color:#7a9870;line-height:1.4; }

      .ob-field { margin-bottom:20px; }
      .ob-field label { display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:#7a9870;text-transform:uppercase;letter-spacing:.07em;margin-bottom:9px; }
      .ob-field label span { font-size:14px; }
      .ob-iw { position:relative; }
      .ob-pre { position:absolute;left:16px;top:50%;transform:translateY(-50%);font-family:'DM Serif Display',serif;font-size:18px;color:#c9a84c;pointer-events:none;z-index:1; }
      .ob-inp { width:100%;padding:14px 16px 14px 40px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;font-family:'DM Sans',sans-serif;font-size:18px;color:#e8f0e0;outline:none;transition:all .25s; }
      .ob-inp:focus { border-color:#c9a84c;background:rgba(201,168,76,0.04);box-shadow:0 0 0 4px rgba(201,168,76,0.1); }
      .ob-inp::placeholder { color:#2a402a;font-size:16px; }
      .ob-hint { font-size:11px;color:#3a5030;margin-top:7px;padding-left:4px; }
      .ob-tip { padding:14px 18px;background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.15);border-radius:14px;font-size:13px;color:#7a9870;line-height:1.6;display:flex;gap:10px;align-items:flex-start; }
      .ob-tip b { color:#e8c86a; }
      .ob-preview { margin-top:14px;padding:14px 18px;background:rgba(82,176,82,0.06);border:1px solid rgba(82,176,82,0.2);border-radius:14px;display:none;justify-content:space-between;align-items:center; }

      .ob-cg { display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px; }
      .ob-cb { padding:16px 8px;border-radius:16px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);cursor:pointer;text-align:center;transition:all .25s; }
      .ob-cb:hover { border-color:rgba(201,168,76,0.3);background:rgba(201,168,76,0.06);transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.3); }
      .ob-cb.sel { border-color:#c9a84c;background:rgba(201,168,76,0.1);box-shadow:0 0 0 2px #c9a84c,0 8px 24px rgba(201,168,76,0.2);transform:translateY(-2px); }
      .ob-cf { font-size:26px;margin-bottom:6px; }
      .ob-cs { font-family:'DM Serif Display',serif;font-size:20px;color:#e8c86a;margin-bottom:2px; }
      .ob-cn { font-size:9px;color:#7a9870;letter-spacing:.04em; }
      .ob-cnote { padding:12px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;font-size:11px;color:#3a5030;line-height:1.5; }

      .ob-suc { text-align:center;padding:8px 0 4px; }
      .ob-sico { font-size:64px;display:block;margin-bottom:16px;animation:obFloat 2s ease-in-out infinite;filter:drop-shadow(0 8px 20px rgba(201,168,76,0.4)); }
      .ob-suc h3 { font-family:'DM Serif Display',serif;font-size:26px;color:#e8f0e0;margin-bottom:10px; }
      .ob-suc p  { font-size:14px;color:#7a9870;line-height:1.7;margin-bottom:22px; }
      .ob-scards { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
      .ob-scard  { padding:16px;border-radius:16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);text-align:center;transition:all .2s; }
      .ob-scard:hover { border-color:rgba(201,168,76,0.2);background:rgba(201,168,76,0.04); }
      .ob-scard-ico { font-size:24px;margin-bottom:8px; }
      .ob-scard-lbl { font-size:10px;color:#7a9870;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px; }
      .ob-scard-val { font-family:'DM Serif Display',serif;font-size:18px;color:#e8c86a; }

      #obFooter { padding:0 36px 32px;display:flex;gap:10px; }
      #obSkip { padding:13px 20px;background:transparent;border:1px solid rgba(255,255,255,0.08);border-radius:14px;color:#3a5030;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .2s;white-space:nowrap; }
      #obBack { padding:13px 20px;background:transparent;border:1px solid rgba(255,255,255,0.08);border-radius:14px;color:#3a5030;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .2s;white-space:nowrap;display:none; }
      #obBack:hover { color:#7a9870;border-color:rgba(255,255,255,0.15); }
      #obNext { flex:1;padding:14px;background:linear-gradient(135deg,#c9a84c,#e8c86a,#f5d87a);background-size:200% auto;border:none;border-radius:14px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;color:#0c0c00;cursor:pointer;transition:all .3s;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 20px rgba(201,168,76,0.35);letter-spacing:.02em;opacity:0.5; }
      #obNext:hover { background-position:right center;transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,0.45); }
      @media(max-width:520px){
        #obCard{border-radius:22px;}
        #obHeader,#obBody,#obFooter{padding-left:20px;padding-right:20px;}
        #obTitle{font-size:22px;}#obEmoji{font-size:44px;}
        .ob-cg{grid-template-columns:repeat(2,1fr);}
        .ob-sl{width:24px;}
      }
    </style>

    <div id="obCard">
      <div id="obHeader">
        <div class="ob-bg-c1"></div><div class="ob-bg-c2"></div>
        <div class="ob-progress">
          <div class="ob-sc active" id="obSC1">1</div>
<div class="ob-sl" id="obSL1"></div>
<div class="ob-sc" id="obSC2">2</div>
<div class="ob-sl" id="obSL2"></div>
<div class="ob-sc" id="obSC3">3</div>
<div class="ob-sl" id="obSL3"></div>
<div class="ob-sc" id="obSC4">4</div>
        </div>
        <span id="obEmoji">👋</span>
        <div id="obTitle">Welcome to BudgetTracker!</div>
        <div id="obSubtitle">Set up your account in 3 quick steps</div>
      </div>
      <div id="obBody"></div>
      <div id="obFooter">
        <button id="obSkip" onclick="obSkip()">Skip Setup</button>
        <button id="obBack" onclick="obBack()" style="display:none;padding:13px 20px;background:transparent;border:1px solid rgba(255,255,255,0.15);border-radius:14px;color:#7a9870;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;">← Back</button>
        <button id="obNext" onclick="obNext()"><span id="obNextText">Get Started →</span></button>
      </div>
    </div>`;

    document.body.appendChild(overlay);
    renderStep(1);
  }

  function updateProgress(step) {
    for (let i = 1; i <= 4; i++) {
      const sc = document.getElementById('obSC' + i);
      if (!sc) continue;
      if (i < step)       { sc.className = 'ob-sc done'; sc.textContent = '✓'; }
      else if (i === step) { sc.className = 'ob-sc active'; sc.textContent = i; }
      else                 { sc.className = 'ob-sc'; sc.textContent = i; }
    }
    for (let i = 1; i <= 3; i++) {
      const sl = document.getElementById('obSL' + i);
      if (sl) sl.className = 'ob-sl' + (i < step ? ' done' : '');
    }
  }

  function renderStep(step) {
    currentStep = step;
    updateProgress(step);
    const body = document.getElementById('obBody');
    const emoji = document.getElementById('obEmoji');
    const title = document.getElementById('obTitle');
    const subtitle = document.getElementById('obSubtitle');
    const nextText = document.getElementById('obNextText');
    const skip = document.getElementById('obSkip');
// Show/hide back button
    const backBtn = document.getElementById('obBack');
    if (backBtn) backBtn.style.display = step > 1 ? 'block' : 'none';

    // Disable next on step 1 until selection
    const nextBtn = document.getElementById('obNext');
    if (nextBtn) nextBtn.style.opacity = step === 1 ? '0.5' : '1';
    if (step === 1) {
      emoji.textContent = '🏠';
      title.textContent = 'How will you use BudgetTracker?';
      subtitle.textContent = 'Choose your mode — change anytime in Settings';
      nextText.textContent = 'Next →';
      skip.textContent = 'Skip Setup';
      skip.style.display = 'none';
      document.getElementById('obNext').onclick = obNext;
      body.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
          <div class="ob-cb sel" id="obModePersonal"
            onclick="obSelectMode('personal')"
            style="padding:28px 12px;cursor:pointer;border-radius:16px;text-align:center;">
            <div style="font-size:40px;margin-bottom:10px;">🏠</div>
            <div style="font-family:'DM Serif Display',serif;font-size:17px;color:#e8f0e0;margin-bottom:6px;">Personal</div>
            <div style="font-size:11px;color:#7a9870;line-height:1.5;">Track daily expenses, savings & personal budget</div>
          </div>
          <div class="ob-cb" id="obModeBusiness"
            onclick="obSelectMode('business')"
            style="padding:28px 12px;cursor:pointer;border-radius:16px;text-align:center;">
            <div style="font-size:40px;margin-bottom:10px;">💼</div>
            <div style="font-family:'DM Serif Display',serif;font-size:17px;color:#e8f0e0;margin-bottom:6px;">Business</div>
            <div style="font-size:11px;color:#7a9870;line-height:1.5;">Track Money IN & OUT — Khata style</div>
          </div>
        </div>
        <div class="ob-tip">
          <span style="font-size:18px;flex-shrink:0;">💡</span>
          <div><b>Tip:</b> Switch mode anytime from ⚙️ Settings!</div>
        </div>`;
    } 
    else if (step === 2) {
      emoji.textContent = '💼'; title.textContent = 'Set Your Income';
      skip.style.display = 'block';
      subtitle.textContent = "We'll calculate your spending budget automatically";
      nextText.textContent = 'Next Step →'; skip.textContent = 'Skip';
      const ss = localStorage.getItem('salary') || '';
      const sv = localStorage.getItem('saving') || '';
      body.innerHTML = `
        <div class="ob-field">
          <label><span>💼</span> Monthly Salary / Income</label>
          <div class="ob-iw"><span class="ob-pre">₹</span>
            <input class="ob-inp" type="number" id="obSalary" placeholder="50,000" min="0" value="${ss}" oninput="obCalcBudget()"/>
          </div>
          <div class="ob-hint">Your total take-home income each month</div>
        </div>
        <div class="ob-field">
          <label><span>🏦</span> Monthly Savings Goal</label>
          <div class="ob-iw"><span class="ob-pre">₹</span>
            <input class="ob-inp" type="number" id="obSaving" placeholder="10,000" min="0" value="${sv}" oninput="obCalcBudget()"/>
          </div>
          <div class="ob-hint">How much you want to save each month</div>
        </div>
        <div class="ob-tip">
          <span style="font-size:18px;flex-shrink:0;">💡</span>
          <div><b>Pro Tip:</b> Try the 50/30/20 rule — 50% needs, 30% wants, 20% savings!</div>
        </div>
        <div class="ob-preview" id="obBudgetPreview">
          <span style="font-size:13px;color:#7a9870;">Your spending budget</span>
          <span style="font-family:'DM Serif Display',serif;font-size:20px;color:#52b052;" id="obBudgetVal">₹0</span>
        </div>`;
    } else if (step === 3) {
      emoji.textContent = '💱'; title.textContent = 'Choose Your Currency';
      subtitle.textContent = 'Select your preferred currency for the app';
      nextText.textContent = 'Next Step →'; skip.textContent = 'Skip';
      body.innerHTML = `
        <div class="ob-cg">
          ${CURRENCIES.map(c => `
            <div class="ob-cb ${c.code === selectedCurr.code ? 'sel' : ''}" id="obCurr_${c.code}" style="padding:10px 6px;cursor:pointer;" onclick="obSelectCurr('${c.code}')">
              <div style="font-family:'DM Serif Display',serif;font-size:22px;color:#e8c86a;">${c.sym}</div>
              <div style="font-size:11px;color:#7a9870;margin-top:4px;">${c.name}</div>
            </div>`).join('')}
        </div>
      <div class="ob-cnote">⚠️ Currency symbol updates across all pages but does not convert existing amounts.</div>`;
    } else if (step === 4) {
      emoji.textContent = '🌐'; title.textContent = 'Choose Your Language';
      subtitle.textContent = 'Select your preferred language for the app';
      nextText.textContent = '✅ Finish Setup'; skip.textContent = 'Skip';
      body.innerHTML = `
        <div class="ob-cg" style="grid-template-columns:repeat(2,1fr);">
          ${[
            {code:'en',flag:'🇬🇧',name:'English'},
            {code:'hi',flag:'🇮🇳',name:'हिंदी'},
            {code:'zh',flag:'🇨🇳',name:'中文'},
            {code:'es',flag:'🇪🇸',name:'Español'},
            {code:'fr',flag:'🇫🇷',name:'Français'},
            {code:'de',flag:'🇩🇪',name:'Deutsch'},
            {code:'ja',flag:'🇯🇵',name:'日本語'},
            {code:'ar',flag:'🇸🇦',name:'العربية'},
            {code:'ko',flag:'🇰🇷',name:'한국어'},
            {code:'pt',flag:'🇵🇹',name:'Português'},
          ].map(l=>`
            <div class="ob-cb ${l.code==='en'?'sel':''}" onclick="obSelectLang('${l.code}')" id="obLang_${l.code}" style="padding:10px 6px;">
              <div style="font-size:13px;color:#e8f0e0;font-weight:600;">${l.flag} ${l.name}</div>
            </div>`).join('')}
        </div>`;
    }
  }

  window.obCalcBudget = function() {
    const salary = parseFloat(document.getElementById('obSalary')?.value) || 0;
    const saving = parseFloat(document.getElementById('obSaving')?.value) || 0;
    const budget = Math.max(0, salary - saving);
    const preview = document.getElementById('obBudgetPreview');
    const val = document.getElementById('obBudgetVal');
    if (preview && val) {
      preview.style.display = salary > 0 ? 'flex' : 'none';
      val.textContent = '₹' + budget.toLocaleString('en-IN');
      val.style.color = budget > 0 ? '#52b052' : '#e05555';
    }
  };
  let selectedLang = 'en';
  window.obSelectCurr = function(code) {
  selectedCurr = CURRENCIES.find(c => c.code === code) || CURRENCIES[0];
  CURRENCIES.forEach(c => {
    const el = document.getElementById('obCurr_' + c.code);
    if (el) el.className = 'ob-cb' + (c.code === code ? ' sel' : '');
  });
};
window.obSelectLang = function(code) {
    selectedLang = code;
    ['en','hi','zh','es','fr','de','ja','ar','ko','pt'].forEach(c => {
      const el = document.getElementById('obLang_' + c);
      if (el) el.className = 'ob-cb' + (c === code ? ' sel' : '');
    });
};

/* ── BUSINESS FLOW (only 3 steps) ── */
let businessStep = 1;

window.obSelectMode = function(mode) {
  selectedMode = mode;
  document.getElementById('obModePersonal')?.classList.toggle('sel', mode==='personal');
  document.getElementById('obModeBusiness')?.classList.toggle('sel', mode==='business');
  // Enable next button
  const nextBtn = document.getElementById('obNext');
  if (nextBtn) nextBtn.style.opacity = '1';
};

function renderBusinessStep(step) {
  businessStep = step;
  const body     = document.getElementById('obBody');
  const emoji    = document.getElementById('obEmoji');
  const title    = document.getElementById('obTitle');
  const subtitle = document.getElementById('obSubtitle');
  const nextText = document.getElementById('obNextText');
  const skip     = document.getElementById('obSkip');

  // Update progress manually for business (3 steps only)
  document.getElementById('obSC1').className = 'ob-sc done'; document.getElementById('obSC1').textContent = '✓';
  document.getElementById('obSL1').className = 'ob-sl done';
  if (step === 2) {
    document.getElementById('obSC2').className = 'ob-sc active'; document.getElementById('obSC2').textContent = '2';
  } else if (step === 3) {
    document.getElementById('obSC2').className = 'ob-sc done'; document.getElementById('obSC2').textContent = '✓';
    document.getElementById('obSL2').className = 'ob-sl done';
    document.getElementById('obSC3').className = 'ob-sc active'; document.getElementById('obSC3').textContent = '3';
  }

  if (step === 2) {
    // Currency step
    emoji.textContent = '💱'; title.textContent = 'Choose Your Currency';
    subtitle.textContent = 'Select your preferred currency for the app';
    nextText.textContent = 'Next Step →'; skip.textContent = 'Skip';
    // Show back button for business flow
    const backBtn = document.getElementById('obBack');
    if (backBtn) backBtn.style.display = 'block';
    body.innerHTML = `
      <div class="ob-cg">
        ${CURRENCIES.map(c => `
          <div class="ob-cb ${c.code===selectedCurr.code?'sel':''}" id="obCurr_${c.code}"
            style="padding:10px 6px;cursor:pointer;" onclick="obSelectCurr('${c.code}')">
            <div style="font-family:'DM Serif Display',serif;font-size:22px;color:#e8c86a;">${c.sym}</div>
            <div style="font-size:11px;color:#7a9870;margin-top:4px;">${c.name}</div>
          </div>`).join('')}
      </div>
      <div class="ob-cnote">⚠️ Currency symbol updates across all pages but does not convert existing amounts.</div>`;

    // Override obNext for business flow
    document.getElementById('obNext').onclick = function() {
      localStorage.setItem('bt_currency',     selectedCurr.code);
      localStorage.setItem('bt_currency_sym', selectedCurr.sym);
      renderBusinessStep(3);
    };

  } else if (step === 3) {
    // Language step
    emoji.textContent = '🌐'; title.textContent = 'Choose Your Language';
    subtitle.textContent = 'Select your preferred language for the app';
    nextText.textContent = '✅ Finish Setup'; skip.textContent = 'Skip';
    body.innerHTML = `
      <div class="ob-cg" style="grid-template-columns:repeat(2,1fr);">
        ${[
          {code:'en',flag:'🇬🇧',name:'English'},
          {code:'hi',flag:'🇮🇳',name:'हिंदी'},
          {code:'zh',flag:'🇨🇳',name:'中文'},
          {code:'es',flag:'🇪🇸',name:'Español'},
          {code:'fr',flag:'🇫🇷',name:'Français'},
          {code:'de',flag:'🇩🇪',name:'Deutsch'},
          {code:'ja',flag:'🇯🇵',name:'日本語'},
          {code:'ar',flag:'🇸🇦',name:'العربية'},
          {code:'ko',flag:'🇰🇷',name:'한국어'},
          {code:'pt',flag:'🇵🇹',name:'Português'},
        ].map(l=>`
          <div class="ob-cb ${l.code==='en'?'sel':''}" onclick="obSelectLang('${l.code}')"
            id="obLang_${l.code}" style="padding:10px 6px;">
            <div style="font-size:13px;color:#e8f0e0;font-weight:600;">${l.flag} ${l.name}</div>
          </div>`).join('')}
      </div>`;

    // Override obNext for business finish
    document.getElementById('obNext').onclick = function() {
      localStorage.setItem('bt_language', selectedLang);
      const email  = localStorage.getItem('userEmail') || 'guest';
      const prefix = email.replace(/[^a-zA-Z0-9]/g, '_') + '_';
      localStorage.setItem(prefix + 'bt_onboarded', '1');
      showBusinessSuccess();
    };
  }
}

function showBusinessSuccess() {
  const header = document.getElementById('obHeader');
  const body   = document.getElementById('obBody');
  const footer = document.getElementById('obFooter');
  if (header) header.style.display = 'none';
  footer.innerHTML = `
    <button onclick="window.closeOnboarding();window.location.href='business.html';"
      style="flex:1;padding:15px;background:linear-gradient(135deg,#c9a84c,#e8c86a,#f5d87a);
      border:none;border-radius:14px;font-family:'DM Sans',sans-serif;font-size:16px;
      font-weight:700;color:#0c0c00;cursor:pointer;box-shadow:0 6px 24px rgba(201,168,76,0.4);">
      💼 Go to Business Dashboard!
    </button>`;
  body.innerHTML = `
    <div class="ob-suc">
      <span class="ob-sico">🎉</span>
      <h3>Business Mode Ready!</h3>
      <p>Start tracking your Money IN & OUT.<br/>Switch mode anytime from Settings!</p>
      <div class="ob-scards">
        <div class="ob-scard">
          <div class="ob-scard-ico">💼</div>
          <div class="ob-scard-lbl">Mode</div>
          <div class="ob-scard-val">Business</div>
        </div>
        <div class="ob-scard">
          <div class="ob-scard-ico">💱</div>
          <div class="ob-scard-lbl">Currency</div>
          <div class="ob-scard-val">${selectedCurr.flag} ${selectedCurr.code}</div>
        </div>
      </div>
    </div>`;
}
window.obBack = function() {
    if (selectedMode === 'business') {
      renderStep(1);
    } else if (currentStep > 1) {
      renderStep(currentStep - 1);
    }
  };
  window.obNext = function() {
    if (currentStep === 1) {
      // Save mode
      localStorage.setItem('bt_mode', selectedMode);
      if (selectedMode === 'business') {
        // Business: skip Welcome + Income → go straight to Currency
        renderBusinessStep(2);
      } else {
        renderStep(2);
      }
    } else if (currentStep === 2) {
      const salary = parseFloat(document.getElementById('obSalary')?.value) || 0;
      const saving = parseFloat(document.getElementById('obSaving')?.value) || 0;
      const budget = Math.max(0, salary - saving);
      if (salary > 0) {
        localStorage.setItem('salary', salary); localStorage.setItem('saving', saving);
        localStorage.setItem('bt_budget', budget); localStorage.setItem('budget', budget);
      }
      renderStep(3);
   } else if (currentStep === 3) {
      localStorage.setItem('bt_currency', selectedCurr.code);
      localStorage.setItem('bt_currency_sym', selectedCurr.sym);
      renderStep(4);
    } else if (currentStep === 4) {
      localStorage.setItem('bt_language', selectedLang);
      const email = localStorage.getItem('userEmail') || 'guest';
      const prefix = email.replace(/[^a-zA-Z0-9]/g, '_') + '_';
      localStorage.setItem(prefix + 'bt_onboarded', '1');
      showSuccess();
    }
  };

  window.obSkip = function() {
    const email = localStorage.getItem('userEmail') || 'guest';
    const prefix = email.replace(/[^a-zA-Z0-9]/g, '_') + '_';
    localStorage.setItem(prefix + 'bt_onboarded', '1');
    const mode = localStorage.getItem('bt_mode') || 'personal';
    window.closeOnboarding();
    if (mode === 'business') window.location.href = 'business.html';
    else window.location.href = 'index.html';
  };

  function showSuccess() {
    const header = document.getElementById('obHeader');
    const body   = document.getElementById('obBody');
    const footer = document.getElementById('obFooter');
    if (header) header.style.display = 'none';
    const budget = parseFloat(localStorage.getItem('bt_budget') || '0');
    footer.innerHTML = `
      <button onclick="window.closeOnboarding();window.location.href='index.html';" style="flex:1;padding:15px;background:linear-gradient(135deg,#c9a84c,#e8c86a,#f5d87a);background-size:200% auto;border:none;border-radius:14px;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;color:#0c0c00;cursor:pointer;box-shadow:0 6px 24px rgba(201,168,76,0.4);letter-spacing:.02em;">
        🚀 Start Tracking!
      </button>`;
    body.innerHTML = `
      <div class="ob-suc">
        <span class="ob-sico">🎉</span>
        <h3>You're all set!</h3>
        <p>Your budget and currency are saved.<br/>Start adding expenses to see your dashboard come alive!</p>
        <div class="ob-scards">
          <div class="ob-scard">
            <div class="ob-scard-ico">💰</div>
            <div class="ob-scard-lbl">Budget Set</div>
            <div class="ob-scard-val">${budget > 0 ? selectedCurr.sym + budget.toLocaleString('en-IN') : 'Not set'}</div>
          </div>
          <div class="ob-scard">
            <div class="ob-scard-ico">💱</div>
            <div class="ob-scard-lbl">Currency</div>
            <div class="ob-scard-val">${selectedCurr.flag} ${selectedCurr.code}</div>
          </div>
        </div>
      </div>`;
  }

  window.closeOnboarding = function() {
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(1.02)';
      overlay.style.transition = 'all .35s ease';
      setTimeout(() => {
        overlay.remove();
        if (typeof render === 'function') render();
        if (typeof init   === 'function') init();
      }, 350);
    }
  };
  window.showSpotlight = function(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const spot = document.createElement('div');
  spot.id = 'ob-spotlight';
  spot.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99998;
    pointer-events: none;
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.75);
    border-radius: 14px;
    top: ${rect.top - 8}px;
    left: ${rect.left - 8}px;
    width: ${rect.width + 16}px;
    height: ${rect.height + 16}px;
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.82),
                0 0 0 3px #c9a84c,
                0 0 24px rgba(201,168,76,0.5);
    transition: all 0.4s ease;
  `;
  document.body.appendChild(spot);
};

window.removeSpotlight = function() {
  const s = document.getElementById('ob-spotlight');
  if (s) s.remove();
};

  document.addEventListener('DOMContentLoaded', function() {
  console.log('ONBOARDING CHECK', sessionStorage.getItem('show_onboarding'));
  const show = sessionStorage.getItem('show_onboarding') === '1';
  if (show) {
    sessionStorage.removeItem('show_onboarding');
    setTimeout(createOverlay, 1200);
  }
});

})();