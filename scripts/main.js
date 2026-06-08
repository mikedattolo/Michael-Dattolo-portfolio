/* ============================================================
   Michael Dattolo — portfolio interactions
   Progressive enhancement. Everything degrades gracefully.
   ============================================================ */
(() => {
  "use strict";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Current year ---- */
  const now = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((n) => (n.textContent = now));

  /* ---- Footer CTA injection ---- */
  (function footerCta() {
    const inner = document.querySelector(".site-footer .footer-inner");
    if (inner && !inner.querySelector(".footer-cta")) {
      const cta = document.createElement("div");
      cta.className = "footer-cta";
      cta.innerHTML =
        '<p>Building something in product design, manufacturing, robotics, or medical devices? <a href="/contact/">Let’s talk →</a></p>';
      inner.prepend(cta);
    }
  })();

  /* ---- Brand injection (keeps every header consistent) ---- */
  (function brand() {
    const inner = document.querySelector(".site-header .header-inner");
    if (!inner || inner.querySelector(".brand")) return;
    const homeLink = inner.querySelector(".nav-list a");
    const home = homeLink ? homeLink.getAttribute("href") : "./";
    const a = document.createElement("a");
    a.className = "brand";
    a.href = home;
    a.setAttribute("aria-label", "Michael Dattolo — home");
    a.innerHTML =
      '<span class="brand-mark" aria-hidden="true">M</span>' +
      '<span class="brand-text"><span class="brand-name">Michael Dattolo</span>' +
      '<span class="brand-sub">Product Designer</span></span>';
    inner.prepend(a);
  })();

  /* ---- Active nav highlight ---- */
  (function activeNav() {
    const current = window.location.pathname.replace(/index\.html$/, "");
    document.querySelectorAll(".nav-list a").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:")) return;
      const target = new URL(href, window.location.href).pathname.replace(/index\.html$/, "");
      if (target === current) link.classList.add("active");
    });
  })();

  /* ---- Header scroll state ---- */
  (function headerScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  })();

  /* ---- Top scroll progress ---- */
  (function scrollProgress() {
    let bar = document.querySelector(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      bar.setAttribute("aria-hidden", "true");
      document.body.prepend(bar);
    }
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + "%";
    };
    update();
    window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  })();

  /* ---- Reading progress (case studies) ---- */
  (function readingProgress() {
    const el = document.getElementById("reading-progress");
    if (!el || document.body?.dataset?.page !== "case-study") return;
    const onScroll = () => {
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      const p = h > 0 ? (doc.scrollTop || document.body.scrollTop) / h : 0;
      el.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    };
    onScroll();
    window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  })();

  /* ---- Smooth page transitions ---- */
  (function pageTransitions() {
    const reset = () => document.body.classList.remove("fade-out");
    reset();
    window.addEventListener("pageshow", reset);
    if (prefersReduced) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || a.target === "_blank") return;
      if (a.hasAttribute("download") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const next = new URL(a.href, window.location.href);
      if (next.origin !== window.location.origin) return;
      e.preventDefault();
      document.body.classList.add("fade-out");
      window.setTimeout(() => (window.location.href = next.href), 200);
    });
  })();

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  (function scrollReveal() {
    const selector =
      ".reveal, .hero-copy, .card, .feature, .timeline-item, .headshot, .callout, .process-steps li, .resume-block, .contact-form-section, .contact-method, .stat, .section-head, .featured-card";
    const targets = Array.from(document.querySelectorAll(selector));
    if (!targets.length) return;

    if (prefersReduced) {
      targets.forEach((el) => {
        el.classList.add("is-in", "visible", "is-revealed");
      });
      return;
    }

    targets.forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("fade-up");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in", "visible", "is-revealed");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => io.observe(el));
  })();

  /* ---- Spotlight hover for cards (pointer-driven) ---- */
  (function spotlight() {
    if (prefersReduced || window.matchMedia("(hover: none)").matches) return;
    const cards = document.querySelectorAll(".card, .feature, .cta-band, .contact-method");
    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  })();

  /* ---- Magnetic buttons (subtle) ---- */
  (function magnetic() {
    if (prefersReduced || window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll("[data-magnetic], .button.primary").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
      });
      btn.addEventListener("pointerleave", () => (btn.style.transform = ""));
    });
  })();

  /* ---- Animated stat counters ---- */
  (function counters() {
    const nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = (el.dataset.count.split(".")[1] || "").length;
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      if (prefersReduced) {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }
      const dur = 1500;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((el) => io.observe(el));
  })();

  /* ---- Hero role rotator ---- */
  (function rotator() {
    const el = document.querySelector("[data-rotator]");
    if (!el) return;
    let roles;
    try {
      roles = JSON.parse(el.dataset.rotator);
    } catch {
      return;
    }
    if (!Array.isArray(roles) || !roles.length) return;
    el.textContent = roles[0];
    if (prefersReduced) return;
    let i = 0;
    setInterval(() => {
      i = (i + 1) % roles.length;
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
      el.style.transition = "opacity .25s ease, transform .25s ease";
      setTimeout(() => {
        el.textContent = roles[i];
        el.style.opacity = "1";
        el.style.transform = "none";
      }, 260);
    }, 2600);
  })();

  /* ---- Contact form validation + submit ---- */
  (function contactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const fields = form.querySelectorAll("input, textarea");

    const validate = (field) => {
      const errorEl = field.parentElement?.querySelector(".form-error");
      if (!errorEl) return true;
      let msg = "";
      const value = field.value.trim();
      if (field.hasAttribute("required") && !value) msg = "This field is required.";
      else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        msg = "Please enter a valid email address.";
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      errorEl.textContent = msg;
      return !msg;
    };

    fields.forEach((f) => {
      f.addEventListener("input", () => validate(f));
      f.addEventListener("blur", () => validate(f));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      fields.forEach((f) => {
        if (!validate(f)) valid = false;
      });
      if (!valid) return;

      const status = document.getElementById("form-status");
      const btn = form.querySelector('button[type="submit"]');
      const action = form.getAttribute("action");
      if (!action) {
        if (status) status.textContent = "Form unavailable. Please email mike.dattolo@yahoo.com.";
        return;
      }
      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.textContent;
        btn.textContent = "Sending…";
      }
      try {
        const res = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("submit_failed");
        if (status) status.textContent = "Message sent. Mike will be notified by email right away.";
        form.reset();
        fields.forEach((f) => f.setAttribute("aria-invalid", "false"));
        form.querySelectorAll(".form-error").forEach((el) => (el.textContent = ""));
      } catch {
        if (status) status.textContent = "Unable to send right now. Please email mike.dattolo@yahoo.com directly.";
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.label || "Send Message";
        }
      }
    });
  })();
})();
