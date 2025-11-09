// Utility functions for distance calculations and routing

/**
 * Calculate distance between two points using Haversine formula
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(point1, point2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 * @param {number} distanceKm - Distance in kilometers
 * @returns {string} Formatted distance string
 */
export function formatDistance(distanceKm) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
}

/**
 * Calculate a direct route between two points
 * @param {Object} start - {lat, lng}
 * @param {Object} end - {lat, lng}
 * @returns {Array} Array of coordinates for the route
 */
export function calculateDirectRoute(start, end) {
  return [
    [start.lng, start.lat],
    [end.lng, end.lat],
  ];
}

/**
 * Calculate a detour route that avoids obstacles
 * @param {Object} start - {lat, lng}
 * @param {Object} end - {lat, lng}
 * @param {Array} obstacles - Array of obstacle points with {lat, lng}
 * @returns {Array} Array of coordinates for the detour route
 */
export function calculateDetourRoute(start, end, obstacles) {
  const OBSTACLE_BUFFER = 0.01; // ~1km buffer around obstacles

  // Find obstacles that are close to the direct path
  const directPath = calculateDirectRoute(start, end);
  const nearbyObstacles = obstacles.filter((obstacle) => {
    const distToStart = calculateDistance(start, obstacle);
    const distToEnd = calculateDistance(end, obstacle);
    const directDist = calculateDistance(start, end);

    // Check if obstacle is roughly between start and end
    return (
      distToStart + distToEnd < directDist * 1.5 &&
      distToStart > 0.1 &&
      distToEnd > 0.1
    );
  });

  if (nearbyObstacles.length === 0) {
    // No obstacles in the way, return a slightly curved path anyway
    const midLat = (start.lat + end.lat) / 2;
    const midLng = (start.lng + end.lng) / 2;
    const offset = 0.005; // Small offset for visual distinction

    return [
      [start.lng, start.lat],
      [midLng + offset, midLat + offset],
      [end.lng, end.lat],
    ];
  }

  // Create waypoints that go around obstacles
  const waypoints = [[start.lng, start.lat]];

  nearbyObstacles.forEach((obstacle) => {
    // Calculate perpendicular offset to go around the obstacle
    const angle = Math.atan2(end.lat - start.lat, end.lng - start.lng);
    const perpAngle = angle + Math.PI / 2;

    const waypointLat = obstacle.lat + OBSTACLE_BUFFER * Math.sin(perpAngle);
    const waypointLng = obstacle.lng + OBSTACLE_BUFFER * Math.cos(perpAngle);

    waypoints.push([waypointLng, waypointLat]);
  });

  waypoints.push([end.lng, end.lat]);

  return waypoints;
}

/**
 * Get color for risk level
 * @param {string} riskLevel - 'high' or 'low'
 * @returns {string} Hex color code
 */
export function getRiskColor(riskLevel) {
  return riskLevel === "high" ? "#DC2626" : "#F59E0B";
}

/**
 * Sort events by distance from a reference point
 * @param {Array} events - Array of events with lat/lng
 * @param {Object} referencePoint - {lat, lng}
 * @returns {Array} Sorted events array
 */
export function sortEventsByDistance(events, referencePoint) {
  return events
    .map((event) => ({
      ...event,
      distance: calculateDistance(referencePoint, {
        lat: event.lat,
        lng: event.lng,
      }),
    }))
    .sort((a, b) => a.distance - b.distance);
}
