# -*- coding: utf-8 -*-
from shared import *
from content_home import hero, crew_cards, steps_grid, STEPS, CREW

# ------------------------------------------------------------------ A8 solutions

def est_mock(moment=False):
    basis = ('<span data-type="Wage sched. line 16 × takeoff; waste 5%">Wage sched. line 16 × takeoff; waste 5%</span>' if moment
             else 'Wage sched. line 16 × takeoff; waste 5%')
    return ('<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">Estimate excerpt · division 26</div>'
            '<table><thead><tr><th>Line item</th><th>Qty</th><th>Unit</th><th>Source</th><th>Basis</th></tr></thead><tbody>'
            '<tr><td>Branch wiring · floors 2–4</td><td>38,400</td><td>LF</td><td class="mute">E-402–E-405</td><td class="mute">%s</td></tr>'
            '<tr><td>Light fixtures %s</td><td>—</td><td>EA</td><td class="mute">Fixture schedule</td><td class="mute">Not in the set — request from architect</td></tr>'
            '</tbody></table><div class="line">Total withheld until 2 UNKNOWN items resolved</div></div>') % (basis, chip("unknown", "Unknown"))

def bids_mock(moment=False):
    q2 = '<span data-swap="Received">Not received</span>' if moment else 'Not received'
    s2 = ('<span class="chip levelled" data-swap="Levelled|chip levelled">Gap — 2 items</span>'.replace('class="chip levelled"', 'class="chip conflict"') if moment else chip("conflict", "Gap — 2 items"))
    a2 = '<span data-swap="None — ready for your review">Chasing — 2nd follow-up sent Tue</span>' if moment else 'Chasing — 2nd follow-up sent Tue'
    return ('<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">Electrical bids</div>'
            '<table><thead><tr><th>Sub</th><th>Quote</th><th>COI</th><th>W-9</th><th>Scope</th><th>Emma\'s next action</th></tr></thead><tbody>'
            '<tr><td>Garnerville Line &amp; Load</td><td>Received</td><td>✓</td><td>✓</td><td>%s</td><td class="mute">None — ready for your review</td></tr>'
            '<tr><td>Hudson Feeder Co.</td><td>%s</td><td>✓</td><td>✓</td><td>%s</td><td class="mute">%s</td></tr>'
            '<tr><td>Spring Valley Power</td><td>Received</td><td class="mute">exp. Fri</td><td>✓</td><td>%s</td><td class="mute">Collecting COI renewal</td></tr>'
            '</tbody></table><div class="line">Quote amounts are shown as received / not received. Figures live in the levelling sheet.</div></div>') % (
        chip("levelled", "Levelled"), q2, s2, a2, chip("levelled", "Levelled"))

def today_mock(moment=False):
    slide = ' data-slide' if moment else ''
    return ('<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">Today</div>'
            '<div class="cols">'
            '<div class="col needs"><h5>Needs you</h5><div class="row needs"%s><div><b>Approve request to architect</b></div></div><div class="row needs"><div><b>Bid invitation · 4 subs</b></div></div></div>'
            '<div class="col"><h5>In progress</h5><div class="row"><div><b>Estimate Rev 2</b></div>%s</div><div class="row"><div><b>Chasing 2 quotes</b></div>%s</div></div>'
            '<div class="col"><h5>Done</h5><div class="row"><div><b>3 sub quotes logged</b></div>%s</div><div class="row"><div><b>Wage schedule matched</b></div>%s</div></div>'
            '</div></div>') % (slide, chip("working", "Working", True), chip("chasing", "Chasing"),
                               ('<span class="chip reported" data-swap="Verified|chip verified">Reported</span>' if moment else chip("reported", "Reported")),
                               chip("verified", "Verified"))

def public_mock(moment=False):
    v = '<span class="chip reported" data-swap="Verified|chip verified">Checking</span>' if moment else chip("verified", "Verified")
    return ('<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">Project files · public work</div>'
            '<div class="row"><div><b>Prevailing wage schedule · Rockland Co.</b><span>✓ read by Taylor</span></div></div>'
            '<div class="row"><div><b>Addendum 02</b><span>✓ read by Taylor</span></div></div>'
            '<div class="row"><div><b>Bid form</b><span>✓ read by Taylor</span></div></div>'
            '<div class="eyebrow mute" style="margin:14px 0 4px">Cross-check result</div>'
            '<div class="row"><div><b>Wage schedule matched to county</b></div>%s</div>'
            '<div class="row"><div><b>Addendum 03 per architect\'s office</b></div>%s</div></div>') % (v, chip("reported", "Reported — not verified"))

SOLUTIONS = [
    ("t", "Taylor · solution 1 of 4", "Estimating &amp; takeoff",
     "Taylor takes the full bid package — drawings, specs, addenda, wage schedules, bid forms. She performs takeoffs, flags conflicts between sheets and specs, and prices labour, material and sub lines. Every line traces to a sheet or a spec section; missing information reads UNKNOWN, with the reason and who has it.",
     "an estimate with its logic attached.", "Taylor says UNKNOWN rather than guessing.", est_mock, "/construction-estimating-ai/"),
    ("e", "Emma · solution 2 of 4", "Subcontractor bidding &amp; buyout",
     "Emma builds the sub list to your niche, geography and job size. She sends bid invitations with the right files, follows up until a quote, a no-bid or a named reason comes back, and collects COIs, W-9s and compliance documents. Every scope is levelled line-by-line against Taylor's estimate.",
     "a levelled bid table per trade.", "nothing goes to a sub without your approval.", bids_mock, "/subcontractor-procurement/"),
    ("s", "Sara · solution 3 of 4", "Operations &amp; approvals",
     "Sara runs Today, the approvals queue and the Monday report. She watches Taylor and Emma, catches what falls between them, and marks every claim Verified or Reported — never blending the two. What reaches you is a short queue of real decisions.",
     "a Monday report and an approvals queue.", "she brings you only the decisions that need you. You sign. She doesn't.", today_mock, "/construction-project-management-ai/"),
    ("t", "Taylor + Emma · solution 4 of 4", "Public work &amp; prevailing wage",
     "Wage schedules, addenda, bid forms and certified payroll documents handled by the book. Taylor matches the wage schedule to the county and prices to it line by line; Emma keeps sub compliance paperwork current. Anything the crew was told but hasn't confirmed stays marked Reported until it's checked against the document itself.",
     "bid forms and payroll docs that pass review.", "every claim is checked against the document itself.", public_mock, "/prevailing-wage-project-management/"),
]

def diagram():
    return ('<div class="diagram fx"><div class="owner">You — the owner</div><div class="arrow">↑ approvals only</div>'
            '<div class="three"><div>%s Estimating</div><div>%s Sara</div><div>%s Subcontractors</div></div></div>') % (av("t", 72, anim=True), av("s", 112, anim=True), av("e", 72, anim=True))

def page_solutions():
    desc = "Four solutions, one crew: estimating & takeoff, subcontractor bidding & buyout, operations & approvals, public work & prevailing wage. Pick the problem that hurts; the rest of the crew comes with it."
    h = head("Solutions — AI for Construction Estimating, Subcontractor Bidding and Operations | BuildWithBNZ", desc, "/solutions/")
    h += nav()
    h += hero("Solutions", "The job, not the software.",
              "Every solution below is one part of one crew, working inside one project workspace. Pick the problem that hurts; the rest of the crew comes with it.",
              sample_project_mock())
    cards = []
    for who, eyebrow, title, p, out, ctl, mock, href in SOLUTIONS:
        color = {"t": "var(--taylor)", "e": "var(--emma)", "s": "var(--ember)"}[who]
        cards.append('<article class="scard"><div><span class="eyebrow" style="color:%s">%s</span><h3 style="margin-top:12px;font-size:clamp(24px,3vw,36px)">%s</h3><p>%s</p>'
                     '<div class="oc"><div><b>Output:</b> %s</div><div><b>Control:</b> %s</div></div>'
                     '<p style="margin-top:16px"><a class="link" href="%s">Read the full page →</a></p></div>%s</article>' % (
                         color, eyebrow, title, p, out, ctl, href, mock(True)))
    h += section("dark", '<div class="stack">%s</div>' % ''.join(cards), id_="solutions")
    h += section("light", sec_head("One crew", "One crew. Whichever door you came in.",
                                   "Pick one solution and the other three come with it — same workspace, same rules, same approvals queue.") + diagram())
    h += section("dark", sec_head("What we connect to", "The systems the crew works inside.",
                                   "Keep your tools. Nothing is moved or replaced — read access first, and you approve anything that leaves.") + integrations(rows=3), id_="connect")
    h += section("light", '<div class="faq-grid"><div class="fx"><span class="eyebrow">FAQ</span><h2 style="margin-top:14px">Asked on every call.</h2></div><div class="fx">%s</div></div>' % faq_items([FAQ[0], FAQ[3], FAQ[2], FAQ[7]], 0))
    h += book_strip(dark=True)
    h += footer()
    return h

# ------------------------------------------------------------------ A2 crew

def page_crew():
    desc = "Meet the crew: Sara (construction COO), Taylor (estimating, drawings, specs) and Emma (subcontractor and project coordination). Three agents, one team, your rules."
    h = head("The Crew — Sara, Taylor and Emma | BuildWithBNZ", desc, "/crew/")
    h += nav("/crew/")
    h += section("dark", sec_head("The crew", "Three agents. One team. Your rules.", PITCH) + crew_cards(), extra_cls="first")
    h += section("light", sec_head("How they work together", "Sara sits at the centre.",
                                   "Taylor and Emma report to her; she cross-checks their work against each other and the documents. You sit above all three — the only arrow pointing at you is labelled approvals. Nothing is sent, awarded, signed or paid by the crew.") + diagram()
                 + '<p class="footnote fx">Behind them, several models check each other\'s work. You only ever deal with three.</p>')
    h += section("dark", sec_head("Each one, in depth", "Go deeper on one.") +
                 '<div class="grid g3 stagger">%s</div>' % ''.join(
                     '<a class="card" href="/%s/">%s<h3 style="margin-top:14px">%s</h3><p class="muted" style="margin:8px 0 12px">%s</p><span class="link">Meet %s →</span></a>' % (
                         cls, av(k, 64), n, r, n) for cls, k, n, r, p, rule in CREW))
    h += book_strip()
    h += footer()
    return h

# ------------------------------------------------------------------ A5 agent pages

AGENTS = {
    "sara": dict(who="s", n="Sara", idx="1 of 3", h1="Sara runs the company's day.",
                 lede="Construction COO and your main interface. She understands the whole company, delegates estimating to Taylor and coordination to Emma, catches problems between them, and brings you only the decisions that need you.",
                 checks=["Runs the Today board — what needs you, what's in progress, what's done",
                         "Routes the bid package to Taylor and the sub list to Emma",
                         "Keeps one approvals queue — every send waits on you",
                         "Marks every claim Verified or Reported — never blends them",
                         "Catches conflicts between the estimate and the sub scopes",
                         "Drafts the Monday report"],
                 rule="Never claims something was completed unless verified. Never makes the owner's decision.",
                 states=[("verified", "Verified"), ("reported", "Reported — not verified")],
                 states_note="Verified means checked against the document. Reported means someone said so. Sara never lets one look like the other.",
                 mock_label="Today — her board", mock=lambda: today_mock(False),
                 desc="Sara is the construction COO in the BuildWithBNZ crew: Today board, approvals queue, Monday report. Never claims done unless verified; never makes the owner's decision."),
    "taylor": dict(who="t", n="Taylor", idx="2 of 3", h1="Taylor reads every sheet.",
                   lede="Estimating, drawings, specs and design intelligence. She takes the full bid package and produces an estimate with every assumption and source shown — and says UNKNOWN rather than guessing.",
                   checks=["Reads the drawings, specs, addenda, wage schedule and bid form",
                           "Performs takeoffs and flags conflicts between sheets and specs",
                           "Builds labour, material and sub pricing line by line",
                           "Handles prevailing-wage and public-work requirements",
                           "Compares sub quotes against her own numbers",
                           "Issues the estimate with assumptions, sources and revision history"],
                   rule="Never invents a price. Says UNKNOWN when information is missing and always shows the logic.",
                   states=[("unknown", "Unknown"), ("showing", "Showing the work"), ("working", "Revising")],
                   states_note="UNKNOWN is deliberate: it names what's missing and who has it. It is never a blank.",
                   mock_label="Her part of the workspace — estimate, division 26", mock=lambda: est_mock(False),
                   desc="Taylor is the estimating agent in the BuildWithBNZ crew: takeoffs, conflicts, labour/material/sub pricing, every assumption shown. Never invents a price — says UNKNOWN."),
    "emma": dict(who="e", n="Emma", idx="3 of 3", h1="Emma works the phones.",
                 lede="Subcontractor and project coordination. She knows your niche, geography and buyout target — finds the subs, sends the invitations, chases the paperwork, levels the scope, and remembers who performs.",
                 checks=["Builds the sub list to your niche, geography and job size",
                         "Sends bid invitations with the right files — after your approval",
                         "Follows up until a quote, a no-bid, or a named reason comes back",
                         "Collects quotes, COIs, W-9s and compliance documents",
                         "Levels every scope against Taylor's estimate",
                         "Keeps the network: who's on time, whose paperwork is clean"],
                 rule="Never lets a dependency go unnamed.",
                 states=[("waiting", "Waiting on — named"), ("chasing", "Chasing"), ("collecting", "Collecting")],
                 states_note="\"Waiting\" always has a name attached — a person, a document, a date.",
                 mock_label="Her part of the workspace — electrical bids", mock=lambda: bids_mock(False),
                 desc="Emma is the subcontractor coordination agent in the BuildWithBNZ crew: sub list, bid invitations, follow-ups, COIs, W-9s, scope levelling. Never lets a dependency go unnamed."),
}

def page_agent(slug):
    a = AGENTS[slug]
    h = head("%s — %s | BuildWithBNZ" % (a["n"], a["h1"].rstrip('.')), a["desc"], "/%s/" % slug)
    h += nav()
    h += ('<section class="dark agent-hero"><div class="wrap"><div class="fx"><span class="eyebrow">The crew · %s</span><h1 style="margin:16px 0 20px;font-size:clamp(40px,6vw,80px)">%s</h1>'
          '<p class="lede">%s</p><div class="cta" style="margin-top:26px">%s</div></div><div class="fx">%s</div></div></section>\n') % (
        a["idx"], a["h1"], a["lede"], btn_book(), av(a["who"], 220, anim=True))
    h += section("light", ('<div class="split"><div class="fx"><h2 style="font-size:clamp(28px,3.4vw,40px);margin-bottom:18px">On your project, she…</h2><ul class="checks">%s</ul></div>'
                           '<div class="fx"><div class="pull">"%s"</div><div class="eyebrow mute" style="margin-top:24px">Her states</div><div class="states">%s</div><p class="muted small">%s</p></div></div>') % (
        ''.join('<li>%s</li>' % c for c in a["checks"]), a["rule"], ''.join(chip(k, t) for k, t in a["states"]), a["states_note"]))
    h += section("dark", '<div class="sec-head fx"><span class="eyebrow">%s</span></div><div class="fx">%s</div>' % (a["mock_label"], a["mock"]()))
    h += section("light", sec_head("The rest of the crew", "Three agents. One team.") +
                 '<div class="grid g3 stagger">%s</div>' % ''.join(
                     '<a class="card" href="/%s/">%s<h3 style="margin-top:14px">%s</h3><p class="muted" style="margin:8px 0 12px">%s</p><span class="link">Meet %s →</span></a>' % (
                         cls, av(k, 64), n, r, n) for cls, k, n, r, p, rule in CREW if cls != slug))
    h += book_strip(dark=True)
    h += footer()
    return h

# ------------------------------------------------------------------ A6 how it works

def step_mocks():
    return [
        '<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">What you see</div><div class="row"><div><b>Booked: Project Review · Thu 10:00</b><span>Bring: one project, drawings or bid package, who\'s on it. A real person takes the call.</span></div></div></div>',
        '<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">What you see</div><div class="row"><div><b>What Taylor does</b></div></div><div class="row"><div><b>What Emma does</b></div></div><div class="row"><div><b>What stays with you</b></div></div><div class="row needs"><div><b>One set price — agreed before work starts</b></div></div></div>',
        '<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">What you see</div><div class="row"><div><b>Drive</b></div>%s</div><div class="row"><div><b>Gmail</b></div>%s</div><div class="row"><div><b>Calendar</b></div>%s</div><div class="row"><div><b>Notion</b></div>%s</div></div>' % (
            chip("verified", "✓ read"), chip("verified", "✓ read"), chip("verified", "✓ read"), chip("reported", "Not connected")),
        '<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">What you see</div><div class="row"><div><b>Estimate Rev 1 · 31 lines · division 26</b></div>%s</div><div class="row"><div><b>Light fixtures — schedule missing</b></div>%s</div></div>' % (
            chip("showing", "Showing the work"), chip("unknown", "Unknown")),
        '<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">What you see</div><div class="row"><div><b>Electrical · 7 invited · 3 quotes in</b></div>%s</div><div class="row needs"><div><b>Bid invitation · 4 subs — drafted</b></div>%s</div></div>' % (
            chip("levelled", "Levelled"), chip("needs", "Needs you")),
        '<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">What you see</div><div class="row needs"><div><b>Today · 3 items need you</b></div>%s</div><div class="row"><div><b>Everything else · running</b></div>%s</div></div>' % (
            chip("needs", "Needs you"), chip("verified", "Verified")),
    ]

def page_how():
    desc = "Six steps to a project that runs itself: Project Review, scope and one set price in writing, connect your files, Taylor reads the package, Emma builds the sub list, Sara runs it. Then ongoing operations with a Monday report."
    h = head("How It Works — Six Steps to a Project That Runs Itself | BuildWithBNZ", desc, "/how-it-works/")
    h += nav("/how-it-works/")
    mocks = step_mocks()
    rows = []
    for i, (t, p, o, c) in enumerate(STEPS, 1):
        rows.append('<div class="card step"><div><div class="num"><span class="count" data-count="%d" data-dur="240" data-pad="0">00</span></div><h3 style="font-size:clamp(24px,3vw,34px)">%s</h3><p>%s</p>'
                    '<div class="oc"><div><b>Output:</b> %s</div><div><b>Control:</b> %s</div></div></div>%s</div>' % (i, t, p, o, c, mocks[i - 1]))
    h += section("light", sec_head("How it works", "Six steps to a project that runs itself.") + '<div class="steps rows stagger">%s</div>' % ''.join(rows), extra_cls="first")
    h += section("dark", '<div class="split"><div class="fx"><span class="eyebrow">Then the crew stays on</span><h2 style="margin:14px 0 14px">Reported every Monday.</h2>'
                 '<p class="lede">Ongoing operations: a separate monthly arrangement — hosting, monitoring, new projects, and a report every Monday. We stay responsible for it working.</p>'
                 '<div style="margin-top:22px">%s</div></div><div class="fx">%s</div></div>' % (btn_book(), monday_mock()), id_="ongoing")
    h += book_strip()
    h += footer()
    return h

# ------------------------------------------------------------------ what we connect to

def page_connect():
    desc = "The systems the BuildWithBNZ crew works inside today — Google Drive, Gmail, Google Calendar, Google Workspace, Notion — and what is next: Procore, Buildertrend, QuickBooks, Sage, Bluebeam. Keep your tools."
    h = head("What We Connect To — Google Drive, Gmail, Calendar, Workspace, Notion | BuildWithBNZ", desc, "/what-we-connect-to/")
    h += nav()
    h += section("dark", sec_head("What we connect to", "The systems the crew works inside.",
                                  "Keep your tools. Nothing is moved or replaced — read access first, and you approve anything that leaves.") + integrations(rows=3), extra_cls="first")
    h += section("light", sec_head("How access works", "Read first. Send only with you.") +
                 '<div class="grid g3 stagger">'
                 '<div class="card"><h3>Read access first</h3><p class="muted" style="margin-top:10px">The crew starts by reading the project folder, the inbox threads you point it at, and the calendar. Nothing is moved, renamed or copied out.</p></div>'
                 '<div class="card"><h3>Scoped per project</h3><p class="muted" style="margin-top:10px">Access follows the scope document: Company → Project → Purchased services → Assigned agents → Allowed workflows. One project does not open your whole Drive.</p></div>'
                 '<div class="card"><h3>Sends wait for you</h3><p class="muted" style="margin-top:10px">Bid invitations, follow-ups and requests to the architect are drafted into the approvals queue. Nothing leaves under your name unseen.</p></div>'
                 '</div>')
    h += section("dark", '<div class="faq-grid"><div class="fx"><span class="eyebrow">FAQ</span><h2 style="margin-top:14px">On connecting.</h2></div><div class="fx">%s</div></div>' % faq_items([FAQ[7], FAQ[2], FAQ[3]], 3))
    h += book_strip()
    h += footer()
    return h

# ------------------------------------------------------------------ FAQ

def page_faq():
    desc = "Answers to the questions every contractor asks on the call: what it costs, how long until the crew is live, who sees your drawings, whether the AI sends anything without you, what happens when Taylor doesn't have enough information."
    ld = '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[%s]}' % ','.join(
        '{"@type":"Question","name":"%s","acceptedAnswer":{"@type":"Answer","text":"%s"}}' % (q.replace('"', '\\"'), a.replace('"', '\\"')) for q, a in FAQ)
    h = head("FAQ — Asked on Every Call | BuildWithBNZ", desc, "/faq/", jsonld=ld)
    h += nav("/faq/")
    h += section("dark", '<div class="faq-grid"><div class="fx"><span class="eyebrow">FAQ</span><h2 style="margin-top:14px">Asked on every call.</h2><p class="muted" style="margin-top:14px">Direct answers, the way a GC actually asks. If yours isn\'t here, bring it to the Project Review.</p></div><div class="fx">%s</div></div>' % faq_items(FAQ, 8), extra_cls="first")
    h += book_strip()
    h += footer()
    return h

# ------------------------------------------------------------------ A7 book + thanks

def lead_form():
    return ('<form class="lead" method="post" action="https://formsubmit.co/%s" novalidate>'
            '<input type="hidden" name="_subject" value="New inquiry — Project Review">'
            '<input type="hidden" name="_template" value="table">'
            '<input type="hidden" name="_next" value="%s/thanks/">'
            '<input type="hidden" name="_captcha" value="false">'
            '<label class="hp" aria-hidden="true">Leave empty <input type="text" name="_honey" tabindex="-1" autocomplete="off"></label>'
            '<div class="two"><label>Your name<input name="name" required autocomplete="name"></label><label>Company<input name="company" required autocomplete="organization"></label></div>'
            '<div class="two"><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Phone<input name="phone" type="tel" autocomplete="tel"></label></div>'
            '<label>Contractor type<select name="contractor_type"><option>General contractor</option><option>Remodeler / custom builder</option><option>Specialty contractor</option><option>GC bidding public work</option><option>Other</option></select></label>'
            '<label>The project — what is it, where is it, what hurts<textarea name="project" required placeholder="e.g. 4-story mixed-use in Rockland County, public work, bid due in 11 days. Estimating is the bottleneck."></textarea></label>'
            '<div class="two"><label>Bid due (if any)<input name="bid_due" type="date"></label><label>Link to drawings or the bid package (optional)<input name="files_link" type="url" placeholder="Drive folder, Dropbox, or leave blank"></label></div>'
            '<div class="err">Please fill in your name, company, email and the project.</div>'
            '<button class="btn primary" type="submit">Book a project review <span class="g">↗</span></button>'
            '<p class="note">A real person takes this call. We reply the same business day to set a time. No prices on this site because there is no standard project — scope and one set price come back in writing after the review.</p>'
            '</form>') % (INBOX, SITE)

def page_book():
    desc = "Book a Project Review with BuildWithBNZ. Bring one project — drawings or the bid package and who's on it — and we'll show you what the crew would do with it. A real person takes this call."
    h = head("Book a Project Review | BuildWithBNZ", desc, "/book/")
    h += nav()
    h += ('<section class="light book hero"><div class="wrap"><div class="fx"><span class="eyebrow">Start here</span><h1 style="margin:16px 0 14px;font-size:clamp(40px,6vw,76px)">Book a project review.</h1>'
          '<p class="lede">Bring one project. We\'ll show you what the crew would do with it.</p>'
          '<div class="eyebrow mute" style="margin-top:30px">What to bring</div><div class="bring">'
          '<div><i>1</i><div><b>One project</b><span>Live or recent — the one that hurts is the best one.</span></div></div>'
          '<div><i>2</i><div><b>Drawings or the bid package</b><span>Whatever you have — PDFs, a Drive folder, a link.</span></div></div>'
          '<div><i>3</i><div><b>Who\'s on it</b><span>Who estimates, who chases subs, who signs.</span></div></div></div>'
          '<div class="cal-slot" style="margin-top:28px">Calendar embed — placeholder · Cal.com / Calendly · 30 min · "Project Review"</div>'
          '<p class="muted small" style="margin-top:12px">Prefer to talk? <a class="link" href="tel:%s">%s</a> · <a class="link" href="mailto:%s">%s</a></p></div>'
          '<div class="fx"><div class="card">%s</div></div></div></section>\n') % (PHONE, PHONE_TXT, INBOX, INBOX, lead_form())
    h += footer()
    return h

def page_thanks():
    h = head("Thanks — we'll be in touch | BuildWithBNZ", "Your Project Review request is in. A real person replies the same business day.", "/thanks/", noindex=True)
    h += nav()
    h += section("dark", '<div class="prose fx"><span class="eyebrow">Received</span><h2 style="margin-top:14px">Your project review request is in.</h2>'
                 '<p class="lede">A real person replies the same business day to set a time. Have the drawings or the bid package handy — that\'s what we walk through on the call.</p>'
                 '<p style="margin-top:18px"><a class="btn ghost" href="/how-it-works/">See how it works <span class="g">↗</span></a></p></div>', extra_cls="first")
    h += footer()
    return h

# ------------------------------------------------------------------ login, legal, 404, contact

def page_login():
    h = head("Login — Customer Workspace | BuildWithBNZ", "The BuildWithBNZ workspace is opened per project after your Project Review. Access is by invitation.", "/login/", noindex=True)
    h += nav()
    h += section("dark", '<div class="prose fx"><span class="eyebrow">Customer workspace</span><h2 style="margin-top:14px">Access is by invitation.</h2>'
                 '<p class="lede">The workspace is opened per project once scope and price are agreed in writing. If you\'re a customer and your invitation hasn\'t arrived, email <a class="link" href="mailto:%s">%s</a> from the address on your scope document.</p>'
                 '<p style="margin-top:18px">%s</p></div>' % (INBOX, INBOX, btn_book("btn ghost", "New here? Book a project review")), extra_cls="first")
    h += footer()
    return h

def page_privacy():
    h = head("Privacy — BuildWithBNZ", "How BuildWithBNZ handles the information you share with us: the Project Review form, project files, and the workspace.", "/privacy/")
    h += nav()
    h += section("dark", '''<div class="prose fx"><span class="eyebrow">Privacy</span><h2 style="margin-top:14px">Privacy policy.</h2>
<p class="lede">This covers the BuildWithBNZ website and workspace, operated by BNZ Builders Inc. Last updated: September 2026.</p>
<h3>What we collect</h3>
<p>When you book a Project Review we collect what you type into the form: your name, company, email, phone, contractor type, a description of the project, an optional bid date and an optional link to your files. The form is relayed to our inquiries inbox; we do not use third-party trackers on this site.</p>
<h3>Project files</h3>
<p>During a Project Review you may share drawings, specs, addenda and bid documents. They are used to prepare the walkthrough and, if we go ahead, the scope document. They are not used to train models, are not shared outside the people working your project, and are deleted on request.</p>
<h3>The workspace</h3>
<p>Once a project is scoped, the crew connects to the systems named in your scope document — Google Drive, Gmail, Google Calendar, Google Workspace, Notion — with read access first. Access is scoped per project. Anything that leaves the workspace (an email to a subcontractor, a request to an architect) waits in your approvals queue until you approve it.</p>
<h3>Who we share with</h3>
<p>Nobody, beyond the service providers needed to run the site and the workspace (hosting, email relay, the model providers that process your project documents under our agreements with them). We do not sell or rent your information.</p>
<h3>Your rights</h3>
<p>Ask us what we hold about you, ask us to correct it, or ask us to delete it: <a class="link" href="mailto:%s">%s</a>.</p>
</div>''' % (INBOX, INBOX), extra_cls="first")
    h += footer()
    return h

def page_terms():
    h = head("Terms — BuildWithBNZ", "Terms covering the BuildWithBNZ website, Project Review, scope documents and the workspace.", "/terms/")
    h += nav()
    h += section("dark", '''<div class="prose fx"><span class="eyebrow">Terms</span><h2 style="margin-top:14px">Terms of service.</h2>
<p class="lede">These terms cover your use of the BuildWithBNZ website and workspace, operated by BNZ Builders Inc. Last updated: September 2026.</p>
<h3>The service</h3>
<p>BuildWithBNZ provides three AI agents — Sara, Taylor and Emma — that work inside a construction project workspace. The agents prepare drafts, estimates, sub lists and reports. Anything that leaves your company is sent only after you review and approve it. The agents do not sign, award, pay or commit on your behalf.</p>
<h3>Engagement</h3>
<ul>
<li>Every engagement starts with a Project Review about one real project. There is no charge for the review.</li>
<li>If we proceed, you receive a scope document stating what the crew will do, what it will not do, and one set price for that project, in writing, before work starts. Price moves only if scope moves, and only by written agreement.</li>
<li>After the first project the crew can stay on under a separate written arrangement for ongoing operations — hosting, monitoring, new projects and a weekly report. Its terms are set out in that document.</li>
<li>No prices are published on this website because every project is scoped individually.</li>
</ul>
<h3>Your responsibilities</h3>
<ul>
<li>You are responsible for reviewing drafts, estimates and documents before they are sent, submitted or relied upon.</li>
<li>Estimates are prepared from the documents you provide. Where information is missing the estimate says UNKNOWN; it is not a bid, a quote or a guarantee of cost.</li>
<li>Taylor's design-assist work is not licensed design. Stamped drawings and engineering remain the responsibility of your architect or engineer of record.</li>
<li>Keep your workspace credentials secure. Each workspace belongs to one company and one or more scoped projects.</li>
</ul>
<h3>Liability</h3>
<p>To the extent permitted by law, BNZ Builders Inc. is not liable for indirect or consequential loss arising from use of the service, and our total liability under an engagement is limited to the amount paid for that engagement.</p>
<h3>Contact</h3>
<p><a class="link" href="mailto:%s">%s</a></p>
</div>''' % (INBOX, INBOX), extra_cls="first")
    h += footer()
    return h

def page_404():
    h = head("Page not found — BuildWithBNZ", "That page isn't here.", "/404.html", noindex=True)
    h += nav()
    h += section("dark", '<div class="prose fx"><span class="eyebrow">404</span><h2 style="margin-top:14px">That page isn\'t here.</h2>'
                 '<p class="lede">It may have moved. Try the crew, how it works, or head back home.</p>'
                 '<p style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn ghost" href="/">Home <span class="g">↗</span></a><a class="btn ghost" href="/crew/">The crew <span class="g">↗</span></a>%s</p></div>' % btn_book(), extra_cls="first")
    h += footer()
    return h

def page_contact():
    desc = "Contact BuildWithBNZ. The fastest route is a Project Review — bring one project and we'll show you what the crew would do with it."
    h = head("Contact | BuildWithBNZ", desc, "/contact/")
    h += nav()
    h += section("dark", '<div class="prose fx"><span class="eyebrow">Contact</span><h2 style="margin-top:14px">Talk to a real person.</h2>'
                 '<p class="lede">The fastest route is a Project Review — bring one project and we\'ll show you what the crew would do with it. Or reach us directly.</p>'
                 '<p style="margin-top:18px"><a class="link" href="mailto:%s">%s</a> · <a class="link" href="tel:%s">%s</a></p>'
                 '<p style="margin-top:22px">%s</p></div>' % (INBOX, INBOX, PHONE, PHONE_TXT, btn_book()), extra_cls="first")
    h += footer()
    return h

def page_redirect(to, title):
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>%s</title><meta name="robots" content="noindex">'
            '<meta http-equiv="refresh" content="0; url=%s"><link rel="canonical" href="%s%s"></head>'
            '<body><p>Moved: <a href="%s">%s%s</a></p></body></html>\n') % (title, to, SITE, to, to, SITE, to)
