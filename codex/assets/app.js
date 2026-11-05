(() => {
  document.documentElement.classList.add("js");

  const header = document.querySelector("#siteHeader");
  const menuToggle = document.querySelector("#menuToggle");
  const mobileMenu = document.querySelector("#mobileMenu");
  const mobileLinks = [...document.querySelectorAll(".mobile-nav-link")];
  const revealItems = [...document.querySelectorAll(".reveal")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeMenu = () => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "打开导航菜单");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    mobileMenu?.classList.toggle("is-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "打开导航菜单" : "关闭导航菜单");
  });

  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  const setHeaderState = () => {
    header?.classList.toggle("site-header-scrolled", window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const cursorGlow = document.querySelector("#cursorGlow");
  if (cursorGlow && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let glowFrame = null;
    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener(
      "pointermove",
      (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        cursorGlow.style.opacity = "1";

        if (glowFrame) return;
        glowFrame = requestAnimationFrame(() => {
          cursorGlow.style.left = `${pointerX}px`;
          cursorGlow.style.top = `${pointerY}px`;
          glowFrame = null;
        });
      },
      { passive: true },
    );

    document.documentElement.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0";
    });
  }

  const toast = document.querySelector("#toast");
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2200);
  };

  const copyButton = document.querySelector("#copyEmail");
  copyButton?.addEventListener("click", async () => {
    const email = copyButton.dataset.email;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    const copyIcon = copyButton.querySelector(".copy-icon");
    const checkIcon = copyButton.querySelector(".check-icon");
    const copyLabel = copyButton.querySelector(".copy-label");

    copyButton.classList.add("is-copied");
    copyIcon?.classList.add("hidden");
    checkIcon?.classList.remove("hidden");
    if (copyLabel) copyLabel.textContent = "已复制";
    showToast(`邮箱已复制：${email}`);

    window.setTimeout(() => {
      copyButton.classList.remove("is-copied");
      copyIcon?.classList.remove("hidden");
      checkIcon?.classList.add("hidden");
      if (copyLabel) copyLabel.textContent = "复制邮箱";
    }, 2200);
  });

  const year = document.querySelector("#currentYear");
  if (year) year.textContent = new Date().getFullYear();
})();
