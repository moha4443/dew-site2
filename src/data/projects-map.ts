export interface ProjectLocation {
  id: string;
  client: string;
  scope: string;
  city: string;
  country: string;
  year: string;
  capacity: string;
  countryCode: string;
  coordinates: [number, number]; // [latitude, longitude]
}

export const projectsData: ProjectLocation[] = [
  {
    id: "egy-001",
    client: "US Corps of Engineering",
    scope: "Demi-Water Plant",
    city: "Cairo",
    country: "Egypt",
    year: "1986",
    capacity: "1,200 m³/day",
    countryCode: "EGY",
    coordinates: [30.0444, 31.2357]
  },
  {
    id: "egy-002",
    client: "Sinai for Hotels & Diving Centers",
    scope: "SWRO Turbine Seawater & Seawater Intake",
    city: "Dahab",
    country: "Egypt",
    year: "1987",
    capacity: "250 m³/day",
    countryCode: "EGY",
    coordinates: [28.5096, 34.5165]
  },
  {
    id: "egy-003",
    client: "Sinai for Hotels & Diving Centers",
    scope: "SWRO Turbine System",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "1987",
    capacity: "500 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "lby-004",
    client: "STANDENG",
    scope: "SWRO Turbine Systems",
    city: "Tubrouk",
    country: "Libya",
    year: "1989",
    capacity: "1,000 m³/day",
    countryCode: "LBY",
    coordinates: [32.0755, 23.9600]
  },
  {
    id: "egy-005",
    client: "EL Tagouri",
    scope: "Water Treatment Plant",
    city: "Dakhahlia",
    country: "Egypt",
    year: "1990",
    capacity: "1,800 m³/day",
    countryCode: "EGY",
    coordinates: [31.1656, 31.4913]
  },
  {
    id: "egy-006",
    client: "Rotana",
    scope: "SWRO Turbine System",
    city: "Hurghada",
    country: "Egypt",
    year: "1991",
    capacity: "500 m³/day",
    countryCode: "EGY",
    coordinates: [27.2579, 33.8116]
  },
  {
    id: "egy-007",
    client: "Isis Island Hotel",
    scope: "Water Treatment Plant",
    city: "Aswan",
    country: "Egypt",
    year: "1992",
    capacity: "2,400 m³/day",
    countryCode: "EGY",
    coordinates: [24.0889, 32.8998]
  },
  {
    id: "egy-008",
    client: "Amegato",
    scope: "Water Treatment Plant",
    city: "Anater – Essna",
    country: "Egypt",
    year: "1993",
    capacity: "2,000 m³/day",
    countryCode: "EGY",
    coordinates: [25.2933, 32.5533]
  },
  {
    id: "egy-009",
    client: "Anba Samuel Monastery",
    scope: "Brackish RO",
    city: "Meniya",
    country: "Egypt",
    year: "1996",
    capacity: "200 m³/day",
    countryCode: "EGY",
    coordinates: [28.0871, 30.7618]
  },
  {
    id: "egy-010",
    client: "Sinai for Touristic Development (SICOT)",
    scope: "RO Turbine",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "1996",
    capacity: "600 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "egy-011",
    client: "EGOTH",
    scope: "RO Turbine",
    city: "Dahab",
    country: "Egypt",
    year: "1997",
    capacity: "250 m³/day",
    countryCode: "EGY",
    coordinates: [28.5096, 34.5165]
  },
  {
    id: "egy-012",
    client: "National Company for Maize Products",
    scope: "Industrial Wastewater Treatment",
    city: "10th of Ramadan",
    country: "Egypt",
    year: "1998",
    capacity: "5,000 m³/day",
    countryCode: "EGY",
    coordinates: [30.2919, 31.7456]
  },
  {
    id: "egy-013",
    client: "Sinai for Hotels & Diving Centers",
    scope: "RO Turbine",
    city: "Nuweiba",
    country: "Egypt",
    year: "1998",
    capacity: "250 m³/day",
    countryCode: "EGY",
    coordinates: [29.0333, 34.6667]
  },
  {
    id: "egy-014",
    client: "Agricultural Development Company",
    scope: "Brackish RO",
    city: "6th of October",
    country: "Egypt",
    year: "2000",
    capacity: "2,000 m³/day",
    countryCode: "EGY",
    coordinates: [29.9511, 30.9380]
  },
  {
    id: "egy-015",
    client: "Sinai for Touristic Development (SICOT)",
    scope: "RO Turbine",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2000",
    capacity: "1,000 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "egy-016",
    client: "El Ahly Construction Group",
    scope: "RO using Energy Recovery (ERS)",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2001",
    capacity: "1,500 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "egy-017",
    client: "Sinai for Touristic Development (SICOT)",
    scope: "RO Turbine",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2001",
    capacity: "1,000 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "egy-018",
    client: "Sinai for Touristic Development (SICOT)",
    scope: "RO using Energy Recovery (ERS)",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2002",
    capacity: "800 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "grc-019",
    client: "Gioula Glass Works (BA Glass Industries)",
    scope: "Physical & Chemical Treatment and Sludge Dewatering – Industrial Wastewater",
    city: "Athens",
    country: "Greece",
    year: "2003–2004",
    capacity: "—",
    countryCode: "GRC",
    coordinates: [37.9838, 23.7275]
  },
  {
    id: "egy-020",
    client: "Sinai for Hotels & Diving Centers",
    scope: "RO using Energy Recovery (ERS)",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2003",
    capacity: "250 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "egy-021",
    client: "Sinai for Hotels & Diving Centers",
    scope: "Sewage Treatment Plant",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2004",
    capacity: "250 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "egy-022",
    client: "Sinai for Touristic Development (SICOT)",
    scope: "RO using Energy Recovery (ERS)",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2004",
    capacity: "2,000 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "egy-023",
    client: "Sinai for Touristic Development (SICOT)",
    scope: "Saltec DT – KSB Energy Recovery",
    city: "Sharm El Sheikh",
    country: "Egypt",
    year: "2005",
    capacity: "2,000 m³/day",
    countryCode: "EGY",
    coordinates: [27.9158, 34.3300]
  },
  {
    id: "omn-024",
    client: "Petroleum Development of Oman",
    scope: "Design & Consultancy for complete RO Plant under API Standards",
    city: "Fahud",
    country: "Oman",
    year: "2005",
    capacity: "3,000 m³/day",
    countryCode: "OMN",
    coordinates: [22.3167, 56.4833]
  },
  {
    id: "omn-025",
    client: "Petroleum Development of Oman",
    scope: "Fine Filtration System",
    city: "Fahud",
    country: "Oman",
    year: "2005",
    capacity: "3,000 m³/day",
    countryCode: "OMN",
    coordinates: [22.3167, 56.4833]
  },
  {
    id: "omn-026",
    client: "AL Zawra / MHEW",
    scope: "RO using Energy Recovery (ERS)",
    city: "Ras Al Hadd",
    country: "Oman",
    year: "2005",
    capacity: "500 m³/day",
    countryCode: "OMN",
    coordinates: [22.5197, 59.7856]
  },
  {
    id: "omn-027",
    client: "ONEC / MHEW",
    scope: "Brackish RO",
    city: "Al Hijj",
    country: "Oman",
    year: "2006",
    capacity: "100 m³/day",
    countryCode: "OMN",
    coordinates: [22.8, 58.5]
  },
  {
    id: "omn-028",
    client: "ONEC / MHEW",
    scope: "Brackish RO",
    city: "Haima",
    country: "Oman",
    year: "2006",
    capacity: "50 m³/day",
    countryCode: "OMN",
    coordinates: [19.9333, 56.3000]
  },
  {
    id: "omn-029",
    client: "ONEC / MHEW",
    scope: "Brackish RO",
    city: "Abu Mudhaibi",
    country: "Oman",
    year: "2006",
    capacity: "50 m³/day",
    countryCode: "OMN",
    coordinates: [22.6667, 58.3333]
  },
  {
    id: "bgr-030",
    client: "Canned Food Processing Factory, Stara Zagora",
    scope: "MBBR technology – DEVISE High-Rate Bio-Plant (Industrial Wastewater)",
    city: "Stara Zagora",
    country: "Bulgaria",
    year: "2007",
    capacity: "50 m³/day",
    countryCode: "BGR",
    coordinates: [42.4258, 25.6342]
  }
];
