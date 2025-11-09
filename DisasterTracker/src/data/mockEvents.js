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
  // Technician-only events (power terminals)
  {
    id: 8,
    title: "Power Terminal Alpha - System Failure",
    description:
      "Main power distribution terminal experiencing cascading failures. Critical infrastructure requiring immediate technician assessment for electrical hazards.",
    riskLevel: "technician-only",
    lat: 52.868,
    lng: -118.095,
    reportedBy: "Utility Company",
    timestamp: new Date("2025-11-09T06:00:00"),
  },
  {
    id: 9,
    title: "Substation Bravo - Transformer Fire Risk",
    description:
      "Electrical substation showing signs of overheating. High voltage equipment at risk of fire. Technician monitoring required.",
    riskLevel: "technician-only",
    lat: 52.885,
    lng: -118.07,
    reportedBy: "Power Grid Operator",
    timestamp: new Date("2025-11-09T05:30:00"),
  },
  {
    id: 10,
    title: "Emergency Generator Station - Fuel Leak",
    description:
      "Backup power facility has developed fuel leak near electrical systems. Potential fire hazard requiring technician containment.",
    riskLevel: "technician-only",
    lat: 52.878,
    lng: -118.088,
    reportedBy: "Facility Manager",
    timestamp: new Date("2025-11-09T08:00:00"),
  },
  // Additional strategic obstacles
  {
    id: 11,
    title: "Bridge Collapse - Hazel Avenue",
    description:
      "Small pedestrian bridge has collapsed blocking the most direct route. Vehicles must detour around. High priority repair needed.",
    riskLevel: "high",
    lat: 52.8725,
    lng: -118.077,
    reportedBy: "Public Works",
    timestamp: new Date("2025-11-09T06:45:00"),
  },
  {
    id: 12,
    title: "Sinkhole - Geikie Street",
    description:
      "Large sinkhole opened up in the middle of Geikie Street. Road completely impassable. Emergency crews establishing detour routes.",
    riskLevel: "high",
    lat: 52.8755,
    lng: -118.08,
    reportedBy: "Emergency Services",
    timestamp: new Date("2025-11-09T07:15:00"),
  },
  {
    id: 13,
    title: "Fallen Utility Pole - Turret Street",
    description:
      "Utility pole down across Turret Street with live wires. Complete road closure in effect. Alternate routes available for volunteers.",
    riskLevel: "low",
    lat: 52.877,
    lng: -118.084,
    reportedBy: "Utility Crew",
    timestamp: new Date("2025-11-09T10:00:00"),
  },
  {
    id: 14,
    title: "Landslide - Cabin Creek Road",
    description:
      "Major landslide has covered both lanes of Cabin Creek Road with debris. Route completely blocked requiring significant detour.",
    riskLevel: "high",
    lat: 52.88,
    lng: -118.08,
    reportedBy: "Highway Patrol",
    timestamp: new Date("2025-11-09T05:00:00"),
  },
  {
    id: 15,
    title: "Flooding - Miette Avenue",
    description:
      "Burst water main has flooded Miette Avenue intersection. Water depth makes passage dangerous. Volunteer traffic control needed at detour points.",
    riskLevel: "low",
    lat: 52.873,
    lng: -118.073,
    reportedBy: "Water Department",
    timestamp: new Date("2025-11-09T11:30:00"),
  },
  {
    id: 16,
    title: "Chemical Spill - Industrial Park Access",
    description:
      "Industrial chemical spill on access road. Hazmat team on site. Area completely closed to all non-emergency personnel.",
    riskLevel: "technician-only",
    lat: 52.871,
    lng: -118.068,
    reportedBy: "Hazmat Team",
    timestamp: new Date("2025-11-09T08:45:00"),
  },
  {
    id: 17,
    title: "Collapsed Building Debris - Cedar Avenue",
    description:
      "Partial building collapse has spread debris across Cedar Avenue. Road blocked but can be navigated on foot. Volunteers needed for debris clearing.",
    riskLevel: "low",
    lat: 52.8785,
    lng: -118.076,
    reportedBy: "Building Safety",
    timestamp: new Date("2025-11-09T09:15:00"),
  },
];
