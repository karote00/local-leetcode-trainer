# v1.12.1: Local-Only Problem Source

Released: 2026-06-28

This patch release removes automated LeetCode scraping from the challenge flow and makes the bundled local problem library the only source for generated practice problems.

## What Changed

### Local-only challenge generation
- `lct challenge` now loads problems exclusively from `scripts/dynamic/problems`.
- Removed direct scraping, HTML parsing, and background network checks.
- Kept `lct open` for users who want to open the official practice page themselves after solving locally.

### Removed scraper code paths
- Removed the dynamic LeetCode API/scraper implementation.
- Removed the legacy simple scraper/challenge scripts.
- Removed the old problem HTML/JSON parser.

### More reliable random selection
- The bundled problem index now loads nested problem directories recursively.
- Random selection filters by problem metadata difficulty instead of file location.
- Existing active/completed problems are excluded before random selection, reducing duplicate retry failures.

### Docs and CLI wording
- README now states that challenge generation does not scrape, crawl, or fetch LeetCode problem content.
- CLI messages now describe the bundled local library as the source.
- Testing guide now points to the local regression test script.

## Verification

```bash
node scripts/regression-tests.js
node --check scripts/challenge.js
node --check scripts/dynamic/local-problem-source.js
node --check scripts/dynamic/problem-manager.js
node --check scripts/dynamic/offline-manager.js
node --check scripts/dynamic/interfaces.js
```

Also verified that `node ../scripts/challenge.js easy` generates a problem from the local library in an isolated test project.
