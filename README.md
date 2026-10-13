# You Met Mike
A tiny, neon, mobile-first social encounter report.

**Live:** https://you-met-mike.craftylion16.chatgpt.site

Visitors can optionally leave a name, email, phone, meeting date/location, notes, and four playful 0–10 ratings. Untouched ratings remain null. Submission requires consent; no visitor sign-in is needed.

## Where reports go
Reports save immediately to a private hosted D1 database. An hourly ChatGPT automation archives new records as JSON files in the private repository `miketrowbridge/youmetmeresults`. This archive depends on the automation remaining enabled and connected to Sites and GitHub; it is not an instantaneous GitHub write. There is no public read endpoint and no email delivery configured.

Source is public; contact information never belongs here. Do not put GitHub tokens in browser code.

## NFC setup
Write this exact URL as one NDEF URL/URI record:
https://you-met-mike.craftylion16.chatgpt.site

In NFC Tools: Write → Add a record → URL/URI → paste URL → OK → Write → hold phone to tag. Close the writer and test the tag. Write the same URL to every tag. Avoid permanently locking tags until tested.

NTAG215 has 540 bytes total memory, including 504 bytes of user memory. A single URL fits easily. The tag is a bookmark, not a data collector; submissions require an internet connection.

## Development
This is a Vinext/React app on Cloudflare Workers through Sites.
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- Schema is in `db/schema.ts`; generate migrations with `pnpm db:generate`.
- Hosting manifest: `.openai/hosting.json`.
- API: `POST /api/encounters`; no public results API.

## Practical limits
Basic validation, consent and a honeypot are included. This is a small novelty app, without a CAPTCHA or robust abuse prevention. The URL may be shared or tags copied; possession of a tag is not identity verification. Repository archives are private but anyone given access can read them. Git retains historical copies: deleting one result file alone does not erase it from history. Keep contact data only as long as needed.

Ratings measure the quantity of each trait, not a combined good/bad score; high awkwardness and dad-joke scores mean more awkwardness and more dad jokes.
