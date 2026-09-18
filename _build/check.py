#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sweep the built site: internal links resolve, every page is reachable from the nav,
no subscription-era language, no model names, OG tags on every generated page.
Usage (from the repo root): python3 _build/check.py   → exit 1 on any failure."""
import os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEGACY = {"about", "services", "public-works", "credentials", "careers", "subcontract", "work", "capability-statement"}

BAD = [r"\$\s?\d", r"/\s?mo(nth)?\b", r"\bper month\b", r"cancel any ?time", r"\bGet Started\b", r"\bStart free\b", r"\bSign up\b",
       r"\bsubscription\b", r"\bpricing (page|plans?|nav)\b", r"plans? (&amp;|and) pricing", r"#pricing", r"/pricing", r"\btier\b", r"Stripe", r"checkout", r"buy\.stripe", r"\bGPT\b", r"\bClaude\b", r"\bGrok\b", r"\bOpenAI\b", r"powered by"]
ALLOW = {"Not a plan, not a tier", "no price list", "One set price", "set price", "price in writing", "prices published", "No prices on this site", "price moves", "Price moves"}

def pages():
    for dp, dn, fn in os.walk(ROOT):
        if "/.git" in dp or "/_build" in dp: continue
        for f in fn:
            if f.endswith(".html"):
                yield os.path.join(dp, f)

def rel(p): return "/" + os.path.relpath(p, ROOT).replace(os.sep, "/")

def exists(url):
    url = url.split("#")[0].split("?")[0]
    if not url or not url.startswith("/"): return True
    p = os.path.join(ROOT, url.lstrip("/"))
    return os.path.isfile(p) or os.path.isfile(os.path.join(p, "index.html"))

fails = 0
def fail(msg):
    global fails; fails += 1; print("FAIL", msg)

linked = set()
for p in pages():
    r = rel(p)
    top = r.strip("/").split("/")[0]
    html = open(p, encoding="utf-8").read()
    for href in re.findall(r'(?:href|src)="([^"]+)"', html):
        if href.startswith("/"):
            linked.add(href.split("#")[0].split("?")[0])
            if not exists(href): fail("%s → broken link %s" % (r, href))
    if top in LEGACY: continue  # untouched legacy pages: links checked, language not
    text = re.sub(r"<script.*?</script>", "", html, flags=re.S)
    text = re.sub(r"<[^>]+>", " ", text)
    for pat in BAD:
        for m in re.finditer(pat, text, flags=re.I):
            ctx = text[max(0, m.start() - 40):m.end() + 40].replace("\n", " ")
            if any(a.lower() in ctx.lower() for a in ALLOW): continue
            fail("%s → language '%s' in: …%s…" % (r, m.group(0), ctx.strip()))
    if "404" not in r and "architecture" not in r and "login" not in r:
        for tag in ('property="og:title"', 'property="og:description"', 'property="og:image"', 'rel="canonical"'):
            if tag not in html: fail("%s → missing %s" % (r, tag))
    if html.count("<h1") > 1: fail("%s → more than one h1" % r)

# orphans: generated pages nobody links to
for p in pages():
    r = rel(p); top = r.strip("/").split("/")[0]
    url = r.replace("index.html", "")
    if top in LEGACY or r in ("/404.html",) or url in ("/thanks/", "/architecture/"): continue
    if url != "/" and url not in linked and r not in linked: fail("orphan: %s" % r)

# sitemap urls resolve
sm = open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8").read()
for loc in re.findall(r"<loc>https://buildwithbnz\.com([^<]*)</loc>", sm):
    if not exists(loc): fail("sitemap → %s does not exist" % loc)

print("%d page(s) checked, %d failure(s)" % (len(list(pages())), fails))
sys.exit(1 if fails else 0)
