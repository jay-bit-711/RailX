# Corridor lock — 13 Oct 2026

## Confirmed by Jay

- **Sources:** LPI, SC, BMT  
- **Destinations:** BZA, GNT, TNL  
- **IRCTC:** Path **A** (deep-link only)  
- **Ride modes:** User chooses **bike | auto | cab**  
  - Soft rules: **3 pax → auto/cab** (not bike); **4+ → cab**  
  - UI must still show choice + short warning if user overrides  

## User map links

| Place | Link |
|-------|------|
| Gollapudi | https://maps.app.goo.gl/VdiGV6Jw4j3gK8g69 |
| Bhavanipuram | https://maps.app.goo.gl/V1jigXEJGHHaCwNT6 |
| Patancheru | https://maps.app.goo.gl/nEzoPr8aaUjR63e57 |
| Lingampally | https://maps.app.goo.gl/eJUMomAwe8TqPAnK6 |
| Beeramguda | https://maps.app.goo.gl/dhLsWNas5enopNyW9 |
| Guntur Bus Stand | https://maps.app.goo.gl/EX2mmEmYwxkzc5WMA |

## Data file

Machine-readable list + bus hubs + highlights: `src/data/corridor.js`

Extra localities added (typical cab density): PNBS, Benz Circle, Autonagar, Krishna Lanka, Mangalagiri, Tenali Bus Station, Chenchupet, Guntur Kothapet/Brodipet, Paradise/SC, Begumpet–Ameerpet edge.

## Place capture UX (product)

1. GPS → suggest nearest source station cluster  
2. Station chips (LPI/SC/BMT or BZA/GNT/TNL)  
3. Locality chips from `LOCALITIES`  
4. Type / voice fallback  
5. Maps paste = optional later  

## Next for AI

Wire `corridor.js` into Go tab chips + last-mile sheet + pax-based ride defaults.

## Next for Jay

Phone smoke after next deploy → up to 5 frictions.
