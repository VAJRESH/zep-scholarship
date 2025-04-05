import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudyBooksForm = () => {
  const [formData, setFormData] = useState({
    yearOfStudy: "",
    field: "",
    booksRequired: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form data
    if (!formData.yearOfStudy || !formData.field || !formData.booksRequired) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/applications/study-books",
        {
          ...formData,
          applicationType: "studyBooks",
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setSuccess(true);
      setLoading(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/options");
      }, 2000);
    } catch (err) {
      console.error("Error submitting study books application:", err);
      setError(err.response?.data?.msg || "Failed to submit application");
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Apply for Study Books</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Application submitted successfully! Redirecting to options page...
        </div>
      )}
      <p>Please provide details about the books you need:</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Year of Study *</label>
          <select
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="5th Year">5th Year</option>
          </select>
        </div>

        <div className="form-group">
          <label>Field of Study *</label>
          <select
            name="field"
            value={formData.field}
            onChange={handleChange}
            required
          >
            <option value="">Select Field</option>
            <option value="Medical">Medical</option>
            <option value="Engineering">Engineering</option>
            <option value="Arts">Arts</option>
            <option value="Commerce">Commerce</option>
            <option value="Science">Science</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Books Required *</label>
          <textarea
            name="booksRequired"
            value={formData.booksRequired}
            onChange={handleChange}
            placeholder="List the books you need along with authors and editions if possible"
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default StudyBooksForm;
