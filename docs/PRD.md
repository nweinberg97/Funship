# Custom family apps: Product Requirements Document

## My understanding

You’re building a bespoke app-making service for families, not another app marketplace or no-code builder. A parent, child (through their parent), or gift-giver describes something they wish existed specifically for their family. You turn that idea into a polished, personal web app, using AI-assisted development and a reusable technical foundation.

The product has three connected experiences:

- The family experience: A warm, playful website where families discover ideas, describe what they want by voice or text, approve a build brief, pay, track progress, and enjoy their finished app.
- The gifting experience: A first-class way to give someone a custom family app, including personalized messages, scheduled delivery, printable gift cards, and gifts intended for a particular child.
- The maker experience: A private workspace where you manage requests, proposals, builds, voice feedback, revisions, payments, and reusable templates without drowning in administration.

The strategic decision is to sell personalization and craftsmanship, supported by standardized infrastructure. Families should feel that their app was made just for them. You should not have to engineer every app from scratch.

The initial product will deliberately serve a curated range of family-friendly use cases, with fixed complexity tiers, clear boundaries, and a manageable workload for one builder. Voice feedback will be a defining feature, but the first release must remain useful even when voice transcription or AI services are unavailable.

## Name: Funship

Playful · Warm · Giftable

Funship is the chosen brand name. It blends "fun" with the "-ship" of friendship and kinship (the bond a family shares), and it carries a quiet maker pun: we *ship* your family's app. It is short, easy for a child or grandparent to say and spell, and it works as a gift noun.

Gift test: "I got you a Funship app."

Earlier working names (Littlewonder, Ourlittleworld, Makebelly) are retired. Funship still needs trademark and domain clearance (see 1.2); all brand names, domains, and assets remain replaceable through configuration.

# 0. Assumptions & decisions

These decisions are authoritative for the initial build. If a future requirement conflicts with them, the coding agent follows this section unless a later section explicitly narrows the decision.

## Product and business

- Working name: Funship. All brand names, domains, and assets remain replaceable through configuration.
- Product: A human-led custom app service, supported by an online request portal. It is not a self-service app generator.
- Initial market: Families in Canada and the United States, starting with Vancouver and English-speaking North America.
- Primary customer: A parent or legal guardian. Children are end users, never independent account holders.
- Business model: Fixed-fee custom builds, optional paid discovery, and optional ongoing care. No mandatory subscription.
- Launch size: First 10 paid or explicitly discounted pilot families, then the first 100 customers.
- Builder: One founder with AI coding tools. The system must minimize repetitive administration, context switching, and custom engineering.
- Service promise: A small, personal web app that solves a specific family need, with an agreed scope and a human maker accountable for delivery.
- No unsubstantiated promises: Never advertise a turnaround, capability, privacy guarantee, or integration that has not been implemented and verified.

## Pricing and scope

- Sprout: $299 USD / approximately C$415.
- Bloom: $699 USD / approximately C$970.
- Grove: $1,499 USD / approximately C$2,075.
- Discovery session: $49 USD / approximately C$68, credited toward a build purchased within 14 days.
- Ongoing care: $19 USD/month / approximately C$27, optional, cancel anytime.
- Gift cards: $100, $300, $700, or a full tier purchase. A gift card pays for eligible services; it does not represent cash held in a bank account.
- CAD equivalents are launch planning estimates, not live foreign-exchange conversions. Configure currency prices separately in Stripe.
- Tax is calculated according to applicable jurisdiction and Stripe Tax configuration. Display the final payable amount before checkout.
- No native iOS or Android app-store distribution in the initial service. Deliver responsive web apps and PWAs.
- No open-ended hourly billing, unlimited revisions, or guaranteed custom software integrations.

## Technical decisions

- Next.js App Router, TypeScript, React, Tailwind CSS, shadcn/ui, and Lucide icons.
- Supabase for PostgreSQL, authentication, and private object storage.
- Stripe Checkout and webhooks for payment.
- Resend and React Email for transactional email.
- Built-in booking availability rather than a third-party calendar dependency.
- Voice transcription through a server-side Whisper-compatible provider interface, with a local/mock implementation and an optional hosted provider.
- LLM services behind an interface with deterministic mock implementations.
- All secrets are server-only. AI provider calls never originate directly from the browser.
- Use one multi-tenant Next.js application with family-specific paths and configurable subdomains. Begin with paths; add wildcard subdomains only after deployment DNS and SSL are verified.
- Use a shared Supabase project with strict RLS, tenant-scoped records, and server-side authorization.
- Initial production deployment target: Vercel plus Supabase. Local development must work without external accounts.

## Legal, privacy, and safety

- Parents own accounts. A child may use an app only under the responsible adult's supervision and consent.
- Do not collect a child's precise location, school address, date of birth, health records, government IDs, or unnecessary personal information.
- Uploads and transcripts are private by default.
- Never store raw voice recordings. Hold them in memory during transcription where the infrastructure supports it, then discard them.
- Do not use family content to train models.
- Do not promise legal compliance solely because technical safeguards exist. Obtain legal review before production launch.
- Original characters, licensed assets, and user-owned drawings are allowed within defined rights and safety rules. Do not reproduce copyrighted entertainment characters on request.

## MVP boundaries

The first release includes:

- Marketing site and curated ideas gallery.
- Authentication and family portal.
- Guided intake with text, optional voice, uploads, and an editable build brief.
- Manual booking, proposals, and progress tracking.
- Stripe payments and gift-card redemption.
- One production-quality example app.
- Preview links and voice/text feedback.
- Admin console and email notifications.
- PWA delivery for simple family apps.
- Seeded mock mode and critical-path tests.

The first release does not include automated app generation, fully automated deployments for arbitrary customer projects, family chat, a native app, an app marketplace, public user-generated content, or a general-purpose drag-and-drop builder.

# 1. Name & brand identity

## 1.1 Word-association exercise

Use these clusters to guide naming, copy, illustrations, and the product experience.

| Cluster            | Words and associations                                           | Brand opportunity                                      |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------------------ |
| Family             | Us, ours, familiar, home, people, generations, little traditions | Belonging without being sentimental                    |
| Togetherness       | Side by side, shared, connected, circle, close, gathering        | One small tool that brings people together             |
| Making             | Make, craft, shape, build, stitch, sketch, tinker                | Human craftsmanship rather than mass-produced software |
| Magic              | Wonder, spark, wish, surprise, delight, discovery                | A child's drawing becoming something real              |
| Small and handmade | Little, pocket, tiny, keepsake, hand-drawn, one-of-a-kind        | Personal scale, quality, intimacy                      |
| Play               | Quest, explore, imagine, invent, adventure, collect              | Everyday tasks made more enjoyable                     |
| Just for us        | Our own, custom, personal, one-of-one, inside joke, family lore  | Exclusive relevance rather than generic feature counts |
| Growth             | Seasons, bloom, roots, growing, change, new chapters             | Apps that evolve with a family                         |

Naming principle: Prefer warmth and ownership over technical language. Avoid names that sound like an enterprise SaaS platform, an AI chatbot, a parenting surveillance tool, or a children's game publisher.

## 1.2 Twenty name candidates

These are creative candidates, not cleared names.

| #  | Name                | Style                 | Main association             |
| -- | ------------------- | --------------------- | ---------------------------- |
| 1  | Funship (chosen)    | Compound              | Fun + friendship/kinship     |
| 2  | Ourlittleworld      | Compound              | Belonging                    |
| 3  | Makebelly           | Invented              | Playful creation             |
| 4  | Wondermade          | Compound              | Crafted delight              |
| 5  | Usmade              | Invented/compound     | Made for us                  |
| 6  | Nestcraft           | Compound              | Family and making            |
| 7  | Tinytraditions      | Compound              | Shared rituals               |
| 8  | Pocketwonder        | Compound              | Small, personal experiences  |
| 9  | Kinfolk Works       | Real-word combination | Family craftsmanship         |
| 10 | Little Keepsake     | Warm phrase           | Memories                     |
| 11 | The Family Workshop | Descriptive           | Custom making                |
| 12 | Our Kind of Magic   | Phrase                | Individuality                |
| 13 | Tinkertogether      | Playful compound      | Collaborative creation       |
| 14 | Wishworks           | Compound              | Turning wishes into products |
| 15 | Madeforus           | Descriptive compound  | Exclusivity                  |
| 16 | Wondernest          | Compound              | A home for family ideas      |
| 17 | Puddlepop           | Invented              | Playful, child-friendly      |
| 18 | Make a Little       | Playful verb phrase   | Small acts of making         |
| 19 | Storysprout         | Compound              | Personal stories             |
| 20 | Usberry             | Invented              | Warmth and uniqueness        |

### Shortlist and selection

| Candidate | Strength | Weakness | Decision |
| --------- | -------- | -------- | -------- |
| Funship | Short, playful, easy to say and spell; echoes friendship/kinship; "ship your app" maker pun | "Fun Ships" has long been associated with a cruise line, so trademark clearance needs care | **Chosen** |
| Littlewonder | Broad enough for practical tools and magical gifts | Two common words may make search and trademark clearance harder | Retired |
| Ourlittleworld | Extremely clear emotional positioning | Longer to type and less natural as a gift noun | Retired |

### Required checks before committing

I cannot verify the current availability of these names, domains, trademarks, app listings, or social handles here. Complete the following checklist for Funship before committing.

- Check `funship.com`, `funship.ca`, `funship.co`, `funship.app`, `getfunship.com`, `funship.family`, and spelling variants such as `fun-ship`.
- Search the Canadian Intellectual Property Office trademark database for exact, phonetic, and similar marks in relevant software, entertainment, and custom-service categories.
- Search the USPTO trademark database using the same terms and related goods/services. Pay particular attention to existing "Fun Ship" / "Fun Ships" marks in travel and entertainment.
- Review potentially conflicting common-law business names and active websites in Canada and the US.
- Search the Apple App Store and Google Play for identical and confusingly similar names.
- Check Instagram, TikTok, Pinterest, YouTube, and relevant community platforms for handles.
- Check whether the preferred domain can be purchased and whether the name is distinctive enough to be searchable.
- Obtain a lawyer's clearance opinion before significant brand investment.

Do not infer trademark rights from owning a domain. Do not purchase expensive secondary-market domains before clearance.

## 1.3 Taglines

1. Little apps. Big family magic.
2. Made just for your kind of family.
3. Your family's ideas, brought to life.
4. A little world that's all yours.
5. The gift of something made just for you.
6. From wish to ship.

Recommended tagline: Little apps. Big family magic.

Positioning statement: Funship turns the little things that make a family unique into beautiful, useful web apps made just for them, without the clutter of off-the-shelf software.

# 2. Brand & design system

## 2.1 Brand personality

| Trait      | This, not that                 |
| ---------- | ------------------------------ |
| Warm       | Welcoming, not saccharine      |
| Playful    | Curious, not chaotic           |
| Thoughtful | Intentional, not feature-heavy |
| Handmade   | Personal, not amateurish       |
| Calm       | Reassuring, not clinical       |

The brand should feel like a well-designed picture book translated into a modern digital product. Use generous whitespace, expressive but restrained illustrations, and crisp typography.

## 2.2 Voice and tone

Write like a thoughtful maker who is good with children and respects parents' time. Keep instructions short. Avoid exaggerated claims, corporate jargon, baby talk, and unnecessary AI references.

| Situation                 | Example                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| Empty ideas gallery       | “Your next Funship app starts with an idea.”                                                           |
| No requests yet           | “Nothing on the workbench just yet. What would make family life a little easier?”                        |
| Empty feedback            | “No notes from your family yet. We'll keep an ear out.”                                                  |
| Error                     | “That didn't quite work. Your progress is safe. Try again.”                                              |
| Upload error              | “We couldn't add that picture. Try a JPG, PNG, or WebP under 10 MB.”                                     |
| Loading                   | “Gathering your ideas…”                                                                                  |
| AI processing             | “Tidying up your notes into a build brief…”                                                              |
| Save success              | “All tucked away. You can pick this up later.”                                                           |
| Payment success           | “You're officially on the workbench. We'll send your receipt and next steps by email.”                   |
| Gift purchase             | “A little something made just for them.”                                                                 |
| Gift redeemed             | “Your gift is ready to become something wonderful.”                                                      |
| App delivered             | “It's yours. Time to make a little magic.”                                                               |
| Parent-facing scope limit | “That idea is outside what we build right now. We can help you find a simpler, family-friendly version.” |
| Child-facing scope limit  | “We can't make that version, but let's imagine a new character of your very own!”                        |
| Kid-facing success        | “You did it! Your idea made it into the app.”                                                            |
| Kid-facing feedback       | “What should we change? Tell us or tap a face.”                                                          |

### Copy rules

- Use “your family,” “your app,” and “made for you.”
- Say “custom app,” not “AI-generated app,” in the primary marketing message.
- Explain AI's role honestly: it helps organize ideas and accelerate building; a human maker reviews the work.
- Do not call a child “the product user” in public copy.
- Never guilt customers into renewing or paying.
- Do not imply that personal family content is public.

## 2.3 Colour tokens

Light and dark themes must use semantic tokens. Do not hardcode hex colours into component files.

| Token            | Light     | Dark      | Purpose          |
| ---------------- | --------- | --------- | ---------------- |
| `background`     | `#FFF9F1` | `#191916` | Main canvas      |
| `surface`        | `#FFFFFF` | `#24241F` | Cards and sheets |
| `surface-muted`  | `#F5EDE1` | `#302F29` | Secondary panels |
| `text-primary`   | `#292820` | `#F8F3EA` | Main text        |
| `text-secondary` | `#6E6A5E` | `#C3BDAF` | Supporting text  |
| `border`         | `#E6DDCF` | `#454239` | Borders          |
| `primary`        | `#7157A5` | `#B8A2EB` | Main actions     |
| `primary-hover`  | `#5D438D` | `#CCBBF4` | Hover/active     |
| `secondary`      | `#DDECCB` | `#3C5035` | Soft green       |
| `accent`         | `#F2A36F` | `#F4B083` | Warm highlights  |
| `success`        | `#2E7353` | `#91D2A8` | Success          |
| `warning`        | `#916016` | `#EAC477` | Warnings         |
| `danger`         | `#B43C3C` | `#FFAAAA` | Errors           |
| `focus-ring`     | `#3568C0` | `#A9C8FF` | Keyboard focus   |

Do not use the accent palette for long body text if contrast fails WCAG. Add automated contrast checks for the final semantic combinations.

## 2.4 Typography

Use Google Fonts:

- Headings: `Nunito`, weights 600 and 700.
- Body and UI: `DM Sans`, weights 400, 500, 600, and 700.
- Fallback: system sans-serif.

| Token      | Size             | Weight | Line height |
| ---------- | ---------------- | ------ | ----------- |
| Display    | 48 px / 3 rem    | 700    | 1.1         |
| H1         | 40 px / 2.5 rem  | 700    | 1.15        |
| H2         | 32 px / 2 rem    | 700    | 1.2         |
| H3         | 24 px / 1.5 rem  | 700    | 1.25        |
| H4         | 20 px / 1.25 rem | 600    | 1.3         |
| Body large | 18 px            | 400    | 1.6         |
| Body       | 16 px            | 400    | 1.55        |
| Body small | 14 px            | 400    | 1.5         |
| Caption    | 12 px            | 500    | 1.4         |
| Button     | 15 px            | 600    | 1.2         |

On mobile, scale display text down to 36 px and H1 to 32 px. Never reduce essential form labels below 14 px.

## 2.5 Spacing, radii, shadows

Use a 4 px base spacing unit.

| Token      | Value |
| ---------- | ----- |
| `space-1`  | 4 px  |
| `space-2`  | 8 px  |
| `space-3`  | 12 px |
| `space-4`  | 16 px |
| `space-5`  | 20 px |
| `space-6`  | 24 px |
| `space-8`  | 32 px |
| `space-10` | 40 px |
| `space-12` | 48 px |
| `space-16` | 64 px |
| `space-20` | 80 px |

| Token            | Value                             |
| ---------------- | --------------------------------- |
| `radius-sm`      | 8 px                              |
| `radius-md`      | 12 px                             |
| `radius-lg`      | 20 px                             |
| `radius-xl`      | 28 px                             |
| `radius-pill`    | 999 px                            |
| `shadow-card`    | `0 4px 20px rgba(41,40,32,0.06)`  |
| `shadow-popover` | `0 12px 40px rgba(41,40,32,0.14)` |

## 2.6 Motion principles

- Use CSS transitions for hover, focus, and state changes.
- Micro-interactions: 120–180 ms.
- Panel and sheet transitions: 200–260 ms.
- Page transitions: 180–240 ms.
- Use an ease-out curve such as `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Never delay navigation, form completion, or feedback submission to play an animation.
- Celebrate first delivery, successful gift redemption, and completing a family quest. Use a brief confetti burst lasting no more than 1.2 seconds.
- Do not use confetti for payments that are still processing, ordinary saves, error recovery, or sensitive family situations.
- Honor `prefers-reduced-motion`. Disable parallax, bouncing, and confetti for reduced-motion users.

## 2.7 Illustration and mascot

Mascot concept: Pip, the Little Spark.

Pip is an original small, rounded four-point star with two tiny eyes, a subtle asymmetrical smile, and short mitten-like arms. Pip is not a talking assistant and does not appear in every interaction. Its job is to signal discovery, encouragement, and completion.

- Shape language: rounded, imperfect, paper-cut silhouettes.
- Palette: lavender, peach, sage, cream, and dark ink.
- Texture: subtle paper grain on static marketing illustrations; flat vector fills in the interface.
- Expressions: curious, proud, sleepy, delighted.
- Avoid resemblance to existing animated characters, brand mascots, or recognizable entertainment properties.
- Keep illustration files in `/public/illustrations/brand/`, with an asset manifest and documented usage.

### Family-created art

Family uploads must remain recognizable.

1. Preserve the original file privately.
2. Generate a safe display derivative only when required for performance.
3. Allow the builder to manually turn an uploaded drawing into a cropped character asset.
4. Never silently replace a child's drawing with an AI reinterpretation.
5. When an AI-assisted adaptation is created, label it “Inspired by your drawing” and preserve the original alongside it.
6. Do not send children's drawings to third-party image models by default. Any optional external processing requires explicit parent approval and clear disclosure.

## 2.8 Accessibility

Target WCAG 2.2 AA.

- Every interactive control must have a keyboard-accessible focus state.
- Body text and essential UI must meet contrast requirements.
- Interactive targets must be at least 24 × 24 CSS px under WCAG 2.2 AA, except where the standard permits otherwise. For child-facing controls, target at least 48 × 48 px.
- Provide visible labels, accessible names, form instructions, and field-specific errors.
- Never use colour as the sole indicator of state.
- Support keyboard navigation, screen readers, 200% zoom, and reduced motion.
- Voice recording must have an equivalent text-input path.
- Recording state must be indicated with text and animation-independent visual feedback.
- For grandparents, default to clear typography, plain labels, large buttons, and no hover-only actions.
- Never require a timed response to complete a core workflow.
- Use semantic HTML, proper heading hierarchy, and accessible dialogs.
- Test with VoiceOver and NVDA for critical flows.

# 3. Users & personas

| Persona                      | Goals                                                                    | Frustrations                                                                   | Delight                                                                | Devices                      |
| ---------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------------- |
| Busy parent — primary buyer  | Solve a specific family problem; reduce mental load; get a personal gift | Complex setup, endless settings, subscriptions, managing several apps          | Describe the idea in two minutes and receive a useful app              | iPhone, Android, laptop      |
| Co-parent / partner          | Participate, give feedback, share the app and family routines            | Being left out of decisions, duplicated information                            | Easy preview link and a clear place to suggest changes                 | Mobile first                 |
| Gift-giver                   | Give something meaningful and personal                                   | Generic gifts, uncertainty about what the family wants, awkward redemption     | A beautiful gift card and a clear route from gift to finished app      | Mobile, email, desktop       |
| Child — end user, no account | Play, create, see themselves represented, feel heard                     | Small controls, boring content, adult-oriented screens                         | Their drawing becomes a character and their suggestion changes the app | Tablet, shared phone, laptop |
| Builder/admin — founder      | Build excellent apps efficiently, maintain quality, control scope        | Unstructured briefs, scattered feedback, context switching, unpredictable work | One inbox, clear scope, reusable components, fewer repetitive tasks    | Laptop, desktop              |

## User permissions

- Parent/guardian: Owns the account, creates family profiles, uploads content, consents to child-related processing, manages billing and sharing.
- Co-parent: Can be invited by the primary account holder. MVP permissions are limited to viewing projects and submitting feedback. Billing and deletion remain with the owner.
- Gift recipient: Starts as an email recipient without an account; redeems a code and then creates or signs into an account.
- Child: Uses an app under parental supervision. No independent portal login, email address, account profile, or direct AI chat.
- Builder/admin: Accesses the private admin console. Only explicitly authorized admin accounts can access it.

# 4. The "Menu": what we build

## 4.1 Categories

The ideas gallery contains these nine categories. Each example is a starting pattern, not a promise that every requested feature is included.

### Category A — Trips & adventures

| Example            | Pitch and magic moment                                                                                     | Typical features                                         | Tier   | Typical build time |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------ | ------------------ |
| Japan Family Quest | Turn a Japan itinerary into a shared adventure map; a child unlocks a city when the family completes a day | Itinerary, day cards, saved places, simple checklist     | Bloom  | 10–14 working days |
| Road Trip Bingo    | Personalized bingo cards featuring the family's favourite road-trip sights                                 | Custom cards, reusable rounds, score display             | Sprout | 5–7 working days   |
| Family Memory Map  | A visual trip journal with private photos and notes                                                        | Location labels entered by adults, photo cards, timeline | Bloom  | 10–14 working days |

### Category B — Meals & cooking

| Example              | Pitch and magic moment                                                      | Typical features                                     | Tier   | Typical build time |
| -------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------- | ------ | ------------------ |
| The Dinner Picker    | Make a weekly menu from family-approved meals; no more “what's for dinner?” | Meal cards, simple filters, weekly plan              | Sprout | 5–7 working days   |
| Little Chef Cards    | Recipes written for a child with their own illustrations                    | Recipe steps, adult supervision notes, illustrations | Bloom  | 10–14 working days |
| Family Recipe Garden | Preserve recipes from grandparents and make them easy to browse             | Recipe library, categories, private photo uploads    | Bloom  | 10–14 working days |

### Category C — Schedules & routines

| Example            | Pitch and magic moment                                 | Typical features                                         | Tier   | Typical build time |
| ------------------ | ------------------------------------------------------ | -------------------------------------------------------- | ------ | ------------------ |
| Morning Mission    | Turn a morning routine into a series of cheerful steps | Routine cards, completion states, character rewards      | Sprout | 5–7 working days   |
| Shared Family Week | One calm weekly view of household events               | Calendar-style list, manually entered events, categories | Bloom  | 10–14 working days |
| Bedtime Lantern    | A personalized visual wind-down routine                | Steps, gentle illustrations, optional timer              | Sprout | 5–7 working days   |

### Category D — Chores & rewards

| Example                | Pitch and magic moment                                             | Typical features                                    | Tier  | Typical build time |
| ---------------------- | ------------------------------------------------------------------ | --------------------------------------------------- | ----- | ------------------ |
| Chore Quest            | Children complete chores to earn stars for a family-defined reward | Chore cards, stars, parent reset, custom characters | Bloom | 10–14 working days |
| The Family Quest Board | A shared board of family goals and completed activities            | Task cards, progress indicators, simple history     | Bloom | 10–14 working days |
| Pocket Points          | A small points board for agreed household contributions            | Points, manually defined rewards, parent controls   | Bloom | 10–14 working days |

Rewards are symbolic or parent-managed. Funship does not hold money or automate financial transfers.

### Category E — Kids' games & stories

| Example               | Pitch and magic moment                                          | Typical features                                         | Tier  | Typical build time |
| --------------------- | --------------------------------------------------------------- | -------------------------------------------------------- | ----- | ------------------ |
| Drawn-by-Me Quest     | A child's drawing becomes the hero of a simple original game    | Character image, simple choices, progress states         | Bloom | 10–14 working days |
| Bedtime Story Machine | A family-approved story adventure featuring original characters | Prewritten story branches, illustrations, restart        | Bloom | 10–14 working days |
| Pet Hero              | Turn the family pet into the hero of a small collection game    | Character cards, collectible badges, local game progress | Bloom | 10–14 working days |

MVP stories use curated content and manually authored branches. They do not include unrestricted live story generation for children.

### Category F — Celebrations & gifts

| Example               | Pitch and magic moment                                       | Typical features                            | Tier   | Typical build time |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------- | ------ | ------------------ |
| Birthday Universe     | A birthday page with personalized quests and family messages | Countdown, activity cards, photos, messages | Bloom  | 10–14 working days |
| Holiday Countdown     | A custom countdown with a small daily family activity        | Date countdown, reveal cards, illustrations | Sprout | 5–7 working days   |
| New Baby Welcome Book | A private digital keepsake for a new arrival                 | Milestone cards, photos, messages           | Bloom  | 10–14 working days |

### Category G — Memories & keepsakes

| Example             | Pitch and magic moment                                             | Typical features                                              | Tier  | Typical build time |
| ------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------- | ----- | ------------------ |
| Our Family Book     | A private family storybook built from selected photos and captions | Chapters, image cards, captions                               | Bloom | 10–14 working days |
| Grandparent Stories | Record and preserve stories from older family members              | Manual audio upload disabled by default; text stories, photos | Grove | 15–25 working days |
| Year-in-Our-Life    | A visual recap of the family's favourite moments                   | Timeline, categories, captions                                | Bloom | 10–14 working days |

### Category H — Grandparents & far-away family

| Example            | Pitch and magic moment                                         | Typical features                                         | Tier   | Typical build time |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------------------- | ------ | ------------------ |
| Hello, Grandma     | One easy place for approved photos, messages, and call details | Private gallery, manually maintained call schedule       | Bloom  | 10–14 working days |
| Family Hello Board | A shared visual board of greetings and family updates          | Message cards, photos, parent-managed publishing         | Bloom  | 10–14 working days |
| Our People Book    | A child-friendly visual guide to relatives and family stories  | Family-approved portraits, relationship labels, captions | Sprout | 5–7 working days   |

No automatic calling, video conferencing infrastructure, or public social feed in MVP.

### Category I — Learning & practice

| Example              | Pitch and magic moment                                           | Typical features                                | Tier   | Typical build time |
| -------------------- | ---------------------------------------------------------------- | ----------------------------------------------- | ------ | ------------------ |
| Spelling Safari      | A personalized spelling practice game with family-selected words | Cards, quizzes, simple progress                 | Bloom  | 10–14 working days |
| Piano Practice Quest | A cheerful practice checklist built around the child's goals     | Practice sessions, streak-free progress, badges | Sprout | 5–7 working days   |
| Our Language Garden  | Practice vocabulary selected by the family                       | Flashcards, quizzes, manual word lists          | Bloom  | 10–14 working days |

Learning tools are recreational aids, not professional educational assessments or disability accommodations.

## 4.2 Complexity tiers

[Angststörungen bei Kindern und Jugendlichen: Erkennen, Verstehen, Behandeln | SchemaPath](https://images.openai.com/static-rsc-4/BOw446Dq3Xjkj1G1kKFvey-4C0kM5odMrj-wFYhYhrhrjtnKnlvFAfLTN4Mzeq8Q1VFGe3Fwu4IQ-NYrtiRzyggJU3UyrrIxErCeNiRlaCwJ1tQlrrtbSYXFwZmP07snlWVfwT7-t_LqUAqZVdj5U-OFaXXPEgYSkwh9TJHmvQE?purpose=inline)

## Sprout

### $299 USD

C$415 approx.

A focused, small app built around one core activity.

- Up to 4 distinct screens/routes.
- One primary workflow.
- One family profile and up to 5 child or adult member profiles.
- Basic customization: name, colours, illustrations, supplied images.
- No external integrations.
- One consolidated revision round.
- Target turnaround: 5–7 working days after scope and assets are approved.

[I use AI when I code. And sometimes it makes me feel like I’m cheating. - DEV Community](https://images.openai.com/static-rsc-4/ruI1aFdH1kYEqXWLegUVpNUdUOX38E7DNZnMsvYRDcBaN5k--Lf5NXZojdf45YQtdkYYDb_rJbA5_jLaCCAXtv5LJJkb1r_RCZiZCnzfcrj4N1s603pskJU9j4Pbm90DMgM10bJXkwU6-Fr80-Jax5zuSDjuN4YGqyAeDPbtKw0?purpose=inline)

## Bloom

### $699 USD

C$970 approx.

A more expressive app with multiple connected interactions.

- Up to 8 distinct screens/routes.
- Up to 3 primary workflows.
- Up to 10 family member profiles.
- Persistent app data using the standard Family App Kit.
- One custom visual direction and a small set of bespoke illustrations or character assets.
- No more than one pre-approved external integration, and only when explicitly supported by the existing architecture.
- Two consolidated revision rounds.
- Target turnaround: 10–14 working days after scope and assets are approved.

[Whimsical Tree Illustration - Free Download - AI Scribbles](https://images.openai.com/static-rsc-4/oW_i8XKz1jV9Q9RfZpDL6-ntPl7Az5tINg6xJJqX5-_HD6SHqvjE46DgUcteV5_USkxJ9HZAtuov5gzFaax0WkA9dAdu9iLdXvjgz5h5u_zn1oIvmGLKDezktrTwsXFtM0b3SQOrEImw-nvYuCcYyZxLwmDD0PA9vTItDUUaENA?purpose=inline)

## Grove

### $1,499 USD

C$2,075 approx.

A richer family experience with more screens, content, and carefully bounded functionality.

- Up to 12 distinct screens/routes.
- Up to 5 primary workflows.
- Up to 20 family member profiles.
- Persistent data, richer theming, and bespoke visual assets.
- Up to two pre-approved integration points if technically feasible and legally appropriate.
- Three consolidated revision rounds.
- Target turnaround: 15–25 working days after scope and assets are approved.

All turnaround times are targets, not guarantees. The clock starts when the scope is accepted, required assets are supplied, and the required initial payment clears. Customer delays pause the clock.

A “screen” means a distinct user-facing route or major state. Minor visual variants do not count as separate screens; a new workflow, integration, or substantial data model does.

## 4.3 Out of scope

The following are declined, not merely assigned to a more expensive tier:

- Payments or money transfers between family members.
- Medical diagnosis, treatment, emergency response, or other safety-critical decision-making.
- Tracking, covert surveillance, monitoring of children or partners, or recording people without consent.
- Public social networks, open stranger messaging, or unmoderated public user-generated content.
- Reproductions of protected characters such as Disney, Pokémon, or Marvel characters.
- Gambling, adult content, illegal activity, or harmful challenges.
- Native app-store submissions in the initial service.
- Storing health records, government IDs, financial account credentials, or precise child location.
- Apps whose core value depends on real-time availability, critical uptime, or complex third-party infrastructure the builder cannot maintain.
- Unlimited content generation for children or unrestricted child-facing AI chat.
- Large enterprise projects, general marketplaces, and complex multi-tenant SaaS products.
- Features that require rights to assets the customer cannot legally provide.

### Kind refusal pattern

> “We love the idea behind this. We don't build apps that track someone's location or activity. We could make a family adventure board where everyone chooses their own activities and shares progress voluntarily.”

The UI must offer a simpler alternative when one exists, not simply terminate the request.

## 4.4 Custom requests outside the menu

1. Intake allows a custom idea in addition to gallery selections.
2. The intake AI identifies the core need, intended users, and requested functionality.
3. A scope classifier marks it `IN_MENU`, `NEEDS_REVIEW`, or `OUT_OF_SCOPE`. This is a suggestion, not an automatic acceptance decision.
4. The builder reviews every `NEEDS_REVIEW` or `OUT_OF_SCOPE` request.
5. If the concept can be simplified, the builder proposes a menu-compatible alternative.
6. If it cannot be safely or realistically delivered, the builder declines it kindly.
7. No price, delivery date, or commitment is shown as confirmed until the builder issues a proposal.

# 5. Business model & pricing

## 5.1 Model comparison

| Model                   | Pros for families                                                  | Cons for families                             | Pros for solo business                         | Cons for solo business                      |
| ----------------------- | ------------------------------------------------------------------ | --------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| One-time build fee      | Clear cost, no required subscription, ownership of a delivered app | Each new app costs extra                      | Cash received upfront; simple accounting       | Revenue can be irregular                    |
| Monthly membership      | Predictable maintenance, easier to request small changes           | May feel wasteful when inactive               | Recurring revenue and retained relationships   | Unbounded support can destroy margins       |
| Credits / wishes        | Flexible; family can save for bigger requests                      | Credit math and expiration can confuse buyers | Prepayment, repeat purchases                   | Requires a well-defined scope per credit    |
| Paid discovery          | Helps turn vague ideas into realistic plans                        | Adds a fee before the build                   | Filters serious buyers; pays for expertise     | Additional checkout and scheduling friction |
| Gift cards / gift boxes | Meaningful present; recipient chooses the app                      | Recipient must redeem and collaborate         | Seasonal demand, upfront revenue               | Redemption liabilities and support          |
| Seasonal drops          | Fast, affordable, timely ideas                                     | Less bespoke than a custom app                | Templates create leverage and batch production | Seasonal inventory and demand uncertainty   |

## 5.2 Recommended launch model

Start with one-time custom build fees, prepaid gift purchases, and optional care. Add memberships or credit bundles only after at least 20 completed builds reveal what ongoing support actually requires.

### Pricing and inclusions

| Offer                                   | USD       | Approx. CAD | Includes                                                                                        |
| --------------------------------------- | --------- | ----------- | ----------------------------------------------------------------------------------------------- |
| Discovery session                       | $49       | C$68        | 30-minute video call, written summary, credited toward a build purchased within 14 days         |
| Sprout                                  | $299      | C$415       | One small app, one revision round, 30 days of defect support                                    |
| Bloom                                   | $699      | C$970       | One multi-flow app, two revision rounds, 30 days of defect support                              |
| Grove                                   | $1,499    | C$2,075     | One richer app, three revision rounds, 30 days of defect support                                |
| Funship Care                       | $19/month | C$27/month  | Hosting, routine dependency/security maintenance, and up to 20 minutes of small changes monthly |
| Extra change session                    | $49       | C$68        | Up to 30 minutes of approved changes; quoted first if larger                                    |
| New Sprout app for an existing customer | $299      | C$415       | New scoped project, subject to current availability                                             |

Care does not include new apps, new integrations, major redesigns, feature-heavy changes, or guaranteed response times. Unused change time does not roll over.

Hosting is included for 12 months with the initial build. After the first year, the family can pay for Care or choose a clearly priced hosting-only plan introduced before renewal. For MVP, offer $5/month hosting-only after the included period. If neither plan is renewed, the family receives a 30-day export and transition window, then the hosted app is disabled and its production data is deleted according to the retention policy.

### Payments

- Sprout: 100% upfront.
- Bloom: 50% deposit, 50% before production delivery.
- Grove: 40% deposit, 40% at approved preview, 20% before production delivery.
- A proposal states exactly when each milestone is due.
- Work does not begin until the required payment clears.
- Production delivery is not published until the balance is paid, unless the proposal explicitly authorizes a different arrangement.

### Refund policy

Publish a lawyer-reviewed policy before launch. Proposed starting policy:

- Full refund if the builder declines the project before work begins.
- Discovery sessions are refundable if cancelled at least 24 hours in advance.
- Once work begins, refunds are based on work completed, subject to applicable consumer law.
- If the builder cannot deliver the agreed scope, the customer chooses between a reasonable revised scope, an agreed partial refund, or a full refund for undelivered work.
- Defective agreed functionality is fixed during the 30-day defect-support window at no extra cost.
- Change requests are not defects.
- Statutory consumer rights take precedence over this policy.

## 5.3 Gifting prices and rules

Gift tiers use the same prices as direct purchases.

- A gift-card amount is $100, $300, or $700 USD.
- Gift cards may be applied to eligible builds and discovery sessions.
- A recipient can pay the difference when the chosen build costs more.
- Unused balances remain attached to the gift record.
- Do not impose expiration dates on Canadian gift certificates where prohibited by applicable law. Use jurisdiction-aware terms reviewed by counsel.
- Gift cards are non-transferable after redemption and cannot be redeemed for cash except where required by law.
- A tier gift promises the specified tier's value, not a specific app until the recipient's request has been reviewed and accepted.
- If the recipient's request is out of scope, they may choose a suitable alternative or request a refund under the gift terms.
- Physical gift boxes are not part of MVP. Offer a downloadable, printable gift card and an email.

## 5.4 Unit economics

These are planning assumptions, not observed results.

### Estimated founder hours per app

| Tier   | Build   | Communication, QA, and admin | Total founder hours   |
| ------ | ------- | ---------------------------- | --------------------- |
| Sprout | 4–6 h   | 2–3 h                        | 7 h planning average  |
| Bloom  | 10–14 h | 4–5 h                        | 16 h planning average |
| Grove  | 22–30 h | 6–8 h                        | 34 h planning average |

Assume a sample mix of 50% Sprout, 40% Bloom, and 10% Grove.

- Weighted average build revenue: \\(0.5(299)+0.4(699)+0.1(1499)=\\$579\\).
- Weighted average labour: \\(0.5(7)+0.4(16)+0.1(34)=13.3\\) hours.
- Gross revenue per founder hour: approximately $43.53 USD before expenses, taxes, and unpaid acquisition time.
- At a $75/hour internal labour target, this mix is not yet economically attractive. Raise prices, reduce build hours through templates, or both.

### Capacity

Assume 25 productive project hours per week, leaving the rest for sales, maintenance, finance, and administration.

| Mix                    | Average hours/app | Sustainable completed apps/week |
| ---------------------- | ----------------- | ------------------------------- |
| Mostly Sprout          | 7                 | 3                               |
| Recommended sample mix | 13.3              | 1–2                             |
| Mostly Grove           | 34                | About 0.7                       |

Do not sell unlimited weekly capacity. The admin console must estimate workload before a proposal is issued.

### Revenue scenarios

The table below shows illustrative annual new-build revenue, not profit or recurring revenue. It assumes each family buys one app in a year at the weighted average of $579 USD.

Illustrative annual build revenue

Revenue at $579 average first-year build spend per family, excluding hosting, care, refunds, tax, and expenses.

$0$50K$100K$150K$200K25 families100 families300 families

| Families per year | Gross build revenue | At 13.3 h/family | Approx. founder project hours/year |
| ----------------- | ------------------- | ---------------- | ---------------------------------- |
| 25                | $14,475             | 332.5 h          | 333                                |
| 100               | $57,900             | 1,330 h          | 1,330                              |
| 300               | $173,700            | 3,990 h          | 3,990                              |

A single builder cannot deliver 300 bespoke builds annually at these assumptions while also operating the business. This is a capacity warning, not a forecast.

### Scaling thresholds

- First 10 apps: Learn which patterns repeat. Record actual time per step.
- 10–20 apps: Build the first reusable templates and automated onboarding.
- 20–40 apps: Require every new app to be composed from existing components unless a premium scope is approved.
- 40+ apps/year: Consider part-time design or engineering help, plus a formal maintenance and incident process.
- 100+ apps/year: A template-driven product operation and contractors are necessary; do not promise a fully bespoke service at the original price without changing the model.

## 5.5 The Family App Kit

The Family App Kit is the main scalability lever.

Shared modules:

- Family identity and member profiles.
- App shell, navigation, responsive layouts, empty states, loading states, and error handling.
- Theme configuration: colours, typography, mascot, imagery, tone.
- Reusable cards, lists, checklists, progress indicators, calendars, galleries, story steps, quizzes, reward systems.
- Parent controls and child-facing mode.
- Feedback widget and screen-context capture.
- Auth, tenant scoping, storage, audit logging, and PWA installation.
- Delivery pipeline, preview environments, smoke tests, and release controls.

Target: 70–80% of a typical app is assembled from existing modules. The remaining work is the personalized interaction, visual direction, content, and family-specific details.

A family app is not a new independent codebase by default. Store its configuration, feature modules, version, and deployment metadata in the central platform. Permit a separate isolated implementation when the app genuinely requires it, but price and maintain it accordingly.

# 6. End-to-end journeys

## 6.1 Visitor → ideas gallery → request

1. Screen: Home. The visitor sees the headline “Little apps. Big family magic.” Supporting copy explains that Funship makes small, personal apps for routines, adventures, games, memories, and gifts. The primary CTA is “Make something for your family.” The secondary CTA is “Find an idea.”
2. Screen: Ideas gallery. The visitor browses nine categories, filters by “Make life easier,” “Make something playful,” or “Give a gift,” and opens individual examples.
3. Screen: Idea detail. The page displays a sample screenshot, who the app is for, its magic moment, typical features, complexity tier, starting price, and limitations.
4. The visitor clicks “Make this your own” or “Start with my idea.”
5. Screen: Sign in or create account. Email magic-link authentication. If the visitor arrived from a gift redemption link, retain that context.
6. Screen: Request introduction. Ask whether the request is for their own family or a gift. Create a draft request and redirect to intake.
7. Behind the scenes: Create a `Request` with status `DRAFT`, record attribution to the gallery item, and save the selected category. Do not charge, book, or create a project yet.

## 6.2 Request intake wizard

Use a progressive wizard. One main question per screen, a visible step indicator, autosave, and a persistent “Save and come back later” action.

### Steps

1. The wish: “What would you love to make?” Choices: “I have an idea,” “Help me find one,” and “I have a gift to redeem.” Provide a text box and a prominent voice-recording option.
2. The people: Ask who will use it: parents, children, the whole family, grandparents, or other invited relatives. Collect display names and broad age bands, not full birth dates.
3. The magic moment: Ask “What should feel different when this app works?” Offer optional prompts about current frustrations and desired outcomes.
4. Must-haves: A short checklist plus an “Anything else?” text field. The system converts answers into candidate features.
5. The look: Ask about style, colours, existing examples, family characters, photos, and drawings. Uploading is optional.
6. Where it will live: Phone, tablet, computer, or shared family device. Ask whether the app needs to work offline, explaining that offline support is not guaranteed.
7. Timing and budget: Ask desired delivery window and show tier ranges. Do not imply availability before admin review.
8. Review: Present an editable summary, list uploaded assets, explain what happens next, and obtain required parent consent.
9. Build brief: Generate a structured brief using the AI provider interface. Display editable sections for purpose, audience, core workflow, visual direction, features, exclusions, and open questions.
10. Confirmation: Parent checks “This brief reflects what we want” and submits.

### Voice intake

- The browser requests microphone permission only after a direct user action.
- Recording has a clear start, stop, cancel, and retry control.
- Provide a text-input fallback at every step.
- Audio is sent to the transcription endpoint and discarded after processing.
- Transcribed text appears for review before AI summarization.
- The AI can ask at most three additional intake questions per pass.
- Follow-up questions are one short question at a time, grounded in the missing information.
- Do not ask for medical information, a home address, a child's contact details, or other unnecessary sensitive data.
- The parent can skip any nonessential question.
- Save each answer immediately and preserve the draft across refreshes.

### Behind the scenes

- Persist each answer in `IntakeAnswer`.
- Store uploads in a private Supabase bucket.
- Generate a `BuildBrief` draft, preserving both the original transcript and the AI-normalized version as text records. Never store raw audio.
- Label inferred content as suggested, not confirmed.
- Mark the request `SUBMITTED` only when the parent confirms the brief.
- Notify the admin.

## 6.3 Booking a call

1. Screen: Booking. The family sees a short explanation: “Want to talk it through? Book a 30-minute idea session.”
2. Display available slots in the builder's configured timezone, with the family's timezone shown automatically.
3. The parent selects a slot and confirms their email.
4. The system creates a `Booking` with status `CONFIRMED`.
5. Send a confirmation email with date, time, cancellation link, and video meeting link.
6. Send reminders 24 hours and one hour before the meeting.
7. Admin sees the booking on a calendar and opens the associated request.
8. After the call, the builder adds private notes and updates the build brief. Any customer-visible notes are explicitly marked shareable.

MVP decision: Booking uses a built-in availability system and manually entered video-call URL. No automatic Google Calendar synchronization. Prevent overlapping confirmed bookings and apply configurable buffers.

## 6.4 Proposal → acceptance → payment → kickoff

1. Screen: Proposal. The parent sees the selected tier, scope, excluded features, delivery estimate, revision allowance, price, payment schedule, and cancellation terms.
2. Admin generates a proposal from the approved build brief.
3. The parent accepts the proposal and acknowledges the scope.
4. The backend creates a Stripe Checkout Session for the required deposit or full payment.
5. Stripe redirects the parent to secure checkout.
6. A verified webhook confirms payment. The browser's success redirect alone must never mark a payment as paid.
7. The portal shows “You're officially on the workbench.”
8. The request becomes `ACCEPTED`, the project becomes `KICKOFF`, and a receipt and kickoff email are sent.
9. Admin confirms the start date, assets, and delivery estimate.
10. For milestone payments, the next payment link is generated only when the corresponding milestone is reached.

## 6.5 Build tracking

1. Screen: Project overview. The family sees the app name, project owner, target date, latest update, and a four-stage timeline.
2. Stages are:
   - Sketching: Agreeing on the idea and visual direction.
   - Building: Making the core interactions work.
   - Polishing: Refining details and testing.
   - Ready to play: Reviewing and approving the finished app.
3. Admin advances the stage and adds a plain-language update.
4. Family receives an email only for meaningful status changes, not every internal update.
5. If blocked, the builder can mark “Waiting on your family” and request a specific action.
6. The customer can see the next expected step and whether they owe anything.

Do not show misleading automated progress percentages. The timeline represents real admin-managed milestones.

## 6.6 Preview and feedback

1. Admin creates a preview release and attaches its URL to the project.
2. The family opens the preview link, using a secure token or authenticated session.
3. Every preview app has a visible “Tell us what you think” button.
4. The parent or child taps it. The feedback sheet captures the current screen reference and offers a large mic button, emoji reactions, and text fallback.
5. In conversation mode, an opening question asks, “What would you change about this screen?”
6. The user answers. The AI may suggest one short follow-up based on a builder-configured learning goal.
7. The answer is transcribed and analyzed into themes, sentiment, requests, friction points, and a short summary.
8. A `FeedbackItem` appears in the admin console with the transcript, screen reference, timestamp, and analysis.
9. The builder converts actionable items into `ChangeRequest` records, merges duplicates, and assigns priority.
10. The family can see whether each request is under review, planned, in progress, or completed.
11. Once revisions are complete, the family reviews the updated preview and approves it.
12. Admin marks the preview `APPROVED`.

Feedback analysis is advisory. It cannot automatically alter production code or publish a new version.

## 6.7 Delivery

1. Admin selects “Prepare delivery.”
2. The system checks that payment is complete, the approved release exists, and required smoke tests pass.
3. Admin confirms the production app URL and release version.
4. The family receives a delivery email with the app link, install instructions, and a “How to use your app” card.
5. The portal displays a celebratory delivery screen with a brief, optional animation.
6. The family can add the PWA to their phone home screen using platform-appropriate instructions.
7. If this is a gift, the family can download a printable gift card or QR code.
8. The app page displays its creation date and annual “app birthday.”
9. The family can submit changes or request a new app from the portal.

For the MVP, deployment is manually controlled by the builder. The platform stores deployment metadata and supports a single shared runtime with family-specific configuration. Do not attempt arbitrary code generation and deployment without human review.

## 6.8 Ongoing changes and new apps

1. The family opens its portal and selects “Change something” or “Make another app.”
2. Small changes can be described by voice or text.
3. The system creates a `ChangeRequest` linked to the app.
4. Admin reviews whether it is included in Care, needs a paid change session, or constitutes a new tier.
5. The family sees the estimate and approves any additional charge before work starts.
6. Admin ships a preview, collects feedback, and publishes the updated release.
7. Seasonal ideas appear as optional inspiration, never as pushy upsells.
8. Care renewal emails are sent before the renewal date. Cancellation remains available without contacting support.

## 6.9 Gift flow

1. Screen: Gifts. Buyer selects “Gift a custom app,” a tier, or a dollar amount.
2. They specify whether the gift is for a family generally or for a child, such as “A game for Leo.”
3. The buyer provides the recipient's email, gift message, sender name, and delivery date. Email is required for digital delivery.
4. If gifting a specific child, collect only the child's display name. Do not ask for their email, exact age, school, or other identifiers.
5. Show a preview of the email and printable card.
6. Buyer pays through Stripe Checkout.
7. A verified payment webhook creates the gift record and a cryptographically random redemption token.
8. On the selected date, the system emails the recipient a secure redemption link. If the date is today, send immediately.
9. The recipient opens a beautiful landing page showing the sender's message and gift details.
10. They redeem the gift and create or sign into a parent account.
11. The gift balance is attached to the account; the recipient starts intake.
12. The gift remains `REDEEMED` but `UNUSED_BALANCE` can remain until applied. Track balance independently from redemption status.
13. The buyer can view whether the gift is scheduled, delivered, or redeemed, but cannot see the recipient's private brief or family uploads.

A gift for a specific child is a gift to the child's parent or guardian to create the app. The product must never imply that a child can independently order or consent to data processing.

## 6.10 Kid mode

- Kid mode is a simplified UI within the family's app, not a separate account.
- It has a large “Tell us what you think” button and optional emoji reactions.
- It does not show prices, billing, admin notes, personal account details, or parent-only settings.
- A child can submit a short recording or text message under the parent-owned project context.
- The interface tells the child, in age-appropriate language, that their grown-up may see their feedback.
- No AI follow-up may ask a child for personal information.
- The parent can disable child feedback or delete a submission.
- The parent can review all submissions before they become approved change requests.

# 7. My builder/admin console

The admin console is private, desktop-first, and optimized for the founder to review a request in minutes rather than open multiple tools.

## 7.1 Dashboard

Show:

- New requests awaiting review.
- Active projects by build stage.
- Upcoming calls.
- Payments due and failed payments.
- Unread feedback items.
- Changes awaiting estimates or approval.
- Gift cards awaiting scheduled delivery.
- This week's estimated capacity and committed hours.

Every count links to the relevant filtered view.

## 7.2 Request inbox

Each row displays:

- Request ID and date received.
- Family name and primary contact.
- Proposed app name.
- Category and suggested tier.
- AI-generated one-line summary.
- Status.
- Requested timing.
- Outstanding action.

Filters: status, tier, category, date range, gift-related, and needs human review.

Admin actions: open brief, request clarification, book a call, decline, or create proposal.

## 7.3 Request detail

Tabs:

1. Overview: AI summary, goals, must-haves, excluded features.
2. Brief: Editable structured fields and confirmation history.
3. People: Family members, roles, age bands, consent flags.
4. Assets: Private upload gallery, filenames, types, sizes, consent status.
5. Conversation: Intake answers, transcript text, and follow-up history.
6. Proposal: Tier, price, milestones, scope, and revision allowance.
7. Activity: Audit events and communications.

Do not show raw audio because it is never persisted.

## 7.4 Family profile

- Account owner and verified email.
- Family display name.
- Co-parent invitations and roles.
- Child display names and age bands.
- Preferences, selected colours, and illustration direction.
- Apps, requests, gift balances, and active Care status.
- Consent records and deletion/export actions.

## 7.5 Calendar

- Week and month views.
- Confirmed bookings, available slots, blocked time, and buffers.
- Click a booking to open the request.
- Admin can manually reschedule, cancel, and send updated email notifications.
- All times stored in UTC and rendered in the relevant timezone.

## 7.6 Proposal builder

- Select a tier or custom approved price.
- Define scope, screens, workflows, exclusions, revisions, estimated delivery, and milestones.
- Preview the customer-facing proposal.
- Issue, withdraw, or supersede a proposal.
- Store an immutable snapshot when accepted.

## 7.7 Change-request board

Columns:

- New feedback.
- Needs review.
- Estimated.
- Approved.
- In progress.
- Ready for review.
- Done.
- Declined.

Cards show screen reference, transcript, AI summary, theme, priority, estimated effort, and linked app version.

The builder must be able to merge duplicate feedback into one change request while preserving the original submissions.

## 7.8 Delivery manager

- Preview URL and release version.
- Production URL and release version.
- Smoke-test checklist.
- Payment status.
- Approval status.
- Publish, roll back, and disable controls.
- App birthday and hosting-renewal date.

Production publishing must require explicit confirmation.

## 7.9 Billing and capacity

Billing:

- Gross paid, refunds, outstanding balances, Care subscriptions, gift liabilities.
- Stripe customer and payment references.
- Failed webhook alerts.
- Never store full card details.

Capacity:

- Configurable weekly project hours.
- Estimated hours per project.
- Actual hours entered by the builder.
- Booked hours and upcoming deadlines.
- Warning when a new proposal would exceed the weekly capacity target.

## 7.10 Template library

Each template contains:

- Template name, category, tier compatibility.
- Version and status.
- Available modules.
- Theme tokens and asset references.
- Default screens and workflows.
- Supported data entities.
- Known limitations.
- Estimated implementation hours.
- Smoke tests and preview link.

Only the builder can publish a template version. A production app pins a specific template version until explicitly upgraded.

# 8. Feature specification

Priority definitions:

- MVP: Required for the first 10-family launch.
- Next: Add after the initial service is operational and core flows have been validated.
- Later: Requires stronger evidence of demand or additional operational capacity.

## 8.1 Marketing site

| Feature         | Description                                | User story                                            | Acceptance criteria                                                      | Priority |
| --------------- | ------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------ | -------- |
| Homepage        | Explain custom family apps                 | As a parent, I want to understand the service quickly | Headline, benefits, examples, pricing CTA, gift CTA render responsively  | MVP      |
| Ideas gallery   | Browse curated app examples                | I want inspiration before writing a brief             | Nine categories; searchable/filterable cards; each has a detail page     | MVP      |
| Idea detail     | Explain scope and price                    | I want to know what is included                       | Shows use case, magic moment, example, tier, starting price, limitations | MVP      |
| How it works    | Explain the process                        | I want to know what happens after I submit            | Four steps: imagine, shape, make, enjoy                                  | MVP      |
| Pricing         | Show clear prices and limits               | I want to compare tiers                               | All tiers, revision rounds, estimated timelines, exclusions              | MVP      |
| Gift page       | Sell a personalized gift                   | I need a meaningful present                           | Tier/amount selector, personalized message, delivery date, checkout CTA  | MVP      |
| FAQ             | Answer scope, ownership, privacy, delivery | I want to trust the service                           | Covers all core operational questions                                    | MVP      |
| About the maker | Humanize the service                       | I want to know who is making this                     | Founder introduction and realistic explanation of the process            | MVP      |
| Contact         | Provide a support route                    | I need help                                           | Accessible form with spam prevention                                     | MVP      |
| Legal pages     | Terms, privacy, refund, gift terms         | I need to understand my rights                        | Published before accepting real payments                                 | MVP      |
| SEO and sharing | Good previews and discoverability          | I want to share an idea                               | Page titles, descriptions, Open Graph images, canonical URLs             | MVP      |

## 8.2 Family portal and intake

| Feature                   | Description                            | User story                                        | Acceptance criteria                                                 | Priority |
| ------------------------- | -------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------- | -------- |
| Magic-link authentication | Passwordless sign-in                   | I want to access my project easily                | Verified email, expiring single-use link, logout                    | MVP      |
| Family dashboard          | Show active requests and apps          | I want to see what is happening                   | Status, latest update, next action, no-request empty state          | MVP      |
| Intake wizard             | Guided request flow                    | I want to describe my idea without writing a spec | Step validation, autosave, resume, edit before submit               | MVP      |
| Voice intake              | Speak instead of typing                | I want to explain naturally                       | Record, stop, cancel, transcript preview, text fallback             | MVP      |
| AI build brief            | Turn answers into a structured summary | I want to confirm what will be built              | Editable fields, visible assumptions, no automatic scope acceptance | MVP      |
| Asset upload              | Add drawings and examples              | I want the app to feel personal                   | File limits, private storage, previews, deletion, type validation   | MVP      |
| Booking                   | Schedule a call                        | I want to discuss my idea                         | Available slots, conflict prevention, timezone display              | MVP      |
| Proposal acceptance       | Agree on scope and price               | I want a clear commitment                         | Immutable accepted proposal, terms acknowledgment                   | MVP      |
| Project timeline          | Track progress                         | I want to know what happens next                  | Four build stages and dated maker updates                           | MVP      |
| Preview approval          | Review a live build                    | I want to sign off before delivery                | Preview link, change requests, explicit approval                    | MVP      |
| Family sharing            | Invite co-parent                       | I want my partner to participate                  | Invite, revoke, limited permissions                                 | Next     |
| Export                    | Export family-owned data               | I want to take my data with me                    | Download structured data and original uploads in a ZIP              | MVP      |

## 8.3 Payments and gifting

| Feature               | Description                     | User story                                             | Acceptance criteria                                       | Priority |
| --------------------- | ------------------------------- | ------------------------------------------------------ | --------------------------------------------------------- | -------- |
| Stripe Checkout       | Secure payment                  | I want to pay without sharing card data with the maker | Server-created session; signed webhook updates state      | MVP      |
| Milestone payments    | Deposit and balance             | I want to pay at agreed milestones                     | Due amount derived from accepted proposal                 | MVP      |
| Receipts              | Payment confirmation            | I need a receipt                                       | Confirmation email after verified payment                 | MVP      |
| Refund recording      | Record refunds                  | I want a transparent refund process                    | Stripe refund reference and status stored                 | MVP      |
| Gift purchase         | Purchase a tier or amount       | I want to give a custom app                            | Paid gift record, unique token, confirmation email        | MVP      |
| Gift redemption       | Claim a gift                    | I want to start my app request                         | Token validation, single redemption, correct balance      | MVP      |
| Scheduled gift email  | Deliver on a chosen date        | I want a surprise to arrive later                      | Scheduled job sends once; retry safely on failure         | MVP      |
| Printable gift card   | Download a personal card and QR | I want something to give in person                     | Accessible print layout; QR contains no personal data     | MVP      |
| Care subscription     | Monthly maintenance             | I want help maintaining my app                         | Stripe subscription, cancellation, webhook reconciliation | Next     |
| Gift balance transfer | Transfer between recipients     | I want to change the recipient                         | Not supported in MVP; admin-assisted correction only      | Later    |

## 8.4 Feedback and delivered apps

| Feature              | Description                          | User story                                   | Acceptance criteria                                           | Priority |
| -------------------- | ------------------------------------ | -------------------------------------------- | ------------------------------------------------------------- | -------- |
| Feedback button      | Open a sheet inside the app          | I want to comment without leaving the screen | Button includes screen context and opens an accessible sheet  | MVP      |
| Voice feedback       | Speak a change request               | I want to explain a problem naturally        | Transcription, transcript review, audio discarded             | MVP      |
| Text feedback        | Type instead                         | I prefer not to record my voice              | Text submission works without microphone permission           | MVP      |
| Emoji reactions      | Give a quick child-friendly response | I want to say whether I like something       | At least five accessible labelled reactions                   | MVP      |
| AI feedback analysis | Summarize themes and requests        | The maker needs organized feedback           | Background processing; failed analysis falls back to raw text | MVP      |
| Follow-up question   | Ask one targeted question            | I want to clarify my feedback                | Optional, safety-filtered, no personal-data requests          | Next     |
| Change-request board | Manage actionable changes            | I want my feedback tracked                   | Statuses, duplicates, priorities, screen references           | MVP      |
| App delivery         | Publish the approved release         | I want to use my app                         | Paid, approved, smoke-tested release                          | MVP      |
| PWA install guidance | Add to home screen                   | I want it to feel like an app                | Platform-specific instructions and valid manifest             | MVP      |
| App birthday         | Celebrate the app's creation date    | I want to revisit the app                    | Date shown in portal; annual reminder optional                | Next     |
| Offline operation    | Use selected functionality offline   | I need the app without connectivity          | Explicitly supported per template; never promised universally | Later    |

## 8.5 Admin, hosting, and notifications

| Feature                       | Description                          | User story                         | Acceptance criteria                               | Priority |
| ----------------------------- | ------------------------------------ | ---------------------------------- | ------------------------------------------------- | -------- |
| Request inbox                 | Triage new work                      | I need to process requests quickly | Filters, statuses, AI summaries, direct links     | MVP      |
| Family profiles               | View related family records          | I need context in one place        | Scoped records, assets, consent, app history      | MVP      |
| Calendar                      | Manage calls                         | I need to prevent conflicts        | Availability rules and booking locks              | MVP      |
| Proposal builder              | Issue structured quotes              | I need clear boundaries            | Scope, price, milestones, expiry, revision limits | MVP      |
| Capacity dashboard            | Estimate available hours             | I need to avoid overbooking        | Configurable hours, planned hours, warnings       | MVP      |
| Template library              | Reuse modules                        | I need repeatable builds           | Versioned templates and metadata                  | MVP      |
| Delivery controls             | Manage preview and production        | I need to publish safely           | Manual publish, smoke checks, rollback metadata   | MVP      |
| Email notifications           | Send transactional updates           | Families need next steps           | Idempotent sends, delivery logs, retry handling   | MVP      |
| Audit log                     | Record privileged actions            | I need accountability              | Actor, action, target, timestamp, safe metadata   | MVP      |
| Full analytics suite          | Advanced funnel and cohort analytics | I need growth insights             | Privacy-conscious event pipeline                  | Next     |
| Automatic deployment pipeline | Build and publish arbitrary apps     | I want less manual work            | Only after template and isolation model is proven | Later    |

### MVP release gate

Do not launch paid customer projects until these five flows pass end to end:

1. Request intake, autosave, brief confirmation, and admin notification.
2. Proposal acceptance, Stripe test payment, and verified webhook handling.
3. Gift purchase, scheduled delivery, and single-use redemption.
4. Voice and text feedback, transcript persistence, and change-request creation.
5. Delivery approval, production release selection, and family access control.

# 9. Information architecture & screens

## 9.1 Public sitemap

Public website

Home — `/`

How it works — `/how-it-works`

Ideas gallery — `/ideas`

Idea detail — `/ideas/[slug]`

Pricing — `/pricing`

Gifts — `/gifts`

FAQ — `/faq`

About the maker — `/about`

Contact — `/contact`

Privacy — `/privacy`

Terms — `/terms`

Refund policy — `/refunds`

Gift terms — `/gift-terms`

Sign in — `/login`

Redeem gift — `/redeem/[token]`

Authenticated family portal

Dashboard — `/portal`

New request — `/portal/requests/new`

Request detail — `/portal/requests/[id]`

Intake wizard — `/portal/requests/[id]/intake`

Brief confirmation — `/portal/requests/[id]/brief`

Booking — `/portal/requests/[id]/booking`

Proposal — `/portal/requests/[id]/proposal`

Project — `/portal/projects/[id]`

Preview and approval — `/portal/projects/[id]/preview`

Apps — `/portal/apps`

App detail — `/portal/apps/[id]`

Billing — `/portal/billing`

Family settings — `/portal/settings`

Gift purchases — `/portal/gifts`

Admin

Dashboard — `/admin`

Requests — `/admin/requests`

Request detail — `/admin/requests/[id]`

Families — `/admin/families`

Family detail — `/admin/families/[id]`

Calendar — `/admin/calendar`

Proposals — `/admin/proposals`

Projects — `/admin/projects`

Project delivery — `/admin/projects/[id]`

Feedback board — `/admin/feedback`

Payments — `/admin/payments`

Gifts — `/admin/gifts`

Capacity — `/admin/capacity`

Template library — `/admin/templates`

Settings — `/admin/settings`

## 9.2 Home page: exact content

### Hero

Headline: Little apps. Big family magic.

Sub-copy: What if the apps your family used were made just for your family? We turn your ideas, routines, drawings, and inside jokes into small, beautiful web apps built around the way you live.

Primary CTA: Make something for your family

Secondary CTA: Explore ideas

Trust line: Made by a real person. No ads. No unnecessary features.

Hero illustration: a small family-created paper-cut world with a routine card, a hand-drawn animal character, and a travel map. No stock photos of identifiable children.

### Section 2: Off-the-shelf doesn't know your family

Headline: Your family isn't a template. Your app shouldn't feel like one.

Three cards:

- Made around your people: Your names, drawings, routines, favourite things, and family traditions.
- Only what you need: A focused app, without advertising, social feeds, or feature clutter.
- Grows with you: Update the app when your routines, interests, or family plans change.

Privacy copy: “We don't sell your family's personal information or use it to train AI models. You choose what to share, and you can request a copy or deletion of your data.”

### Section 3: A few Funship favourites

Headline: What could we make for you?

Example cards:

- Chore Quest: Turn everyday jobs into a family adventure.
- The Dinner Picker: Find tonight's dinner without another debate.
- Road Trip Bingo: Make the journey part of the adventure.
- Our Family Book: Keep the stories and pictures you want to revisit.
- Bedtime Story Machine: Create a story world with your own original characters.
- Hello, Grandma: Give far-away family a simpler way to share selected memories.

CTA: “Explore all the ideas”

### Section 4: From wish to ship

Headline: You bring the idea. We'll make it real.

1. Tell us your wish. Speak, type, draw, or show us an example.
2. Shape it together. We turn the idea into a clear plan with a price and scope.
3. Watch it come to life. Follow the build, explore a preview, and tell us what to change.
4. Make it yours. Receive your app, ready to open on your family's devices.

CTA: “Start with a little idea”

### Section 5: A gift that's actually personal

Headline: Give them something that couldn't belong to anyone else.

Sub-copy: A game starring their child's drawing. A family recipe book filled with stories. A tiny world built around an inside joke. Give someone a custom app, and we'll help turn their wish into something real.

CTA: “Give a Funship app”

### Section 6: Made by a person, not a machine alone

Headline: Thoughtful technology. Human hands.

Sub-copy: AI helps us organize ideas and build faster, but a real maker shapes the experience, reviews the work, and helps you get it right. We keep each project small enough to give it proper care.

### Section 7: Pricing

Headline: Start small. Make it special.

Display Sprout, Bloom, and Grove cards with prices, inclusions, and “Choose this tier” links.

Supporting copy: “Every project starts with an agreed scope. No surprise feature lists. No required membership.”

CTA: “Compare the tiers”

### Section 8: Final CTA

Headline: What would make your family's day a little better?

Sub-copy: It doesn't have to be a big idea. Sometimes the smallest, most personal things are the ones we love most.

Button: Tell us your idea

## 9.3 Family portal screens

Every screen must have a defined empty, loading, and error state. Use the shared UI state components `EmptyState`, `LoadingState`, `InlineError`, and `RetryButton`.

| Screen           | Purpose and components                               | Empty state                                           | Loading and error                         | Mobile layout              |
| ---------------- | ---------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------- | -------------------------- |
| Login            | Email field, send-link CTA, privacy note             | Not applicable                                        | Spinner; resend after expiry              | Single-column form         |
| Portal dashboard | Requests, projects, next actions                     | “Your first Funship app starts here.”               | Skeleton cards; retry dashboard query     | Stacked cards              |
| New request      | Choose own app or gift redemption                    | First request prompt                                  | Preserve request ID on retry              | One choice per row         |
| Intake wizard    | Question, progress, voice/text, uploads              | Contextual prompt                                     | Autosave indicator; recover failed save   | Single question per view   |
| Build brief      | Editable purpose, users, workflows, style, limits    | Missing sections called out                           | Save status and validation errors         | Collapsible sections       |
| Booking          | Calendar, timezone, slot selection                   | “No open times right now. Ask us about another time.” | Loading slots; conflict retry             | Week/day selector          |
| Proposal         | Scope, price, schedule, acceptance                   | No proposal yet; contact prompt                       | Expired quote warning                     | Price summary pinned below |
| Project overview | Timeline, updates, next action                       | Not applicable                                        | Skeleton timeline; retry updates          | Vertical timeline          |
| Preview          | Embedded preview, open-app action, approval          | “Your preview is being prepared.”                     | Expired link; request a fresh link        | Full-width preview         |
| Apps list        | Delivered app cards                                  | “Your first app will appear here when it's ready.”    | Skeleton app cards                        | One card per row           |
| App detail       | Open app, install help, birthday, change request     | No apps                                               | Production disabled warning               | Large primary action       |
| Billing          | Receipts, milestones, Care status                    | “No payments yet.”                                    | Retry invoice load; payment-pending state | Single-column rows         |
| Family settings  | Display name, invitations, consent, export, deletion | Default family setup                                  | Clear save feedback                       | Grouped settings           |
| Gifts            | Purchases and gift status                            | “No gifts just yet.”                                  | Retry; payment-pending status             | Card list                  |

## 9.4 Admin console screens

| Screen           | Purpose and components                  | Empty state                        | Loading and error                       | Mobile layout                      |
| ---------------- | --------------------------------------- | ---------------------------------- | --------------------------------------- | ---------------------------------- |
| Dashboard        | KPIs, upcoming work, alerts             | “Your workbench is clear.”         | Skeleton metrics; partial data warnings | Stacked metrics; desktop preferred |
| Request inbox    | Filterable request table                | “No requests match these filters.” | Preserve filters on retry               | Compact cards                      |
| Request detail   | Tabs for brief, people, assets, history | Prompt to complete missing fields  | Autosave errors visible                 | Tabs become sections               |
| Family detail    | Family, consent, apps, billing          | No projects or uploads             | Per-section errors                      | Single-column sections             |
| Calendar         | Slots and bookings                      | No bookings this week              | Retry availability query                | Agenda view                        |
| Proposal builder | Scope editor and pricing                | Start from tier template           | Validation and save state               | Form sections                      |
| Project manager  | Stage, assets, preview, delivery        | No project created                 | Retry project load                      | Vertical status flow               |
| Feedback board   | Columns, themes, priorities             | “No feedback waiting.”             | Preserve board state                    | List by status                     |
| Payments         | Payment events, refunds, webhook status | No transactions                    | Retry Stripe sync metadata              | Simple transaction list            |
| Gifts            | Gifts, balance, scheduled send          | No gifts                           | Retry and display delivery status       | Card list                          |
| Capacity         | Hours, estimates, deadlines             | No commitments                     | Missing estimate warnings               | Summary first                      |
| Templates        | Templates, versions, modules            | “Add your first reusable pattern.” | Retry template query                    | List, not drag-and-drop            |
| Settings         | Availability, prices, email settings    | Show defaults                      | Validation and permission errors        | Grouped settings                   |

## 9.5 Screen implementation rules

- All primary actions must work; no decorative buttons that pretend to submit.
- Use optimistic UI only for reversible actions such as adding a draft note.
- Payments, proposal acceptance, gift redemption, production publishing, deletion, and approval require server-confirmed outcomes.
- Destructive actions require explicit confirmation.
- Use skeletons only when they communicate the shape of real content.
- Never use infinite loading without a timeout and recovery path.
- Every screen must be usable at 375 px width and at 1280 px desktop width.

# 10. Data model

Use PostgreSQL through Supabase. All primary keys are UUIDs except for public-friendly identifiers where noted. Use `timestamptz` for timestamps, UTC internally. Use `numeric(12,2)` for money only when accompanied by a currency code; never store money as a floating-point value.

## 10.1 Conventions

- Every tenant-owned row contains `family_id` or is reachable through a tenant-owned parent record.
- Every mutable record has `created_at` and `updated_at`.
- Use database foreign keys with intentional deletion behavior.
- Use soft deletion only where retention is needed for legal or operational reasons; do not retain personal content indefinitely under a soft-delete flag.
- Store provider references, not secrets.
- Never store raw card numbers, CVVs, raw voice recordings, or authentication tokens in application tables.
- Use enum types for stable finite states and lookup tables only when values need to be managed dynamically.

## 10.2 Core entities

### `User`

| Field          | Type          | Constraints                    |
| -------------- | ------------- | ------------------------------ |
| `id`           | UUID          | PK; matches Supabase Auth user |
| `email`        | citext        | Unique; verified through Auth  |
| `display_name` | text          | Required                       |
| `role`         | `user_role`   | Default `CUSTOMER`             |
| `status`       | `user_status` | Default `ACTIVE`               |
| `locale`       | text          | Default `en-CA`                |
| `timezone`     | text          | Valid IANA timezone            |
| `last_seen_at` | timestamptz   | Nullable                       |
| `created_at`   | timestamptz   | Required                       |
| `updated_at`   | timestamptz   | Required                       |

Enums:

- `user_role`: `CUSTOMER`, `ADMIN`
- `user_status`: `ACTIVE`, `SUSPENDED`, `DELETION_PENDING`, `DELETED`

### `Family`

| Field              | Type            | Constraints                       |
| ------------------ | --------------- | --------------------------------- |
| `id`               | UUID            | PK                                |
| `owner_user_id`    | UUID            | FK → User, required               |
| `display_name`     | text            | Required, max 100                 |
| `slug`             | text            | Unique, lowercase URL-safe        |
| `primary_currency` | char(3)         | `USD` or `CAD`                    |
| `timezone`         | text            | IANA timezone                     |
| `brand_profile`    | jsonb           | Validated theme config            |
| `preferences`      | jsonb           | Non-sensitive display preferences |
| `status`           | `family_status` | Default `ACTIVE`                  |
| `created_at`       | timestamptz     | Required                          |
| `updated_at`       | timestamptz     | Required                          |

`family_status`: `ACTIVE`, `ARCHIVED`, `DELETION_PENDING`, `DELETED`.

### `FamilyMember`

Represents adults and children without creating child accounts.

| Field                | Type             | Constraints                   |
| -------------------- | ---------------- | ----------------------------- |
| `id`                 | UUID             | PK                            |
| `family_id`          | UUID             | FK → Family                   |
| `user_id`            | UUID             | Nullable FK → User            |
| `display_name`       | text             | Required                      |
| `member_type`        | `member_type`    | Required                      |
| `age_band`           | `age_band`       | Nullable                      |
| `relationship_label` | text             | Optional                      |
| `preferences`        | jsonb            | Safe display preferences only |
| `consent_status`     | `consent_status` | Default `NOT_REQUIRED`        |
| `deleted_at`         | timestamptz      | Nullable                      |
| `created_at`         | timestamptz      | Required                      |
| `updated_at`         | timestamptz      | Required                      |

Enums:

- `member_type`: `OWNER`, `ADULT`, `CHILD`, `GUEST`
- `age_band`: `UNDER_5`, `AGE_5_7`, `AGE_8_12`, `AGE_13_17`, `ADULT`, `UNKNOWN`
- `consent_status`: `NOT_REQUIRED`, `PENDING`, `GRANTED`, `WITHDRAWN`

Do not store a child's exact birth date.

### `FamilyAccess`

| Field         | Type                 | Constraints      |
| ------------- | -------------------- | ---------------- |
| `id`          | UUID                 | PK               |
| `family_id`   | UUID                 | FK → Family      |
| `user_id`     | UUID                 | FK → User        |
| `access_role` | `family_access_role` | Required         |
| `status`      | `invite_status`      | Default `ACTIVE` |
| `invited_by`  | UUID                 | FK → User        |
| `created_at`  | timestamptz          | Required         |

- `family_access_role`: `OWNER`, `COLLABORATOR`
- `invite_status`: `PENDING`, `ACTIVE`, `REVOKED`

Unique constraint: `(family_id, user_id)`.

## 10.3 Request and intake entities

### `Request`

| Field                  | Type                   | Constraints                        |
| ---------------------- | ---------------------- | ---------------------------------- |
| `id`                   | UUID                   | PK                                 |
| `family_id`            | UUID                   | FK → Family                        |
| `created_by_user_id`   | UUID                   | FK → User                          |
| `gift_id`              | UUID                   | Nullable FK → GiftCard             |
| `idea_slug`            | text                   | Nullable                           |
| `title`                | text                   | Required, max 120                  |
| `category`             | `app_category`         | Required                           |
| `request_type`         | `request_type`         | `OWN_FAMILY` or `GIFT_REDEMPTION`  |
| `status`               | `request_status`       | Default `DRAFT`                    |
| `suggested_tier`       | `app_tier`             | Nullable                           |
| `desired_window`       | text                   | Optional human-readable preference |
| `summary`              | text                   | Nullable                           |
| `scope_classification` | `scope_classification` | Default `NEEDS_REVIEW`             |
| `submitted_at`         | timestamptz            | Nullable                           |
| `closed_at`            | timestamptz            | Nullable                           |
| `created_at`           | timestamptz            | Required                           |
| `updated_at`           | timestamptz            | Required                           |

### `IntakeAnswer`

| Field               | Type            | Constraints                                 |
| ------------------- | --------------- | ------------------------------------------- |
| `id`                | UUID            | PK                                          |
| `request_id`        | UUID            | FK → Request                                |
| `question_key`      | text            | Required                                    |
| `answer_type`       | `answer_type`   | Required                                    |
| `text_value`        | text            | Nullable                                    |
| `json_value`        | jsonb           | Nullable                                    |
| `source`            | `answer_source` | `TEXT`, `VOICE_TRANSCRIPT`, `AI_SUGGESTION` |
| `confirmed_by_user` | boolean         | Default false                               |
| `created_at`        | timestamptz     | Required                                    |
| `updated_at`        | timestamptz     | Required                                    |

Constraints: exactly one of `text_value` and `json_value` is populated. Unique `(request_id, question_key)` for current answers. If answer history is needed, preserve revisions in a separate version table or audit record.

Enums:

- `answer_type`: `TEXT`, `MULTI_SELECT`, `SINGLE_SELECT`, `BOOLEAN`, `STRUCTURED`
- `answer_source`: `TEXT`, `VOICE_TRANSCRIPT`, `AI_SUGGESTION`
- `request_type`: `OWN_FAMILY`, `GIFT_REDEMPTION`
- `app_category`: `TRIPS`, `MEALS`, `ROUTINES`, `CHORES`, `GAMES_STORIES`, `CELEBRATIONS`, `MEMORIES`, `GRANDPARENTS`, `LEARNING`, `CUSTOM`
- `app_tier`: `SPROUT`, `BLOOM`, `GROVE`
- `scope_classification`: `IN_MENU`, `NEEDS_REVIEW`, `OUT_OF_SCOPE`
- `request_status`: `DRAFT`, `SUBMITTED`, `NEEDS_CLARIFICATION`, `PROPOSAL_SENT`, `ACCEPTED`, `IN_PROGRESS`, `DELIVERED`, `DECLINED`, `CANCELLED`, `ARCHIVED`

### `BuildBrief`

| Field                  | Type        | Constraints                     |
| ---------------------- | ----------- | ------------------------------- |
| `id`                   | UUID        | PK                              |
| `request_id`           | UUID        | FK → Request                    |
| `version`              | integer     | Starts at 1; unique per request |
| `purpose`              | text        | Required                        |
| `audience`             | jsonb       | Member roles and age bands      |
| `core_workflow`        | text        | Required                        |
| `must_haves`           | jsonb       | String array                    |
| `nice_to_haves`        | jsonb       | String array                    |
| `visual_direction`     | jsonb       | Theme and asset references      |
| `device_preferences`   | jsonb       | Allowed device enums            |
| `exclusions`           | jsonb       | String array                    |
| `open_questions`       | jsonb       | String array                    |
| `ai_generated`         | boolean     | Required                        |
| `confirmed_by_user_id` | UUID        | Nullable FK → User              |
| `confirmed_at`         | timestamptz | Nullable                        |
| `created_at`           | timestamptz | Required                        |

Preserve accepted brief versions. Never silently mutate an accepted brief after a proposal is issued.

### `Upload`

| Field                 | Type          | Constraints                 |
| --------------------- | ------------- | --------------------------- |
| `id`                  | UUID          | PK                          |
| `family_id`           | UUID          | FK → Family                 |
| `request_id`          | UUID          | Nullable FK → Request       |
| `project_id`          | UUID          | Nullable FK → Project       |
| `uploaded_by_user_id` | UUID          | FK → User                   |
| `storage_path`        | text          | Private bucket path         |
| `original_filename`   | text          | Sanitized, max 255          |
| `mime_type`           | text          | Server-verified             |
| `size_bytes`          | bigint        | Positive; max 10 MB         |
| `sha256`              | text          | File integrity hash         |
| `asset_type`          | `asset_type`  | Required                    |
| `consent_record_id`   | UUID          | Nullable FK → ConsentRecord |
| `scan_status`         | `scan_status` | Default `PENDING`           |
| `deleted_at`          | timestamptz   | Nullable                    |
| `created_at`          | timestamptz   | Required                    |

Enums:

- `asset_type`: `DRAWING`, `PHOTO`, `EXAMPLE`, `ILLUSTRATION`, `DOCUMENT`
- `scan_status`: `PENDING`, `CLEAN`, `REJECTED`, `ERROR`

Enforce a maximum of 10 MB per file and an allowlist of image formats. SVG uploads are disallowed by default to avoid script injection.

## 10.4 Booking and proposal entities

### `Booking`

| Field            | Type             | Constraints          |
| ---------------- | ---------------- | -------------------- |
| `id`             | UUID             | PK                   |
| `request_id`     | UUID             | FK → Request         |
| `family_id`      | UUID             | FK → Family          |
| `start_at`       | timestamptz      | Required             |
| `end_at`         | timestamptz      | Must be after start  |
| `timezone`       | text             | Required             |
| `status`         | `booking_status` | Required             |
| `meeting_url`    | text             | Nullable; HTTPS only |
| `customer_notes` | text             | Nullable             |
| `admin_notes`    | text             | Private              |
| `cancelled_at`   | timestamptz      | Nullable             |
| `created_at`     | timestamptz      | Required             |
| `updated_at`     | timestamptz      | Required             |

`booking_status`: `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`, `RESCHEDULED`.

### `AvailabilityRule`

| Field              | Type     | Constraints   |
| ------------------ | -------- | ------------- |
| `id`               | UUID     | PK            |
| `weekday`          | smallint | 0–6           |
| `start_local_time` | time     | Required      |
| `end_local_time`   | time     | Must be later |
| `timezone`         | text     | IANA timezone |
| `buffer_minutes`   | integer  | 0–120         |
| `active`           | boolean  | Default true  |

### `AvailabilityException`

Contains `id`, `start_at`, `end_at`, `exception_type`, and optional `reason`. Types are `BLOCKED` and `EXTRA_AVAILABILITY`.

### `Proposal`

| Field                   | Type              | Constraints                       |
| ----------------------- | ----------------- | --------------------------------- |
| `id`                    | UUID              | PK                                |
| `request_id`            | UUID              | FK → Request                      |
| `family_id`             | UUID              | FK → Family                       |
| `version`               | integer           | Unique per request                |
| `tier`                  | `app_tier`        | Required                          |
| `price_minor`           | bigint            | Nonnegative                       |
| `currency`              | char(3)           | `USD` or `CAD`                    |
| `scope_json`            | jsonb             | Required snapshot                 |
| `excluded_features`     | jsonb             | Required                          |
| `screen_limit`          | integer           | Positive                          |
| `workflow_limit`        | integer           | Positive                          |
| `revision_rounds`       | integer           | Nonnegative                       |
| `estimated_start_at`    | date              | Nullable                          |
| `estimated_delivery_at` | date              | Nullable                          |
| `payment_schedule`      | jsonb             | Milestone percentages and amounts |
| `status`                | `proposal_status` | Required                          |
| `expires_at`            | timestamptz       | Required                          |
| `accepted_by_user_id`   | UUID              | Nullable FK → User                |
| `accepted_at`           | timestamptz       | Nullable                          |
| `created_at`            | timestamptz       | Required                          |

`proposal_status`: `DRAFT`, `SENT`, `ACCEPTED`, `DECLINED`, `EXPIRED`, `SUPERSEDED`.

Constraint: sum of payment schedule percentages equals 100; accepted proposals are immutable.

## 10.5 Project and app entities

### `Project`

| Field                | Type             | Constraints         |
| -------------------- | ---------------- | ------------------- |
| `id`                 | UUID             | PK                  |
| `request_id`         | UUID             | Unique FK → Request |
| `family_id`          | UUID             | FK → Family         |
| `proposal_id`        | UUID             | FK → Proposal       |
| `name`               | text             | Required            |
| `slug`               | text             | URL-safe            |
| `tier`               | `app_tier`       | Required            |
| `status`             | `project_status` | Required            |
| `current_stage`      | `build_stage`    | Required            |
| `target_delivery_at` | date             | Nullable            |
| `actual_delivery_at` | timestamptz      | Nullable            |
| `builder_notes`      | text             | Private             |
| `created_at`         | timestamptz      | Required            |
| `updated_at`         | timestamptz      | Required            |

`project_status`: `KICKOFF`, `ACTIVE`, `WAITING_ON_FAMILY`, `IN_REVIEW`, `DELIVERED`, `PAUSED`, `CANCELLED`, `ARCHIVED`.

`build_stage`: `SKETCHING`, `BUILDING`, `POLISHING`, `READY_TO_PLAY`.

### `App`

| Field             | Type         | Constraints                         |
| ----------------- | ------------ | ----------------------------------- |
| `id`              | UUID         | PK                                  |
| `project_id`      | UUID         | Unique FK → Project                 |
| `family_id`       | UUID         | FK → Family                         |
| `name`            | text         | Required                            |
| `slug`            | text         | Unique within app routing namespace |
| `production_path` | text         | Unique                              |
| `theme_json`      | jsonb        | Validated design tokens             |
| `module_config`   | jsonb        | Allowlisted module configuration    |
| `pwa_enabled`     | boolean      | Default true                        |
| `status`          | `app_status` | Required                            |
| `created_at`      | timestamptz  | Required                            |
| `updated_at`      | timestamptz  | Required                            |

`app_status`: `DRAFT`, `PREVIEW`, `PRODUCTION`, `SUSPENDED`, `ARCHIVED`.

### `AppRelease`

| Field                 | Type              | Constraints              |
| --------------------- | ----------------- | ------------------------ |
| `id`                  | UUID              | PK                       |
| `app_id`              | UUID              | FK → App                 |
| `version`             | integer           | Unique per app           |
| `environment`         | `app_environment` | Required                 |
| `release_url`         | text              | HTTPS in production      |
| `template_version`    | text              | Required                 |
| `config_snapshot`     | jsonb             | Immutable release config |
| `smoke_test_status`   | `test_status`     | Required                 |
| `approved_by_user_id` | UUID              | Nullable FK → User       |
| `approved_at`         | timestamptz       | Nullable                 |
| `published_at`        | timestamptz       | Nullable                 |
| `created_at`          | timestamptz       | Required                 |

`app_environment`: `PREVIEW`, `PRODUCTION`.

`test_status`: `NOT_RUN`, `PASSED`, `FAILED`.

### `AppDataRecord`

For data stored by a delivered app, use a family-scoped table containing `id`, `app_id`, `family_id`, `record_type`, `data_json`, `created_at`, and `updated_at`. Validate records against the app template's schema. Do not accept arbitrary executable code in `data_json`.

## 10.6 Feedback entities

### `Preview`

Fields: `id`, `project_id`, `app_release_id`, `url`, `access_mode`, `token_hash`, `expires_at`, `status`, `approved_at`, `created_at`.

- `access_mode`: `AUTHENTICATED`, `TOKEN_LINK`
- `status`: `ACTIVE`, `EXPIRED`, `APPROVED`, `REVOKED`

Store only a hash of preview access tokens.

### `FeedbackItem`

| Field                  | Type                  | Constraints                |
| ---------------------- | --------------------- | -------------------------- |
| `id`                   | UUID                  | PK                         |
| `family_id`            | UUID                  | FK → Family                |
| `project_id`           | UUID                  | FK → Project               |
| `app_release_id`       | UUID                  | Nullable FK → AppRelease   |
| `preview_id`           | UUID                  | Nullable FK → Preview      |
| `submitted_by_user_id` | UUID                  | Nullable FK → User         |
| `member_id`            | UUID                  | Nullable FK → FamilyMember |
| `screen_reference`     | text                  | Sanitized route/identifier |
| `input_mode`           | `feedback_input_mode` | Required                   |
| `transcript_text`      | text                  | Nullable                   |
| `typed_text`           | text                  | Nullable                   |
| `emoji_reaction`       | text                  | Nullable                   |
| `sentiment`            | `sentiment_label`     | Nullable                   |
| `themes`               | jsonb                 | String array               |
| `requests`             | jsonb                 | String array               |
| `friction_points`      | jsonb                 | String array               |
| `summary`              | text                  | Nullable                   |
| `analysis_status`      | `analysis_status`     | Required                   |
| `moderation_status`    | `moderation_status`   | Required                   |
| `created_at`           | timestamptz           | Required                   |

`feedback_input_mode`: `VOICE`, `TEXT`, `EMOJI`.

`sentiment_label`: `POSITIVE`, `NEUTRAL`, `NEGATIVE`, `MIXED`, `UNKNOWN`.

`analysis_status`: `PENDING`, `COMPLETE`, `FAILED`, `SKIPPED`.

`moderation_status`: `PENDING`, `APPROVED`, `HIDDEN`, `DELETED`.

Do not store raw audio or external-provider request payloads containing personal data.

### `ChangeRequest`

Fields:

- `id` UUID PK.
- `project_id` UUID FK.
- `family_id` UUID FK.
- `feedback_item_id` UUID nullable FK.
- `title` text required.
- `description` text required.
- `screen_reference` text nullable.
- `theme` text nullable.
- `priority` enum: `LOW`, `NORMAL`, `HIGH`, `BLOCKER`.
- `status` enum: `NEW`, `NEEDS_REVIEW`, `ESTIMATED`, `AWAITING_APPROVAL`, `APPROVED`, `IN_PROGRESS`, `READY_FOR_REVIEW`, `DONE`, `DECLINED`.
- `estimated_minutes` integer nullable, nonnegative.
- `approved_price_minor` bigint nullable, nonnegative.
- `currency` char(3) nullable.
- `merged_into_id` UUID nullable self-reference.
- `created_at`, `updated_at` timestamps.

## 10.7 Billing and gifts

### `Payment`

Fields: `id`, `family_id`, `request_id`, `proposal_id`, `gift_id`, `stripe_checkout_session_id`, `stripe_payment_intent_id`, `amount_minor`, `currency`, `payment_type`, `status`, `paid_at`, `refunded_amount_minor`, `created_at`, `updated_at`.

- `payment_type`: `DEPOSIT`, `MILESTONE`, `FULL_BUILD`, `GIFT`, `DISCOVERY`, `CARE`
- `payment_status`: `PENDING`, `PROCESSING`, `PAID`, `FAILED`, `PARTIALLY_REFUNDED`, `REFUNDED`, `CANCELLED`

Use unique constraints on non-null Stripe event/object identifiers. Store only the minimum references needed for reconciliation.

### `Subscription`

Fields: `id`, `family_id`, `stripe_customer_id`, `stripe_subscription_id`, `plan_code`, `status`, `current_period_start`, `current_period_end`, `cancel_at_period_end`, `cancelled_at`, `created_at`, `updated_at`.

`subscription_status`: `INCOMPLETE`, `ACTIVE`, `PAST_DUE`, `CANCELLED`, `UNPAID`.

### `GiftCard`

| Field                    | Type          | Constraints                 |
| ------------------------ | ------------- | --------------------------- |
| `id`                     | UUID          | PK                          |
| `purchaser_user_id`      | UUID          | Nullable FK → User          |
| `purchaser_email`        | citext        | Required                    |
| `recipient_email`        | citext        | Required for email delivery |
| `recipient_display_name` | text          | Optional                    |
| `child_display_name`     | text          | Optional                    |
| `message`                | text          | Max 500                     |
| `gift_type`              | `gift_type`   | Required                    |
| `tier`                   | `app_tier`    | Nullable                    |
| `original_amount_minor`  | bigint        | Nonnegative                 |
| `remaining_amount_minor` | bigint        | Between zero and original   |
| `currency`               | char(3)       | Required                    |
| `redemption_token_hash`  | text          | Unique                      |
| `status`                 | `gift_status` | Required                    |
| `scheduled_delivery_at`  | timestamptz   | Required                    |
| `delivered_at`           | timestamptz   | Nullable                    |
| `redeemed_by_user_id`    | UUID          | Nullable FK → User          |
| `redeemed_at`            | timestamptz   | Nullable                    |
| `created_at`             | timestamptz   | Required                    |
| `updated_at`             | timestamptz   | Required                    |

`gift_type`: `TIER`, `AMOUNT`.

`gift_status`: `PENDING_PAYMENT`, `SCHEDULED`, `DELIVERED`, `REDEEMED`, `CANCELLED`, `REFUNDED`, `EXHAUSTED`.

The gift's financial balance is independent of redemption status. Maintain a `GiftLedgerEntry` table for all balance changes with `id`, `gift_id`, `entry_type`, `amount_minor`, `currency`, `payment_id`, `request_id`, `idempotency_key`, and `created_at`. Ledger entries are immutable.

## 10.8 Notifications, consent, audit

### `Notification`

Fields: `id`, `user_id`, `family_id`, `type`, `channel`, `subject`, `template_key`, `payload_json`, `status`, `scheduled_at`, `sent_at`, `provider_message_id`, `idempotency_key`, `error_code`, `created_at`.

- `channel`: `EMAIL`, `IN_APP`
- `notification_status`: `QUEUED`, `SENDING`, `SENT`, `FAILED`, `CANCELLED`

### `ConsentRecord`

Fields: `id`, `family_id`, `member_id`, `consent_type`, `status`, `consenting_user_id`, `policy_version`, `purpose`, `granted_at`, `withdrawn_at`, `created_at`.

- `consent_type`: `CHILD_CONTENT`, `VOICE_TRANSCRIPTION`, `EXTERNAL_AI_PROCESSING`, `FAMILY_SHARING`, `MARKETING_EMAIL`
- `status`: `GRANTED`, `WITHDRAWN`, `PENDING`

Consent must be purpose-specific, versioned, and revocable.

### `AuditLog`

Fields: `id`, `actor_user_id`, `family_id`, `action`, `entity_type`, `entity_id`, `metadata_json`, `ip_hash`, `created_at`.

Metadata must not contain passwords, tokens, full transcripts, or unnecessary personal data. IP addresses should not be retained in plain text unless a documented security need and lawful basis exist.

## 10.9 Indexes and integrity constraints

Create indexes for:

- `User(email)`.
- `Family(owner_user_id)`.
- `FamilyAccess(user_id, family_id, status)`.
- `Request(family_id, status, created_at DESC)`.
- `IntakeAnswer(request_id)`.
- `BuildBrief(request_id, version DESC)`.
- `Upload(family_id, created_at DESC)`.
- `Booking(start_at, end_at, status)`.
- `Proposal(request_id, version DESC)`.
- `Project(family_id, status, updated_at DESC)`.
- `App(family_id, status)`.
- `AppRelease(app_id, version DESC)`.
- `FeedbackItem(project_id, status, created_at DESC)` using the applicable moderation/analysis fields.
- `ChangeRequest(project_id, status, priority)`.
- `Payment(family_id, status, created_at DESC)`.
- `GiftCard(status, scheduled_delivery_at)`.
- `Notification(status, scheduled_at)`.
- `AuditLog(family_id, created_at DESC)`.
- GIN indexes on JSONB fields only where actual query patterns justify them.

Use a PostgreSQL exclusion constraint or transactional slot-locking mechanism to prevent overlapping bookings. Validate all state transitions in server code and database constraints where feasible.

# 11. Technical architecture

## 11.1 Architecture overview

Next.js App Router

Marketing · Portal · Admin · App runtime

Server actions and API routes

Validation · authorization · rate limits · state transitions

Supabase

Postgres, Auth, private Storage, RLS

Stripe

Checkout, billing, verified webhooks

Resend

Transactional email

Voice and AI

Whisper interface, LLM interface, mock mode

### Stack decisions

| Layer          | Choice                                      | Reason                                                       |
| -------------- | ------------------------------------------- | ------------------------------------------------------------ |
| Framework      | Next.js App Router                          | One full-stack application, server rendering, route handlers |
| Language       | TypeScript strict mode                      | Catch integration and schema errors early                    |
| Styling        | Tailwind CSS                                | Consistent tokens and rapid implementation                   |
| Components     | shadcn/ui + Radix primitives                | Accessible, customizable UI without a rigid visual identity  |
| Icons          | Lucide                                      | Consistent lightweight icon system                           |
| Forms          | React Hook Form + Zod                       | Typed validation and multi-step forms                        |
| Database       | Supabase PostgreSQL                         | Managed database and tenant-friendly RLS                     |
| Authentication | Supabase Auth                               | Email magic links                                            |
| Storage        | Supabase Storage                            | Private assets and signed access                             |
| Payments       | Stripe                                      | Checkout and subscription infrastructure                     |
| Email          | Resend + React Email                        | Transactional templates                                      |
| Testing        | Vitest + React Testing Library + Playwright | Unit, component, and end-to-end coverage                     |
| Deployment     | Vercel                                      | Straightforward Next.js deployment                           |
| Logging        | Structured application logs                 | Operational debugging without sensitive payloads             |

## 11.2 Authentication and authorization

- Authenticate users with Supabase Auth magic links.
- Validate the authenticated user server-side on every protected request.
- Do not rely on client-side route guards for authorization.
- Use separate authorization helpers for customer, family collaborator, and admin permissions.
- An admin role must be verified from trusted server-side data, not a user-editable profile field.
- Never expose a Supabase service-role key to the browser.
- Preview token access is limited to one preview and expires.
- Co-parent access is scoped to one family.
- A user who loses family access must lose access to family resources on their next request.

## 11.3 Row Level Security policies

Enable RLS on every table containing user, family, project, payment, gift, feedback, or private application data.

Create shared SQL helpers:

- `is_family_member(target_family_id UUID)` checks for an active `FamilyAccess` record for `auth.uid()` or ownership of the family.
- `is_family_owner(target_family_id UUID)` checks ownership.
- `is_admin()` checks the trusted admin role.
- Helpers must be written to avoid recursive RLS evaluation, using carefully scoped `SECURITY DEFINER` functions with a fixed search path where necessary.

Required policy behaviour:

| Table                  | SELECT                                                                       | INSERT                                       | UPDATE                                                             | DELETE                                              |
| ---------------------- | ---------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| User                   | Own profile; admin                                                           | Self only through trusted creation flow      | Own safe fields                                                    | Through account-deletion workflow                   |
| Family                 | Active members                                                               | Authenticated owner through server flow      | Owner                                                              | Owner through deletion workflow                     |
| FamilyMember           | Active family members                                                        | Owner or authorized server flow              | Owner                                                              | Owner, subject to retention rules                   |
| FamilyAccess           | Family members see relevant invitations                                      | Owner only                                   | Owner only                                                         | Owner revokes                                       |
| Request / IntakeAnswer | Family members                                                               | Family members on own draft                  | Owner or authorized collaborator on permitted draft fields         | Owner before submission; afterward use cancellation |
| BuildBrief             | Family members see confirmed/customer-safe versions                          | Server flow                                  | Drafts only                                                        | Admin-controlled retention                          |
| Upload                 | Family members with valid consent                                            | Authorized family member through upload flow | Metadata only                                                      | Owner or admin through deletion flow                |
| Booking                | Family members see own booking                                               | Server flow                                  | Owner for cancellation request; admin for schedule                 | Admin only                                          |
| Proposal               | Family members see their own proposal                                        | Admin/server only                            | Draft by admin; accepted proposal immutable                        | Admin may supersede, not silently delete            |
| Project / App          | Family members                                                               | Admin/server only                            | Admin-controlled status; customer approval through a narrow action | Admin lifecycle workflow                            |
| AppRelease             | Family members see permitted preview/production metadata                     | Admin/server only                            | Admin creates new versions                                         | Admin lifecycle workflow                            |
| AppDataRecord          | Active family members scoped to app                                          | Validated app runtime                        | Validated app runtime                                              | Owner/admin via app data controls                   |
| FeedbackItem           | Family members see their own submissions and allowed status; admin sees all  | Family members through controlled endpoint   | Admin analysis/status only                                         | Owner deletion request or admin moderation          |
| ChangeRequest          | Family members see permitted fields; admin sees all                          | Admin or authorized feedback conversion      | Admin and explicit customer approval action                        | Admin workflow                                      |
| Payment                | Family can see sanitized own payment status                                  | Verified server webhook only                 | Verified webhook/service role only                                 | Never directly deleted                              |
| Subscription           | Family can see own subscription metadata                                     | Verified server webhook only                 | Verified webhook only                                              | Never directly deleted                              |
| GiftCard               | Purchaser sees purchase status; recipient only through redemption token flow | Verified webhook only                        | Server-only balance/redemption transitions                         | Never directly deleted                              |
| GiftLedgerEntry        | Purchaser sees appropriate sanitized history                                 | Server-only                                  | Never                                                              | Never                                               |
| Notification           | User sees own in-app notifications; admin sees delivery metadata             | Server only                                  | Server only                                                        | Retention job                                       |
| ConsentRecord          | Family owner sees own consent history                                        | Server flow after explicit action            | Append new consent state; preserve history                         | Retention workflow                                  |
| AuditLog               | Admin only; narrowly scoped user-facing security events if required          | Server only                                  | Never                                                              | Retention policy only                               |

Additional rules:

1. Service-role operations are confined to server modules.
2. API routes explicitly verify family ownership even when RLS is enabled.
3. SQL functions use parameterized inputs and a fixed `search_path`.
4. Customer roles cannot read admin notes, unpublished prompts, or private admin analysis.
5. Private upload buckets deny anonymous reads. Use short-lived signed URLs only after authorization.
6. Test RLS with at least two unrelated families and an unauthenticated user.

## 11.4 Booking implementation

Build a small internal availability system.

- Store recurring weekday rules and dated exceptions.
- Use a configured builder timezone.
- Generate slots for the next 60 days.
- Default meeting duration: 30 minutes.
- Default buffer: 15 minutes before and after.
- Prevent overlapping confirmed bookings in a database transaction.
- On booking cancellation, release the slot and notify the customer.
- For daylight-saving changes, generate local availability using the IANA timezone and persist actual UTC timestamps.
- Meeting links are manually entered by the builder.
- No external calendar sync in MVP.

## 11.5 Payments and Stripe webhooks

Create Checkout Sessions only from server-side accepted proposals or valid gift purchase requests.

Required webhook events:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

Implementation requirements:

- Verify the Stripe signature against the raw request body.
- Record Stripe event IDs in a webhook receipt table with a unique constraint.
- Process events idempotently.
- Return success only after the event is safely recorded.
- Reconcile payment state from trusted Stripe objects.
- Do not mark a payment paid based only on a redirect.
- Do not fulfill a gift or publish a project twice if Stripe retries a webhook.
- Record refunds and adjust gift balances through immutable ledger entries.
- Provide an admin view of failed or unprocessed events.

## 11.6 Voice and AI architecture

Define interfaces instead of coupling business logic to a vendor.

```
export interface TranscriptionProvider {
  transcribe(input: {
    audio: Blob;
    language?: string;
  }): Promise<{
    text: string;
    language?: string;
  }>;
}

export interface LanguageModelProvider {
  generateBuildBrief(input: {
    answers: IntakeAnswerInput[];
    previousBrief?: BuildBriefInput;
  }): Promise<BuildBriefInput>;

  analyzeFeedback(input: {
    transcript: string;
    screenReference?: string;
    learningGoal?: string;
  }): Promise<FeedbackAnalysis>;

  generateFollowUp(input: {
    transcript: string;
    learningGoal: string;
  }): Promise<{ question: string }>;
}
```

Implementation details:

- `MockTranscriptionProvider` returns deterministic seeded transcripts or a transcript typed by the user.
- `WhisperLocalProvider` is an adapter for a configured self-hosted transcription service. It must not assume a Whisper binary or model is installed.
- `WhisperHostedProvider` is optional and disabled unless the user explicitly configures an approved provider and endpoint.
- `MockLanguageModelProvider` produces valid deterministic output for the seeded flows.
- Real LLM providers are behind a single server-side adapter and have a timeout, token limit, and error fallback.
- Zod validates all AI outputs.
- Invalid output is rejected and retried once with a constrained repair prompt; then the system falls back to a safe summary of the supplied text.
- Never allow model output to execute SQL, change permissions, alter payment state, deploy code, or publish production releases.

### Feedback follow-up safety

The follow-up generator must return one short question of no more than 20 words. Reject outputs containing URLs, requests for contact details, requests for precise location, requests for sensitive information, or content outside the feedback task.

If the generated question fails validation, omit it. Feedback submission must never depend on successful AI follow-up generation.

### Browser audio handling

- Request microphone access only after the user taps the mic.
- Record in a supported browser format.
- Set a 90-second maximum recording duration.
- Display a clear recording indicator and stop control.
- Send audio through an authenticated, rate-limited endpoint.
- Limit the audio payload to a configured maximum of 15 MB.
- Do not persist the audio to Supabase Storage, logs, queues, or database rows.
- Delete temporary files immediately after transcription when temporary disk processing is unavoidable.
- Return the transcript for user review before final submission.
- Document that server memory handling does not guarantee that every infrastructure layer avoids transient buffering; verify this with the hosting configuration before making a stronger privacy claim.

## 11.7 Hosting delivered apps

### MVP routing

Use paths, not wildcard subdomains, at launch:

- Portal: `/portal`
- Preview: `/preview/[previewId]`
- Production: `/app/[appSlug]`

Every app route resolves its `App` and `AppRelease` records server-side. Never accept arbitrary code or arbitrary remote URLs as a trusted app configuration.

Each release uses a versioned, allowlisted module configuration. The runtime renders the selected components from the Family App Kit.

### Future custom subdomains

Later, support `family-slug.funship.example` or a verified custom domain only after:

- Wildcard DNS and TLS are configured.
- Tenant resolution is based on a trusted database mapping.
- Host-header injection is tested.
- Cookies cannot cross unintended tenant boundaries.
- PWA manifests and service-worker scopes are isolated.
- Production data access is independently tested.

### PWA requirements

- A valid manifest per app, generated from the app configuration.
- App name, short name, theme colour, background colour, display mode, and icons.
- App-specific service-worker scope and cache namespace.
- Never cache authenticated private API responses by default.
- Clear cached private content on logout.
- Avoid caching family data on shared devices unless the app explicitly supports a safe offline mode.
- Install instructions must explain that a PWA is still a web app and some browser/device capabilities vary.

## 11.8 API routes

All request/response schemas use Zod. The shapes below are contracts; shared TypeScript types should be used by the UI and server.

| Method and path                               | Auth                 | Request                                                                  | Response                                           |
| --------------------------------------------- | -------------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| `GET /api/health`                             | Public               | None                                                                     | `{ status: "ok", mode: "mock" \\| "live" }`        |
| `POST /api/intake/drafts`                     | User                 | `{ familyId, title, category, ideaSlug? }`                               | `{ requestId }`                                    |
| `GET /api/intake/[requestId]`                 | Family member        | None                                                                     | `{ request, answers, brief }`                      |
| `PATCH /api/intake/[requestId]`               | Family member        | `{ questionKey, answer }`                                                | `{ saved: true, updatedAt }`                       |
| `POST /api/intake/[requestId]/submit`         | Family owner         | `{ confirmedBriefVersion }`                                              | `{ status: "SUBMITTED" }`                          |
| `POST /api/voice/transcribe`                  | Family member        | Multipart audio plus context                                             | `{ transcript, language? }`                        |
| `POST /api/intake/[requestId]/generate-brief` | Family member        | `{ answerVersion }`                                                      | `{ briefDraft }`                                   |
| `GET /api/booking/slots`                      | Public/authenticated | `{ from, to, timezone }`                                                 | `{ slots: [{ startAt, endAt }] }`                  |
| `POST /api/booking`                           | Family member        | `{ requestId, startAt, timezone }`                                       | `{ bookingId, status }`                            |
| `POST /api/booking/[id]/cancel`               | Family owner         | `{ reason? }`                                                            | `{ status: "CANCELLED" }`                          |
| `POST /api/proposals/[id]/accept`             | Family owner         | `{ termsVersion }`                                                       | `{ proposalId, checkoutUrl }`                      |
| `POST /api/payments/checkout`                 | Family owner         | `{ proposalId, milestone? }`                                             | `{ checkoutUrl }`                                  |
| `POST /api/stripe/webhook`                    | Stripe signature     | Raw event body                                                           | `{ received: true }`                               |
| `POST /api/gifts/checkout`                    | Purchaser or guest   | `{ giftType, tier?, amount?, currency, recipient, message, deliveryAt }` | `{ checkoutUrl }`                                  |
| `GET /api/gifts/redeem/[token]`               | Token-gated          | None                                                                     | Sanitized gift details                             |
| `POST /api/gifts/redeem/[token]`              | Authenticated user   | `{ acceptedTermsVersion }`                                               | `{ giftId, balanceMinor, currency }`               |
| `POST /api/feedback`                          | Valid preview access | `{ releaseId, screenReference, mode, text?, reaction? }`                 | `{ feedbackId, status }`                           |
| `POST /api/feedback/[id]/analyze`             | Admin or trusted job | `{}`                                                                     | `{ analysisStatus }`                               |
| `POST /api/change-requests`                   | Family member/admin  | `{ feedbackItemId?, title, description, screenReference? }`              | `{ changeRequestId }`                              |
| `POST /api/projects/[id]/approve-preview`     | Family owner         | `{ releaseId }`                                                          | `{ approved: true }`                               |
| `POST /api/admin/projects/[id]/publish`       | Admin                | `{ releaseId, smokeTestConfirmed }`                                      | `{ status, productionUrl }`                        |
| `GET /api/admin/capacity`                     | Admin                | `{ from, to }`                                                           | `{ committedMinutes, availableMinutes, projects }` |
| `POST /api/account/export`                    | Family owner         | `{ familyId }`                                                           | `{ jobId, status }`                                |
| `POST /api/account/delete`                    | Family owner         | `{ confirmationText }`                                                   | `{ jobId, status }`                                |

### API security rules

- Validate all parameters and bodies.
- Reject unknown fields on sensitive mutation routes.
- Apply per-user and per-IP rate limits, with more restrictive limits for voice and gift redemption.
- Use CSRF protections for cookie-authenticated mutation endpoints.
- Use a shared idempotency mechanism for payment, gift redemption, and other financial actions.
- Return generic errors for invalid redemption tokens to avoid revealing whether a gift exists.
- Never include service keys, provider exceptions, SQL text, or internal notes in client responses.
- Require explicit admin authorization on every `/api/admin/*` route.
- Use signed URLs for private upload downloads.
- Do not expose arbitrary user-controlled URLs to server-side fetch functions.

## 11.9 Background jobs

For MVP, implement a database-backed job table and a protected scheduled route invoked by Vercel Cron. Use a `FOR UPDATE SKIP LOCKED` claim pattern, retry counts, and idempotency keys.

Job types:

- `SEND_NOTIFICATION`
- `SEND_SCHEDULED_GIFT`
- `SEND_BOOKING_REMINDER`
- `ANALYZE_FEEDBACK`
- `GENERATE_BUILD_BRIEF`
- `GENERATE_EXPORT`
- `PROCESS_DELETION`
- `RECONCILE_STRIPE`
- `EXPIRE_PREVIEW_LINK`

Each job has `id`, `type`, `payload_json`, `status`, `run_at`, `attempt_count`, `max_attempts`, `idempotency_key`, `last_error_code`, `created_at`, and `updated_at`.

Requirements:

- Claim jobs transactionally.
- Retry transient failures with exponential backoff.
- Dead-letter after five failed attempts.
- Do not put raw audio or full sensitive transcripts in job payloads.
- Use database records as the source of truth; jobs carry IDs, not authoritative payment or permission state.
- Admin can inspect failed jobs and retry safe jobs.

## 11.10 Environment variables

Provide `.env.example` with every variable below. Empty optional variables must be handled gracefully.

```
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_NAME=Funship
APP_BASE_DOMAIN=localhost
APP_DEFAULT_CURRENCY=USD
APP_DEFAULT_TIMEZONE=America/Vancouver
APP_MOCK_MODE=true
APP_ENABLE_REAL_PAYMENTS=false
APP_ENABLE_REAL_EMAIL=false
APP_ENABLE_REAL_AI=false

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET_FAMILY=family-assets
SUPABASE_STORAGE_BUCKET_EXPORTS=family-exports

# Admin bootstrap
INITIAL_ADMIN_EMAIL=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_CARE_MONTHLY_USD=
STRIPE_PRICE_CARE_MONTHLY_CAD=
STRIPE_TAX_ENABLED=false

# Resend
RESEND_API_KEY=
EMAIL_FROM=Funship <hello@example.com>
EMAIL_REPLY_TO=hello@example.com
EMAIL_ENABLE_DELIVERY=false

# Voice providers
VOICE_PROVIDER=mock
WHISPER_LOCAL_ENDPOINT=
WHISPER_LOCAL_API_KEY=
WHISPER_HOSTED_API_KEY=
VOICE_MAX_SECONDS=90
VOICE_MAX_BYTES=15728640

# Language model
LLM_PROVIDER=mock
LLM_API_KEY=
LLM_BASE_URL=
LLM_MODEL=
LLM_TIMEOUT_MS=20000
LLM_MAX_OUTPUT_TOKENS=1200

# Security
PREVIEW_TOKEN_SECRET=
REDEMPTION_TOKEN_SECRET=
CRON_SECRET=
RATE_LIMIT_MODE=memory
EXPORT_SIGNING_SECRET=

# Operations
LOG_LEVEL=info
SENTRY_DSN=
```

Rules:

- `NEXT_PUBLIC_*` variables are browser-visible; never place secrets in them.
- Production startup must fail if required live-mode secrets are missing.
- Mock mode must not silently send real emails, charge cards, or call external AI services.
- `EMAIL_FROM` must be replaced with a verified sending domain before production email is enabled.
- Generate secrets with a cryptographically secure tool; never commit real secrets.
- Document local Supabase setup and migration application in the README.

## 11.11 Mock mode and seed data

The entire application must run using `npm install && npm run dev` with mock mode enabled and no API keys.

Mock mode includes:

- Seeded users, families, requests, projects, apps, feedback, and gifts.
- Deterministic mock authentication for local development only.
- Simulated payment checkout and webhook outcomes.
- Mock email previews in an admin notification log.
- Deterministic transcription and AI analysis.
- Simulated job execution.
- An explicit “MOCK MODE” banner on every admin page and all simulated payment screens.
- No external API calls unless explicitly enabled.

### Seed family A: The Chen family

- Parent: Alex Chen.
- Children: Maya, age band `AGE_5_7`; Leo, age band `AGE_8_12`.
- Request: `Chore Quest`.
- Status: `IN_PROGRESS`.
- Tier: Bloom.
- Project stage: `BUILDING`.
- Uploaded asset: a fictional, clearly labelled demo drawing of a dragon.
- Feedback item: “The stars are too small, and Maya wants a unicorn instead of a dragon.”
- Change request: increase reward-star size and add an original unicorn option.
- Demo production app: a working chore-quest game with chores, stars, character selection, and parent reset controls.

### Seed family B: The Morgan family

- Parent: Jamie Morgan.
- Co-parent: Taylor Morgan.
- Request: `Japan Family Quest`.
- Status: `PROPOSAL_SENT`.
- Tier: Bloom.
- Intake: confirmed brief with a manually entered itinerary and family preferences.
- Booking: one completed discovery call with fictional notes.
- Proposal: a $699 USD Bloom proposal awaiting acceptance.

### Seed gift

- Gift: a $300 USD amount gift.
- Purchaser: fictional demo account.
- Recipient: fictional demo recipient.
- Status: `SCHEDULED`.
- Delivery date: a seeded future date relative to the demo fixture clock.
- Includes a printable preview, gift message, and working mock redemption flow.

All seed names, images, transcripts, emails, and payment references must be fictional. No real customer data is used in demo mode.

# 12. Privacy, safety & trust

Families are sharing unusually personal material: children's drawings, names, family photos, voices, household routines, and stories. Privacy must be part of the product architecture, not a policy page added at the end.

## 12.1 Children's privacy and applicable law

The product serves customers in Canada and the United States. Legal obligations depend on the actual data practices, the user's age, the business model, and applicable jurisdictions.

### United States

Review the Children's Online Privacy Protection Act (COPPA) and the FTC's implementing rule. Although children do not hold Funship accounts, the business must still assess whether its services are directed to children or knowingly collect personal information from children.

Requirements for the product:

- Parent-owned accounts and explicit parental authorization for child-related uploads and processing.
- No independent child registration, child email collection, or child-directed marketing.
- No behavioural advertising or sale of personal information.
- Clear disclosure of what information is collected, why it is collected, and which service providers receive it.
- A mechanism for parents to review, export, and request deletion of their children's personal information.
- Retention limited to what is reasonably necessary for the service.
- No third-party processing of children's voices, photos, or drawings without the required consent and disclosure.
- No unrestricted child-facing conversational AI.

### Canada

Review PIPEDA, applicable provincial private-sector privacy legislation, and relevant consumer-protection rules. British Columbia's Personal Information Protection Act may apply to private-sector operations in the province. Other provincial and cross-border requirements may also apply.

Requirements:

- Identify the purpose of each collection before collecting data.
- Obtain meaningful consent appropriate to the information and the context.
- Collect only the minimum personal information needed.
- Explain cross-border processing and service-provider access.
- Maintain appropriate security safeguards.
- Provide access, correction, and deletion processes subject to applicable legal requirements.
- Assess whether parental consent is required for information about children, using age-appropriate standards.
- Keep an inventory of service providers, subprocessors, locations, and retention practices.

Legal review required: The actual COPPA applicability analysis, Canadian privacy-law applicability, parental-consent flow, cross-border transfers, retention obligations, and any province-specific requirements must be reviewed by a lawyer before launch.

## 12.2 Data handling rules

| Data                 | Collection rule                                  | Storage and access                                        | Retention                                                             |
| -------------------- | ------------------------------------------------ | --------------------------------------------------------- | --------------------------------------------------------------------- |
| Parent account email | Required for authentication and service delivery | Supabase Auth; visible only to authorized users and admin | While account is active, subject to legal retention                   |
| Child display name   | Optional; use a nickname where practical         | Private family profile                                    | Until deleted or no longer needed                                     |
| Age band             | Optional; broad bands only                       | Private family profile                                    | Until deleted or no longer needed                                     |
| Photos and drawings  | Optional, with appropriate parental consent      | Private Supabase Storage; signed URLs                     | Delete when requested or when no longer needed                        |
| Voice audio          | Explicit user action and permission              | Transient processing only; no persistent storage          | Discard immediately after transcription                               |
| Voice transcript     | Review before submission                         | Private database; authorized family and admin access      | While needed for the project; remove or redact under retention policy |
| Intake responses     | Necessary to scope the project                   | Tenant-scoped PostgreSQL                                  | Active project plus documented retention period                       |
| AI build brief       | Parent-confirmed structured summary              | Private database                                          | While needed to deliver and maintain the app                          |
| Feedback transcript  | Optional, submitted by voice or text             | Private database, tied to screen context                  | Project duration plus limited support period                          |
| Billing records      | Required for payment and reconciliation          | Stripe references plus internal financial ledger          | According to legal and tax retention requirements                     |
| Audit logs           | Security and accountability                      | Admin-only                                                | Defined security retention period                                     |
| Marketing consent    | Optional and separate from service consent       | Consent record                                            | Until withdrawn, subject to legal requirements                        |

### Proposed retention schedule

These are launch defaults, subject to legal review:

- Unsubmitted draft requests: delete after 90 days of inactivity, with advance notice.
- Raw voice audio: never persist.
- Voice transcripts and feedback: retain during the active project and for 12 months after delivery, unless deletion is requested earlier and retention is not legally required.
- Unused uploads: delete after 90 days if not attached to an active request.
- Delivered-app customer data: retain while the app is hosted; delete within 30 days after termination, subject to backup expiry.
- Temporary exports: expire after seven days.
- Audit and security logs: retain for 12 months, excluding records legally required to be kept longer.
- Financial records: retain according to applicable tax and accounting law.

Deletion jobs must record completion metadata without retaining the deleted content itself. Backups must have a documented expiry schedule.

## 12.3 Voice data handling

Follow the principles established in Sonar:

1. The user initiates recording.
2. The browser displays a recording indicator.
3. Audio is transmitted over HTTPS to the transcription service.
4. The server transcribes the audio.
5. The raw audio is discarded.
6. The transcript is shown for correction before submission.
7. Only the confirmed transcript is saved as project feedback or intake content.
8. If external AI analysis is enabled, process only the minimum required text and disclose the provider and purpose.
9. Provider logs must not retain audio or sensitive prompts beyond the configured processing requirements.
10. If transcription fails, offer text input and discard the audio.

Do not advertise “audio is never stored anywhere” until transient infrastructure buffers, error reporting, provider retention, and temporary processing paths have been verified.

## 12.4 Upload and character safety

- Validate MIME type and file signature on the server.
- Reject oversized, executable, malformed, or disallowed files.
- Strip unnecessary EXIF metadata from display derivatives, including embedded location metadata.
- Never publish an uploaded image to a public bucket.
- Require parental confirmation that uploaded images and artwork may be used in the app.
- Do not generate an identifiable depiction of a real person without appropriate authorization.
- Do not use a child's photo to generate unrelated images or synthetic likenesses.
- Do not copy copyrighted characters, logos, or protected designs.
- If a request includes protected characters, offer original characters or the family's own drawings.
- Provide a way to report inappropriate uploaded material and remove it from the app.

## 12.5 Security requirements

- RLS on every tenant-sensitive table.
- Private storage buckets and short-lived signed URLs.
- Admin authorization verified server-side.
- Rate limits for authentication, uploads, transcription, feedback, and redemption.
- Secure, random, expiring tokens for preview links and gift redemption.
- Hashed storage of redemption and preview tokens.
- Strict content-security policy and safe rendering of user content.
- No raw HTML injection from user-generated content.
- No arbitrary JavaScript in app configurations.
- HTTPS in production.
- Secure, HTTP-only session cookies where applicable.
- No sensitive data in URLs, analytics events, or application logs.
- Dependency scanning and routine security updates.
- Account deletion, data export, and access-revocation workflows.
- An incident response procedure for unauthorized access or data disclosure.

## 12.6 Trust copy for the website

Use the following as the initial draft, pending legal review.

## Your family's stuff stays your family's.

Your family's photos, drawings, stories, and ideas are personal. We treat them that way.

- **No ads.** Funship apps are made for your family, not for advertisers.
- **No selling your data.** We do not sell your family's personal information.
- **No training on your family's content.** We do not use your private family content to train AI models.
- **Your choice.** You decide what to share with us, and we explain how it will be used.
- **Voice stays simple.** When you leave voice feedback, we transcribe it and discard the recording rather than keeping an audio library.
- **Your app, your data.** You can request an export or deletion of your family's information, subject to applicable legal requirements.

AI helps us organize ideas and build faster. A human maker reviews the work. When a service provider needs to process information to deliver the service, we explain that processing and apply appropriate safeguards.

## 12.7 Required legal review before production

- Privacy policy, terms of service, and refund policy.
- COPPA applicability and parental consent.
- Canadian and provincial privacy requirements.
- Consumer protection and digital-service cancellation rights.
- Gift-card expiry, refunds, and unredeemed balances.
- Sales tax, GST/HST, PST, and US sales-tax obligations.
- Data-processing agreements with Supabase, Stripe, Resend, and any AI providers.
- Cross-border data transfers and subprocessors.
- Intellectual property and rights to family-uploaded assets.
- Accessibility obligations.
- Security incident response and notification obligations.
- Liability limits, service availability, warranty, and hosting termination terms.

# 13. Metrics & launch

## 13.1 North-star metric

Successful family outcomes per month: the number of unique families that receive a delivered app and either confirm that it solves the agreed need or actively use a delivered app during the measurement month.

Track two components separately:

1. Outcome confirmation: A parent explicitly confirms that the app addresses the original goal.
2. Ongoing usefulness: A family has meaningful app activity, such as completing a chore, updating a trip plan, browsing a recipe, or using a learning activity.

Do not treat app opens alone as proof of value. The goal is family utility, not engagement for its own sake.

## 13.2 Funnel metrics

| Metric                     | Definition                                                               | Initial target     |
| -------------------------- | ------------------------------------------------------------------------ | ------------------ |
| Visitor → ideas engagement | Visitors who open an idea detail page / unique visitors                  | 25%                |
| Visitor → intake start     | Unique visitors who start intake / unique visitors                       | 5%                 |
| Intake completion          | Submitted briefs / started intakes                                       | 60%                |
| Brief acceptance           | Confirmed briefs / submitted requests                                    | 70%                |
| Proposal acceptance        | Accepted proposals / issued proposals                                    | 35%                |
| Paid conversion            | Paid builds / accepted proposals                                         | 90%                |
| On-time delivery           | Projects delivered within quoted window / delivered projects             | 85%                |
| First-pass approval        | Projects approved with no additional revision round / delivered projects | 60%                |
| Family satisfaction        | Parents rating their app 4 or 5 out of 5                                 | 85%                |
| Gift redemption            | Redeemed gifts / gifts eligible for redemption in the cohort             | 50% within 90 days |
| Referral rate              | New customers referred by existing customers / new customers             | 20%                |

These are initial hypotheses, not established benchmarks. Review the funnel after the first 10 and 25 customers.

## 13.3 Feedback and satisfaction

After delivery, ask one short optional question:

> “How much does this app help with the thing you wanted to make easier or more fun?”

Use a five-point response scale with labelled emoji and text alternatives.

Follow with an optional voice prompt:

> “What's one thing we got right, or one thing you'd still change?”

Track:

- Sentiment distribution.
- Most common positive themes.
- Most common friction points.
- Percentage of feedback resolved.
- Time from feedback to accepted change.
- Revision hours per app.
- Parent-reported usefulness after 30 days.

Do not infer children's emotional state, health, or family relationships from their feedback.

## 13.4 First 10 families

The first cohort is a learning program, not just a revenue target.

### Recruitment

Recruit across at least four use cases:

- Three routine, chore, or meal apps.
- Three games, stories, or learning apps.
- Two trip or family-memory apps.
- Two gifting or grandparents apps.

A family can belong to more than one category, but do not let the first cohort consist entirely of similar apps.

### Pilot offer

- Charge the standard price for customers who can pay.
- Offer a clearly labelled 20% pilot discount to selected families in exchange for structured feedback, with no requirement to give a positive testimonial.
- Obtain separate permission for any public case study, screenshots, or testimonial.
- Do not use children's names, photos, drawings, or voices in marketing without appropriate, specific consent.

### Pilot process

1. Recruit 15–20 interested households.
2. Conduct short discovery calls with 10 selected households.
3. Record the original need, existing workaround, and desired outcome.
4. Deliver the first 10 projects using the same intake, proposal, feedback, and delivery workflows.
5. Track founder time at each stage.
6. Interview parents 7–14 days after delivery.
7. Identify the three most reusable app patterns.
8. Update pricing and tier limits based on actual delivery hours.
9. Publish only approved case studies.
10. Do not scale paid acquisition until the delivery process is repeatable.

## 13.5 First 100 families: seasonal timeline

Use the holiday gifting season as an opportunity, not as a reason to overpromise.

Weeks 1–2

Pilot and foundations

Complete the first 10 projects, fix critical issues, verify pricing, establish consent and privacy workflows, and publish three reusable templates.

Weeks 3–4

Gift launch

Publish the gift page, printable cards, example gift journeys, and a clear cutoff date for delivery before Christmas. Only accept work that fits actual capacity.

Weeks 5–8

Template-driven acquisition

Share approved examples, build partnerships with family photographers or local family-oriented communities, and test a small number of referral channels.

Weeks 9–12

Operational scale

Review conversion, gift redemption, capacity, and hours per app. Add no more than one new template family at a time. Introduce a waitlist if delivery dates are at risk.

### Holiday safeguards

- State the last date for guaranteed pre-holiday delivery prominently.
- After that date, sell a gift certificate with a future delivery expectation rather than promising a finished app.
- Do not use false scarcity or countdown timers.
- Track unredeemed gift balances and upcoming delivery obligations.
- Set a weekly project cap based on available hours.
- Do not hire contractors or increase fixed costs solely on the basis of gift-card sales.

# 14. Risks & open questions

## 14.1 Top risks

| Risk                       | Why it matters                                                   | Mitigation                                                                          |
| -------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Scope creep                | A “small family app” can quietly become a complex product        | Immutable proposal, tier limits, explicit exclusions, paid change requests          |
| Builder capacity           | Every custom app creates support and maintenance obligations     | Weekly capacity limits, reusable modules, waitlist, no unlimited revisions          |
| Privacy involving children | Families share unusually sensitive material                      | Data minimization, consent, private storage, retention rules, legal review          |
| Copyrighted characters     | Popular requests may infringe IP rights                          | Original character alternatives, clear policy, human review                         |
| Weak willingness to pay    | The emotional promise may be attractive but expensive            | Paid pilots, price tests, track proposal conversion and hours                       |
| Poor repeat revenue        | A family may need only one app                                   | New seasonal ideas, paid changes, useful hosting, referrals; no forced subscription |
| Maintenance burden         | A deployed app can break as dependencies or hosting change       | Shared runtime, pinned template versions, automated tests, explicit support scope   |
| AI errors                  | Generated briefs can invent requirements or misunderstand speech | Parent confirmation, schema validation, no automatic publishing                     |
| Voice service failure      | Browser recording and transcription vary across devices          | Text fallback, mock provider, retry and graceful degradation                        |
| Gift redemption friction   | Recipients may not know what to request                          | Clear gift landing page, easy redemption, examples, optional discovery              |
| Gift liability             | Unredeemed balances and delayed delivery create obligations      | Immutable gift ledger, clear terms, reconciliation, conservative cash planning      |
| Cross-tenant data leakage  | A single authorization error could expose family content         | RLS, tenant tests, private storage, server-side access checks                       |
| Underpriced customization  | AI reduces some coding work but not customer communication or QA | Measure actual time and raise prices when necessary                                 |
| Founder dependence         | Every family may expect direct access to the maker               | Clear service boundaries, structured updates, reusable workflows                    |
| Platform overbuilding      | Building a generic app builder delays the first customer         | One production template, manual publishing, narrow MVP                              |
| Poor family outcomes       | A beautiful app may not solve the original problem               | Explicit desired outcome in brief, preview testing, post-delivery check-in          |

## 14.2 Open questions for the founder

These are genuine decisions that can remain open during the first implementation because the defaults above make the app buildable.

1. Brand clearance: Does Funship survive trademark and domain review?
2. Positioning: Should the public message emphasize practical family utility, magical personalized gifts, or present both equally?
3. Initial wedge: Which two or three categories produce the strongest combination of demand, emotional value, and reusable implementation?
4. Pricing: Do customers accept the proposed prices without a call, or is a paid discovery step necessary for most projects?
5. Hosting promise: Is the $5/month hosting-only option sustainable given actual maintenance and infrastructure costs?
6. External AI processing: Which provider, if any, is acceptable for processing family content under the desired privacy standard?
7. Sharing: Should co-parent invitations ship in the first 10-family pilot or after initial delivery workflows are stable?
8. Geographic expansion: Should the service remain Canada-first until tax, legal, and customer support operations are mature?
9. Template threshold: At what measured hours per app should a new app be refused unless it uses an existing template?
10. Contractors: Which activities are safe to delegate without weakening the product's personal, maker-led promise?

# 15. Build plan for the AI coding agent

## 15.1 Instructions to Claude

You are building Funship as a complete, working, end-to-end web application from this PRD.

Your job is to implement the product, not to produce a mockup, a clickable prototype, or a collection of disconnected pages.

### Non-negotiable instructions

1. Do not stop to ask questions. Follow the decisions in this PRD.
2. If a detail remains unclear, choose the simplest implementation consistent with the PRD and document it in `DECISIONS.md`.
3. Build a cohesive design system before building feature screens.
4. Make every MVP button, form, route, and state transition functional.
5. Prefer working integrations behind interfaces over fake implementations. Mock implementations are acceptable only when they are clearly labelled and the real integration has a defined adapter.
6. The app must start with `npm install && npm run dev` in mock mode without API keys.
7. Do not silently swallow errors. Show useful user-facing errors and log sanitized diagnostic details.
8. Never invent successful payments, email deliveries, transcriptions, production deployments, or other external actions in live mode.
9. Do not put secrets in client code.
10. Do not store raw voice recordings.
11. Do not build a general-purpose code-generation or arbitrary deployment platform. Implement the versioned Family App Kit runtime and the manual publishing workflow.
12. Include tests for intake, payment webhooks, gift redemption, feedback submission, and tenant isolation.
13. Run linting, type checking, unit tests, and production builds. Fix failures before declaring completion.
14. Keep the app visually coherent across public pages, portal, admin, feedback sheet, and delivered apps.
15. Do not omit privacy, loading, error, empty, or mobile states to save implementation time.

### Definition of a finished application

A finished application has:

- A polished public website with the complete marketing message and working navigation.
- Functional authentication and a family dashboard.
- A persistent multi-step intake flow.
- A build brief that can be generated, edited, and confirmed.
- Working mock and live integration boundaries for voice and AI.
- Booking, proposals, and a real payment integration when configured.
- Gift purchase and redemption flows.
- A working admin console for managing requests and projects.
- A feedback widget that creates persisted feedback records and change requests.
- A real example family app running through the shared runtime.
- A delivery and approval workflow.
- Seeded demo data.
- Tests for the most important business rules.
- A README that explains local development and production setup.

## 15.2 Ordered milestones

Implement milestones in order. A milestone is complete only when its definition of done is satisfied.

### M1 — Foundation and design system

Build

- Initialize Next.js App Router with TypeScript strict mode.
- Configure Tailwind CSS, shadcn/ui, Lucide, fonts, theme tokens, light and dark mode.
- Configure Zod, form validation, logging, error boundaries, and shared state components.
- Add `.env.example`, mock-mode configuration, and a working health endpoint.
- Create initial `DECISIONS.md`.

Files and folders

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    api/health/route.ts
  components/
    ui/
    layout/
    feedback/
    states/
  lib/
    config.ts
    logger.ts
    errors.ts
    utils.ts
  styles/
    tokens.css
tests/
DECISIONS.md
.env.example
README.md
```

Definition of done

- `npm install && npm run dev` works with no API keys.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- Theme tokens are semantic, responsive, and keyboard-accessible.
- Mock mode is visibly indicated in the appropriate interfaces.
- No secrets are exposed in browser bundles.

### M2 — Marketing site and ideas gallery

Build

- Home, How it works, Ideas, Idea detail, Pricing, Gifts, FAQ, About, Contact, and legal page routes.
- All copy specified in this PRD.
- Responsive layouts and original brand illustrations.
- Search/filter functionality for the gallery.
- Tier cards and functional CTAs.
- Metadata and Open Graph defaults.

Files

```
src/app/(marketing)/
  page.tsx
  how-it-works/page.tsx
  ideas/page.tsx
  ideas/[slug]/page.tsx
  pricing/page.tsx
  gifts/page.tsx
  faq/page.tsx
  about/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  refunds/page.tsx
  gift-terms/page.tsx
src/features/ideas/
src/data/ideas.ts
public/illustrations/
```

Definition of done

- All marketing links resolve.
- Every gallery card opens a real detail page.
- Pricing is consistent across all pages.
- The layout works at 375 px, 768 px, and 1280 px.
- The homepage contains the exact core messaging and a clear gift CTA.
- No customer-facing placeholder text such as “Lorem ipsum” remains.

### M3 — Authentication, database, and family portal

Build

- Supabase client/server setup.
- SQL migrations for core entities.
- Authentication callbacks and session management.
- Family ownership and collaborator permissions.
- Portal dashboard, request list, app list, settings, billing shell.
- RLS policies and tenant-isolation tests.
- Seed users and families.

Files

```
src/lib/supabase/
  client.ts
  server.ts
  middleware.ts
src/lib/auth/
src/lib/permissions/
src/features/families/
src/features/portal/
src/app/(auth)/
src/app/portal/
supabase/migrations/
supabase/seed.sql
```

Definition of done

- An authenticated family sees only its own records.
- A second family cannot read or mutate the first family's data.
- An unauthenticated user cannot access protected portal routes.
- Admin-only routes reject customer accounts.
- RLS policies are tested against actual database queries, not just mocked permissions.

### M4 — Intake wizard, uploads, and build brief

Build

- Draft request creation.
- Step-by-step intake wizard.
- Autosave and resume.
- Upload flow with validation and private storage.
- Voice input interface.
- Mock transcription provider.
- AI brief generation, editing, and confirmation.
- Scope classification and admin notification.

Files

```
src/features/intake/
  schemas.ts
  actions.ts
  components/
  services/
src/features/voice/
  recording.ts
  providers/
    mock-transcription.ts
    whisper-local.ts
    whisper-hosted.ts
src/features/brief/
src/app/api/intake/
src/app/api/voice/
supabase/migrations/
```

Definition of done

- A family can start, leave, and resume an intake without losing answers.
- Uploads remain private.
- A generated brief is editable and never automatically accepted.
- The text fallback works without microphone access.
- Mock transcription and mock brief generation work offline from external services.
- Invalid AI output cannot break the request flow.

### M5 — Booking and proposals

Build

- Availability rules and exceptions.
- Slot generation, timezone handling, and conflict prevention.
- Booking confirmation and cancellation.
- Admin calendar.
- Proposal builder with immutable accepted snapshots.
- Customer proposal review and acceptance.

Files

```
src/features/booking/
src/features/proposals/
src/app/api/booking/
src/app/api/proposals/
src/app/admin/calendar/
src/app/admin/proposals/
supabase/migrations/
```

Definition of done

- Two simultaneous attempts to book the same slot cannot both succeed.
- Timezones and daylight-saving changes are handled correctly.
- An accepted proposal cannot be silently edited.
- Customer-facing proposal prices and payment milestones match the stored proposal.
- Cancellation triggers the appropriate state transition.

### M6 — Payments and gifting

Build

- Stripe Checkout adapter and webhook handler.
- Mock checkout provider.
- Payment ledger and reconciliation.
- Gift purchase page, gift customization, scheduled delivery, printable card.
- Token hashing and single-use redemption.
- Gift balance ledger and partial-balance handling.
- Receipt and gift emails.

Files

```
src/features/payments/
  providers/
    mock-payment.ts
    stripe-payment.ts
src/features/gifts/
src/app/api/payments/
src/app/api/stripe/webhook/route.ts
src/app/api/gifts/
src/lib/jobs/
src/emails/
supabase/migrations/
```

Definition of done

- Stripe webhook signatures are verified in live mode.
- Duplicate webhook events cannot duplicate payments or gift balances.
- A gift cannot be redeemed twice.
- A gift balance cannot become negative.
- A browser redirect cannot mark a payment as paid.
- Scheduled gift emails are idempotent.
- Mock mode never charges a real card.

### M7 — Feedback, transcription, and change requests

Build

- Embeddable React feedback button for Funship apps.
- Accessible bottom sheet or modal.
- Voice and text input.
- Emoji reactions.
- Screen and release context.
- Mock and configurable transcription/LLM providers.
- AI analysis, optional follow-up, and structured change requests.
- Admin feedback board.

Files

```
src/features/feedback/
  FeedbackButton.tsx
  FeedbackSheet.tsx
  schemas.ts
  actions.ts
  providers/
src/app/api/feedback/
src/app/api/change-requests/
src/app/admin/feedback/
supabase/migrations/
```

Definition of done

- Submitting feedback creates a database record tied to the correct project and release.
- The user's screen reference is sanitized and persisted.
- Raw audio is never written to persistent storage.
- Text feedback works when voice is unavailable.
- Analysis failure does not prevent feedback submission.
- Follow-up questions are validated before being shown.
- Customer feedback cannot trigger production publishing or execute generated code.

### M8 — Admin console

Build

- Admin dashboard and request inbox.
- Family and request detail views.
- Calendar, proposal builder, project status manager.
- Billing and gift views.
- Capacity estimates.
- Template library.
- Audit logs and failed-job visibility.

Files

```
src/app/admin/
src/features/admin/
src/features/capacity/
src/features/templates/
src/features/audit/
src/app/api/admin/
```

Definition of done

- All admin pages require server-side admin authorization.
- Admin can move a project through the defined stages.
- Admin can issue a proposal and track payment state.
- Admin can convert feedback into change requests and mark them complete.
- Capacity calculations match the stored project estimates.
- Audit events are created for privileged changes.

### M9 — Family App Kit and delivered-app hosting

Build

- Shared app shell and versioned template registry.
- Theme resolution.
- Family-specific app configuration.
- Preview and production releases.
- PWA manifest and app icons.
- Demo Chore Quest app.
- Parent controls and kid mode.
- Manual release approval and publishing.
- App installation instructions.

Files

```
src/features/app-runtime/
  AppShell.tsx
  AppRenderer.tsx
  template-registry.ts
  theme-resolver.ts
  release-service.ts
src/features/app-modules/
  checklist/
  reward-board/
  character-picker/
  recipe-cards/
  story-steps/
src/app/preview/
src/app/app/
src/features/pwa/
src/demo-apps/chore-quest/
supabase/migrations/
```

Definition of done

- A delivered app renders from a versioned, allowlisted configuration.
- Family theme settings do not leak between apps.
- Preview and production releases are distinct.
- Publishing requires authorization, payment checks, approval, and smoke tests.
- A production app cannot load arbitrary customer-supplied JavaScript.
- The Chore Quest demo supports chore completion, reward stars, character selection, and parent reset controls.
- PWA installation works where supported, and instructions explain platform limitations.

### M10 — Notifications, privacy, and account lifecycle

Build

- Resend adapter and React Email templates.
- Mock email preview and delivery log.
- Scheduled reminders and gift delivery.
- Export and deletion workflows.
- Consent records and retention jobs.
- Rate limits and audit improvements.

Files

```
src/emails/
src/features/notifications/
src/features/consent/
src/features/account-lifecycle/
src/app/api/account/
src/app/api/cron/
src/lib/rate-limit/
```

Definition of done

- Every transactional email has a previewable template.
- Scheduled jobs are idempotent and retry safely.
- Account export produces a verified archive with authorized content only.
- Deletion revokes access and schedules data removal according to policy.
- Consent withdrawal is recorded and prevents the corresponding optional processing.
- No raw audio, secrets, or unnecessary personal information appear in logs.

### M11 — End-to-end QA and launch readiness

Build

- Complete the seeded demo experience.
- Run critical user journeys in Playwright.
- Verify responsive layouts and accessibility.
- Test RLS and tenant isolation.
- Validate live-mode configuration guards.
- Complete production deployment documentation.
- Review privacy, error handling, loading states, and copy.

Definition of done

The following scenarios must pass from beginning to end:

1. A visitor starts an intake, saves it, resumes it, generates a brief, edits it, and submits it.
2. The admin reviews the request, issues a proposal, and the family accepts it.
3. A test payment is confirmed through a verified, idempotent webhook.
4. A buyer purchases a gift, the scheduled message is sent once, and the recipient redeems it once.
5. A family member submits voice or text feedback, and the admin converts it into a change request.
6. The admin prepares a release, passes smoke tests, and publishes it.
7. The family opens the delivered app and submits a change request.
8. One family cannot access another family's private records, assets, feedback, or payment information.
9. Every core flow remains usable if transcription, AI analysis, or email delivery fails.
10. A clean checkout of the repository can be installed and run in mock mode using the documented commands.

## 15.3 Repository structure

Use the following structure as the default. Add files as needed, but keep responsibilities separated.

```
funship/
├── public/
│   ├── illustrations/
│   │   └── brand/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   ├── (auth)/
│   │   ├── portal/
│   │   ├── admin/
│   │   ├── app/
│   │   ├── preview/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── feedback/
│   │   └── states/
│   ├── features/
│   │   ├── auth/
│   │   ├── families/
│   │   ├── intake/
│   │   ├── brief/
│   │   ├── booking/
│   │   ├── proposals/
│   │   ├── payments/
│   │   ├── gifts/
│   │   ├── feedback/
│   │   ├── projects/
│   │   ├── app-runtime/
│   │   ├── app-modules/
│   │   ├── templates/
│   │   ├── notifications/
│   │   ├── consent/
│   │   ├── capacity/
│   │   └── account-lifecycle/
│   ├── lib/
│   │   ├── auth/
│   │   ├── supabase/
│   │   ├── stripe/
│   │   ├── email/
│   │   ├── ai/
│   │   ├── voice/
│   │   ├── validation/
│   │   ├── permissions/
│   │   ├── rate-limit/
│   │   ├── jobs/
│   │   ├── logger.ts
│   │   └── config.ts
│   ├── emails/
│   ├── data/
│   └── types/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── security/
│   └── e2e/
├── scripts/
├── .env.example
├── DECISIONS.md
├── README.md
├── package.json
└── tsconfig.json
```

## 15.4 Required scripts

Configure `package.json` with at least these scripts:

```
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:reset": "supabase db reset",
    "db:types": "supabase gen types typescript --local"
  }
}
```

Adjust the exact commands if required by the selected package versions, but preserve equivalent functionality.

## 15.5 Testing requirements

### Unit tests

Cover:

- Tier price and currency calculations.
- Proposal milestone calculations.
- Gift balance ledger calculations.
- Request and project state transitions.
- AI response validation.
- Feedback follow-up safety validation.
- Booking timezone and overlap rules.
- Upload validation.
- Retention and deletion eligibility.

### Integration tests

Cover:

- RLS and tenant isolation.
- Authenticated request creation.
- Build-brief persistence and versioning.
- Stripe signature verification.
- Duplicate webhook handling.
- Gift purchase and redemption.
- Feedback persistence and analysis failure.
- Export authorization and data deletion.

### End-to-end tests

Cover the five MVP release-gate flows from Section 8, plus:

- Mobile intake at 375 px width.
- Keyboard-only intake completion.
- Screen-reader labels for microphone controls.
- Preview approval and production publishing.
- Failed payment and retry.
- Expired preview and gift links.

Tests must use deterministic fixtures. Do not depend on live AI, email, or payment services in the standard test suite.

## 15.6 Final implementation priorities

When time or token budget is constrained, preserve these priorities:

1. Correct authorization and privacy.
2. Complete intake and brief confirmation.
3. Proposal and payment correctness.
4. Gift purchase and redemption correctness.
5. Feedback and change-request persistence.
6. A functioning delivered app.
7. A usable admin workflow.
8. Marketing polish and secondary enhancements.

Do not sacrifice tenant isolation, payment integrity, or deletion controls to add decorative animations or extra gallery examples.

## 15.7 Launch checklist

Before accepting the first real customer, verify each item.

## Production readiness

### 0/15

Production domain and HTTPS configured

Trademark and domain checks completed

Legal pages reviewed and published

Privacy, consent, and retention workflows tested

Supabase RLS verified against multiple families

Stripe test-mode flows passed, then live mode configured safely

Resend sending domain verified

Voice and AI provider retention reviewed

Admin account provisioned securely

Demo seed data contains no real customer information

Export and deletion flows tested

Mobile and accessibility checks passed

Delivery and rollback procedures documented

Weekly capacity and delivery cutoffs configured

First 10 pilot families recruited and onboarding ready

Reset checklistCopy checklist

## Final recommendation

Build Funship as a high-touch custom service with a productized delivery system, not as a software platform that attempts to automate every possible family app.

The first version needs only one excellent example app, one reliable intake flow, one clear proposal and payment process, one useful feedback loop, and one admin workspace. That is enough to test whether families will pay for personal software and whether the process can be repeated profitably.

The biggest business risk is not whether AI can build the apps. It is whether the price covers the human work around each app: discovery, communication, design decisions, revisions, testing, and maintenance.

Measure those hours from the first customer. Make the Family App Kit earn its place through repeated use. If the service becomes predictable, the templates and infrastructure can gradually turn a solo maker's craft into a scalable family brand.