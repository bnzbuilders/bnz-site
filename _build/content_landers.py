# -*- coding: utf-8 -*-
"""Seven problem-based SEO landing pages. Each is one door into the same crew."""
from shared import *
from content_home import hero
from content_pages import est_mock, bids_mock, today_mock, public_mock

LANDERS = [
    dict(slug="construction-estimating-ai", who="t",
         title="Construction Estimating AI — Takeoffs and Estimates With Every Assumption Shown",
         eyebrow="Estimating & takeoff", h1="Estimates that show their work.",
         lede="Taylor reads the full bid package — drawings, specs, addenda, wage schedule, bid form — performs the takeoff, prices labour, material and sub lines, and issues an estimate where every line traces to a sheet or a spec section. Missing information reads UNKNOWN, never a guess.",
         desc="Construction estimating AI for GCs and specialty contractors: takeoffs from the drawing set, conflicts flagged between sheets and specs, labour/material/sub pricing with every assumption and source shown. Taylor never invents a price.",
         mock=est_mock,
         pains=[("The package arrives Friday, the bid is due in eleven days", "Taylor starts reading the same day. Rev 1 comes back with a conflict log and an UNKNOWN list so you know what to chase before you price."),
                ("Addendum 02 changes the electrical scope", "Replace the sheets; Taylor reissues Rev 2 with the delta line by line. A revision with a reason, not a restart."),
                ("The fixture schedule isn't in the set", "The line reads UNKNOWN with the reason and who has it. The total is withheld until it's resolved. A request to the architect is drafted for your approval.")],
         faq=[0, 5, 4]),
    dict(slug="subcontractor-procurement", who="e",
         title="Subcontractor Procurement AI — Bid Invitations, Follow-ups, Quotes and Compliance",
         eyebrow="Subcontractor bidding & buyout", h1="Every sub, every quote, every document — named.",
         lede="Emma builds the sub list to your niche, geography and job size, sends invitations with the right files, follows up until a quote or a named reason comes back, collects COIs, W-9s and compliance documents, and levels every scope against Taylor's estimate.",
         desc="Subcontractor procurement AI: build the sub list, send bid invitations with the right files, chase quotes, collect COIs and W-9s, level scope against the estimate. Nothing goes to a sub without your approval.",
         mock=bids_mock,
         pains=[("Seven invited, three quotes in, and nobody knows who's blocking", "Emma's Waiting-on panel names the sub, the document and the contact. A dependency with an owner, never a shrug."),
                ("A quote comes in short two items", "Scope is levelled line by line against Taylor's estimate. GAP — 2 ITEMS is marked before the number is compared."),
                ("The COI expires Friday", "Sara brings you the decision — keep and chase again, or replace with a sub whose paperwork is clean. She recommends nothing; the call is yours.")],
         faq=[3, 2, 6]),
    dict(slug="construction-bid-management", who="e",
         title="Construction Bid Management — From Bid Package to Levelled Sub Quotes",
         eyebrow="Bid management for specialty contractors", h1="Run the bid, not the spreadsheet.",
         lede="One workspace per bid: files with versions, Taylor's estimate with assumptions, Emma's bid table per trade, and Sara's approvals queue. Specialty contractors get their niche, units and production rates learned once and reused on every bid.",
         desc="Construction bid management for specialty contractors: one workspace per bid, files with versions, estimate with assumptions, sub quotes levelled per trade, approvals queue. Your units and production rates learned once.",
         mock=bids_mock,
         pains=[("Every bid starts from a blank spreadsheet", "Your divisions, units and production rates are the estimate template. Taylor prices the new package against them."),
                ("Addenda land in three inboxes", "Files live in one place with versions and a 'read by Taylor' tick. Replace a sheet and the estimate reissues."),
                ("Bid day is a scramble for missing paperwork", "Emma collects COIs, W-9s and compliance documents as quotes arrive and counts what's outstanding.")],
         faq=[1, 3, 7]),
    dict(slug="construction-project-management-ai", who="s",
         title="Construction Project Management AI — Today, Approvals and the Monday Report",
         eyebrow="Operations & approvals", h1="Only the decisions that need you.",
         lede="Sara runs Today, the approvals queue and the Monday report. She watches Taylor and Emma, catches what falls between them, and marks every claim Verified or Reported — never blending the two. What reaches you is a short queue of real decisions.",
         desc="Construction project management AI: a Today board with what needs you, what's in progress and what's done — split into verified and reported. An approvals queue where the crew drafts and you decide. A Monday report every week.",
         mock=today_mock,
         pains=[("'It's done' turns out to mean 'someone said it's done'", "Done — Verified and Done — Reported are two lists. Reported items become Verified only when checked against the document."),
                ("You are the bottleneck on every send", "Bid invitations, follow-ups and requests are drafted into one queue with Approve · Edit · Send back. Ten minutes a day clears it."),
                ("Monday starts with 'where are we?'", "The Monday report: projects active, estimates issued, quotes collected, waiting on you, waiting on subs — named — and anything reported-not-verified.")],
         faq=[3, 6, 1]),
    dict(slug="ai-for-general-contractors", who="s",
         title="AI for General Contractors — An Operating System, Not Another App",
         eyebrow="General contractors", h1="Bid more work without adding estimating headcount.",
         lede="Sara runs operations, Taylor reads the drawings and builds the estimate, Emma builds and manages the subcontractor network. They connect to the files and systems you already use and work together inside one construction workspace. Every project is scoped and priced in writing before we start.",
         desc="AI for general contractors: Sara runs operations, Taylor reads the drawings and builds the estimate, Emma manages the subcontractor network. Connected to Drive, Gmail, Calendar and Notion. Scoped and priced in writing per project.",
         mock=sample_project_mock,
         pains=[("You've been sold software before and it didn't stick", "The crew works inside the folders, inbox and calendar you already use. Nothing is migrated, and we stay responsible for it working."),
                ("Estimating is the ceiling on how much you can bid", "Taylor reads the package the same week you approve. Rev 1 with a conflict log and an UNKNOWN list, then Rev 2 when the addendum lands."),
                ("The sub list lives in one PM's head", "Emma keeps the network: who's on time, whose paperwork is clean, who quoted late twice. It survives the PM.")],
         faq=[0, 1, 6]),
    dict(slug="commercial-construction-estimating", who="t",
         title="Commercial Construction Estimating — For Remodelers, Custom Builders and Fit-Outs",
         eyebrow="Remodelers & custom builders", h1="Estimates and subs that keep pace with change orders.",
         lede="Remodel and fit-out work changes under you. Taylor reissues the estimate as a revision with a reason every time the scope moves; Emma re-levels the affected sub scopes; Sara brings you the delta and the decisions, not the whole job again.",
         desc="Commercial construction estimating for remodelers, custom builders and fit-out contractors: estimates that revise with a reason when scope moves, sub scopes re-levelled, and a short queue of decisions instead of a re-bid.",
         mock=est_mock,
         pains=[("The client changes the finish spec mid-bid", "Replace the spec section; Taylor reprices division 09 and shows the delta line by line. Nothing else moves."),
                ("Three subs quoted three different scopes", "Emma levels each against the estimate and marks the gaps before you compare numbers."),
                ("The change order needs a number today", "Taylor prices from the same basis as the original estimate — the logic is attached, so the client can see why.")],
         faq=[0, 5, 1]),
    dict(slug="prevailing-wage-project-management", who="t",
         title="Prevailing Wage Project Management — Public Work Bids Handled by the Book",
         eyebrow="Public work & prevailing wage", h1="Public work, handled by the book.",
         lede="Wage schedules, addenda, bid forms and certified payroll documents. Taylor matches the wage schedule to the county and prices to it line by line; Emma keeps sub compliance paperwork current. Anything the crew was told but hasn't confirmed stays marked Reported until it's checked against the document itself.",
         desc="Prevailing wage project management for GCs bidding public work in New York: wage schedule matched to the county, addenda read against the full set, bid forms and certified payroll documents handled by the book, every claim verified against the document.",
         mock=public_mock,
         pains=[("The wage schedule is from the wrong county — or last year's", "Taylor matches the schedule to the county and the date, and the match reads VERIFIED against the document, not assumed."),
                ("Addendum 03 is 'coming' according to the architect's office", "That stays REPORTED — NOT VERIFIED on the Monday report until the document is in the set."),
                ("Sub compliance paperwork is a scramble at award", "Emma collects COIs, W-9s and compliance documents as quotes arrive, and counts what's outstanding per sub.")],
         faq=[4, 2, 0]),
]

def page_lander(L):
    path = "/%s/" % L["slug"]
    h = head("%s | BuildWithBNZ" % L["title"], L["desc"], path)
    h += nav()
    h += hero(L["eyebrow"], L["h1"], L["lede"], L["mock"](False) if L["mock"] is not sample_project_mock else sample_project_mock())
    pains = ''.join('<div class="card"><h3>%s</h3><p>%s</p></div>' % (q, a) for q, a in L["pains"])
    h += section("light", sec_head("On your project", "What changes on day one.") + '<div class="grid g3 stagger pain">%s</div>' % pains)
    h += section("dark", sec_head("How it works", "Scoped and priced in writing before we start.",
                                  "Every engagement starts with a Project Review about one real project. We return scope and one set price, in writing. Price moves only if scope moves. After the first project the crew stays on under a separate monthly arrangement — hosting, monitoring, new projects, a Monday report.")
                 + '<p><a class="link" href="/how-it-works/">The six steps, with what you see at each →</a></p>')
    h += section("light", '<div class="faq-grid"><div class="fx"><span class="eyebrow">FAQ</span><h2 style="margin-top:14px">Asked on every call.</h2></div><div class="fx">%s</div></div>' % faq_items([FAQ[i] for i in L["faq"]], 1))
    h += book_strip(dark=True)
    h += footer()
    return h
