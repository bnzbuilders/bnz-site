# BuildWithBNZ — site status (drop one, 17 Sep 2026)

Format: WORKING · PARTIAL · BROKEN · NOT BUILT. Everything below was checked
in the built tree (`python3 _build/check.py` → 0 failures; headless Chromium
at 1440 and 390; console clean).

## WORKING

- **Marketing site, 24 generated pages** on the project-based model: home,
  /solutions, /crew, /sara /taylor /emma, /how-it-works,
  /what-we-connect-to, /faq, /book, /thanks, /privacy, /terms, /contact, 404, and seven problem-based SEO landers
  (/construction-estimating-ai, /subcontractor-procurement,
  /construction-bid-management, /construction-project-management-ai,
  /ai-for-general-contractors, /commercial-construction-estimating,
  /prevailing-wage-project-management).
- **No prices, plans, tiers, monthly figures, checkout or Stripe anywhere** on
  the generated pages — enforced by `_build/check.py`, which fails the build
  on any of that language, on model names, or on "Get started".
- **Only conversion is BOOK A PROJECT REVIEW.** Nav, hero, every section
  end, footer. No login anywhere — the crew is installed into the
  contractor's own systems, so there is no customer portal to log into
  (Jose, 17 Sep). /login redirects home.
- **Crew characters from the character sheet** (18 Sep): Sara plate-with-window,
  Taylor set square, Emma bracket, as one inline SVG sprite per page. Static
  at avatar sizes (nav menu, mocks, tiles, 64 px cards); animated (float,
  glint, facet pulse + each one's own motion — Sara's bar seating, Taylor's
  trace, Emma's dock) on the crew cards, the agent-page heroes and the
  how-they-work-together diagram. Reduced motion swaps to the static marks.
- **Solutions ▾ mega-menu** (M9): by problem → the four solutions, by
  contractor → the four landers; keyboard reachable, Esc closes. Mobile
  drawer with a Solutions accordion.
- **Motion system, per the MOTION board:** M1 hero strip types through the
  six system events and drops the chip; M2 crew cards stagger, Sara lands
  last and forward; M3 six-step numerals count up; M4 every SAMPLE DATA mock
  reveals row by row; M5 Monday-report counters; M6 Solutions cards stack
  with a UI moment each (Basis types itself · quote arrives and re-levels ·
  Reported → Verified · wage schedule verifies); M7 integrations waterfall —
  Beam-style brick rows of tiles drifting down through a masked window,
  hover pauses, loops seamlessly; M8 FAQ accordion. Every entrance
  fires once at 20 % in view. `prefers-reduced-motion` turns all of it into
  the final frame — checked.
- **Lead form on /book** posts to FormSubmit → **saracooper@bnzbuildersinc.com**
  with subject "New inquiry — Project Review: <company>", then lands on
  /thanks. JS path uses the AJAX endpoint; no-JS path posts the plain form.
  If the relay is unreachable the visitor's mail client opens with the
  fields pre-filled, so no request is lost. Honeypot field, no captcha.
- **SEO:** one H1 per page, Open Graph + Twitter tags and a canonical on
  every generated page, `og.png` 1200×630, Organization + WebSite JSON-LD
  on the home page, FAQPage JSON-LD on /faq, full `sitemap.xml` (incl. the legacy pages), `robots.txt` fixed (only /thanks disallowed).
- **Generator:** `_build/build.py` regenerates everything from
  `_build/content_*.py` + `_build/shared.py`; `_build/check.py` sweeps links,
  orphans, language and tags. No build step for hosting — GitHub Pages
  serves the committed HTML.

## PARTIAL

- **Form activation.** FormSubmit sends a one-time confirmation email to
  saracooper@bnzbuildersinc.com on the first submission. Until someone in
  that inbox clicks it, submissions are held by FormSubmit, not lost.
  Action: submit the form once, click the email.
- **Notion + email plumbing.** Requested 17 Sep: every submission also
  creates a row in a Notion database and pings the inbox. Designed as a
  Cloudflare Worker (Notion token as a Worker secret; the site's one
  constant `LEAD_ENDPOINT` in `assets/js/bnz.js` swaps to the Worker URL).
  Code and setup steps are in `_plumbing/` (Worker + README). Not deployed
  yet — needs a Notion integration token created from the saracooper
  workspace and a Cloudflare Worker; ~15 minutes, steps in the README.
- **Calendar embed** on /book and the book strip is a labelled placeholder
  (Cal.com / Calendly undecided). The form is the booking route today.
- **Proof section** carries three labelled metric slots — Bilal to supply
  the one real NY project and confirm every number is from the record.
- **Legacy BNZ Builders pages** (/about /services /public-works /credentials
  /careers /subcontract /work /capability-statement) are untouched (brand
  split undecided). They keep their own light IBM Plex design and nav;
  their `/#pricing` links now point to /book and their og:image to og.png.
  They are in the sitemap at low priority.
- **Footer address** reads "New York" only — full address pending Bilal's
  call on which entity the site publishes.

## BROKEN

- Nothing known. Console clean on every page at both widths.

## NOT BUILT

- The product workspace (Group B: Today, Projects, Files, Estimate,
  Subcontractors, Ask the crew, Approvals, Monday report, Admin pipeline).
  Backend infrastructure paused by Jose on 17 Sep.
- Real integrations. The "connected today" row describes the product; no
  OAuth exists yet.

## Deleted from the repo

`assets/js/checkout.js` (two Stripe test Payment Links), `paid.html`,
`waitlist.html`, `assets/css/site.css` + `components.css` + `motion.css`,
`assets/js/site.js` + `motion.js`, `og.svg`. `/architecture/` is now a
redirect to /how-it-works/.

## Decisions still open (carried as labelled placeholders)

1. Brand split — legacy BNZ Builders pages stay on the domain or move.
2. Booking tool — Cal.com, Calendly, or form-only.
3. The one real proof project — Bilal confirms the numbers.
4. Taylor's pronoun — site uses "she" throughout (matches the mockup;
   01-crew-character-prompt.md says "he").
