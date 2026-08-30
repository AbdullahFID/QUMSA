# QUMSA ADMIN

**qumsa.ca/admin** — the no-code dashboard where QUMSA execs update the website.

## What execs can edit

| Tab | Controls |
|---|---|
| Events | One-off events (auto-hide once past) + weekly programs (Jummah/Halaqa repeat forever) |
| Photos | The Community Memories slideshow — upload, remove, reorder event photos |
| Team | Sections and members — names, roles, fun facts, emails, headshot uploads, reordering |
| Resources | The /resources/links hub — categories, links, icons, featured picks |
| Prayer | Jummah info + images, the monthly calendar image, weekly schedule, campus prayer spaces |
| Halal Food | Every restaurant/store on the /resources/halal map, including coordinates and verified badges |
| FAQ | The questions and answers on /resources/faq |
| Homepage | Impact stats, rotating hero words, footer contact info, social links, donation campaign + e-transfer details |

Daily prayer times are automatic (Aladhan API) and never need editing.

## How it works

Content lives in `src/content/*.json`; images in `public/images/`. When an exec
hits **Save & Publish**, a Cloudflare Pages Function commits the change to this
repo through the GitHub API, and the normal Pages auto-deploy rebuilds the site
(~2 minutes). Every edit is a git commit (`QUMSA Admin: update … (by …)`), so
history *is* the audit log — roll anything back with `git revert`.

Developers can keep editing the JSON (or anything else) in code as usual; the
two workflows never conflict beyond ordinary git.

## Security model

- No credentials in code or in the page. The login checks a **PBKDF2-hashed
  password** against encrypted Cloudflare Pages secrets, then issues an
  **HMAC-signed, HttpOnly, Secure, SameSite=Strict** session cookie (3 days).
  Failed logins are delayed ~1s.
- Secrets on the Pages project (`wrangler pages secret list --project-name qumsa`):
  `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `GITHUB_TOKEN`.
- `/admin` is noindexed and excluded from the sitemap.

## Rotating the password (do this at exec handover)

```sh
node -e '
const c=require("crypto");const pw=process.argv[1];
const salt=c.randomBytes(16).toString("hex");
const h=c.pbkdf2Sync(pw,Buffer.from(salt,"hex"),100000,32,"sha256").toString("hex");
console.log(`pbkdf2$100000$${salt}$${h}`)' 'NEW_PASSWORD_HERE' \
  | wrangler pages secret put ADMIN_PASSWORD_HASH --project-name qumsa
```

Rotate `SESSION_SECRET` the same way (`openssl rand -hex 32`) to instantly log
everyone out. `GITHUB_TOKEN` should be a fine-grained GitHub PAT scoped to only
this repo with **Contents: Read and write**.

## Local development

`pnpm build && wrangler pages dev out` serves the site plus the admin API using
secrets from `.dev.vars` (gitignored — see the secret names above).
