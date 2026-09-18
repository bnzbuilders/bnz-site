# -*- coding: utf-8 -*-
from shared import *

def hero(eyebrow, h1, para, mock, cta=True):
    ctas = ('<div class="cta">%s<a class="link" href="/how-it-works/">See how it works</a></div>' % btn_book()) if cta else ''
    return ('<section class="dark hero"><div class="wrap"><div class="fx"><span class="eyebrow">%s</span><h1>%s</h1>'
            '<p class="lede">%s</p>%s</div><div class="fx">%s</div></div></section>\n') % (eyebrow, h1, para, ctas, mock)

WHO = [
    ("General contractors", "Bid more work without adding estimating headcount."),
    ("Remodelers &amp; custom builders", "Estimates and subs that keep pace with change orders."),
    ("Specialty contractors", "Your niche, your units, your production rates — learned once."),
    ("GCs bidding public work", "Prevailing wage, addenda and bid forms handled by the book."),
]

CREW = [
    ("taylor", "t", "Taylor", "Estimating · drawings · specs",
     "Takes the full bid package — drawings, specs, addenda, wage schedules, bid forms. Performs takeoffs, finds conflicts, builds labour, material and sub pricing. Produces an estimate with every assumption and source shown.",
     "Never invents a price. Says UNKNOWN when information is missing and always shows the logic."),
    ("sara", "s", "Sara", "Construction COO · your main interface",
     "Understands the whole company. Delegates estimating to Taylor and coordination to Emma, catches problems between them, and brings you only the decisions that need you.",
     "Never claims something was completed unless verified. Never makes the owner's decision."),
    ("emma", "e", "Emma", "Subcontractor &amp; project coordination",
     "Knows your niche, geography, job size and buyout target. Finds subs, sends invitations with the right files, follows up, collects quotes, COIs, W-9s and compliance docs, levels scope against Taylor's estimate. Remembers who performs.",
     "Never lets a dependency go unnamed."),
]

STEPS = [
    ("Project review", "A real call about one real project. You bring the drawings; we walk through exactly what the crew would do with them.",
     "a written walkthrough of your project.", "you pick the project; nothing is connected yet."),
    ("Scope and one set price", "We return scope and one set price, in writing, for that project. Not a plan, not a tier — a document you can hold us to.",
     "a signed scope, price in writing.", "price moves only if scope moves."),
    ("Connect your files", "Drive, Gmail, Calendar, Notion, your project folders. The crew works inside the tools you already use.",
     "a connected workspace, nothing moved.", "nothing is moved or replaced. Read access first."),
    ("Taylor reads the package", "Drawings, specs, addenda, wage schedules, bid forms. Takeoffs, conflicts, pricing — every assumption and source shown.",
     "an estimate with its logic attached.", "Taylor says UNKNOWN rather than guessing."),
    ("Emma builds the sub list", "Bid invitations with the right files, follow-ups, quotes, COIs, W-9s — levelled against Taylor's estimate.",
     "a levelled bid table per trade.", "nothing goes to a sub without your approval."),
    ("Sara runs it", "She watches both, catches what falls between them, and brings you a short queue of the decisions that need you.",
     "a Monday report and an approvals queue.", "she brings you only the decisions that need you. You sign. She doesn't."),
]

def crew_cards(light=False):
    cards = ''.join(
        '<div class="card crew-card %s"><div class="av-wrap">%s</div>'
        '<h3>%s</h3><div class="role">%s</div><p>%s</p><div class="rule">%s</div></div>' % (cls, av(k, 96, anim=True), n, r, p, rule)
        for cls, k, n, r, p, rule in CREW)
    return '<div class="crew-grid stagger">%s</div><p class="footnote fx">Behind them, several models check each other\'s work. You only ever deal with three.</p>' % cards

def steps_grid(rows=False):
    out = []
    for i, (t, p, o, c) in enumerate(STEPS, 1):
        out.append('<div class="card step"><div class="num"><span class="count" data-count="%d" data-dur="240" data-pad="0">00</span></div><h3>%s</h3><p>%s</p>'
                   '<div class="oc"><div><b>Output:</b> %s</div><div><b>Control:</b> %s</div></div></div>' % (i, t, p, o, c))
    return '<div class="steps stagger%s">%s</div>' % (' rows' if rows else '', ''.join(out))

def work_cards():
    c1 = ('<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">Intake summary</div>'
          '<div class="row"><div><b>Rockland Mixed-Use · 38 Units</b><span>Public work, prevailing wage · bid due in 11 days</span></div></div>'
          '<div class="row"><div><b>Package</b><span>Drawing set (142 sheets), specs, Addendum 01–02, wage schedule, bid form</span></div></div>'
          '<div class="row"><div><b>On it today</b><span>Owner + one PM</span></div></div>'
          '<div class="row"><div><b>Pain named on the call</b><span>Estimating bottleneck, sub follow-up</span></div></div>'
          '<div class="line"><b>What the crew would do with it</b> → walked through live</div></div>')
    c2 = ('<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">Scope document · in writing</div>'
          '<div class="row"><div><b>What Taylor does</b><span>Takeoffs, estimate Rev 1, conflict log</span></div></div>'
          '<div class="row"><div><b>What Emma does</b><span>Sub list, invitations, quote collection</span></div></div>'
          '<div class="row"><div><b>What stays with you</b><span>Every approval, every send, the signature</span></div></div>'
          '<div class="row needs"><div><b>One set price</b><span>Agreed before work starts</span></div></div></div>')
    c3 = ('<div class="mock rows"><span class="sd">Sample data</span><div class="eyebrow mute" style="margin-bottom:8px">Project page</div>'
          '<div class="row"><div><b>Estimate Rev 2</b></div>%s</div>'
          '<div class="row"><div><b>Sub quotes · electrical</b></div>%s</div>'
          '<div class="row"><div><b>Bid form draft</b></div>%s</div>'
          '<div class="row needs"><div><b>Approve invitation · 4 subs</b></div>%s</div></div>') % (
        chip("working", "Working", True), chip("waiting", "Waiting on"), chip("verified", "Verified"), chip("needs", "Needs you"))
    cards = [
        ("The project review", c1, "A real call about one real project. No connection, no commitment — a walkthrough."),
        ("Scoped and priced", c2, "Price moves only if scope moves. That sentence is in the document."),
        ("Live in your workspace", c3, "The project page the crew and you share — files, estimate, subs, approvals."),
    ]
    return '<div class="grid g3 stagger work">%s</div>' % ''.join(
        '<div class="card"><h3>%s</h3>%s<p>%s</p></div>' % (t, m, p) for t, m, p in cards)

def proof():
    return ('<div class="grid g3 stagger proof">'
            '<div class="card"><h3>One real project, walked through</h3><p class="muted" style="margin:10px 0">A public-work bid, name withheld. Every number below comes from the record.</p>'
            '<div class="slot">Metric slot — sheets read, from the record</div><div class="slot">Metric slot — conflicts flagged, from the record</div><div class="slot">Metric slot — days from package to estimate</div></div>'
            '<div class="card"><h3>The rules, stated as guarantees</h3>'
            '<blockquote>"Sara never claims something was completed unless verified. Never makes the owner\'s decision."</blockquote>'
            '<blockquote>"Taylor never invents a price. Says UNKNOWN when information is missing and always shows the logic."</blockquote>'
            '<blockquote>"Emma never lets a dependency go unnamed."</blockquote></div>'
            '<div class="card"><h3>How the crew catches its own mistakes</h3><p class="muted" style="margin-top:10px">Every estimate line, sub quote and claim is cross-checked before it reaches you. When two sources disagree — a spec section against a drawing sheet, a quote against a levelled scope — the item is flagged CONFLICT and held, not smoothed over. Anything the crew was told but hasn\'t confirmed stays marked REPORTED — NOT VERIFIED until it\'s checked against the document itself.</p></div>'
            '</div>')

def page_home():
    desc = "BuildWithBNZ is an AI operating system for construction companies. Sara runs operations, Taylor reads the drawings and builds the estimate, Emma builds and manages the subcontractor network — inside one construction workspace, scoped and priced in writing before we start."
    ld = ('{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"BuildWithBNZ","url":"%s","email":"%s","telephone":"%s","areaServed":"New York","description":"AI operating system for construction companies."},'
          '{"@type":"WebSite","name":"BuildWithBNZ","url":"%s"}]}') % (SITE, INBOX, PHONE, SITE)
    h = head("AI Operating System for Construction Companies | BuildWithBNZ", desc, "/", jsonld=ld)
    h += nav("/")
    h += hero("AI operating system for construction companies", "Run the company. Keep every decision.",
              "Sara runs operations, Taylor reads the drawings and builds the estimate, Emma builds and manages your subcontractor network. They connect to the files and systems you already use — Drive, Gmail, Calendar, Notion, your project folders — and work together inside one construction workspace. Every project is scoped and priced in writing before we start. You approve anything that leaves the building.",
              sample_project_mock())
    h += section("light strip", '<div class="cells stagger">%s</div>' % ''.join('<div><h3>%s</h3><p>%s</p></div>' % w for w in WHO))
    h += section("dark", sec_head("The crew", "Three agents. One team.") + crew_cards(), id_="crew")
    h += section("light", sec_head("How it works", "Six steps to a project that runs itself.") + steps_grid(), id_="how-it-works")
    h += section("dark", sec_head("The work", "What you actually get.") + work_cards())
    h += section("light", '<div class="split"><div class="fx"><span class="eyebrow">Ongoing operations</span><h2 style="margin:14px 0 14px">Reported every Monday.</h2>'
                 '<p class="lede">After the first project, the crew stays on under a separate monthly arrangement. We host it, monitor it, add your next projects, and stay responsible for it working.</p></div>'
                 '<div class="fx">%s</div></div>' % monday_mock(), id_="ongoing")
    h += section("dark", sec_head("Proof", "Proof, not logos.") + proof())
    h += section("light", sec_head("What we connect to", "The systems the crew works inside.",
                                   "Keep your tools. Nothing is moved or replaced — read access first, and you approve anything that leaves.") + integrations(rows=2)
                 + '<p style="margin-top:18px"><a class="link" href="/what-we-connect-to/">Full list, and what each one does →</a></p>', id_="connect")
    h += section("dark", '<div class="faq-grid"><div class="fx"><span class="eyebrow">FAQ</span><h2 style="margin-top:14px">Asked on every call.</h2></div><div class="fx">%s</div></div>' % faq_items(FAQ), id_="faq")
    h += book_strip()
    h += footer()
    return h
