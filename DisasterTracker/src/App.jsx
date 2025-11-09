import { useState } from "react";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import MapView from "./components/MapView";
import ReportHazardModal from "./components/ReportHazardModal";
import { mockEvents, USER_LOCATION, JASPER_CENTER } from "./data/mockEvents";
import { sortEventsByDistance } from "./utils/helpers";
import ReportHazardButton from "./components/ReportHazardButton";
import "./App.css";

function App() {
  console.log("App component rendering...");

  const [userRole, setUserRole] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  console.log("State:", {
    userRole,
    termsAccepted,
    eventsCount: events.length,
    mockEventsCount: mockEvents.length,
  });

  // Filter events based on user role
  const filteredEvents = events.filter((event) => {
    if (userRole === "volunteer") {
      // Volunteers only see low-risk events
      return event.riskLevel === "low";
    } else if (userRole === "technician") {
      // Technicians see everything (low, high, and technician-only)
      return true;
    }
    // If no role selected, show nothing
    return false;
  });

  // Sort events by distance from user
  let sortedEvents = [];
  try {
    sortedEvents = sortEventsByDistance(filteredEvents, USER_LOCATION);
    console.log("Sorted events:", sortedEvents.length);
  } catch (error) {
    console.error("Error sorting events:", error);
    sortedEvents = filteredEvents;
  }

  const handleEventClick = (event) => {
    setSelectedEventId(event.id);
  };

  const handleReportHazard = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    // Clear selection if switching to volunteer and selected event is not low-risk
    if (role === "volunteer") {
      const selectedEvent = events.find((e) => e.id === selectedEventId);
      if (selectedEvent && selectedEvent.riskLevel !== "low") {
        setSelectedEventId(null);
      }
    }
  };

  // Block interactions if terms not accepted
  const canInteract = termsAccepted && userRole;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar
        userRole={userRole}
        onRoleChange={handleRoleChange}
        termsAccepted={termsAccepted}
        onTermsAccept={() => setTermsAccepted(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-96 border-r border-gray-200 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 min-h-0">
            <EventList
              events={sortedEvents}
              userLocation={USER_LOCATION}
              onEventClick={handleEventClick}
              selectedEventId={selectedEventId}
            />
          </div>

          <div className="flex-shrink-0">
            <ReportHazardButton 
              canInteract={canInteract}
              onClick={() => setIsReportModalOpen(true)}
            />
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {!canInteract && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-10 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 shadow-2xl text-center max-w-md">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {!termsAccepted
                    ? "Accept Terms to Continue"
                    : "Sign In Required"}
                </h3>
                <p className="text-gray-600">
                  {!termsAccepted
                    ? "Please accept the terms and conditions to access the disaster tracker."
                    : "Please sign in as a Technician or Volunteer to view events and interact with the map."}
                </p>
              </div>
            </div>
          )}
          {/* Only render map after terms accepted to avoid initialization issues */}
          {termsAccepted && (
            <MapView
              events={filteredEvents}
              userLocation={USER_LOCATION}
              onEventSelect={handleEventClick}
              selectedEventId={selectedEventId}
              center={JASPER_CENTER}
            />
          )}
          {!termsAccepted && (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">
                Map will load after accepting terms
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Report Hazard Modal */}
      <ReportHazardModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportHazard}
        userRole={userRole}
        userLocation={USER_LOCATION}
      />
    </div>
  );
}

export default App;
