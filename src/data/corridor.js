/**
 * RailX primary corridor — locked 13 Oct 2026
 * Sources: LPI, SC, BMT → Destinations: BZA, GNT, TNL
 * Door places ~5–10 km / Rapido-Uber-Ola style coverage
 * IRCTC: Path A (deep-link). Ride mode: user picks bike|auto|cab; family rules below.
 */

export const CORRIDOR_STATIONS = {
  sources: [
    { code: 'LPI', name: 'Lingampalli', city: 'Hyderabad' },
    { code: 'SC', name: 'Secunderabad Jn', city: 'Hyderabad' },
    { code: 'BMT', name: 'Begumpet', city: 'Hyderabad' }
  ],
  destinations: [
    { code: 'BZA', name: 'Vijayawada Jn', city: 'Vijayawada' },
    { code: 'GNT', name: 'Guntur Jn', city: 'Guntur' },
    { code: 'TNL', name: 'Tenali Jn', city: 'Tenali' }
  ]
};

/** Ride preference rules (product lock) */
export const RIDE_RULES = {
  userChooses: ['bike', 'auto', 'cab'],
  // Multi-pax soft defaults (user can still override in UI with warning)
  paxDefaults: {
    1: ['bike', 'auto', 'cab'],
    2: ['bike', 'auto', 'cab'],
    3: ['auto', 'cab'], // no bike default for 3
    4: ['cab'], // cab preferred for 4+
    '4+': ['cab']
  },
  note: 'Solo: bike OK. 3 pax → auto/cab. 4+ → cab. User always sees choice.'
};

export const IRCTC_PATH = 'A'; // deep-link only

/** Door / last-mile localities with bus hubs + highlights */
export const LOCALITIES = [
  // —— User-provided (Hyd side) ——
  {
    id: 'patancheru',
    name: 'Patancheru',
    nearStations: ['LPI'],
    maps: 'https://maps.app.goo.gl/nEzoPr8aaUjR63e57',
    busHub: 'Patancheru / NH65 bus stops; APSRTC toward Miyapur & city',
    highlights: ['Industrial hub', 'Near ICRISAT', 'NH65 connectivity', 'Link to LPI (~10–12 km)', 'Residential townships']
  },
  {
    id: 'lingampally',
    name: 'Lingampally',
    nearStations: ['LPI'],
    maps: 'https://maps.app.goo.gl/eJUMomAwe8TqPAnK6',
    busHub: 'Lingampalli station road + local stops; metro access via Miyapur side',
    highlights: ['LPI railway station', 'Kudikunta / lakeside walks', 'Chanda Nagar markets', 'IT corridor hop', 'Calvary Temple (nearby)']
  },
  {
    id: 'beeramguda',
    name: 'Beeramguda',
    nearStations: ['LPI'],
    maps: 'https://maps.app.goo.gl/dhLsWNas5enopNyW9',
    busHub: 'Beeramguda main road stops toward Patancheru / LPI',
    highlights: ['Bhramarambhika Mallikarjuna temple (Gutta)', 'Beeramguda Lake', 'Residential growth belt', 'Miyapur metro link', 'Quiet vs Hitech']
  },
  // —— User-provided (AP side) ——
  {
    id: 'gollapudi',
    name: 'Gollapudi',
    nearStations: ['BZA'],
    maps: 'https://maps.app.goo.gl/VdiGV6Jw4j3gK8g69',
    busHub: 'Gollapudi bus stop (NH65); APSRTC 301–305 to PNBS / Benz / Autonagar / BZA station',
    highlights: ['Western Vijayawada hub', 'NH65 Hyd highway', 'Krishna riverfront pockets', 'Flix/Zing long-distance stops', '~6–8 km to BZA / PNBS']
  },
  {
    id: 'bhavanipuram',
    name: 'Bhavanipuram',
    nearStations: ['BZA'],
    maps: 'https://maps.app.goo.gl/V1jigXEJGHHaCwNT6',
    busHub: 'Bhavanipuram / Swathi-centre style stops; city buses to PNBS',
    highlights: ['West-central Vijayawada', 'NH65 / bypass edge', 'Near Krishna Lanka', 'Residential + commercial', 'Cab/auto dense']
  },
  {
    id: 'guntur_busstand',
    name: 'Guntur Bus Stand',
    nearStations: ['GNT'],
    maps: 'https://maps.app.goo.gl/EX2mmEmYwxkzc5WMA',
    busHub: 'Guntur RTC / NTR bus station complex (main APSRTC)',
    highlights: ['Primary intercity bus hub', 'Walk/auto to GNT station', 'Old town markets nearby', 'Ponnur / Tenali road links', 'Auto stands on all sides']
  },
  // —— Enriched (typical Rapido/Ola/Uber dense zones) ——
  {
    id: 'pnbs',
    name: 'Pandit Nehru Bus Station (PNBS)',
    nearStations: ['BZA'],
    maps: null,
    busHub: 'PNBS — main Vijayawada APSRTC terminal',
    highlights: ['City bus spine', 'Next to BZA rail zone', 'Max cab/auto supply', 'Food + waiting infrastructure', 'Transfer to Gollapudi buses']
  },
  {
    id: 'benz_circle',
    name: 'Benz Circle',
    nearStations: ['BZA'],
    maps: null,
    busHub: 'Benz Circle / MG Road bus stops',
    highlights: ['Busiest junction', 'MG Road shopping', 'Hotels & offices', 'Flyover landmark', 'High Ola/Uber density']
  },
  {
    id: 'autonagar_bza',
    name: 'Autonagar',
    nearStations: ['BZA'],
    maps: null,
    busHub: 'Autonagar bus stand',
    highlights: ['Industrial + residential', 'East side connectivity', 'APSRTC from Gollapudi routes', 'Airport-side roads', 'Cab friendly']
  },
  {
    id: 'krishna_lanka',
    name: 'Krishna Lanka',
    nearStations: ['BZA'],
    maps: null,
    busHub: 'Krishna Lanka / temple-side stops',
    highlights: ['Near Kanaka Durga temple zone', 'Between PNBS & river', 'Dense auto market', 'Food streets', 'Short hop to BZA']
  },
  {
    id: 'mangalagiri',
    name: 'Mangalagiri',
    nearStations: ['BZA', 'GNT'],
    maps: null,
    busHub: 'Mangalagiri bypass / town bus stops',
    highlights: ['Between BZA & GNT', 'Temple town', 'Bypass drop for Hyd buses', 'Growing residential', 'Cab from both junctions']
  },
  {
    id: 'tenali_bus',
    name: 'Tenali Bus Station',
    nearStations: ['TNL'],
    maps: null,
    busHub: 'Tenali APSRTC Bus Station (Ganganamma Peta / Ithanagar)',
    highlights: ['Main town bus hub', '~1 km class from TNL station', 'Autos at station + bus stand', 'Chenchupet side', 'Link to Guntur / BZA']
  },
  {
    id: 'tenali_chenchupet',
    name: 'Tenali Chenchupet',
    nearStations: ['TNL'],
    maps: null,
    busHub: 'Chenchupet / station-side stops',
    highlights: ['Closest residential to TNL', 'Auto stand at station', 'Hotels on station road', 'Old bus station side', 'Walkable core']
  },
  {
    id: 'gnt_kothapet',
    name: 'Guntur Kothapet / Brodipet',
    nearStations: ['GNT'],
    maps: null,
    busHub: 'City stops toward RTC & station',
    highlights: ['Dense commercial core', 'Markets', 'Short auto to GNT', 'Food + stay options', 'High two-wheeler traffic']
  },
  {
    id: 'sc_paradise',
    name: 'Paradise / Secunderabad',
    nearStations: ['SC'],
    maps: null,
    busHub: 'Secunderabad bus / metro + station exits',
    highlights: ['SC station complex', 'Paradise food belt', 'Metro + MMTS', 'Max cab supply', 'Hotel cluster']
  },
  {
    id: 'begumpet_airport_rd',
    name: 'Begumpet / Ameerpet edge',
    nearStations: ['BMT'],
    maps: null,
    busHub: 'Begumpet / Ameerpet bus + metro',
    highlights: ['BMT station', 'Greenlands / public gardens side', 'Metro links', 'Office + hotel belt', 'Easy Rapido']
  }
];

export const STATION_BUS_HUBS = {
  LPI: 'Lingampalli station road; buses toward Miyapur, Chanda Nagar, Patancheru',
  SC: 'Secunderabad station + nearby RTC / metro interchanges',
  BMT: 'Begumpet station; buses toward Ameerpet / Paradise / airport road',
  BZA: 'Vijayawada Jn exits → PNBS (major bus) within short auto/cab',
  GNT: 'Guntur Jn → RTC / NTR bus station by auto',
  TNL: 'Tenali Jn → Tenali Bus Station (~1 km class) by auto'
};

/** Scenic / “Mother India” chips for Ride (corridor-relevant) */
export const SCENIC_CHIPS = [
  { id: 'krishna', label: 'Krishna river belt', near: ['BZA', 'Gollapudi'] },
  { id: 'undavalli', label: 'Undavalli caves (day trip)', near: ['BZA'] },
  { id: 'kanaka', label: 'Kanaka Durga temple area', near: ['BZA'] },
  { id: 'beeram_gutta', label: 'Beeramguda Gutta temple', near: ['LPI'] },
  { id: 'mangalagiri_temple', label: 'Mangalagiri temple town', near: ['GNT', 'BZA'] }
];
