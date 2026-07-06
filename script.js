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
