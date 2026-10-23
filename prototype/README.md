# Funship prototype

A clickable, front-end-only demo of Funship, built from `docs/PRD.md`. It needs no installs and no backend: open `index.html` in a browser.

## Run it

- **Quickest:** double-click `prototype/index.html`.
- **With a local server** (needed for the microphone in some browsers): from the repo root run `npx serve prototype` or `python3 -m http.server -d prototype 8000`, then open the address it prints.

Use the **Prototype** switcher in the bottom-left corner to view the product as Alex Chen (parent), Jamie Morgan (parent) or the maker (you). **Reset demo** restores the starting data.

## What's in it

| Area | Try this |
| --- | --- |
| Marketing site | Home, ideas gallery (27 ideas, filterable), idea pages, how it works, pricing, gifts, FAQ, privacy |
| Intake | "Start your app": 7 steps, voice or typing, family members, picture uploads, consent, then an editable build plan |
| Scope guardrails | Type "Pokémon" or "track their location" in step 1 to see the kind refusal |
| Booking and paying | Book an idea session; accept Jamie's Japan Family Quest plan (demo checkout, no card charged) |
| Build tracking | Chore Quest project: four-stage timeline, maker updates, live preview |
| Voice feedback | "Tell us what you think" in the Chore Quest app: kid mode with faces, mic, follow-up question |
| Gifts | Buy a gift with a live card preview, print it, redeem it at `#/redeem/demo-gift` |
| Maker workbench | Today view, requests, sending a plan and price, feedback board, builds, calls, gifts, App Kit |
| Delivered app | `#/app/chen-chore-quest`: tick chores, earn stars, switch kids, change character. Mark the unicorn feedback "Done" in the workbench to unlock the unicorn and bigger stars |

## How it's built

Plain HTML, CSS and JavaScript, no dependencies, so it runs anywhere.

- `styles.css`: design tokens (light and dark), layout, components
- `js/data.js`: ideas catalogue, tiers, fictional seed data
- `js/core.js`: browser storage, router, helpers, icons, the Pip mascot
- `js/layout.js`: page shells and the harbour hero illustration
- `js/voice.js`: voice capture (browser speech recognition, or a labelled demo transcript) and the feedback sheet
- `js/views-*.js`: the site, family portal, maker workbench and demo app

Everything is stored in your browser's local storage. Payments, emails and AI are simulated. Fonts load from Google Fonts and fall back to system fonts offline.

## Next step

Port to the PRD's stack (Next.js, Supabase, Stripe, Resend) once the flows feel right. The screens, copy and data shapes here map directly to PRD sections 6–10.
