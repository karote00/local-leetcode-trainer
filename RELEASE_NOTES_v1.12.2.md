# v1.12.2: Publish Local-Only AI Practice Release

Released: 2026-07-30

This release publishes the local-only problem source changes as the npm package version that users should install. It also clarifies the project mission at the top of the README: practice locally with AI assistance, build confidence, then challenge yourself on the official LeetCode site.

## Highlights

### Local AI practice positioning
- README now states that this project is for practicing coding interview problems locally with AI assistance.
- It explicitly says the project is not a LeetCode scraper and does not fetch problem content from LeetCode.
- Users are guided to use the bundled local problem library first, then open the official LeetCode page when ready.

### Local-only challenge generation
- `lct challenge` generates problems from the bundled local library.
- Automated LeetCode scraping, crawling, direct fetches, and background network checks remain removed.
- `lct open` remains available as a user-initiated shortcut to the official practice page.

### Reliability fixes included
- Bundled problem indexing recursively loads nested problem directories.
- Random challenge selection filters by problem metadata difficulty.
- Active and completed problems are excluded before random selection to reduce duplicate retry failures.

## Verification

```bash
node scripts/regression-tests.js
node --check scripts/challenge.js
node --check scripts/dynamic/local-problem-source.js
node --check scripts/dynamic/problem-manager.js
node --check scripts/dynamic/offline-manager.js
node --check scripts/dynamic/interfaces.js
node --check bin/leetcode-trainer.js
node --check scripts/open-problem.js
```
