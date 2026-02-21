(() => {
  const years = document.querySelectorAll("[data-year]");
  const now = String(new Date().getFullYear());
  years.forEach((node) => {
    node.textContent = now;
  });
})();

/* ===== Reading progress (case studies) ===== */
(function () {
  const progressEl = document.getElementById("reading-progress");
  const isCaseStudy = document.body?.dataset?.page === "case-study";
  if (!isCaseStudy || !progressEl) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    progressEl.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
  };

  onScroll();
  window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
})();
