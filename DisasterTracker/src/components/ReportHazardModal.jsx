import { useState } from "react";

export default function ReportHazardModal({
  isOpen,
  onClose,
  onSubmit,
  userRole,
  userLocation,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    riskLevel: "low",
    lat: "",
    lng: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get coordinates from current location or form
    const latitude = useCurrentLocation
      ? userLocation.lat
      : parseFloat(formData.lat);
    const longitude = useCurrentLocation
      ? userLocation.lng
      : parseFloat(formData.lng);

    // Validate required fields
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate coordinates if not using current location
    if (!useCurrentLocation && (!formData.lat || !formData.lng)) {
      alert("Please enter coordinates or use current location");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      riskLevel: formData.riskLevel,
      lat: latitude,
      lng: longitude,
      reportedBy: userRole === "technician" ? "Technician" : "Volunteer",
      timestamp: new Date(),
      image: imagePreview,
    };

    onSubmit(newEvent);

    // Reset form
    setFormData({
      title: "",
      description: "",
      riskLevel: "low",
      lat: "",
      lng: "",
      image: null,
    });
    setImagePreview(null);
    setUseCurrentLocation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Report Hazard</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the hazard"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Detailed description of the hazard and its location"
                required
              />
            </div>

            {/* Risk Level */}
            <div>
              <label
                htmlFor="riskLevel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Risk Level *
              </label>
              <select
                id="riskLevel"
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low Risk (Safe for volunteers)</option>
                <option value="high">High Risk (Professionals only)</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setUseCurrentLocation(!useCurrentLocation);
                    if (!useCurrentLocation) {
                      setFormData((prev) => ({ ...prev, lat: "", lng: "" }));
                    }
                  }}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    useCurrentLocation
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {useCurrentLocation
                    ? "✓ Using Current Location"
                    : "Use Current Location"}
                </button>
              </div>

              {!useCurrentLocation && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="lat"
                      className="block text-xs text-gray-600 mb-1"
                    >
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="lat"
                      name="lat"
                      value={formData.lat}
                      onChange={handleChange}
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="52.8734"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lng"
                      className="block text-xs text-gray-600 mb-1"
                    >
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="lng"
                      name="lng"
                      value={formData.lng}
                      onChange={handleChange}
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="-118.0814"
                    />
                  </div>
                </div>
              )}

              {useCurrentLocation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                  <div className="flex items-center space-x-2">
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
                      Hazard will be marked at your current location:{" "}
                      {userLocation.lat.toFixed(4)},{" "}
                      {userLocation.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo (Optional)
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
