# Lead intake plumbing — /book → Notion + email

Today the /book form relays straight to **saracooper@bnzbuildersinc.com** through
FormSubmit (no server). This folder holds the next step: a Cloudflare Worker
that also writes every submission into a Notion database in the company
workspace and emails the inbox. The site changes in exactly two places when
the Worker is live.

## Setup (≈15 minutes, done from the saracooper@bnzbuildersinc.com accounts)

1. **Notion integration.** notion.so/my-integrations → New integration →
   name `BNZ Website Leads`, workspace = the company workspace, capabilities:
   insert content, read content. Copy the **Internal Integration Secret**.
2. **Parent page.** Create a page in that workspace called `Leads` (or reuse
   one). Page menu ··· → Connections → add `BNZ Website Leads`. Copy the page
   ID (the 32 hex characters at the end of the page URL).
3. **Worker.** dash.cloudflare.com → Workers & Pages → Create → name
   `bnz-lead-intake` → Edit code → paste `lead-intake.worker.js` → Deploy.
   Settings → Variables and secrets:
   - `NOTION_TOKEN` (secret) = the integration secret
   - `NOTION_PARENT_PAGE` (text) = the page ID
   - `NOTIFY_TO` (text) = `saracooper@bnzbuildersinc.com`
   - `SETUP_KEY` (secret) = any long random string
   - optional `RESEND_API_KEY` (secret) + `MAIL_FROM` if you want the email
     sent from leads@buildwithbnz.com instead of through FormSubmit's relay
4. **Create the database once.** Open
   `https://bnz-lead-intake.<account>.workers.dev/setup?key=<SETUP_KEY>` —
   it creates "Project Review requests" under the Leads page with the
   pipeline stages (New lead → Contacted → Call booked → Demo completed →
   Proposal sent → Payment pending → Won → Project active → Project complete
   → Lost) and returns `NOTION_DB_ID`. Paste that as a text variable and
   redeploy.
5. **Point the site at it.** In `assets/js/bnz.js` set
   `LEAD_ENDPOINT = 'https://bnz-lead-intake.<account>.workers.dev'` and in
   `_build/content_pages.py` `lead_form()` set the `<form action>` to the same
   URL. `python3 _build/build.py`, commit.
6. **Test.** Submit /book once. Expect: a row in Notion at stage New lead,
   an email in the inbox with the Notion link, the browser on /thanks.

## What the Worker does not do

- Hold a key in the browser. The site only ever knows the Worker URL.
- Store anything itself. Notion is the record; the email is the ping.
- Run any AI. This is intake only. The workspace (drop two) is separate.
