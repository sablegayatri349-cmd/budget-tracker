// ============================================================
// language.js — Apply translations to any page automatically
// ============================================================

function getLang() {
  return localStorage.getItem('bt_language') || 'en';
}

function t(key) {
  const lang = getLang();
  const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang])
    ? TRANSLATIONS[lang]
    : (typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS['en'] : {});
  return dict[key] || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || key;
}

function applyTranslations() {
  const lang = getLang();

  // Set page direction for Arabic
  const info = (typeof LANGUAGES !== 'undefined' && LANGUAGES[lang]) ? LANGUAGES[lang] : { dir: 'ltr' };
  document.documentElement.setAttribute('dir', info.dir || 'ltr');
  document.documentElement.setAttribute('lang', lang);

  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translated;
    } else if (el.tagName === 'IMG') {
      el.alt = translated;
    } else {
      el.textContent = translated;
    }
  });

  // Translate placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Translate titles with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', applyTranslations);

// Also run immediately if DOM already loaded
if (document.readyState !== 'loading') {
  applyTranslations();
}