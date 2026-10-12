# RailX as journey mediator (product vision)

RailX is not only tickets. It is a **layer between the passenger and every party that can fix a problem** — with tracking, SLAs, and escalation.

## Parties we route to

| Category | Examples | Typical channel |
|----------|----------|-----------------|
| Safety / police | RPF, 139, RailMadad emergency | Call / official portal |
| Train maintenance | Fan, AC, socket, lights | RailMadad / OBHS ticket |
| Cleaning | Washroom, coach hygiene | OBHS + photo feedback |
| Food | IRCTC pantry, station vendors, Swiggy-on-train | Vendor ticket + rating |
| First / last mile | Rapido, Uber, Ola, auto | Partner deep-link + complaint ID |
| Station | PF info, lifts, amenities | Station master / 139 |

## Ticket lifecycle (UI: Help on Ride + Me)

1. **Report** — category, train/PF/berth, text, optional photo  
2. **Route** — auto-pick audience (RPF vs OBHS vs food vs cab)  
3. **SLA clock** — e.g. hygiene 30m, electrical 45m, last-mile 15m  
4. **Updates** — acknowledged → in progress → resolved / escalated  
5. **Escalate** — if SLA breach, surface next contact (139 / RailMadad)  
6. **Close** — passenger rates resolution  

RailX **does not** claim to be police or IRCTC. Copy must say: *We help you reach the right team; we do not auto-dispatch emergency services.*

## Where it lives in the app

- **Ride (active journey):** sticky **Help** — report + open tickets + SOS  
- **Me:** SOS, Support (139, RailMadad), ticket history  
- **Post-journey:** ratings feed into hygiene/maintenance signals  

## Data (later Firestore)

`help_tickets/{id}`: uid, category, audience, trainNumber, coachBerth, status, slaMinutes, createdAt, escalatedAt, resolutionRating

## Phase

- **Now (UI):** visible SOS/Support/Help, categories, mock ticket IDs, SLA countdown UI  
- **Next:** persist tickets, real partner APIs where available  
