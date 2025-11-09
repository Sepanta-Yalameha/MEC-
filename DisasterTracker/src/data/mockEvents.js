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
    title: "Power Terminal 1 - Highway 16",
    description:
      "Downed power lines with exposed high-voltage cables. Immediate danger - technicians only.",
    riskLevel: "high",
    lat: 52.882,
    lng: -118.065,
    reportedBy: "Fire Department",
    timestamp: new Date("2025-11-09T10:30:00"),
  },
  {
    id: 2,
    title: "Tree Blocking Access to Power Terminal 3",
    description:
      "Fallen tree blocking access road. Volunteers needed to clear path.",
    riskLevel: "low",
    lat: 52.8765,
    lng: -118.082,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T11:15:00"),
  },
  {
    id: 3,
    title: "Power Terminal 5 - Patricia Street",
    description:
      "Transformer fire with toxic smoke. High voltage hazard - technicians only.",
    riskLevel: "high",
    lat: 52.87,
    lng: -118.078,
    reportedBy: "Fire Department",
    timestamp: new Date("2025-11-09T09:45:00"),
  },

  {
    id: 5,
    title: "Fallen Tree Blocking Access to Power Terminal 3",
    description:
      "Large tree blocking entrance. Volunteers needed to clear debris.",
    riskLevel: "low",
    lat: 52.86,
    lng: -118.05,
    reportedBy: "Facility Manager",
    timestamp: new Date("2025-11-09T08:20:00"),
  },
  {
    id: 6,
    title: "Power Terminal 3 - Connaught Drive",
    description:
      "Collapsed power pole with live wires on ground. Extremely dangerous - technicians only.",
    riskLevel: "high",
    lat: 52.874,
    lng: -118.085,
    reportedBy: "Utility Crew",
    timestamp: new Date("2025-11-09T07:30:00"),
  },
  {
    id: 7,
    title: "Landslide Blocking Access to Power Terminal 4",
    description:
      "Mudslide blocking service road. Volunteers needed to clear path.",
    riskLevel: "low",
    lat: 52.91,
    lng: -118.12,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T13:45:00"),
  },
  // Technician-only events (power terminals)
  {
    id: 8,
    title: "Power Terminal 4 - System Failure",
    description:
      "Critical power distribution failure. High voltage equipment malfunction - technicians only.",
    riskLevel: "technician-only",
    lat: 52.868,
    lng: -118.095,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T06:00:00"),
  },
  {
    id: 9,
    title: "Power Terminal 5 - Transformer Overheating",
    description:
      "Electrical substation overheating. High voltage fire risk - technicians only.",
    riskLevel: "technician-only",
    lat: 52.885,
    lng: -118.07,
    reportedBy: "Power Grid Operator",
    timestamp: new Date("2025-11-09T05:30:00"),
  },
  {
    id: 10,
    title: "Power Terminal 7 - Fuel Leak",
    description:
      "Backup generator fuel leak near electrical systems. Fire hazard - technicians only.",
    riskLevel: "technician-only",
    lat: 52.878,
    lng: -118.088,
    reportedBy: "Facility Manager",
    timestamp: new Date("2025-11-09T08:00:00"),
  },
  // Additional volunteer tasks
  {
    id: 11,
    title: "Debris Blocking Access to Power Terminal 5",
    description:
      "Storm debris blocking vehicle access. Volunteers needed to clear path.",
    riskLevel: "low",
    lat: 52.8725,
    lng: -118.077,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T06:45:00"),
  },
  {
    id: 12,
    title: "Fallen Tree Blocking Access to Power Terminal 6",
    description:
      "Large tree blocking service road. Volunteers needed to clear path.",
    riskLevel: "low",
    lat: 52.8755,
    lng: -118.08,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T07:15:00"),
  },
  {
    id: 13,
    title: "Snow Blocking Access to Power Terminal 7",
    description:
      "Heavy snow blocking entrance. Volunteers needed to shovel path.",
    riskLevel: "low",
    lat: 52.877,
    lng: -118.084,
    reportedBy: "Facility Manager",
    timestamp: new Date("2025-11-09T10:00:00"),
  },
  {
    id: 14,
    title: "Power Terminal 6 - Arc Flash Incident",
    description:
      "Arc flash event at high voltage station. Severe electrical hazard - technicians only.",
    riskLevel: "high",
    lat: 52.88,
    lng: -118.08,
    reportedBy: "Power Grid Operator",
    timestamp: new Date("2025-11-09T05:00:00"),
  },
  {
    id: 15,
    title: "Flooding Blocking Access to Power Terminal 8",
    description:
      "Water flooding access road. Volunteers needed for sandbag placement.",
    riskLevel: "low",
    lat: 52.873,
    lng: -118.073,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T11:30:00"),
  },
  {
    id: 16,
    title: "Power Terminal 8 - Chemical Spill",
    description:
      "Industrial chemical spill near power equipment. Hazmat situation - technicians only.",
    riskLevel: "technician-only",
    lat: 52.871,
    lng: -118.068,
    reportedBy: "Hazmat Team",
    timestamp: new Date("2025-11-09T08:45:00"),
  },
  {
    id: 17,
    title: "Rockslide Blocking Access to Power Terminal 6",
    description:
      "Rockslide blocking maintenance trail. Volunteers needed to clear debris.",
    riskLevel: "low",
    lat: 52.8785,
    lng: -118.076,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T09:15:00"),
  },
];
