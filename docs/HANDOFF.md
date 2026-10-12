# RailX — Conversation Handoff (as of 13 Oct 2026 ~04:40 IST)

Use this file to resume any new chat. Product owner: Jay. Builder context: Grok + Antigravity/Copilot + Firebase.

---

## 1. One-line product

**RailX** = sequential **journey OS** for Indian rail travellers: plan → first mile → station/PF → train → food/help → last mile → rate → memory.  
Not “another IRCTC clone.” Wedge = end-to-end CX + mediator help desk (route problems to RPF / OBHS / food / cab partners with SLA UI).

Inspiration: Flightradar24 / maritime tracking / NASA Eyes hierarchy, gamified, phone-first.

---

## 2. Live links & repo

| Item | URL |
|------|-----|
| **Production (source of truth)** | https://railx-48e91.web.app |
| **GitHub** | https://github.com/jay-bit-711/RailX |
| **Firebase console** | https://console.firebase.google.com/project/railx-48e91/overview |
| **Local (Jay Mac)** | `/Users/jay/.gemini/antigravity/scratch/railx` |
| Vercel | `rail-x` / `railx` projects exist; connector auth was 403 — redeploy from dashboard if needed. **Prefer Firebase Hosting.** |

Recent commits included UI locks, SOS/Support, Go modes, add-ons, logo motion, mediator docs.

---

## 3. Stack (locked)

- **Frontend:** Vite + React + Tailwind + lucide-react  
- **Backend:** Firebase (Auth phone OTP, Firestore, Hosting)  
- **Config:** project `railx-48e91` (apiKey in repo `firebase` / env as used by Antigravity)  
- **Frugal:** no custom servers; no paid ads until retention  

---

## 4. Design / UX lock

- **Palette only:** black, white, gold `#D4AF37`  
- **Time:** 24h only (`hour12: false`) — no AM/PM  
- **Logo:** top-left; `EngineLineLogo` default animated = **horizontal rail rush + track bed** (not vertical bounce)  
- **Nav (target):** Radar · **Go** · **Ride** · Memories · Me (Engine can be nested)  
- **Idle vs active journey:**  
  - **Idle** → default **Go** (plan/book). No SOS clutter. Support on Me.  
  - **Active** → default **Ride**. Sticky Help + **SOS only on Ride**.  
- **Go modes:** Daily (local/metro) · Quick (unreserved) · Plan (reserved)  
- **Add-ons:** First mile, Station help, Food, Data, Last mile — toggle `+`/`✓`, “Add all door-to-door”, optional  
- **Ratings:** emoji scale (not stars), e.g. angry → love  
- **Copy:** icon-first, minimal text  
- **Help:** mediator categories — RPF, Maintenance, Cleaning, Food, Cab — mock ticket + SLA; *does not auto-dispatch emergencies*; 139 + RailMadad  

---

## 5. Decisions already made

| Decision | Choice |
|----------|--------|
| Design baseline | v15 lineage → current React app on Firebase |
| Canonical host | **Firebase** `railx-48e91.web.app` |
| Booking reality short-term | **Mock / deep-link IRCTC** — not full PSP yet |
| IRCTC Path (default) | **A — wait 90 days**; deep-link for real tickets |
| Corridor | **Not locked** — decide tomorrow (candidate: Hyd/LPI–BZA or local belt) |
| Monetize first | Ancillaries (cab, food, data), not pure ticket fee war |
| SOS | Journey-only visibility |
| Support | Journey + non-journey (Me) |
| Gamification | XP, streaks, level-up — keep light |
| Family | Pax list + family share modal direction |
| Explore/Engine | Visual/interactive over text walls |

---

## 6. IRCTC partnership (essentials)

**Paths**

- **A (default):** Deep-link IRCTC app/web. ₹0 partner fee. Ship journey OS.  
- **B:** Retail agent under existing PSP (~low thousands ₹/yr). Ops learning, not full white-label API.  
- **C:** B2C Principal Service Provider — own integration. General policy often needs **registered firm**, sometimes **~₹5 Cr turnover**, **integration fees on order of ₹10–20L+** for mobile, **AMC lakhs/year**, RDS, look-to-book charges, strict branding. Timeline **months**. Startup/MSME policies may be lighter — verify current PDFs on irctc.co.in.  

**TIES** = train *information* enquiry scheme (separate from full ticketing).

**Do not block product on Path C.**

Contact direction historically: `agentadmin@irctc.co.in` / IRCTC Internet Ticketing Centre (confirm latest).

---

## 7. Revenue model (priority order)

1. **Ancillaries:** first/last mile affiliate, food commission, data packs  
2. **Help desk B2B later:** route leads to vendors/stations (after trust)  
3. **Light ads / destination** after habit  
4. **Plus subscription** if weekly open rate exists  
5. **Ticket convenience fee** only after authorised path  

Illustrative contribution: **₹40–80 / attached journey** if cab+food stick.

---

## 8. Competitors (short)

- **IRCTC Rail Connect** — official booking dominant  
- **ixigo + ConfirmTkt** — strong train OTA + tools  
- **Where is my Train (Google)** — status/offline, no tickets  
- **Paytm / MMT / RailYatri / UTS / RailOne** — pieces of the stack  

~28% online reserved tickets via third-party associates; rest IRCTC surfaces.  
**Gap:** full sequential door-to-door + in-journey mediator CX.

---

## 9. What’s built vs soft

**Built (UI + some Firebase)**  
Radar, Go (modes + add-ons + pay sheet), Ride/Mission stages, Memories, Engine, Feed, Me, phone auth scaffolding, SOS/Support modal (139, RailMadad), family share direction, food/data sheets, logo animation, Firestore rules for users/journeys/food/data/memories/chats.

**Soft / incomplete**  
Real IRCTC tickets, live official train API, real payments, persisted help tickets + SLA backend, perfect idle/active mode switching, Vercel always in sync, Engine fully “toy-gauge” visual, scenic always first-class on Ride, full stage 1–11 polish, multi-corridor data.

---

## 10. Tomorrow plan (resume here)

1. Phone smoke: idle→Go, book→Ride, SOS only on Ride  
2. Max 5 friction notes  
3. **Lock one corridor**  
4. **Confirm IRCTC path A/B/C** (default A)  
5. Inventory legal docs (PAN, GST, incorporation, Udyam/DPIIT)  
6. Optional: 3–5 friends run mock journey  

Then: Firestore persist journey + help ticket; harden phone auth; weekly ship cadence.

---

## 11. Key product scenarios (remember)

- **Jayanth, Patancheru → Gollapudi (Vijayawada):** first mile to LPI/SC, platform guidance, train live, food, last mile to Gollapudi  
- Personas: daily commute · quick/unreserved · plan/reserved · door-to-door family (cab not bike for “CEO to RBI” case)  

---

## 12. Related docs in repo

- `docs/PRODUCT-MEDIATOR.md` — help desk / SLA vision  
- `docs/UI-AWE-PASS.md` — motion / logo / help visibility  
- `firestore.rules` — data model comments  
- `README.md` — may lag; prefer this HANDOFF  

---

## 13. Prompt starter for next chat

```
Continue RailX from docs/HANDOFF.md on github.com/jay-bit-711/RailX.
Live: https://railx-48e91.web.app
Local: /Users/jay/.gemini/antigravity/scratch/railx
We locked IRCTC path A (deep-link) unless I say otherwise.
Corridor: [FILL AFTER TOMORROW DECISION].
Next: [phone friction list / Firestore journey persist / ...].
```

---

*Handoff written so a new session needs zero rediscovery of product intent, stack, or IRCTC stance.*
