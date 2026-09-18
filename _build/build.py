#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regenerate every BuildWithBNZ page from _build/content_*.py.
Usage (from the repo root):  python3 _build/build.py
Then:                        python3 _build/check.py
The legacy BNZ Builders contractor pages (/about /services /public-works /credentials
/careers /subcontract /work /capability-statement) are NOT generated here and are left as they are."""
import os, sys, datetime
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

from shared import SITE, UPDATED
import content_home, content_pages, content_landers

def write(path, html):
    full = os.path.join(ROOT, path.lstrip('/'))
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8', newline='\n') as f:
        f.write(html)
    return path

PAGES = {
    "/index.html": content_home.page_home,
    "/solutions/index.html": content_pages.page_solutions,
    "/crew/index.html": content_pages.page_crew,
    "/sara/index.html": lambda: content_pages.page_agent("sara"),
    "/taylor/index.html": lambda: content_pages.page_agent("taylor"),
    "/emma/index.html": lambda: content_pages.page_agent("emma"),
    "/how-it-works/index.html": content_pages.page_how,
    "/what-we-connect-to/index.html": content_pages.page_connect,
    "/faq/index.html": content_pages.page_faq,
    "/book/index.html": content_pages.page_book,
    "/thanks/index.html": content_pages.page_thanks,
    "/login/index.html": lambda: content_pages.page_redirect("/", "Moved — BuildWithBNZ"),
    "/privacy/index.html": content_pages.page_privacy,
    "/terms/index.html": content_pages.page_terms,
    "/contact/index.html": content_pages.page_contact,
    "/404.html": content_pages.page_404,
    "/architecture/index.html": lambda: content_pages.page_redirect("/how-it-works/", "Moved — How it works"),
}
for L in content_landers.LANDERS:
    PAGES["/%s/index.html" % L["slug"]] = (lambda L=L: content_landers.page_lander(L))

# URLs that go in the sitemap: generated public pages + the untouched legacy pages
SITEMAP_EXTRA = ["/about/", "/services/", "/public-works/", "/credentials/", "/careers/", "/subcontract/", "/work/", "/capability-statement/"]
NOINDEX = {"/thanks/index.html", "/login/index.html", "/404.html", "/architecture/index.html"}

def main():
    written = []
    for path, fn in PAGES.items():
        written.append(write(path, fn()))
    urls = []
    for path in PAGES:
        if path in NOINDEX: continue
        url = path.replace("index.html", "")
        pri = "1.0" if url == "/" else ("0.9" if url in ("/solutions/", "/book/", "/how-it-works/", "/crew/") else "0.7")
        urls.append((url, pri))
    for u in SITEMAP_EXTRA:
        urls.append((u, "0.4"))
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u, pri in urls:
        sm.append('  <url><loc>%s%s</loc><lastmod>%s</lastmod><priority>%s</priority></url>' % (SITE, u, UPDATED, pri))
    sm.append('</urlset>\n')
    write("/sitemap.xml", '\n'.join(sm))
    write("/robots.txt", "User-agent: *\nAllow: /\nDisallow: /thanks/\n\nSitemap: %s/sitemap.xml\n" % SITE)
    print("wrote %d pages + sitemap.xml + robots.txt" % len(written))

if __name__ == "__main__":
    main()
