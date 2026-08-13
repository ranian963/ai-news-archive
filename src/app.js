(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  function loadDeferredImage(image) {
    if (!(image instanceof HTMLImageElement) || !image.dataset.src) return;
    image.src = image.dataset.src;
    if (image.dataset.srcset) image.srcset = image.dataset.srcset;
    delete image.dataset.src;
    delete image.dataset.srcset;
    delete image.dataset.deferredImage;
  }

  function initDeferredImages() {
    const images = [...document.querySelectorAll("[data-deferred-image]")];
    if (!("IntersectionObserver" in window)) {
      images.forEach(loadDeferredImage);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        loadDeferredImage(entry.target);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "240px 80px" });
    images.forEach((image) => observer.observe(image));
  }

  function initFilters() {
    const grid = document.querySelector("[data-news-grid]");
    if (!grid) return;
    const buttons = [...document.querySelectorAll("[data-filter]")];
    const input = document.querySelector("[data-search-input]");
    const empty = document.querySelector("[data-empty]");
    const count = document.querySelector("[data-result-count]");
    const requested = new URLSearchParams(location.search).get("type");
    let selected = ["weekly", "model", "brief"].includes(requested) ? requested : "all";

    const apply = () => {
      const query = input.value.trim().toLocaleLowerCase("ko");
      let visible = 0;
      for (const item of grid.children) {
        const typeMatch = selected === "all" || item.dataset.type === selected;
        const textMatch = !query || item.dataset.search.includes(query);
        item.hidden = !(typeMatch && textMatch);
        if (!item.hidden) visible += 1;
      }
      count.textContent = `${visible}개`;
      empty.hidden = visible !== 0;
    };

    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === selected));
      button.addEventListener("click", () => {
        selected = button.dataset.filter;
        for (const candidate of buttons) {
          candidate.setAttribute("aria-pressed", String(candidate === button));
        }
        const url = new URL(location.href);
        if (selected === "all") url.searchParams.delete("type");
        else url.searchParams.set("type", selected);
        history.replaceState(null, "", url);
        apply();
      });
    }
    input.addEventListener("input", apply);
    apply();
  }

  function initCarousel() {
    const root = document.querySelector("[data-carousel]");
    if (!root) return;
    const track = root.querySelector("[data-track]");
    const slides = [...track.children];
    const previous = root.querySelector("[data-previous-card]");
    const next = root.querySelector("[data-next-card]");
    const position = root.querySelector("[data-position]");
    const pagination = root.querySelector("[data-pagination]");
    const detailRegion = document.querySelector("[data-card-detail-region]");
    const defaultDetail = document.createElement("template");
    if (detailRegion) {
      defaultDetail.innerHTML = detailRegion.innerHTML;
      detailRegion.dataset.detailKey = "default";
    }
    const detailTemplates = new Map([...document.querySelectorAll("template[data-card-detail-index]")]
      .map((template) => [Number(template.dataset.cardDetailIndex), template]));
    let current = 0;
    let raf = 0;
    let programmaticTarget = null;

    const update = (index) => {
      current = Math.max(0, Math.min(slides.length - 1, index));
      previous.disabled = current === 0;
      next.disabled = current === slides.length - 1;
      position.textContent = `${current + 1} / ${slides.length}`;
      slides.forEach((slide, slideIndex) => {
        const inactive = slideIndex !== current;
        slide.setAttribute("aria-hidden", String(inactive));
        slide.toggleAttribute("inert", inactive);
      });
      [...pagination.children].forEach((button, buttonIndex) => {
        button.toggleAttribute("aria-current", buttonIndex === current);
      });
      const activeButton = pagination.children[current];
      if (activeButton instanceof HTMLElement) {
        pagination.scrollTo({
          left: activeButton.offsetLeft - (pagination.clientWidth - activeButton.offsetWidth) / 2,
          behavior: reducedMotion.matches ? "auto" : "smooth"
        });
      }
      if (detailRegion) {
        const detailTemplate = detailTemplates.get(current);
        const detailKey = detailTemplate ? String(current) : "default";
        if (detailRegion.dataset.detailKey !== detailKey) {
          detailRegion.replaceChildren((detailTemplate ?? defaultDetail).content.cloneNode(true));
          detailRegion.dataset.detailKey = detailKey;
        }
      }
    };

    const moveTo = (index) => {
      const target = Math.max(0, Math.min(slides.length - 1, index));
      programmaticTarget = target;
      update(target);
      loadDeferredImage(slides[current].querySelector("[data-deferred-image]"));
      track.scrollTo({
        left: track.clientWidth * current,
        behavior: "auto"
      });
      requestAnimationFrame(() => {
        programmaticTarget = null;
        if (track.clientWidth) update(Math.round(track.scrollLeft / track.clientWidth));
      });
    };

    const releaseProgrammaticTarget = () => {
      programmaticTarget = null;
    };

    slides.forEach((_, index) => {
      const button = document.createElement("button");
      button.className = "page-dot";
      button.type = "button";
      button.setAttribute("aria-label", `${index + 1}번째 카드로 이동`);
      button.addEventListener("click", () => moveTo(index));
      pagination.append(button);
    });

    previous.addEventListener("click", () => moveTo(current - 1));
    next.addEventListener("click", () => moveTo(current + 1));
    track.addEventListener("scroll", () => {
      if (programmaticTarget !== null) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (track.clientWidth) update(Math.round(track.scrollLeft / track.clientWidth));
      });
    }, { passive: true });
    track.addEventListener("scrollend", () => {
      releaseProgrammaticTarget();
      if (track.clientWidth) update(Math.round(track.scrollLeft / track.clientWidth));
    });
    track.addEventListener("pointerdown", releaseProgrammaticTarget, { passive: true });
    track.addEventListener("wheel", releaseProgrammaticTarget, { passive: true });

    window.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping = target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      const isInteractive = target instanceof Element &&
        target.closest("a, button, input, textarea, select, [role='button'], [contenteditable='true']");
      if (isTyping || isInteractive || event.altKey || event.ctrlKey || event.metaKey) return;
      if (!["ArrowLeft", "ArrowRight", " ", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") moveTo(current - 1);
      if (event.key === "ArrowRight" || event.key === " ") moveTo(current + 1);
      if (event.key === "Home") moveTo(0);
      if (event.key === "End") moveTo(slides.length - 1);
    });
    update(0);
    if ("ResizeObserver" in window) {
      let previousWidth = track.clientWidth;
      const resizeObserver = new ResizeObserver(() => {
        const width = track.clientWidth;
        if (!width || width === previousWidth) return;
        previousWidth = width;
        const target = current;
        programmaticTarget = target;
        track.scrollTo({ left: width * target, behavior: "auto" });
        requestAnimationFrame(() => {
          programmaticTarget = null;
          update(target);
        });
      });
      resizeObserver.observe(track);
    }
  }

  function initShareButtons() {
    for (const button of document.querySelectorAll("[data-copy-link]")) {
      const label = button.querySelector("[data-copy-label]");
      let resetTimer = 0;

      button.addEventListener("click", async () => {
        clearTimeout(resetTimer);
        try {
          await navigator.clipboard.writeText(button.dataset.copyUrl);
          button.dataset.copyState = "copied";
          label.textContent = "복사됨";
        } catch {
          button.dataset.copyState = "failed";
          label.textContent = "복사 실패";
        }
        resetTimer = window.setTimeout(() => {
          delete button.dataset.copyState;
          label.textContent = "링크 복사";
        }, 1800);
      });
    }
  }

  initFilters();
  initCarousel();
  initDeferredImages();
  initShareButtons();
})();
