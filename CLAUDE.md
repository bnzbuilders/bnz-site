# BNZ Builders INC — site + ops app

This repo is **one company's** website and internal ops app. It is not a generic
construction SaaS, not a template, and not a product for other contractors.

**BNZ Builders INC** is a New York State licensed and bonded general contractor:
commercial renovation, tenant fit-out, institutional / public works (OGS, DASNY,
OPWDD), site work, specialty trades under one contract, residential when it fits.

Promise: **built right, on time, on budget. The same PM who scopes the job runs
it to close-out. No hand-offs.**

Public contact: **1-332-258-1401** · office **bnzbuilders1@gmail.com** ·
PM **Sara Cooper, saracooper@bnzbuildersinc.com**

---

## Rules that never break

1. **Never mix job costs.** Every cost, RFQ, bill, and note belongs to exactly
   one project. There is no query in `src/lib/data.ts` that sums money across
   jobs, and there must never be one. A per-job total is fine; a company-wide
   "spend" number on a job-cost screen is not.
2. **Never invent dollar amounts.** A number goes in the app only if a document
   backs it — PO, receipt, invoice, written sub quote, or a cap a human set.
   `$0.00` and `—` are correct answers. A plausible-looking placeholder is not.
3. **Draft only until a human says SEND or APPROVE.** Agents write into the
   drafts queue. `ApprovalBar` is deliberately inert in this pass.
4. **Public pages stay marketing. `/app` pages stay ops.** No job costs, PO
   values, bidding numbers, bonding capacity, or financials on any public page.
5. **Stay in lane.** See the agent table below. An agent asked for work outside
   its lane hands it to the right teammate instead of doing it.

---

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (`src/app/globals.css`, CSS-variable theme)
- shadcn/ui conventions — primitives are hand-written in `src/components/ui`,
  `components.json` is present so `npx shadcn add ...` works
- Prisma + Postgres (`prisma/schema.prisma`)
- Auth: single office passcode, HMAC-signed cookie, `src/middleware.ts` guards
  `/app/*`. Web Crypto, not `node:crypto` — middleware runs on the edge runtime.

Money is stored as **integer cents** everywhere. Format with
`formatCents()` from `src/lib/money.ts`. Never store or pass floats.

---

## Routes

### Public (marketing) — `src/app/(site)`
| Route | What it is |
| --- | --- |
| `/` | Home — promise, scope, CTA |
| `/what-we-do` | Scope list by work type |
| `/process` | How a BNZ job runs, walk to close-out |
| `/projects` | Current work, **no dollars** |
| `/ops-suite` | Teaser naming Sara, Emma, Taylor. No live bidding numbers. |
| `/contact` | Request-estimate form → `EstimateRequest` table |

### Ops app (passcode) — `src/app/app`
| Route | What it is |
| --- | --- |
| `/app` | Sara's dashboard: live jobs, open estimates, RFQs waiting, unpaid bills, missing COIs |
| `/app/projects`, `/app/projects/[code]` | Per-job page: PO budget, posted cost, caps, ledger, notes |
| `/app/estimates` | Taylor's board |
| `/app/procurement` | RFQs, one job each |
| `/app/subs` | Subs + compliance docs (W-9, COIs) |
| `/app/books` | Emma's job-cost ledgers, one per job, and payables |
| `/app/inbox` | Inbox, drafts queue, website estimate requests |
| `/app/sara`, `/app/emma`, `/app/taylor` | Agent workspaces |
| `/login`, `/api/auth/{login,logout}` | Office passcode sign-in |

`index.html` and `CNAME` at the repo root are the **legacy static site** that
GitHub Pages currently serves for buildwithbnz.com. The Next build ignores them.
Do not delete them without a plan for the live domain.

---

## People and agent lanes (locked)

| Who | Role | Owns | Never |
| --- | --- | --- | --- |
| **Sara Cooper** | Project Manager / ops lead. Human PM + the Sara bot. | Projects, schedule, RFQ calls, client comms, inbox routing, approvals | Nothing sends without her SEND / APPROVE |
| **Emma** | Company Accountant + Subcontractor Outreach. Reports to Sara. | QuickBooks, receipts, job cost, bills, 1099s, W-9s, COI chase, sub status, drafts Sara's morning money email | Does not estimate. Does not do brand. |
| **Taylor** | Master Estimator. Reports to Sara. | Takeoff, unit rates, burden, prevailing wage, allowances, bid worksheet, go/no-go | Never a reckless lowball. Does not run books or sub outreach. |
| **Richard Lexington** | Collections / mechanic's lien only. | Nonpayment, demand letters, liens | **Never on the public marketing site.** |
| **Maryam** | Baxx Thobes / personal brand. | — | **Not part of this app at all.** |

Lane definitions live in `src/lib/agents.ts` and render through
`src/components/role-lock.tsx` at the top of every agent page.

Related: the standalone Emma / Taylor HTML bots live at
https://github.com/bilalmboost-ai/bnz-ai. Same names, same lanes.

---

## Live jobs (seed data)

Seeded by `prisma/seed.ts`. These are real jobs. Do not edit the numbers, and
do not add spend to either one without a receipt.

**VIENNA** — 545 Vienna Street, bathroom renovation, Finger Lakes
PO `OPD01-0000122954` · budget **$34,500.00**
Documented material: **E&T Plastics only, $5,428.50.** Nothing else posts to
Vienna until a new receipt is uploaded.

**MAYBROOK** — Indian Trail, CMM IRA patch and paint
PO `OPD01-0000123175` · budget **$17,900.00**
Posted materials: **$0.00.** First paint/protection buy is capped at **$2,500.00**.
Occupied house. ProMar 200 Zero VOC. Colors locked by the owner. Do not invent
paint buys.

---

## Integrations

`src/lib/integrations/` holds **stubs only** — QuickBooks, Gmail, SMS. Each
throws `NotWiredError` when called, so an unfinished wire-up fails loudly
instead of silently pretending to send. Do not connect a real account without a
human doing the OAuth and saying so.

---

## Working in this repo

```bash
npm run dev         # http://localhost:3000
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm run db:migrate  # prisma migrate dev
npm run db:seed     # reload the two live jobs
```

Before pushing: `npm run typecheck && npm run build`.
