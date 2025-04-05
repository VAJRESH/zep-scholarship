import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDetail() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`/api/admin/users/${id}`, {
          headers: { "x-auth-token": token },
        });
        setRegistration(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again later.");
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/admin");
  };

  if (loading) {
    return <div className="loading">Loading user details...</div>;
  }

  return (
    <div className="user-detail">
      <h2>User Registration Details</h2>
      {error && <div className="error-message">{error}</div>}
      {registration ? (
        <>
          <p>
            <strong>Applicant Name:</strong> {registration.applicantName}
          </p>
          <p>
            <strong>Academic Year:</strong> {registration.academicYear}
          </p>
          <p>
            <strong>College Name:</strong> {registration.collegeName}
          </p>
          <p>
            <strong>Course Name:</strong> {registration.courseName}
          </p>
          <p>
            <strong>Mother's Name:</strong> {registration.motherName}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {registration.dob &&
              new Date(registration.dob).toLocaleDateString()}
          </p>
          <p>
            <strong>Address:</strong> {registration.address}
          </p>
          <p>
            <strong>State:</strong> {registration.state}
          </p>
          <p>
            <strong>Caste:</strong> {registration.caste}
          </p>
          <p>
            <strong>Gender:</strong> {registration.gender}
          </p>
          <p>
            <strong>Orphan:</strong> {registration.orphan ? "Yes" : "No"}
          </p>
          <p>
            <strong>Disabled:</strong> {registration.disabled ? "Yes" : "No"}
          </p>
          <button onClick={handleBack}>Back to Dashboard</button>
        </>
      ) : (
        <p>No registration data found for this user.</p>
      )}
    </div>
  );
};

export default UserDetail;
