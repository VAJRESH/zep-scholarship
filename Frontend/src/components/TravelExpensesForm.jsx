import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TravelExpensesForm = () => {
  const [formData, setFormData] = useState({
    residencePlace: "",
    destinationPlace: "",
    distance: "",
    travelMode: "",
    aidRequired: "",
  });
  const [idCard, setIdCard] = useState(null);
  const [idCardName, setIdCardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setIdCard(e.target.files[0]);
      setIdCardName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form data
    if (
      !formData.residencePlace ||
      !formData.destinationPlace ||
      !formData.distance ||
      !formData.travelMode ||
      !formData.aidRequired ||
      !idCard
    ) {
      setError("Please fill in all fields and upload your ID card");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Add ID card file
      submitData.append("idCard", idCard);

      // Add application type
      submitData.append("applicationType", "travelExpenses");

      const token = localStorage.getItem("token");
      await axios.post("/api/applications/travel-expenses", submitData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setLoading(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/options");
      }, 2000);
    } catch (err) {
      console.error("Error submitting travel expenses application:", err);
      setError(err.response?.data?.msg || "Failed to submit application");
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Apply for Travel Expenses</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Application submitted successfully! Redirecting to options page...
        </div>
      )}
      <p>Please provide details about your travel requirements:</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Place of Residence *</label>
          <input
            type="text"
            name="residencePlace"
            value={formData.residencePlace}
            onChange={handleChange}
            placeholder="Enter your place of residence"
            required
          />
        </div>

        <div className="form-group">
          <label>Destination Place *</label>
          <input
            type="text"
            name="destinationPlace"
            value={formData.destinationPlace}
            onChange={handleChange}
            placeholder="Enter your destination place (e.g., college, school)"
            required
          />
        </div>

        <div className="form-group">
          <label>Approximate Distance (in km) *</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="Enter the distance in kilometers"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Mode of Transportation *</label>
          <textarea
            name="travelMode"
            value={formData.travelMode}
            onChange={handleChange}
            placeholder="Describe how you travel (e.g., bus, train, auto-rickshaw)"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Financial Aid Required (in INR) *</label>
          <input
            type="number"
            name="aidRequired"
            value={formData.aidRequired}
            onChange={handleChange}
            placeholder="Enter the amount needed"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload ID Card *</label>
          <input
            type="file"
            name="idCard"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
          {idCardName && (
            <div className="file-name">Selected: {idCardName}</div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default TravelExpensesForm;
