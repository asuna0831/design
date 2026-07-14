const cursorDot = document.querySelector(".cursor-dot");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

window.addEventListener("pointermove", (event) => {
  if (!cursorDot) return;
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorDot.style.opacity = "1";
});

document.querySelectorAll("a, button, .project-card").forEach((item) => {
  item.addEventListener("pointerenter", () => {
    if (!cursorDot) return;
    cursorDot.style.transform = "translate(-50%, -50%) scale(1.7)";
  });

  item.addEventListener("pointerleave", () => {
    if (!cursorDot) return;
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const heroSheepZone = document.querySelector(".hero-sheep-zone");

if (heroSheepZone) {
  const heroSheepNote = heroSheepZone.querySelector(".hero-sheep-note");
  const heroSheepVisual = heroSheepZone.querySelector(".hero-sheep-visual");
  const heroSheepSvg = heroSheepZone.querySelector(".hero-sheep-svg");
  const sheepNotes = [
    { text: "Based in Toronto", theme: "toronto" },
    { text: "Designing with curiosity & care", theme: "care" },
  ];
  let sheepNoteIndex = 0;
  let sheepNoteTimer;

  if (heroSheepSvg) {
    heroSheepSvg.addEventListener("animationend", () => {
      heroSheepSvg.classList.remove("is-jumping");
    });
  }

  if (heroSheepVisual) {
    heroSheepVisual.addEventListener("animationend", () => {
      heroSheepVisual.classList.remove("is-hinting");
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      window.setTimeout(() => {
        heroSheepVisual.classList.add("is-hinting");
      }, 1150);
    }
  }

  heroSheepZone.addEventListener("click", () => {
    if (!heroSheepNote) return;

    const note = sheepNotes[sheepNoteIndex];
    sheepNoteIndex = (sheepNoteIndex + 1) % sheepNotes.length;

    window.clearTimeout(sheepNoteTimer);
    heroSheepZone.classList.remove("is-visible");
    void heroSheepZone.offsetWidth;

    heroSheepNote.textContent = note.text;
    heroSheepNote.dataset.noteTheme = note.theme;
    heroSheepZone.classList.add("is-visible");

    if (heroSheepSvg) {
      heroSheepSvg.classList.remove("is-jumping");
      void heroSheepSvg.offsetWidth;
      heroSheepSvg.classList.add("is-jumping");
    }

    sheepNoteTimer = window.setTimeout(() => {
      heroSheepZone.classList.remove("is-visible");
    }, 2200);
  });
}

document.querySelectorAll(".artfac-iteration-carousel").forEach((carousel) => {
  const track = carousel.querySelector(".iteration-track");
  const slides = Array.from(carousel.querySelectorAll(".artfac-iteration-slide"));
  const status = carousel.querySelector(".carousel-status");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");

  if (!track || !slides.length || !status || !prevButton || !nextButton) return;

  const updateStatus = () => {
    const trackLeft = track.getBoundingClientRect().left;
    const activeIndex = slides.reduce((closestIndex, slide, index) => {
      const currentDistance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      const closestDistance = Math.abs(slides[closestIndex].getBoundingClientRect().left - trackLeft);
      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);

    status.textContent = `${activeIndex + 1} / ${slides.length}`;
  };

  const scrollToSlide = (direction) => {
    const trackLeft = track.getBoundingClientRect().left;
    const activeIndex = slides.reduce((closestIndex, slide, index) => {
      const currentDistance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      const closestDistance = Math.abs(slides[closestIndex].getBoundingClientRect().left - trackLeft);
      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);
    const nextIndex = Math.max(0, Math.min(slides.length - 1, activeIndex + direction));

    slides[nextIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  prevButton.addEventListener("click", () => scrollToSlide(-1));
  nextButton.addEventListener("click", () => scrollToSlide(1));
  track.addEventListener("scroll", () => window.requestAnimationFrame(updateStatus), { passive: true });
  updateStatus();
});

const moodCards = document.querySelectorAll("[data-mood-card]");

moodCards.forEach((card) => {
  card.addEventListener("click", () => {
    moodCards.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });

    card.classList.add("is-active");
    card.setAttribute("aria-pressed", "true");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector(".linklog-youtube-embed");
  if (!iframe) return;

  const videoId = "4pdArOaAwHs";
  const origin = encodeURIComponent(window.location.origin);
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&origin=${origin}`;
});

// Print strip: pick up / print again
(() => {
  const root = document.querySelector(".print-strip");
  if (!root) return;

  const button = root.querySelector(".print-strip-button");
  if (!button) return;

  const restartAnimation = (element) => {
    if (!element) return;
    element.style.animation = "none";
    void element.offsetHeight;
    element.style.animation = "";
  };

  button.addEventListener("click", () => {
    const isPicked = root.classList.toggle("is-picked");
    button.textContent = isPicked ? "Print again ↺" : "Pick up →";

    if (!isPicked) {
      restartAnimation(root.querySelector(".print-strip-window"));
      restartAnimation(root.querySelector(".print-strip-paper"));
      restartAnimation(root.querySelector(".print-strip-develop"));
    }
  });
})();

// Toronto Cupcake: accessible in-page zoom for audit and wireframe evidence.
(() => {
  const dialog = document.querySelector(".cupcake-image-dialog");
  if (!dialog) return;

  const image = dialog.querySelector(".cupcake-image-dialog-image");
  const closeButton = dialog.querySelector(".cupcake-image-dialog-close");
  const triggers = Array.from(document.querySelectorAll(".cupcake-image-zoom-trigger"));

  if (!image || !closeButton || !triggers.length) return;

  let lastTrigger = null;
  let lastScrollY = 0;
  let previousScrollBehavior = "";

  const openDialog = (trigger) => {
    const fallbackImage = trigger.querySelector("img");
    const src = trigger.dataset.zoomSrc || fallbackImage?.getAttribute("src");
    const alt = trigger.dataset.zoomAlt || fallbackImage?.getAttribute("alt") || "";

    if (!src) return;

    lastTrigger = trigger;
    lastScrollY = window.scrollY;
    previousScrollBehavior = document.documentElement.style.scrollBehavior;
    image.src = src;
    image.alt = alt;

    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.classList.add("cupcake-zoom-open");
    document.body.classList.add("cupcake-zoom-open");

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    closeButton.focus();
  };

  const closeDialog = () => {
    if (dialog.open && typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
      dialog.dispatchEvent(new Event("close"));
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openDialog(trigger));
  });

  closeButton.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  dialog.addEventListener("close", () => {
    const restoreScrollY = lastScrollY;
    const triggerToRestore = lastTrigger;

    image.removeAttribute("src");
    image.alt = "";
    document.documentElement.classList.remove("cupcake-zoom-open");
    document.body.classList.remove("cupcake-zoom-open");
    window.scrollTo(0, restoreScrollY);

    window.requestAnimationFrame(() => {
      window.scrollTo(0, restoreScrollY);

      if (triggerToRestore) {
        try {
          triggerToRestore.focus({ preventScroll: true });
        } catch {
          triggerToRestore.focus();
          window.scrollTo(0, restoreScrollY);
        }
      }

      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    });
  });
})();
