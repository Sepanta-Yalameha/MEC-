// Mock disaster events centered around Jasper, Alberta
// Jasper coordinates: approximately 52.8734° N, 118.0814° W

export const JASPER_CENTER = {
  lat: 52.8734,
  lng: -118.0814,
};

// Hard-coded user location within Jasper area
export const USER_LOCATION = {
  lat: 52.875,
  lng: -118.075,
};

export const mockEvents = [
  {
    id: 1,
    title: "Downed Power Lines - Highway 16",
    description:
      "Multiple power lines down across Highway 16 East. Exposed high-voltage cables pose immediate danger. Area cordoned off pending utility crew arrival.",
    riskLevel: "high",
    lat: 52.882,
    lng: -118.065,
    reportedBy: "Fire Department",
    timestamp: new Date("2025-11-09T10:30:00"),
  },
  {
    id: 2,
    title: "Tree Blocking Connaught Drive",
    description:
      "Large fallen tree blocking both lanes of Connaught Drive near the train station. Vehicle access restricted but path can be cleared by volunteers.",
    riskLevel: "low",
    lat: 52.8765,
    lng: -118.082,
    reportedBy: "Local Resident",
    timestamp: new Date("2025-11-09T11:15:00"),
  },
  {
    id: 3,
    title: "Gas Leak - Patricia Street",
    description:
      "Strong gas odor reported near Patricia Street and Hazel Avenue. Potential gas line rupture. Evacuation of nearby buildings recommended.",
    riskLevel: "high",
    lat: 52.87,
    lng: -118.078,
    reportedBy: "Fire Department",
    timestamp: new Date("2025-11-09T09:45:00"),
  },
  {
    id: 4,
    title: "Debris on Pyramid Lake Road",
    description:
      "Storm debris and fallen branches blocking Pyramid Lake Road. Safe for volunteer cleanup crews to clear roadway.",
    riskLevel: "low",
    lat: 52.895,
    lng: -118.09,
    reportedBy: "Park Ranger",
    timestamp: new Date("2025-11-09T12:00:00"),
  },
  {
    id: 5,
    title: "Road Washout - Maligne Lake Road",
    description:
      "Severe flooding has washed out section of Maligne Lake Road near kilometer 15. Deep water and unstable ground. Road impassable.",
    riskLevel: "low",
    lat: 52.86,
    lng: -118.05,
    reportedBy: "Transportation Dept",
    timestamp: new Date("2025-11-09T08:20:00"),
  },
  {
    id: 6,
    title: "Structural Damage - Jasper Community Center",
    description:
      "Partial roof collapse at community center. Unstable structure with potential for further collapse. Entry restricted to structural engineers only.",
    riskLevel: "high",
    lat: 52.874,
    lng: -118.085,
    reportedBy: "Building Inspector",
    timestamp: new Date("2025-11-09T07:30:00"),
  },
  {
    id: 7,
    title: "Blocked Trail - Valley of Five Lakes",
    description:
      "Mudslide has blocked hiking trail to Valley of Five Lakes. Trail needs clearing but poses no immediate danger. Suitable for volunteer work parties.",
    riskLevel: "low",
    lat: 52.91,
    lng: -118.12,
    reportedBy: "Trail Maintenance",
    timestamp: new Date("2025-11-09T13:45:00"),
  },
];
