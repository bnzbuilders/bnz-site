(() => {
  "use strict";
  const WORKER = document.documentElement.dataset.worker || window.BNZ_WORKER;
  async function start(planId, btn) {
    const original = btn.textContent;
    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");
    btn.textContent = "Opening Stripe…";
    try {
      const res = await fetch(`${WORKER}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) { window.location.assign(data.url); return; }
      throw new Error(data.error || `Checkout is unavailable right now (${res.status}).`);
    } catch (err) {
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
      btn.textContent = original;
      const foot = btn.closest(".plan-foot") || btn.parentElement;
      let note = foot.querySelector(".checkout-err");
      if (!note) {
        note = document.createElement("p");
        note.className = "checkout-err";
        note.setAttribute("role", "alert");
        foot.appendChild(note);
      }
      note.textContent = (err.message === "Failed to fetch"
        ? "Could not reach checkout. Check your connection and try again."
        : err.message) + " You can also email us and we will send a payment link.";
    }
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-checkout]");
    if (!btn) return;
    e.preventDefault();
    start(btn.dataset.checkout, btn);
  });
})();
