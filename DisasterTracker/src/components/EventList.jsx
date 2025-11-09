import { formatDistance } from "../utils/helpers";

export default function EventList({
  events,
  userLocation,
  onEventClick,
  selectedEventId,
}) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Current Events</h2>
        <p className="text-sm text-gray-600 mt-1">
          {events.length} active incidents
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {events.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>No events to display</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick(event)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedEventId === event.id
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 pr-2 flex-1">
                    {event.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      event.riskLevel === "high"
                        ? "bg-red-100 text-red-800"
                        : event.riskLevel === "technician-only"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {event.riskLevel === "high"
                      ? "HIGH RISK"
                      : event.riskLevel === "technician-only"
                      ? "POWER TERMINAL"
                      : "LOW RISK"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
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
                    <span>{formatDistance(event.distance)}</span>
                  </div>
                  <span className="text-gray-400">
                    {event.timestamp.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
