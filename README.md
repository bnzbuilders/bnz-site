# BNZ Builders INC — website + ops app

Public marketing site and the internal ops app for **BNZ Builders INC**, a New
York State licensed and bonded general contractor.

- Public pages: home, what we do, process, projects, contact, ops-suite teaser.
- `/app`: passcode-protected ops app — dashboard, projects, estimates,
  procurement, subs + compliance, books / job cost, inbox & drafts, and the
  three agent workspaces (Sara, Emma, Taylor).

Read [CLAUDE.md](./CLAUDE.md) before changing anything. It holds the rules that
never break — most importantly: **never mix job costs, never invent dollar
amounts, nothing sends without a human.**

## Requirements

- Node 20+ (built on Node 22)
- PostgreSQL 14+ running locally

## Install

```bash
npm install
cp .env.example .env
```

Then edit `.env`:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/bnz_ops?schema=public"
APP_PASSCODE="pick-something"        # sign-in for /app
APP_SESSION_SECRET="pick-something"  # signs the session cookie
```

Create the database if you do not have one:

```bash
createdb bnz_ops
```

## Migrate and seed

```bash
npm run db:migrate   # apply migrations (prisma migrate dev)
npm run db:seed      # load the two live jobs: VIENNA and MAYBROOK
```

`npm run db:reset` wipes and re-seeds. Only safe while the data is seed data.

## Start

```bash
npm run dev          # http://localhost:3000
```

Sign in to the ops app at `http://localhost:3000/app` with `APP_PASSCODE`.

Production:

```bash
npm run build
npm run start
```

## Other commands

| Command | What it does |
| --- | --- |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:studio` | Prisma Studio |
| `npm run db:deploy` | `prisma migrate deploy` (non-interactive, for servers) |

## What is deliberately not wired

- **QuickBooks, Gmail, SMS** are stubs in `src/lib/integrations/`. They throw
  rather than pretend. A human connects the real accounts.
- **Approve / Send** buttons in the app are inert. Nothing reaches a client, a
  sub, or the books until someone wires the integration *and* presses them.
- Estimate totals, RFQ quotes, and bills are empty because no document backs
  them yet. Empty is the correct display.

## Legacy static site

`index.html` and `CNAME` at the repo root are the current GitHub Pages site for
buildwithbnz.com. The Next.js build ignores them; they are left in place so the
live domain keeps serving while the new site is finished.
