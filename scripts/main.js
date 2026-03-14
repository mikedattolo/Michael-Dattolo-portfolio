(() => {
  const years = document.querySelectorAll("[data-year]");
  const now = String(new Date().getFullYear());
  years.forEach((node) => {
    node.textContent = now;
  });
})();

/* ===== Footer CTA + cleanup ===== */
(function () {
  const footerInner = document.querySelector(".site-footer .footer-inner");
  if (footerInner && !footerInner.querySelector(".footer-cta")) {
    const footerCta = document.createElement("div");
    footerCta.className = "footer-cta";
    footerCta.innerHTML =
      '<p>Interested in product design, manufacturing innovation, or medical device collaboration? <a href="/contact/">Let\'s connect.</a></p>';
    footerInner.prepend(footerCta);
  }

  const progressBars = document.querySelectorAll("#reading-progress");
  if (progressBars.length > 1) {
    progressBars.forEach((bar, index) => {
      if (index > 0) bar.remove();
    });
  }
})();

/* ===== Active nav highlight ===== */
(function () {
  const current = window.location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".nav-list a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:")) return;
    const url = new URL(href, window.location.href);
    const target = url.pathname.replace(/index\.html$/, "");
    if (target === current) {
      link.classList.add("active");
    }
  });
})();

/* ===== Smooth page transitions ===== */
(function () {
  const resetFadeState = () => {
    document.body.classList.remove("fade-out");
  };

  resetFadeState();
  window.addEventListener("pageshow", resetFadeState);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || anchor.target === "_blank") return;
    if (anchor.hasAttribute("download") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    const nextUrl = new URL(anchor.href, window.location.href);
    if (nextUrl.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add("fade-out");
    window.setTimeout(() => {
      window.location.href = nextUrl.href;
    }, 220);
  });
})();

/* ===== Scroll-reveal and hero entrance ===== */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = document.querySelectorAll(
    ".hero-copy, .card, .artifact, .timeline-item, .headshot, .callout, .process-steps li, .resume-block, .contact-form-section"
  );
  if (!targets.length) return;

  targets.forEach((el) => {
    el.classList.add("fade-up");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  const heroCopy = document.querySelector(".hero-copy");
  if (heroCopy) {
    window.requestAnimationFrame(() => heroCopy.classList.add("visible"));
  }
})();

/* ===== Top scroll progress indicator ===== */
(function () {
  let progress = document.querySelector(".scroll-progress");
  if (!progress) {
    progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.prepend(progress);
  }

  const updateProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const value = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
  };

  updateProgress();
  window.addEventListener("scroll", () => window.requestAnimationFrame(updateProgress), { passive: true });
})();

/* ===== Contact form validation ===== */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = form.querySelectorAll("input, textarea");

  const validateField = (field) => {
    const errorEl = field.parentElement?.querySelector(".form-error");
    if (!errorEl) return true;

    let message = "";
    const value = field.value.trim();

    if (field.hasAttribute("required") && !value) {
      message = "This field is required.";
    } else if (field.type === "email" && value) {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!validEmail) {
        message = "Please enter a valid email address.";
      }
    }

    field.setAttribute("aria-invalid", message ? "true" : "false");
    errorEl.textContent = message;
    return !message;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", async (event) => {
    let valid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        valid = false;
      }
    });

    if (!valid) {
      event.preventDefault();
      return;
    }

    event.preventDefault();

    const status = document.getElementById("form-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const action = form.getAttribute("action");

    if (!action) {
      if (status) {
        status.textContent = "Form submission is temporarily unavailable. Please email mike.dattolo@yahoo.com.";
      }
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      if (status) {
        status.textContent = "Message sent successfully. Mike will be notified by email right away.";
      }
      form.reset();
      fields.forEach((field) => field.setAttribute("aria-invalid", "false"));
      form.querySelectorAll(".form-error").forEach((el) => {
        el.textContent = "";
      });
    } catch (_error) {
      if (status) {
        status.textContent = "Unable to send right now. Please email mike.dattolo@yahoo.com directly.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
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
