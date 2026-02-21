(() => {
  const years = document.querySelectorAll("[data-year]");
  const now = String(new Date().getFullYear());
  years.forEach((node) => {
    node.textContent = now;
  });
})();
