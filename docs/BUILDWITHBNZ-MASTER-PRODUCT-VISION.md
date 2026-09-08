# SARA GROK + GROK BOT — THIS IS THE MASTER BUILDWITHBNZ PRODUCT VISION.

Read this as the controlling product direction unless Bilal explicitly changes it.

Locked: 2026-09-06 by Bilal Mohammed.


> **Durable master knowledge source:** [THETHIRDEYE → 12 — BUILDWITHBNZ MASTER PRODUCT VISION](https://app.notion.com/p/3d32e5906a3781288d13c66455bceb66)
>
> This repo copy is for Sara Grok + Grok Bot / coding agents. Do not create a competing product strategy. Update THETHIRDEYE first; keep this file in sync.
>
> Locked Sep 6, 2026 by Bilal Mohammed. Website + app = ONE product.

1. WHAT WE ARE BUILDING

We are building TWO connected businesses:

BNZ BUILDERS INC.

A real New York general contractor/public-works company.

BNZ is the real-world operating company that tests every BuildWithBNZ workflow.

BUILDWITHBNZ

A national AI Construction Operating System for contractors across the United States.

BuildWithBNZ is not just a BNZ internal dashboard.

The long-term goal is that contractors anywhere in the country can:

visit the website

understand the AI Crew

choose a plan

pay through Stripe

create their company

log into the app

connect their business systems

use Sara / Emma / Taylor every day

2. THE WEBSITE AND APP ARE ONE PRODUCT

Do NOT treat:

buildwithbnz.com

and

app.buildwithbnz.com

as unrelated projects.

They are two surfaces of ONE product.

WEBSITE

buildwithbnz.com

The website is:

public brand

marketing

SEO

education

pricing

case studies

agent pages

signup

conversion

login gateway

Its job is to bring contractors into BuildWithBNZ.

APP

app.buildwithbnz.com

The app is:

authenticated product

company workspace

Sara

Emma

Taylor

projects

bids

vendors

documents

approvals

activity

integrations

billing

settings

The website sells the product.

The app delivers the product.

3. PUBLIC AGENTS

There are only THREE public agents:

SARA

AI Construction COO

Sara is the front door.

She handles:

what needs attention today

Gmail

Calendar

projects

deadlines

bids

owners

communication

meetings

risks

approvals

delegation to Emma and Taylor

Permanent question:

“What does my construction company need to handle today?”

EMMA

AI Project Coordinator / Accounting + Subcontractor Operations

Emma handles:

WHAT IS MISSING?

documents

subcontractors

vendors

compliance

W-9

COI

OSHA

SDS

receipts

invoices

payroll-document coordination

QuickBooks coordination

closeout

missing signatures

missing paperwork

quote follow-up

Permanent question:

“What is missing before this project can start, continue, invoice or close?”

TAYLOR

AI Construction Estimator

Taylor handles:

bids

drawings

specifications

addenda

scopes

takeoffs

labor

materials

subcontractor quotes

estimate

bid readiness

estimate-vs-actual

Permanent question:

“Can we bid this, what do we know, what is missing and what should it cost?”

Taylor must use:

VERIFIED
ESTIMATE
QUOTE
PAID
UNKNOWN
CONFLICT
NEEDS VERIFICATION

Never invent:

square footage

quantity

wage

material cost

quote

project value

bid amount

bonding dollars

4. INTERNAL AGENTS

Internally we can have:

Sara GPT
Sara Claude
Sara Grok

Emma GPT
Emma Claude
Emma Grok

Taylor GPT
Taylor Claude
Taylor Grok

But customers only see:

Sara
Emma
Taylor

Do NOT create public “Grok Sara” or “Claude Taylor” brands.

5. THETHIRDEYE

Notion page:

THETHIRDEYE

is the central durable knowledge brain for BNZ + BuildWithBNZ.

It contains:

Command Center

Website

Private App

Sara Memory

Emma Memory

Taylor Memory

GPT / Claude / Grok roles

Agent handoffs

Product ideas

Build log

BNZ company information

active projects

BNZ master profile

long-term vision

Do NOT create a second competing company brain.

Source-of-truth model:

Notion / THETHIRDEYE = durable knowledge
Gmail = communication truth
Calendar = schedule truth
Drive = document truth
QuickBooks = accounting truth
GitHub = code truth
BuildWithBNZ database = live app state

6. CURRENT LIVE STATE

Public website:

https://buildwithbnz.com

Private temporary app:

https://bnz-app.vercel.app

Repo:

bnzbuilders/bnz-app

Production host:

Vercel

Auth:

Clerk LIVE

First tenant:

BNZ Builders Inc.

Bilal:

Owner/Admin

Current live integrations:

THETHIRDEYE / Notion

Gmail

Google Calendar

Sara Today live-data test:

PASS

Next major integrations:

Google Drive

Emma

Taylor

Approvals

Activity

QuickBooks later

7. STRIPE — WEBSITE + APP BILLING

Stripe must connect BOTH the website and the app.

Pricing is currently locked:

SARA

$30 / month

FULL CREW

$50 / month

Do not change pricing unless Bilal explicitly approves it.

WEBSITE PAYMENT FLOW

The website pricing buttons should lead into Stripe Checkout.

Ideal flow:

Visitor
→ buildwithbnz.com
→ Pricing
→ Choose Sara or Full Crew
→ Stripe Checkout
→ payment/subscription created
→ verified Stripe webhook
→ customer/company subscription stored in BuildWithBNZ
→ account/onboarding
→ app access

Do NOT unlock paid access just because the browser reaches a success URL.

Subscription state must come from trusted Stripe webhook/backend data.

APP BILLING

Inside the app:

Settings
→ Billing

Show:

current plan

subscription status

next billing date if available

upgrade/downgrade

manage billing

Use Stripe Customer Portal when appropriate for:

payment methods

invoices

subscription management

billing details

cancellation

Do NOT build a custom credit-card storage system.

8. PLAN ENTITLEMENTS

SARA — $30

Should primarily include:

Sara

Today dashboard

projects

basic bid tracking

email intelligence

calendar/deadline intelligence

company memory

tasks/priorities

basic approvals

basic activity

FULL CREW — $50

Everything in Sara plus:

Emma

What's Missing

documents

vendors

subcontractors

compliance

closeout

accounting coordination

Taylor

Bid Desk

drawing/spec review

estimating workflows

quote comparison

takeoff support

estimate-vs-actual

Build entitlements server-side.

Do not rely only on hidden frontend buttons.

9. MULTI-TENANT NATIONAL SaaS

BNZ Builders is the FIRST company.

It must NOT remain the only company.

The architecture must support:

Company 1:
BNZ Builders Inc.

Company 2:
ABC Construction

Company 3:
XYZ Contractors

and eventually thousands of contractors.

Every company must have isolated:

users

projects

bids

documents

email connections

calendar connections

Drive connections

estimates

vendors

approvals

activity

billing

memory

integrations

Every company-owned record must have an organization/company ID.

Never allow customer data to cross organizations.

10. NATIONAL PRODUCT — NOT NEW YORK ONLY

BNZ is New York-based.

BuildWithBNZ is NATIONAL.

Do not hard-code every workflow as:

OPWDD

NY public works

NYC only

NY prevailing wage only

Instead:

CORE PRODUCT
= national contractor operating system

COMPANY SKILLS / LOCAL RULES
= company/state/agency-specific workflows

Example:

BNZ can have:

OPWDD Skill

NY prevailing wage workflow

NYSDOL registration workflow

SFS workflow

A Texas contractor may have completely different local workflows.

The product must support both.

11. WEBSITE MUST STAY CURRENT

The public website should never become stale.

Eventually implement an approved publishing workflow:

Project completed
→ Sara identifies publishable accomplishment
→ Emma confirms facts/docs/photos
→ website draft/case study created
→ Bilal APPROVES
→ website updates
→ GitHub
→ Vercel
→ verify production

Also update the website for:

approved credentials

services

new AI Crew capabilities

feature releases

pricing changes

testimonials

approved project history

new product pages

SEO improvements

Never automatically publish:

payroll

private financial data

internal bonding capacity

sensitive documents

client information not approved for public use

unverified project facts

12. PRODUCT EXPERIENCE

The customer should NOT need to manage nine bots.

Ideal experience:

Contractor opens BuildWithBNZ.

They ask:

“Sara, what does my company need to handle today?”

Sara may answer:

bid due tomorrow

subcontractor COI missing

project meeting at 10 AM

unpaid invoice

owner email needs reply

Taylor found a bid worth reviewing

Emma is missing OSHA cards

schedule conflict exists

Then user says:

“Handle what you can and bring me what needs approval.”

That is the product.

13. APPROVAL MODEL

Agents can autonomously:

search

read

summarize

organize

classify

prepare drafts

create internal tasks

identify missing items

prepare estimates

prepare bid reviews

recommend actions

Human approval required before:

external sensitive email send

final bid submission

contract signing

change order execution

purchases/payments

payroll/tax certification

destructive deletion

sensitive website publishing

Statuses:

DRAFT
READY FOR APPROVAL
APPROVED
SENT / SUBMITTED
REJECTED

14. ACTIVITY LOG

Every important action should be auditable.

Track:

timestamp

user

organization

agent

project/bid

source

action

result

approval status

Bilal and future contractor owners should be able to ask:

“What did my AI Crew do today?”

15. MOBILE / FIELD VISION

The app must work for contractors in the field.

Eventually support:

mobile-first views

project photos

voice notes

daily logs

site updates

punch lists

field tasks

document lookup

approval notifications

A superintendent should not need a desktop to use the product.

16. BNZ AS THE PRODUCT LAB

Every repeated BNZ problem is a potential BuildWithBNZ feature.

Permanent loop:

BNZ real workflow
→ identify pain point
→ PRODUCT OPPORTUNITY
→ Sara Grok decides
→ Claude Code reviews
→ Grok Bot implements
→ GitHub
→ Vercel
→ BNZ tests
→ improve
→ release nationally

Product opportunities already identified:

Sara Morning Brief

Project Risk Radar

Pre-Bid Copilot

Emma What’s Missing

Emma Compliance Chase

Emma Subcontractor Chase

Emma Closeout Agent

Taylor Bid Desk

Taylor Conflict Engine

Drawing Intelligence

Estimate vs Actual

Change Order Detector

Photo-to-Action

Voice Daily Logs

Subcontractor Brain

Company Skills/SOPs

scheduled/event automations

17. LONG-TERM VISION

By roughly September 2027:

BNZ BUILDERS

Should be:

stronger public-work GC

more completed projects

deeper crew/sub network

stronger agency relationships

clean QuickBooks/job costing

repeatable bid pipeline

more accurate estimating

better closeout

better documentation

ready for gradually larger work as capacity genuinely grows

BUILDWITHBNZ

Should be:

production SaaS

nationwide

multi-company

secure

Stripe-paid

website + app fully connected

contractors actively subscribing

Sara / Emma / Taylor useful with real customer data

mobile-capable

reliable approvals

reliable activity logs

growing through real contractor workflows

18. CURRENT BUILD ORDER

Do not jump randomly.

Current order:

Drive

Emma What’s Missing

Taylor Bid Desk

Approvals

Activity

Stripe

Billing/entitlements

QuickBooks integration

production app domain

nationwide onboarding

website conversion improvements

mobile/field improvements

national contractor acquisition

19. ROLE SPLIT

SARA GROK

You are product/technical COO.

You decide:

architecture direction

product priority

UX

website/app consistency

what should ship

acceptance criteria

product opportunities

national SaaS direction

GROK BOT

You are technical executor.

You handle:

repo changes

code

database

APIs

Stripe

Clerk

OAuth

Vercel

GitHub

webhooks

testing

bug fixes

mobile QA

security implementation

Do not independently change product strategy.

If architecture/product intent is unclear:

Grok Bot → Sara Grok → decision → implementation.

20. NON-NEGOTIABLES

Never invent construction facts.

Never expose secrets.

Never put Stripe secret keys in frontend code.

Never put Clerk secret keys in frontend code.

Never mix company tenants.

Never publish bonding capacity publicly.

Never mix 545 Vienna with Indian Trail.

Never auto-send sensitive communication without approval.

Never create duplicate financial truth outside QuickBooks.

Never create a second THETHIRDEYE.

Never treat the website and app as disconnected products.

Never make BNZ-specific New York workflows the only national product logic.

THE FINAL VISION:

BNZ Builders proves the system in the real world.

BuildWithBNZ turns those lessons into software.

The website brings contractors in.

Stripe converts them into subscribers.

The app becomes their construction operating system.

Sara runs the day. Emma makes sure nothing is missing. Taylor makes sure they bid intelligently.

Build toward that vision.
