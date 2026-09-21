/* Progressive enhancements. Navigation, project content and contact links work without JS. */
const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');
if (menu && nav) {
  const mobile = matchMedia('(max-width: 760px)');
  menu.hidden = !mobile.matches;
  const reset = () => { menu.hidden = !mobile.matches; menu.setAttribute('aria-expanded', 'false'); nav.hidden = mobile.matches; };
  reset();
  mobile.addEventListener('change', reset);
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    nav.hidden = expanded;
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobile.matches && !nav.hidden) { reset(); menu.focus(); }
  });
}
for (const button of document.querySelectorAll('[data-copy-email]')) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const email = button.dataset.copyEmail;
    const status = document.querySelector('[data-copy-status]');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable');
      await navigator.clipboard.writeText(email);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Copy is unavailable in this browser. Select the email address above or use the email link.';
    }
  });
}
