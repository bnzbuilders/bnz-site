/**
 * BuildWithBNZ — lead intake Worker (Cloudflare Workers, paste-deployable, no build).
 *
 * The /book form on buildwithbnz.com POSTs here. The Worker:
 *   1. validates the submission (honeypot, required fields, email shape)
 *   2. creates a row in the "Project Review requests" Notion database
 *   3. emails the inquiries inbox ("New inquiry — Project Review: <company>")
 *   4. answers JSON (fetch path) or 303-redirects to /thanks/ (no-JS path)
 *
 * Secrets / vars (Worker → Settings → Variables):
 *   NOTION_TOKEN        secret  — internal integration token from the COMPANY Notion workspace
 *                                 (saracooper@bnzbuildersinc.com), integration "BNZ Website Leads"
 *   NOTION_PARENT_PAGE  var     — page ID the integration is shared with; used once by GET /setup
 *   NOTION_DB_ID        var     — database ID returned by /setup (paste it in after the first run)
 *   NOTIFY_TO           var     — saracooper@bnzbuildersinc.com
 *   RESEND_API_KEY      secret  — optional; if unset the email goes through FormSubmit's relay instead
 *   SETUP_KEY           secret  — any long random string; required to call /setup
 *
 * Then set LEAD_ENDPOINT in assets/js/bnz.js to this Worker's URL and set the
 * <form action> on /book to the same URL. Nothing else on the site changes.
 */

const ALLOW_ORIGINS = ['https://buildwithbnz.com', 'https://www.buildwithbnz.com'];
const STAGES = ['New lead', 'Contacted', 'Call booked', 'Demo completed', 'Proposal sent', 'Payment pending', 'Won', 'Project active', 'Project complete', 'Lost'];

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method === 'GET' && url.pathname === '/setup') return setup(url, env);
    if (req.method === 'GET') return json({ ok: true, service: 'bnz-lead-intake' }, 200, cors);
    if (req.method !== 'POST') return json({ error: 'method' }, 405, cors);

    // ---- parse (JSON from the site script, or a plain form post) ----
    let data = {};
    const ct = req.headers.get('Content-Type') || '';
    try {
      if (ct.includes('application/json')) data = await req.json();
      else { const fd = await req.formData(); fd.forEach((v, k) => { data[k] = String(v); }); }
    } catch (e) { return json({ error: 'bad body' }, 400, cors); }
    const wantsJson = ct.includes('application/json') || (req.headers.get('Accept') || '').includes('application/json');

    // ---- validate ----
    if (data._honey) return wantsJson ? json({ ok: true }, 200, cors) : redirect('/thanks/');
    const name = clean(data.name, 120), company = clean(data.company, 160), email = clean(data.email, 200);
    const phone = clean(data.phone, 60), type = clean(data.contractor_type, 60), project = clean(data.project, 4000);
    const bidDue = clean(data.bid_due, 20), files = clean(data.files_link, 500), source = clean(data.source, 200);
    if (!name || !company || !email || !project || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return wantsJson ? json({ error: 'missing fields' }, 422, cors) : redirect('/book/?error=fields');
    }

    // ---- 1. Notion row ----
    const notion = { ok: false, id: null, err: null };
    if (env.NOTION_TOKEN && env.NOTION_DB_ID) {
      const props = {
        'Company': { title: [{ text: { content: company } }] },
        'Contact': { rich_text: [{ text: { content: name } }] },
        'Email': { email: email },
        'Stage': { select: { name: 'New lead' } },
        'Project': { rich_text: [{ text: { content: project.slice(0, 2000) } }] },
        'Source page': { rich_text: [{ text: { content: source || '/book/' } }] },
      };
      if (phone) props['Phone'] = { phone_number: phone };
      if (type) props['Contractor type'] = { select: { name: type } };
      if (bidDue && /^\d{4}-\d{2}-\d{2}$/.test(bidDue)) props['Bid due'] = { date: { start: bidDue } };
      if (files && /^https?:\/\//.test(files)) props['Files link'] = { url: files };
      const r = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST', headers: notionHeaders(env),
        body: JSON.stringify({ parent: { database_id: env.NOTION_DB_ID }, properties: props,
          children: [{ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: project.slice(0, 2000) } }] } }] }),
      });
      notion.ok = r.ok; if (r.ok) notion.id = (await r.json()).id; else notion.err = (await r.text()).slice(0, 300);
    } else { notion.err = 'NOTION_TOKEN / NOTION_DB_ID not set'; }

    // ---- 2. email ----
    const to = env.NOTIFY_TO || 'saracooper@bnzbuildersinc.com';
    const subject = 'New inquiry — Project Review: ' + company;
    const lines = [
      'Contact: ' + name, 'Company: ' + company, 'Email: ' + email, 'Phone: ' + (phone || '—'),
      'Contractor type: ' + (type || '—'), 'Bid due: ' + (bidDue || '—'), 'Files: ' + (files || '—'),
      'Source page: ' + (source || '/book/'), '', 'Project:', project, '',
      notion.ok ? 'Notion row: https://www.notion.so/' + notion.id.replace(/-/g, '') : 'Notion row: NOT written (' + notion.err + ')',
    ];
    const mail = { ok: false, err: null };
    if (env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST', headers: { 'Authorization': 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: env.MAIL_FROM || 'BuildWithBNZ <leads@buildwithbnz.com>', to: [to], reply_to: email, subject, text: lines.join('\n') }),
      });
      mail.ok = r.ok; if (!r.ok) mail.err = (await r.text()).slice(0, 300);
    } else {
      // no key: FormSubmit relay (activated once from the inbox)
      const r = await fetch('https://formsubmit.co/ajax/' + to, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: subject, _template: 'table', _replyto: email, name, company, email, phone, contractor_type: type, bid_due: bidDue, files_link: files, source, project, notion: notion.ok ? 'written' : 'not written' }),
      });
      mail.ok = r.ok; if (!r.ok) mail.err = (await r.text()).slice(0, 300);
    }

    if (!notion.ok && !mail.ok) {
      // both paths failed: tell the browser so it falls back to mailto
      return wantsJson ? json({ error: 'relay failed', notion: notion.err, mail: mail.err }, 502, cors) : redirect('/book/?error=relay');
    }
    return wantsJson ? json({ ok: true, notion: notion.ok, mail: mail.ok }, 200, cors) : redirect('/thanks/');
  },
};

// ---- one-time: create the database under the shared parent page ----
async function setup(url, env) {
  if (!env.SETUP_KEY || url.searchParams.get('key') !== env.SETUP_KEY) return json({ error: 'forbidden' }, 403);
  if (!env.NOTION_TOKEN || !env.NOTION_PARENT_PAGE) return json({ error: 'NOTION_TOKEN and NOTION_PARENT_PAGE required' }, 400);
  const body = {
    parent: { type: 'page_id', page_id: env.NOTION_PARENT_PAGE },
    title: [{ type: 'text', text: { content: 'Project Review requests' } }],
    properties: {
      'Company': { title: {} },
      'Contact': { rich_text: {} },
      'Email': { email: {} },
      'Phone': { phone_number: {} },
      'Contractor type': { select: { options: ['General contractor', 'Remodeler / custom builder', 'Specialty contractor', 'GC bidding public work', 'Other'].map(n => ({ name: n })) } },
      'Stage': { select: { options: STAGES.map((n, i) => ({ name: n, color: i === 0 ? 'orange' : i === 6 || i === 7 ? 'green' : i === 9 ? 'gray' : 'default' })) } },
      'Project': { rich_text: {} },
      'Bid due': { date: {} },
      'Files link': { url: {} },
      'Source page': { rich_text: {} },
      'Owner': { people: {} },
      'Submitted': { created_time: {} },
    },
  };
  const r = await fetch('https://api.notion.com/v1/databases', { method: 'POST', headers: notionHeaders(env), body: JSON.stringify(body) });
  const t = await r.text();
  if (!r.ok) return json({ error: 'notion', detail: t.slice(0, 500) }, 502);
  const id = JSON.parse(t).id;
  return json({ ok: true, NOTION_DB_ID: id, next: 'Paste NOTION_DB_ID into the Worker variables, then redeploy.' });
}

function notionHeaders(env) {
  return { 'Authorization': 'Bearer ' + env.NOTION_TOKEN, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' };
}
function clean(v, n) { return (v == null ? '' : String(v)).replace(/[ --]/g, '').trim().slice(0, n); }
function corsHeaders(origin) {
  const o = ALLOW_ORIGINS.includes(origin) ? origin : ALLOW_ORIGINS[0];
  return { 'Access-Control-Allow-Origin': o, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept', 'Vary': 'Origin' };
}
function json(obj, status, extra) { return new Response(JSON.stringify(obj), { status: status || 200, headers: Object.assign({ 'Content-Type': 'application/json' }, extra || {}) }); }
function redirect(path) { return new Response(null, { status: 303, headers: { 'Location': 'https://buildwithbnz.com' + path } }); }
