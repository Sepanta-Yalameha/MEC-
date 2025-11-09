import { useState } from "react";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import MapView from "./components/MapView";
import ReportHazardModal from "./components/ReportHazardModal";
import { mockEvents, USER_LOCATION, JASPER_CENTER } from "./data/mockEvents";
import { sortEventsByDistance } from "./utils/helpers";
import "./App.css";

function App() {
  console.log("App component rendering...");
  
  const [userRole, setUserRole] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  console.log('State:', { userRole, termsAccepted, eventsCount: events.length, mockEventsCount: mockEvents.length });

  // Filter events based on user role
  const filteredEvents = events.filter((event) => {
    if (userRole === "volunteer") {
      return event.riskLevel === "low";
    }
    // Firefighters see all events
    return true;
  });

  // Sort events by distance from user
  let sortedEvents = [];
  try {
    sortedEvents = sortEventsByDistance(filteredEvents, USER_LOCATION);
    console.log('Sorted events:', sortedEvents.length);
  } catch (error) {
    console.error('Error sorting events:', error);
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
    // Clear selection if switching to volunteer and selected event is high risk
    if (role === "volunteer") {
      const selectedEvent = events.find((e) => e.id === selectedEventId);
      if (selectedEvent && selectedEvent.riskLevel === "high") {
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
        <div className="w-96 border-r border-gray-200 flex flex-col bg-white">
          <EventList
            events={sortedEvents}
            userLocation={USER_LOCATION}
            onEventClick={handleEventClick}
            selectedEventId={selectedEventId}
          />

          {/* Report Hazard Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsReportModalOpen(true)}
              disabled={!canInteract}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                canInteract
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Report Hazard</span>
            </button>
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
                    : "Please sign in as a Firefighter or Volunteer to view events and interact with the map."}
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
              <p className="text-gray-500">Map will load after accepting terms</p>
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
      />
    </div>
  );
}

export default App;
