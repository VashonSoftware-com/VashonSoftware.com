---
title: "One engine, two front doors: running a Python CLI in the browser"
description: "I planned a separate TypeScript engine for the web version of my GEDCOM privacy tool. Instead the web page runs the same tested Python package, compiled to WebAssembly, and the file still never leaves the computer. What that cost and what it bought."
pubDate: 2026-12-22
tags: ["architecture", "privacy", "genealogy", "python", "webassembly", "adr", "gedcom-privacy-guard"]
series: { name: "A privacy tool that refuses to decide for you", part: 4 }
draft: true
---

GEDCOM Privacy Guard finds the notes in a family-tree export that shouldn't be shared: a
living cousin's diagnosis, an arrest, a phone number. Until this month it was a Python
command-line tool. Now it is also a web page, at [gedcomtools.com](https://gedcomtools.com),
and the web page runs the same Python code. Not a port. The same package, the same rules file,
the same tests.

That is the opposite of what I planned. This post is about the decision record I wrote in
July, the one that replaced it in October, and why the "worse" option was the right one.

## The plan: two engines, one spec

The tool has to work on Windows, macOS, iPads and Android tablets. A Python CLI covers the
first two, for people who will open a terminal. It covers no tablets, and no genealogist who
won't type `pipx install`.

So ADR-004 (July) chose two tracks: keep the Python CLI, and build a browser app in React and
TypeScript that reads the file with the File API, with no server and no install. They would
share a *design*, not code: the same rule categories, the same report columns, the same
`keep` / `redact` / `rewrite` / `privatize` vocabulary. The CLI's `rules.yaml` would be the spec
the web app mirrored. ADR-005 added the stack (Vite, TypeScript, free static hosting) and an
action item: port the engine to TypeScript.

On paper this was tidy. Each runtime would get a native engine. The web version would be a
small download and fast.

## What changed: the testers

Then I went looking for testers. The people who most need this tool are genealogists with
decades of notes, and most of them are not programmers. Asking them to install Python was
asking them not to test it. The web version had to come before 1.0, not after.

Porting the engine meant rewriting a GEDCOM parser, the character encodings old exports use
(including ANSEL, a 1980s library standard that older genealogy programs still write), the
scanner, the redactor and the Excel report. Then rewriting their tests. Then keeping two
engines in step, rule for rule, forever. The Python one already had 160+ tests, property-based
fuzzing with Hypothesis, and a run against a real 192,000-person export.

## The decision: Pyodide

ADR-010 (29 October) runs the Python package in the browser with
[Pyodide](https://pyodide.org), CPython compiled to WebAssembly, inside a Web Worker so the
page stays responsive. The interface is still React and TypeScript. The bridge between them is
one small module, `web.py`: it takes file paths in Pyodide's in-memory file system and returns
JSON. It is tested with pytest like the rest of the package.

The trade-offs, as measured on 2026-10-29:

| | Python in Pyodide (chosen) | TypeScript port |
| --- | --- | --- |
| Matches the CLI | Exactly: same code, same rules file | Only while two codebases are kept in step |
| Work before testers could start | Small | Large, plus a second test suite |
| First visit | About 13 MB, then cached | About 250 kB (estimate) |
| 192k-person tree | About 95 s (37 s native) | Faster |

The port wins on download size and speed. Neither matters much for a tool people use a few
times a year, and a typical tree takes seconds. The port's cost, though, never ends: every
parser fix and every rule change made twice, and every difference between the two a bug some
user finds first.

## Keeping the promise checkable

The product's main promise is that **your file never leaves your computer.** A server that
processes uploads was ruled out on day one: it breaks the promise, and it costs money every
time someone uses it.

Running in the browser keeps the promise, but "trust me" isn't enough for a privacy tool, so
the page is built so anyone can check it:

- **Everything comes from our own site.** A build script copies the Pyodide runtime from npm
  and fetches the two Python libraries the engine needs (PyYAML and openpyxl), pinned to the
  versions in the lockfile, checking every sha256. The page asks no other site for anything.
- **The browser enforces it.** The Content-Security-Policy says `connect-src 'self'`, allows
  no remote scripts, and grants only `'wasm-unsafe-eval'`, which lets the browser compile
  WebAssembly without letting JavaScript `eval` anything. A page that tried to send your
  tree somewhere would be blocked, and the network panel would show it.
- **It works offline.** A service worker keeps the page's own files (never the tree), so you
  can load the page, switch off Wi-Fi, and check your file. That's the simplest test there is.
- **The Python side has no network code at all,** and a test fails the build if anyone adds
  an import that could open a connection.

Hosting is static files on Cloudflare Workers, on the free plan. There's no Worker script:
nothing on our side ever sees a request body.

## What it cost

- **The first visit is heavy.** About 13 MB before the first check, cached after that. The
  page says what it's doing while it loads.
- **Big trees are slow.** A 100,000-person tree takes a minute or more in the browser. The
  page says so, and shows progress, rather than looking frozen.
- **The web build needs two toolchains,** Node for the interface and Python packaging for the
  engine. Upgrading Pyodide also changes which PyYAML build gets fetched, so it's pinned.
- **Cache rules need care.** Pyodide's files keep the same names between builds, so they are
  served with `Cache-Control: no-cache`: the browser checks for a newer copy instead of
  downloading it again.

## What it bought

One engine. When "during the Depression" turned up flagged as mental health, the fix was one rule and one test in the Python package, and it reached the CLI and the web
page in the same commit. Under ADR-004 that would have been two fixes in two languages, and
a chance to get one of them slightly wrong.

It also bought time. The first web page went live the day the decision was written, running the
engine that already passed its tests, instead of waiting months for a port that would have
been less tested on day one.

## The lesson

I wrote ADR-004 for the platforms. I should have written it for the people. "Must run on an
iPad" was the right constraint; "so build a second engine" was a guess about the cheapest way
to meet it, made before WebAssembly made running the first engine there practical. When the
testers turned out to be the real constraint, the decision record made it easy to see which
part to change: ADR-010 replaces the engine half of ADR-004 and leaves the rest standing.

If you have a well-tested library in one language and need it somewhere that language doesn't
usually run, check whether you can take the library with you before you rewrite it.

Try it at [gedcomtools.com](https://gedcomtools.com). The code is at
[github.com/VashonSoftware-com/gedcom-privacy-guard](https://github.com/VashonSoftware-com/gedcom-privacy-guard),
MIT-licensed, and in beta.

---

*Behavior as of 2026-11-26; timings and download size from ADR-010, measured 2026-10-29. The
192,000-person tree is reported as counts only; no real family notes are quoted.*
