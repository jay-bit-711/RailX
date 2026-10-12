export const CORRIDOR_TRAINS = [
  {
    number: "12739",
    name: "Vande Bharat Express",
    route: "SC ➔ BZA",
    time: "06:00–10:25",
    cls: "3A",
    price: 1245,
    depTime: "06:00",
    arrTime: "10:25",
    speed: "112 km/h",
    status: "On time",
    platform: "PF 4",
    signal: "Red → Green ~6m",
    cross: "Cross 4 trains",
    progress: 58,
    stations: ["SC", "Nalgonda", "BZA"],
    coachLayout: ["DTC", "MC1", "TC1", "MC2", "EC1", "EC2", "TC2", "MC3", "DTC"]
  },
  {
    number: "12710",
    name: "Simhapuri Express",
    route: "SC ➔ BZA",
    time: "21:15–05:40",
    cls: "SL",
    price: 485,
    depTime: "21:15",
    arrTime: "05:40",
    speed: "88 km/h",
    status: "On time",
    platform: "PF 2",
    signal: "Green",
    cross: "Cross 2 trains",
    progress: 30,
    stations: ["SC", "Kazipet", "Khammam", "BZA"],
    coachLayout: ["ENG", "GEN", "S1", "S2", "S3", "S4", "S5", "B1", "B2", "A1", "GEN"]
  },
  {
    number: "17202",
    name: "Golconda Express",
    route: "SC ➔ BZA",
    time: "13:10–20:45",
    cls: "2A",
    price: 1890,
    depTime: "13:10",
    arrTime: "20:45",
    speed: "75 km/h",
    status: "4 mins early",
    platform: "PF 6",
    signal: "Green",
    cross: "Cross 3 trains",
    progress: 72,
    stations: ["SC", "Warangal", "Mahbubabad", "Khammam", "BZA"],
    coachLayout: ["ENG", "GEN", "D1", "D2", "D3", "CC1", "CC2", "2A", "GEN"]
  }
];

export const INITIAL_PASSENGERS = [
  { id: "p1", name: "Jayanth", relation: "Self", isDefault: true, selected: true },
  { id: "p2", name: "Priya", relation: "Wife", isDefault: false, selected: false },
  { id: "p3", name: "Arjun", relation: "Son (5)", isDefault: false, selected: false }
];

export const INITIAL_FEEDS = [
  {
    id: "f1",
    author: "Suresh · C2 · 12739",
    avatar: "SK",
    time: "2m ago",
    train: "12739",
    tag: "PF tips",
    content: "When the train hits 120 and the chai doesn’t spill 😂",
    reactions: { smile: 18, laugh: 42, comments: 5 }
  },
  {
    id: "f2",
    author: "Ravi · Golconda Exp",
    avatar: "RK",
    time: "1h ago",
    train: "17202",
    tag: "Delays",
    content: "Golconda gang in S5 — AC vs open window debate 😅",
    reactions: { smile: 8, laugh: 21, comments: 8 }
  },
  {
    id: "f3",
    author: "Ananya · Daily Commuter",
    avatar: "AK",
    time: "3h ago",
    train: "12739",
    tag: "Food finds",
    content: "Hot Punugulu & Ginger Chai at Vijayawada PF 4 is peak train comfort! Verified FSSAI stall near escalator.",
    reactions: { smile: 34, laugh: 12, comments: 14 }
  }
];

export const FOOD_MENU = [
  {
    id: "fm1",
    vendor: "Comesum Vijayawada Hub",
    item: "Gongura Paneer Rice Bowl + Butter Milk",
    price: 180,
    fssai: "4.9★ FSSAI Grade A+",
    halt: "BZA PF 4"
  },
  {
    id: "fm2",
    vendor: "IRCTC Jan Aahaar",
    item: "Standard South Indian Thali",
    price: 90,
    fssai: "4.7★ IRCTC Sealed",
    halt: "Secunderabad PF 1"
  },
  {
    id: "fm3",
    vendor: "Chai Point Express",
    item: "Filter Coffee (2 Cups) + Bun Maska",
    price: 110,
    fssai: "4.9★ 100°C Boiled & Sealed",
    halt: "In-Seat Delivery"
  }
];

export const DATA_BOOSTERS = [
  { id: "db1", operator: "Jio", data: "1 GB Booster", price: 19, desc: "Instant PNR & WhatsApp check" },
  { id: "db2", operator: "Jio", data: "3 GB Booster", price: 39, desc: "Watch 2 movies while traveling" },
  { id: "db3", operator: "Airtel", data: "2 GB Booster", price: 33, desc: "High-speed rail corridor 4G" },
  { id: "db4", operator: "Vi", data: "Night Pack 5GB", price: 58, desc: "00:00 to 06:00 data" }
];
