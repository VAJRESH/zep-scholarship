import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("registration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch user registration data
        const regRes = await axios.get(`/api/admin/users/${id}`, {
          headers: { "x-auth-token": token },
        });

        // Fetch user applications
        const appRes = await axios.get(`/api/admin/users/${id}/applications`, {
          headers: { "x-auth-token": token },
        });

        setRegistration(regRes.data);
        setApplications(appRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again later.");
        setLoading(false);
      }
    }
    fetchData();
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/admin");
  };

  const renderApplicationDetails = (app) => {
    switch (app.applicationType) {
      case "schoolFees":
        return (
          <div className="application-files">
            <h4>Uploaded Documents:</h4>
            <ul>
              {app.birthCertificate && (
                <li>
                  <a
                    href={app.birthCertificate}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Birth Certificate
                  </a>
                </li>
              )}
              {app.leavingCertificate && (
                <li>
                  <a
                    href={app.leavingCertificate}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leaving Certificate
                  </a>
                </li>
              )}
              {app.marksheet && (
                <li>
                  <a
                    href={app.marksheet}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Marksheet
                  </a>
                </li>
              )}
              {app.admissionProof && (
                <li>
                  <a
                    href={app.admissionProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Admission Proof
                  </a>
                </li>
              )}
              {app.incomeProof && (
                <li>
                  <a
                    href={app.incomeProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Income Proof
                  </a>
                </li>
              )}
              {app.bankAccount && (
                <li>
                  <a
                    href={app.bankAccount}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bank Account Details
                  </a>
                </li>
              )}
              {app.rationCard && (
                <li>
                  <a
                    href={app.rationCard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ration Card
                  </a>
                </li>
              )}
            </ul>
          </div>
        );
      case "travelExpenses":
        return (
          <div>
            <p>
              <strong>Residence Place:</strong> {app.residencePlace}
            </p>
            <p>
              <strong>Destination Place:</strong> {app.destinationPlace}
            </p>
            <p>
              <strong>Distance (km):</strong> {app.distance}
            </p>
            <p>
              <strong>Travel Mode:</strong> {app.travelMode}
            </p>
            <p>
              <strong>Aid Required (INR):</strong> {app.aidRequired}
            </p>
            {app.idCard && (
              <p>
                <strong>ID Card:</strong>{" "}
                <a href={app.idCard} target="_blank" rel="noopener noreferrer">
                  View ID Card
                </a>
              </p>
            )}
          </div>
        );
      case "studyBooks":
        return (
          <div>
            <p>
              <strong>Year of Study:</strong> {app.yearOfStudy}
            </p>
            <p>
              <strong>Field of Study:</strong> {app.field}
            </p>
            <p>
              <strong>Books Required:</strong>
            </p>
            <div className="books-list">{app.booksRequired}</div>
          </div>
        );
      default:
        return <p>No details available</p>;
    }
  };

  if (loading) {
    return <div className="loading">Loading user details...</div>;
  }

  return (
    <div className="user-detail">
      <h2>User Details</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="tabs">
        <button
          className={activeTab === "registration" ? "active" : ""}
          onClick={() => setActiveTab("registration")}
        >
          Registration Details
        </button>
        <button
          className={activeTab === "applications" ? "active" : ""}
          onClick={() => setActiveTab("applications")}
        >
          Scholarship Applications ({applications.length})
        </button>
      </div>

      {activeTab === "registration" ? (
        <>
          {registration ? (
            <div className="registration-details">
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
                <strong>Disabled:</strong>{" "}
                {registration.disabled ? "Yes" : "No"}
              </p>
            </div>
          ) : (
            <p>No registration data found for this user.</p>
          )}
        </>
      ) : (
        <div className="applications-details">
          {applications.length === 0 ? (
            <p>This user has not submitted any scholarship applications yet.</p>
          ) : (
            <>
              {applications.map((app, index) => (
                <div key={app._id || index} className="application-card">
                  <h3>
                    {app.applicationType === "schoolFees" &&
                      "School Fees Application"}
                    {app.applicationType === "travelExpenses" &&
                      "Travel Expenses Application"}
                    {app.applicationType === "studyBooks" &&
                      "Study Books Application"}
                  </h3>
                  <p className="application-date">
                    <strong>Submitted on:</strong>{" "}
                    {new Date(app.createdAt).toLocaleString()}
                  </p>
                  {renderApplicationDetails(app)}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <button onClick={handleBack} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default UserDetail;
