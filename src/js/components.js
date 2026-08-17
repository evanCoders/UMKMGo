(function () {
  const THEME_KEY = 'umkmgo-theme';

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}

    const lightIcon = document.getElementById('theme-toggle-light-icon') || document.getElementById('theme-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon') || document.getElementById('theme-dark-icon');

    if (lightIcon && darkIcon) {
      if (isDark) {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      } else {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      }
    }
  }

  function getInitialTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function initTheme() {
    applyTheme(getInitialTheme());
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn && !themeBtn.dataset.bound) {
      themeBtn.dataset.bound = 'true';
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
      });
    }
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu && !menuBtn.dataset.bound) {
      menuBtn.dataset.bound = 'true';
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }

  async function injectComponent(placeholderId, componentUrl) {
    const el = document.getElementById(placeholderId);
    if (!el || !componentUrl) return;

    try {
      const res = await fetch(componentUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
      initTheme();
      initMobileMenu();
      document.dispatchEvent(new CustomEvent('componentLoaded', { detail: { id: placeholderId, url: componentUrl } }));
    } catch (err) {
      console.error('Failed to load component', placeholderId, componentUrl, err);
    }
  }

  function loadAllComponents() {
    initTheme();
    const navbar = document.querySelector('[data-component="navbar"]');
    const footer = document.querySelector('[data-component="footer"]');

    if (navbar) {
      injectComponent(
        navbar.id || 'component-navbar',
        navbar.getAttribute('data-src')
      );
    }

    if (footer) {
      injectComponent(
        footer.id || 'component-footer',
        footer.getAttribute('data-src')
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
  } else {
    loadAllComponents();
  }
})();
