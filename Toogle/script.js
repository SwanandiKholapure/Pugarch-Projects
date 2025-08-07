// Theme toggle logic with persistence
// Usage: Call setupThemeToggle() after DOM is loaded

function setupThemeToggle() {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  const THEME_KEY = 'theme-preference';

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  function getSavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function toggleTheme() {
    const isDark = body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }

  toggleBtn.addEventListener('click', toggleTheme);
  toggleBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  applyTheme(getSavedTheme());
}

document.addEventListener('DOMContentLoaded', setupThemeToggle);
