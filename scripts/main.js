(() => {
  const years = document.querySelectorAll("[data-year]");
  const now = String(new Date().getFullYear());
  years.forEach((node) => {
    node.textContent = now;
  });
})();

/* ===== Scroll-reveal: subtle fade-up on sections and cards ===== */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = document.querySelectorAll(
    ".card, .artifact, .timeline-item, .headshot, .callout, .process-steps li, .resume-block, section > h2"
  );
  if (!targets.length) return;

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
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
