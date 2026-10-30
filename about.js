(() => {
  const accordion = document.querySelector("[data-about-qa]");
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll(".about-qa-item"));

  const setExpanded = (item, expanded) => {
    const trigger = item.querySelector(".about-qa-trigger");
    const panel = item.querySelector(".about-qa-panel");
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", String(expanded));
    panel.hidden = !expanded;
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".about-qa-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
      items.forEach((candidate) => setExpanded(candidate, false));
      if (shouldOpen) setExpanded(item, true);
    });
  });
})();
