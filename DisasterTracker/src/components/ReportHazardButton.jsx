export default function ReportHazardButton({ canInteract, onClick }) {
  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <button
        onClick={onClick}
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
  );
}