// ── BUDGETTRACKER THEME SYSTEM ──

const THEMES = {
  dark: {
    '--bg':           '#080f08',
    '--bg2':          '#0c140c',
    '--bg3':          '#111a11',
    '--card':         '#141f14',
    '--card2':        '#1a2a1a',
    '--border':       '#1f2f1f',
    '--border2':      '#2a402a',
    '--green-dark':   '#1a3d1a',
    '--green':        '#2d6a2d',
    '--green-mid':    '#3a8c3a',
    '--green-bright': '#52b052',
    '--gold':         '#c9a84c',
    '--gold-light':   '#e8c86a',
    '--gold-bright':  '#f5d87a',
    '--gold-dim':     'rgba(201,168,76,0.12)',
    '--gold-border':  'rgba(201,168,76,0.25)',
    '--red':          '#e05555',
    '--red-dim':      'rgba(224,85,85,0.12)',
    '--text':         '#e8f0e0',
    '--tmid':         '#7a9870',
    '--tdim':         '#3a5030',
    '--label':        '#c9a84c',
  },
  light: {
    '--bg':           '#f5f0e8',
    '--bg2':          '#ede8dc',
    '--bg3':          '#e6dfd2',
    '--card':         '#ffffff',
    '--card2':        '#faf7f0',
    '--border':       '#c8ddc0',
    '--border2':      '#ccc4ae',
    '--green-dark':   '#2d6a2d',
    '--green':        '#3a8c3a',
    '--green-mid':    '#52b052',
    '--green-bright': '#2d6a2d',
    '--gold':         '#b8922a',
    '--gold-light':   '#96700f',
    '--gold-bright':  '#7a5800',
    '--gold-dim':     'rgba(184,146,42,0.12)',
    '--gold-border':  'rgba(184,146,42,0.30)',
    '--red':          '#cc3333',
    '--red-dim':      'rgba(204,51,51,0.10)',
    '--text':         '#0f2e0f',
    '--tmid':         '#3a5c2a',
    '--tdim':         '#7a9870',
    '--label':        '#7a5800',
  }
};

function applyTheme(mode) {
  const theme = THEMES[mode] || THEMES.dark;
  const root  = document.documentElement;
  Object.entries(theme).forEach(([k, v]) => root.style.setProperty(k, v));
  localStorage.setItem('bt_theme', mode);

  // Update toggle UI if on settings page
  const darkBtn  = document.getElementById('themeDark');
  const lightBtn = document.getElementById('themeLight');
  if (darkBtn && lightBtn) {
    darkBtn.classList.toggle('theme-opt-active',  mode === 'dark');
    lightBtn.classList.toggle('theme-opt-active', mode === 'light');
  }
}

function loadTheme() {
  const saved = localStorage.getItem('bt_theme') || 'dark';
  applyTheme(saved);
}

// Auto-apply on every page load
loadTheme();