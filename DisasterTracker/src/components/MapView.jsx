import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  calculateDistance,
  formatDistance,
  calculateDirectRoute,
  calculateDetourRoute,
  getRiskColor,
} from "../utils/helpers";

// Dynamic import to avoid SSR issues
let mapboxgl = null;

// Get Mapbox token from environment variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView({
  events,
  userLocation,
  onEventSelect,
  selectedEventId,
  center,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef({});
  const userMarker = useRef(null);
  const routeLayers = useRef([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapError, setMapError] = useState(null);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    if (!mapContainer.current) {
      console.error('Map container ref is not available');
      return;
    }
    if (!MAPBOX_TOKEN) {
      setMapError('Mapbox token is missing. Please check your .env file.');
      return;
    }

    // Dynamically import mapbox-gl
    import('mapbox-gl').then((mapboxModule) => {
      mapboxgl = mapboxModule.default;
      
      try {
        // Set Mapbox access token
        mapboxgl.accessToken = MAPBOX_TOKEN;
        
        console.log('Initializing Mapbox map...');
        console.log('Container:', mapContainer.current);
        console.log('Center:', center);
      
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [center.lng, center.lat],
          zoom: 12,
        });

        console.log('Map instance created successfully');

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setMapError(e.error?.message || 'Map loading error');
        });

        map.current.on('load', () => {
          console.log('Map loaded successfully');
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add user location marker
        const userEl = document.createElement("div");
        userEl.className = "user-marker";
        userEl.style.width = "20px";
        userEl.style.height = "20px";
        userEl.style.borderRadius = "50%";
        userEl.style.backgroundColor = "#3B82F6";
        userEl.style.border = "3px solid white";
        userEl.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

        userMarker.current = new mapboxgl.Marker(userEl)
          .setLngLat([userLocation.lng, userLocation.lat])
          .addTo(map.current);
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError(error.message || 'Failed to initialize map');
      }
    }).catch((error) => {
      console.error('Error loading mapbox-gl:', error);
      setMapError('Failed to load map library');
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update markers when events change
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    Object.values(markers.current).forEach((marker) => marker.remove());
    markers.current = {};

    // Add new markers
    events.forEach((event) => {
      const el = document.createElement("div");
      el.className = "event-marker";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = getRiskColor(event.riskLevel);
      el.style.border =
        selectedEventId === event.id ? "4px solid white" : "3px solid white";
      el.style.boxShadow =
        selectedEventId === event.id
          ? "0 4px 12px rgba(0,0,0,0.4)"
          : "0 2px 6px rgba(0,0,0,0.3)";
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([event.lng, event.lat])
        .addTo(map.current);

      el.addEventListener("click", () => {
        setSelectedEvent(event);
        onEventSelect(event);
      });

      markers.current[event.id] = marker;
    });
  }, [events, selectedEventId]);

  // Center on selected event
  useEffect(() => {
    if (!map.current || !selectedEventId) return;

    const event = events.find((e) => e.id === selectedEventId);
    if (event) {
      map.current.flyTo({
        center: [event.lng, event.lat],
        zoom: 14,
        duration: 1500,
      });
    }
  }, [selectedEventId, events]);

  // Clear routes
  const clearRoutes = () => {
    routeLayers.current.forEach((layerId) => {
      if (map.current.getLayer(layerId)) {
        map.current.removeLayer(layerId);
      }
      if (map.current.getSource(layerId)) {
        map.current.removeSource(layerId);
      }
    });
    routeLayers.current = [];
  };

  // Show routes to selected event
  const showRoutes = (event) => {
    if (!map.current) return;

    clearRoutes();

    const obstacles = events
      .filter((e) => e.id !== event.id)
      .map((e) => ({ lat: e.lat, lng: e.lng }));

    const directRoute = calculateDirectRoute(userLocation, event);
    const detourRoute = calculateDetourRoute(userLocation, event, obstacles);

    // Add direct route (solid line)
    const directLayerId = "route-direct";
    map.current.addSource(directLayerId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: directRoute,
        },
      },
    });

    map.current.addLayer({
      id: directLayerId,
      type: "line",
      source: directLayerId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3B82F6",
        "line-width": 4,
        "line-opacity": 0.8,
      },
    });

    // Add detour route (dashed line)
    const detourLayerId = "route-detour";
    map.current.addSource(detourLayerId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: detourRoute,
        },
      },
    });

    map.current.addLayer({
      id: detourLayerId,
      type: "line",
      source: detourLayerId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#10B981",
        "line-width": 4,
        "line-opacity": 0.8,
        "line-dasharray": [2, 2],
      },
    });

    routeLayers.current = [directLayerId, detourLayerId];

    // Fit map to show entire route
    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([userLocation.lng, userLocation.lat]);
    bounds.extend([event.lng, event.lat]);

    map.current.fitBounds(bounds, {
      padding: 100,
      duration: 1500,
    });
  };

  const handleGetRoute = () => {
    if (selectedEvent) {
      showRoutes(selectedEvent);
    }
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    clearRoutes();
  };

  return (
    <div className="relative w-full h-full">
      {mapError && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <strong className="font-bold">Map Error: </strong>
          <span className="block sm:inline">{mapError}</span>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Event Popup */}
      {selectedEvent && (
        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-2xl z-10">
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 pr-2 flex-1">
                {selectedEvent.title}
              </h3>
              <button
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  selectedEvent.riskLevel === "high"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedEvent.riskLevel === "high" ? "HIGH RISK" : "LOW RISK"}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-4">
              {selectedEvent.description}
            </p>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>
                {formatDistance(
                  calculateDistance(userLocation, {
                    lat: selectedEvent.lat,
                    lng: selectedEvent.lng,
                  })
                )}{" "}
                from your location
              </span>
            </div>

            <button
              onClick={handleGetRoute}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span>Get Route</span>
            </button>

            {routeLayers.current.length > 0 && (
              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-blue-500 mr-2"></div>
                  <span>Direct route</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="w-8 h-0.5 bg-green-500 mr-2"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #10B981 0, #10B981 4px, transparent 4px, transparent 8px)",
                    }}
                  ></div>
                  <span>Detour route (avoids obstacles)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
