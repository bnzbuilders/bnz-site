# Integration stubs

Nothing here talks to a live service. Each module has the shape the real
integration will have and throws `NotWiredError` when called, so an unfinished
wire-up fails loudly instead of silently pretending to send.

Wire-up order when the office is ready:

1. `gmail.ts` — read the office inbox, create drafts. Drafts only. Sending
   still requires a human pressing Send in the app.
2. `quickbooks.ts` — pull bills, vendors, and job-cost actuals for Emma.
3. `sms.ts` — sub reminders. Last, and opt-in only.
