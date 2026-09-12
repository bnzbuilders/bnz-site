(() => {
  "use strict";

  // Stripe Payment Links, one per plan. These work with no backend deployed.
  // When the workspace worker is live, clear these (or set data-worker on <html>
  // and delete this map) and the server-side checkout below takes over again.
  const LINKS = {
    starter:  "https://buy.stripe.com/test_7sYeV61gX72A4wR4o1bZe00",
    business: "https://buy.stripe.com/test_dRmdR28Jp72AaVf1bPbZe01",
  };

  const WORKER = document.documentElement.dataset.worker || window.BNZ_WORKER;

  function showError(btn, message) {
    const foot = btn.closest(".plan-foot") || btn.parentElement;
    let note = foot.querySelector(".checkout-err");
    if (!note) {
      note = document.createElement("p");
      note.className = "checkout-err";
      note.setAttribute("role", "alert");
      foot.appendChild(note);
    }
    note.textContent = message;
  }

  async function start(planId, btn) {
    // Fast path: a Payment Link needs no round trip.
    const link = LINKS[planId];
    if (link) {
      btn.disabled = true;
      btn.setAttribute("aria-busy", "true");
      btn.textContent = "Opening Stripe…";
      window.location.assign(link);
      return;
    }

    if (!WORKER) {
      showError(btn, "Checkout isn't connected yet. Email us and we will send a payment link.");
      return;
    }

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
      showError(btn, (err.message === "Failed to fetch"
        ? "Could not reach checkout. Check your connection and try again."
        : err.message) + " You can also email us and we will send a payment link.");
    }
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-checkout]");
    if (!btn) return;
    e.preventDefault();
    start(btn.dataset.checkout, btn);
  });
})();
