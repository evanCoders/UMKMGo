// Load komponen navbar/footer untuk static pages (Vercel Static)
(function () {
  async function injectComponent(placeholderId, componentUrl) {
    const el = document.getElementById(placeholderId);
    if (!el || !componentUrl) return;

    try {
      const res = await fetch(componentUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error('Failed to load component', placeholderId, componentUrl, err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
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
  });
})();

