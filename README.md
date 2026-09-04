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

## Deploying it live

The app needs two things a static host cannot give it: a Node server and a
Postgres database. Think of it like a jobsite — the site itself (Vercel) and the
utility hookup (Postgres). Both have to be there before anyone can work.

### 1. Database

Create a Postgres database with any hosted provider (Neon, Supabase, and Railway
all have a free tier). Copy the connection string it gives you.

### 2. Host

Import this repo on Vercel (or Render / Railway — anything that runs Node 20+).
Set these environment variables in the host's dashboard:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | the connection string from step 1 |
| `APP_PASSCODE` | the office sign-in code for `/app` |
| `APP_SESSION_SECRET` | any long random string |

On Vercel the `vercel-build` script runs migrations automatically on every
deploy. On another host, run `npm run db:deploy` after the build.

### 3. Seed the two jobs, once

With `DATABASE_URL` pointed at the live database:

```bash
npm run db:seed
```

### 4. Domain

`buildwithbnz.com` currently serves the legacy `index.html` from GitHub Pages.
Two options, pick one:

- **Safe:** point a subdomain such as `app.buildwithbnz.com` at the new host and
  leave the live site alone until the new marketing pages are approved.
- **Cutover:** move `buildwithbnz.com` to the new host, then delete `index.html`
  and `CNAME` from this repo.

Leave `QUICKBOOKS_*`, `GMAIL_*`, and `SMS_*` unset. Those integrations are stubs
and setting the variables does not connect anything.
