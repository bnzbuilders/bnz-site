# -*- coding: utf-8 -*-
"""Shared head / nav / footer and the small components every page is built from.
Run `python3 _build/build.py` from the repo root to regenerate every page.
No dependencies beyond the standard library."""

SITE = "https://buildwithbnz.com"
BRAND = "BuildWithBNZ"
PITCH = ("Sara runs operations, Taylor reads the drawings and builds the estimate, and Emma builds and "
         "manages the subcontractor network. They connect to the contractor's existing files and business "
         "systems and work together inside one construction workspace.")
INBOX = "saracooper@bnzbuildersinc.com"
PHONE = "+1-332-258-1401"
PHONE_TXT = "1-332-258-1401"
UPDATED = "2026-09-17"

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,400..900'
         '&family=Space+Grotesk:wght@400;500;600;700&display=swap">')

NAV_ITEMS = [("/crew/", "The crew"), ("/how-it-works/", "How it works"), ("/faq/", "FAQ")]

MENU_PROBLEM = [
    ("t", "Estimating &amp; takeoff", "Taylor reads the package and builds the estimate with every assumption shown.",
     ("unknown", "Unknown when it should be"), "/construction-estimating-ai/"),
    ("e", "Subcontractor bidding &amp; buyout", "Emma builds the list, sends invitations, chases, levels.",
     ("waiting", "Waiting on — named"), "/subcontractor-procurement/"),
    ("s", "Operations &amp; approvals", "Sara runs Today, the queue and the Monday report.",
     ("verified", "Verified vs reported"), "/construction-project-management-ai/"),
    ("t", "Public work &amp; prevailing wage", "Wage schedules, addenda, bid forms, certified payroll docs handled by the book.",
     ("cross", "Cross-checked"), "/prevailing-wage-project-management/"),
]
MENU_CONTRACTOR = [
    ("General contractors", "/ai-for-general-contractors/"),
    ("Remodelers &amp; custom builders", "/commercial-construction-estimating/"),
    ("Specialty contractors", "/construction-bid-management/"),
    ("GCs bidding public work", "/prevailing-wage-project-management/"),
]

# ---------------------------------------------------------------- components

def chip(kind, text, dot=False):
    return '<span class="chip %s">%s%s</span>' % (kind, '<i class="dot"></i>' if dot else '', text)

def av(who, size=32, note=False):
    letter = {"s": "S", "t": "T", "e": "E"}[who]
    h = '<span class="av %s x%d" aria-hidden="true">%s</span>' % (who, size, letter)
    if note:
        h = '<div class="av-wrap">%s<div class="av-note">Placeholder — crew character</div></div>' % h
    return h

def btn_book(cls="btn primary", label="Book a project review"):
    return '<a class="%s" href="/book/">%s <span class="g">↗</span></a>' % (cls, label)

def head(title, desc, path, og_title=None, jsonld=None, noindex=False):
    canon = SITE + path
    og_title = og_title or title
    ld = ''
    if jsonld:
        ld = '<script type="application/ld+json">%s</script>' % jsonld
    robots = '<meta name="robots" content="noindex,follow">' if noindex else ''
    return '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<link rel="canonical" href="%(canon)s">
%(robots)s<meta name="theme-color" content="#0A0A0A">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BuildWithBNZ">
<meta property="og:title" content="%(og)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:url" content="%(canon)s">
<meta property="og:image" content="%(site)s/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="%(og)s">
<meta name="twitter:description" content="%(desc)s">
<meta name="twitter:image" content="%(site)s/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
%(fonts)s
<link rel="stylesheet" href="/assets/css/bnz.css">
%(ld)s</head>
<body>
<a class="skip" href="#main">Skip to content</a>
''' % dict(title=esc(title), desc=esc(desc), canon=canon, og=esc(og_title), site=SITE, fonts=FONTS, ld=ld, robots=robots)

def esc(s):
    return s.replace('&', '&amp;').replace('"', '&quot;').replace('&amp;amp;', '&amp;')

def nav(current=""):
    links = ''.join('<a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if h == current else '', t) for h, t in NAV_ITEMS)
    prob = ''.join(
        '<a class="row" href="%s">%s<div><b>%s</b><span>%s</span></div>%s</a>' % (href, av(who, 24), t, s, chip(c[0], c[1]))
        for who, t, s, c, href in MENU_PROBLEM)
    contr = ''.join('<a href="%s">%s</a>' % (h, t) for t, h in MENU_CONTRACTOR)
    mega = ('<div class="mega" role="menu">'
            '<div class="col"><h4 class="eyebrow mute">By problem</h4>%s</div>'
            '<div class="col list"><h4 class="eyebrow mute">By contractor</h4>%s</div>'
            '<div class="foot"><a href="/what-we-connect-to/">What we connect to →</a><a class="link" href="/book/">Book a project review ↗</a></div>'
            '</div>') % (prob, contr)
    drawer_prob = ''.join('<a href="%s">%s</a>' % (href, t) for _, t, _, _, href in MENU_PROBLEM)
    drawer_contr = ''.join('<a href="%s">%s</a>' % (h, t) for t, h in MENU_CONTRACTOR)
    drawer_links = ''.join('<a href="%s">%s</a>' % (h, t) for h, t in NAV_ITEMS)
    return '''<header class="nav">
<div class="wrap">
<a class="brand" href="/" aria-label="BuildWithBNZ home"><span class="mark">B</span>BuildWithBNZ</a>
<nav class="nav-links" aria-label="Primary">
<div class="has-menu"><button type="button" aria-haspopup="true" aria-expanded="false">Solutions <span class="car">▼</span></button>%(mega)s</div>
%(links)s
<a class="nav-login" href="/login/">Login</a>
</nav>
<a class="btn primary sm nav-cta" href="/book/">Book a project review <span class="g">↗</span></a>
<button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
</div>
<div class="drawer" id="drawer">
<details><summary>Solutions</summary><a href="/solutions/">All solutions</a>%(dprob)s%(dcontr)s<a href="/what-we-connect-to/">What we connect to</a></details>
%(dlinks)s
<a href="/login/">Login</a>
%(book)s
</div>
</header>
<main id="main">
''' % dict(mega=mega, links=links, dprob=drawer_prob, dcontr=drawer_contr, dlinks=drawer_links, book=btn_book())

def footer():
    return '''</main>
<footer>
<div class="wrap">
<div><a class="brand" href="/"><span class="mark">B</span>BuildWithBNZ</a><p class="addr" style="margin-top:10px">New York · <a href="mailto:%(inbox)s">%(inbox)s</a> · <a href="tel:%(phone)s">%(phone_txt)s</a></p></div>
<nav aria-label="Footer"><a href="/solutions/">Solutions</a><a href="/what-we-connect-to/">What we connect to</a><a href="/login/">Login</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav>
</div>
</footer>
<script src="/assets/js/bnz.js" defer></script>
</body>
</html>
''' % dict(inbox=INBOX, phone=PHONE, phone_txt=PHONE_TXT)

def section(cls, inner, id_=None, extra_cls=""):
    idattr = ' id="%s"' % id_ if id_ else ''
    return '<section class="%s %s"%s><div class="wrap">%s</div></section>\n' % (cls, extra_cls, idattr, inner)

def sec_head(eyebrow, h2, p=None, dark=True):
    return '<div class="sec-head fx"><span class="eyebrow%s">%s</span><h2>%s</h2>%s</div>' % (
        '' if dark else '', eyebrow, h2, '<p>%s</p>' % p if p else '')

def book_strip(dark=False):
    inner = ('<div class="split"><div class="fx"><span class="eyebrow">Start here</span>'
             '<h2 style="margin:14px 0 12px">Book a project review.</h2>'
             '<p class="lede">Bring one project. We\'ll show you what the crew would do with it.</p>'
             '<div style="margin-top:22px">%s</div></div>'
             '<div class="fx"><div class="cal-slot">Calendar embed — placeholder · Cal.com / Calendly · 30 min · "Project Review"<br>'
             '<span style="text-transform:none;letter-spacing:0;font-size:14px;display:block;margin-top:8px">Until the calendar is live, the form on the book page reaches a real person the same day.</span></div></div></div>') % btn_book()
    return section('light' if not dark else 'dark', inner, id_="book")

def faq_items(items, first_open=2):
    out = []
    for i, (q, a) in enumerate(items):
        out.append('<details%s><summary>%s <span class="pm">+</span></summary><div class="a">%s</div></details>' % (
            ' open' if i < first_open else '', q, a))
    return '<div class="faq">%s</div>' % ''.join(out)

FAQ = [
    ("What does it cost?",
     "Every engagement starts with a Project Review — a real call about one real project. We return scope and one set price, in writing, for that project. Price moves only if scope moves. After the first project the crew stays on under a separate monthly arrangement covering hosting, monitoring and new projects. There is no price list because there is no standard project."),
    ("How long until the crew is live on my project?",
     "The Project Review happens this week. Scope and price come back in writing within days. Once you approve, the crew is reading your package the same week. One real project sets the pace — nothing is connected until you pick it."),
    ("Who sees my drawings and my numbers?",
     "You, the people you name, and the crew working your project. Access is scoped per project — a company that engages us for one job does not open its whole Drive. We start with read access, and anything that leaves the workspace waits on your approval. Your files stay in your systems; nothing is moved or copied out to be trained on."),
    ("Does the AI send anything without me?",
     "No. Emma drafts bid invitations and follow-ups; Taylor drafts requests to the architect; Sara drafts the Monday report. Every send sits in your approvals queue until you approve, edit or send it back. The crew drafts. You decide."),
    ("Can it stamp drawings or act as my architect?",
     "No. Taylor reads drawings and specs, performs takeoffs, flags conflicts and, later, helps with markups and constructability review. Licensed, stamped design responsibility stays with your architect or engineer of record. Design-assist is not licensed design, and we keep that line visible."),
    ("What happens when Taylor doesn't have enough information?",
     "The line reads UNKNOWN, with the reason and who has the missing item — \"fixture schedule not in the set, request from architect.\" The estimate total is withheld until every UNKNOWN is resolved. Taylor never fills a gap with a guess."),
    ("What if I already tried AI or software and it didn't stick?",
     "Most of it asked you to move your work into a new tool and then left you to run it. We do the opposite: the crew works inside the folders, inbox and calendar you already use, and we stay responsible for it working under the ongoing arrangement. If a piece isn't earning its place after the first project, that comes out in the Monday report and we change it."),
    ("Do I have to move off Drive / Gmail / my folders?",
     "No. Keep your tools. The crew connects to Drive, Gmail, Calendar, Workspace and Notion with read access first, and works inside them. Nothing is migrated."),
]

INTEGRATIONS_TODAY = [
    ("drive", "Google Drive", "Taylor reads the drawing set, specs and addenda from your project folder. Read access first.", "t"),
    ("gmail", "Gmail", "Emma drafts bid invitations and follow-ups; nothing sends until you approve.", "e"),
    ("cal", "Google Calendar", "Sara holds the bid due date, COI expiries and quote promises against the week.", "s"),
    ("ws", "Google Workspace", "The estimate, scope document and Monday report land as files you own.", "s"),
    ("notion", "Notion", "Project notes and the sub network read and updated in place.", "e"),
]
INTEGRATIONS_NEXT = [
    ("P", "Procore", "Estimate lines will post to the job cost."),
    ("B", "Buildertrend", "Schedules and daily logs will sync both ways."),
    ("Q", "QuickBooks", "Approved sub invoices will flow to the books."),
    ("S", "Sage", "Job cost codes will map to estimate divisions."),
    ("Bb", "Bluebeam", "Markups will read into Taylor's takeoff."),
]
INTEGRATIONS_REQUEST = [
    ("Ps", "PlanSwift / STACK", "Existing takeoff files will import as Taylor's starting point."),
    ("D", "DocuSign", "Approved contracts will route for signature."),
    ("M", "Microsoft 365", "Outlook and OneDrive will work the way Gmail and Drive do today."),
    ("Dx", "Dropbox", "Project folders will read in place."),
    ("X", "Excel", "Estimates will export to your own sheets."),
]

ICONS = {
    "drive": '<svg viewBox="0 0 24 24"><path d="M8.2 3h7.6l6 10.4-3.8 6.6H6L2.2 13.4zM9 5 4.6 12.6h4.2L13.2 5zm2.6 8.6-2.1 3.6h8.4l2.1-3.6z"/></svg>',
    "gmail": '<svg viewBox="0 0 24 24"><path d="M3 5h18v2.2l-9 5.6-9-5.6zm0 4.6 9 5.6 9-5.6V19H3z"/></svg>',
    "cal": '<svg viewBox="0 0 24 24"><path d="M4 5h16v15H4zm2 5v8h12v-8zm1-7h2v3H7zm8 0h2v3h-2z"/></svg>',
    "ws": '<svg viewBox="0 0 24 24"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg>',
    "notion": '<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5zm3 4v8h2v-5l4 5h2V8h-2v5L10 8z"/></svg>',
}

def tile(icon, name, line, who=None, dim=False, next_=False):
    ic = ICONS.get(icon, icon)
    return '<div class="tile%s">%s<div class="ic" aria-hidden="true">%s</div><b>%s</b><span>%s</span>%s</div>' % (
        ' dim' if dim else '', chip("next", "Next") if next_ else '', ic, name, line, av(who, 20) if who else '')

def integrations(rows=3):
    """The conveyor (M7). rows=2 on the home page, 3 on the full section."""
    r1 = ''.join(tile(i, n, l, w) for i, n, l, w in INTEGRATIONS_TODAY)
    r2 = ''.join(tile(i, n, l, dim=True, next_=True) for i, n, l in INTEGRATIONS_NEXT)
    r3 = ''.join(tile(i, n, l, dim=True) for i, n, l in INTEGRATIONS_REQUEST[:4]) + \
         '<div class="tile dim"><div class="ic" aria-hidden="true">?</div><b>Don\'t see yours?</b><span>Bring it to the Project Review.</span></div>'
    labels = ("Connected today", "Next — future tense only", "On request")
    blocks = [r1, r2, r3]
    track = ''.join('<div class="row-label">%s</div><div class="tiles">%s</div>' % (labels[i], blocks[i]) for i in range(3))
    conv = '<div class="conveyor%s" aria-label="Systems the crew works inside"><div class="track">%s</div></div>' % (' two' if rows == 2 else '', track)
    static = '<div class="conv-static">%s</div>' % track
    note = '<p class="small muted" style="margin-top:18px">Icons are each system\'s own mark, monochrome. Nothing in the Next or On-request rows is live yet — those lines are written in the future tense on purpose.</p>'
    return conv + static + note

def sample_project_mock(strip=True):
    lines = ('[["ADDENDUM 02 RECEIVED · TAYLOR READING",["working","Working"]],'
             '["TAKEOFF MOVED 1,980 → 2,150 LF · VERIFIED AGAINST E-401",["verified","Verified"]],'
             '["EMMA · 2ND FOLLOW-UP SENT · HUDSON FEEDER CO.",["chasing","Chasing"]],'
             '["BID INVITATION DRAFTED · 4 SUBS · NEEDS YOU",["needs","Needs you"]],'
             '["SUB QUOTES 3 OF 7 IN · 1 LEVELLED",["levelled","Levelled"]],'
             '["MONDAY REPORT DRAFTED · VERIFIED FIRST",["verified","Verified"]]]')
    s = ('<div class="strip" data-lines=\'%s\'><span class="txt">ADDENDUM 02 RECEIVED · TAYLOR READING</span>%s</div>' % (lines, chip("working", "Working"))) if strip else ''
    return ('<div class="mock rows"><span class="sd">Sample data</span><div class="dots"><i></i><i></i><i></i></div>%s'
            '<div class="title">Rockland Mixed-Use · 38 Units</div><div class="sub">Public work · prevailing wage · bid due in 11 days</div>'
            '<div class="crew">%s%s%s</div>'
            '<div class="tabs"><b>Overview</b><span>Files</span><span>Estimate</span><span>Subcontractors</span><span>Activity</span></div>'
            '<div class="row"><div><b>Addendum 02 — new</b><span>Taylor: "Changed the electrical scope — reissuing as Rev 2."</span></div>%s</div>'
            '<div class="row"><div><b>Subcontractors</b><span>Emma: 7 invited · 3 quotes in · 2 chasing · 1 COI outstanding</span></div>%s</div>'
            '<div class="row needs"><div><b>Approve bid invitation to 4 electrical subs</b><span>Sara: "Drafted. Nothing sends without you."</span></div>%s</div>'
            '</div>') % (s, av("s", 24), av("t", 24), av("e", 24), chip("working", "Working", True), chip("verified", "Verified"), chip("needs", "Needs you"))

def monday_mock():
    return ('<div class="mock rows"><span class="sd">Sample data</span><div class="title">Monday report — week of Mar 9</div>'
            '<div class="kpis">'
            '<div class="kpi"><b class="count" data-count="2">0</b><span>Projects active</span></div>'
            '<div class="kpi"><b class="count" data-count="1">0</b><span>Estimate issued</span></div>'
            '<div class="kpi"><b class="count" data-count="3">0</b><span>Quotes collected</span></div>'
            '<div class="kpi needs"><b class="count" data-count="2">0</b><span>Waiting on you</span></div>'
            '<div class="kpi"><b class="count" data-count="4">0</b><span>Waiting on subs</span></div></div>'
            '<div class="line"><b>Waiting on subs:</b> Hudson Feeder Co. (quote), Valley Air &amp; Pipe (COI), Ramapo Rebar (W-9), Orangetown Pour (quote)</div>'
            '<div class="line"><b>Reported, not verified:</b> Addendum 03 rumoured per architect\'s office — unconfirmed.</div>'
            '</div>')
