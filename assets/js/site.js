(() => {
  "use strict";
  const btn = document.querySelector(".menu-btn");
  const links = document.getElementById("nav-links");
  if (btn && links) {
    const setOpen = (open) => {
      links.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.classList.toggle("is-open", open);
    };
    btn.addEventListener("click", () => setOpen(!links.classList.contains("open")));
    links.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("open")) { setOpen(false); btn.focus(); }
    });
    const wide = window.matchMedia("(min-width:901px)");
    wide.addEventListener("change", (e) => e.matches && setOpen(false));
  }
})();
