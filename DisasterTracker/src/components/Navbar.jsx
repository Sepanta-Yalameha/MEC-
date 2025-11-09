import { useState, useEffect } from "react";

export default function Navbar({
  userRole,
  onRoleChange,
  termsAccepted,
  onTermsAccept,
}) {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleRoleSelect = (role) => {
    onRoleChange(role);
    setShowRoleMenu(false);
  };

  return (
    <>
      <nav className="bg-slate-900 text-white shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg
              className="w-7 h-7 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="text-xl font-bold leading-none">Eyes for Energy</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Role Display/Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
              >
                {userRole ? (
                  <>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        userRole === "technician" ? "bg-red-500" : "bg-blue-500"
                      }`}
                    ></span>
                    <span className="capitalize">{userRole}</span>
                  </>
                ) : (
                  <span className="text-gray-400">Sign In</span>
                )}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => handleRoleSelect("technician")}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Sign in as Technician</span>
                  </button>
                  <button
                    onClick={() => handleRoleSelect("volunteer")}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Sign in as Volunteer</span>
                  </button>
                </div>
              )}
            </div>

            {/* Terms Indicator */}
            <button
              onClick={onTermsAccept}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </nav>

      {/* Terms and Conditions Modal */}
      {!termsAccepted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Terms and Conditions
            </h2>
            <div className="text-gray-700 mb-6 space-y-3">
              <p className="text-sm">
                By using Disaster Tracker, you agree to:
              </p>
              <ul className="list-disc list-inside text-sm space-y-2 ml-2">
                <li>Report accurate and truthful information about hazards</li>
                <li>Follow all safety protocols and risk level guidelines</li>
                <li>
                  Only engage with events appropriate for your role and training
                </li>
                <li>Not enter high-risk areas without proper authorization</li>
                <li>Understand that you participate at your own risk</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                This is a coordination tool for disaster recovery efforts.
                Always prioritize your safety.
              </p>
            </div>
            <button
              onClick={onTermsAccept}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              I Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
