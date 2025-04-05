import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "./ui";

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
          <div className="mt-4 space-y-4">
            <h4 className="text-lg font-medium text-gray-800 dark:text-white">
              Uploaded Documents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {app.birthCertificate && (
                <a
                  href={app.birthCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Birth Certificate</span>
                </a>
              )}
              {app.leavingCertificate && (
                <a
                  href={app.leavingCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Leaving Certificate</span>
                </a>
              )}
              {app.marksheet && (
                <a
                  href={app.marksheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Marksheet</span>
                </a>
              )}
              {app.admissionProof && (
                <a
                  href={app.admissionProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Admission Proof</span>
                </a>
              )}
              {app.incomeProof && (
                <a
                  href={app.incomeProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Income Proof</span>
                </a>
              )}
              {app.bankAccount && (
                <a
                  href={app.bankAccount}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Bank Account Details</span>
                </a>
              )}
              {app.rationCard && (
                <a
                  href={app.rationCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                >
                  <svg
                    className="w-6 h-6 text-primary mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Ration Card</span>
                </a>
              )}
            </div>
          </div>
        );
      case "travelExpenses":
        return (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Residence Place
              </p>
              <p className="text-gray-900 dark:text-white">
                {app.residencePlace}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Destination Place
              </p>
              <p className="text-gray-900 dark:text-white">
                {app.destinationPlace}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Distance (km)
              </p>
              <p className="text-gray-900 dark:text-white">{app.distance}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Travel Mode
              </p>
              <p className="text-gray-900 dark:text-white">{app.travelMode}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Aid Required (INR)
              </p>
              <p className="text-gray-900 dark:text-white font-bold">
                {app.aidRequired}
              </p>
            </div>
            {app.idCard && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  ID Card
                </p>
                <a
                  href={app.idCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View ID Card
                </a>
              </div>
            )}
          </div>
        );
      case "studyBooks":
        return (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Year of Study
                </p>
                <p className="text-gray-900 dark:text-white">
                  {app.yearOfStudy}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  Field of Study
                </p>
                <p className="text-gray-900 dark:text-white">{app.field}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                Books Required
              </p>
              <div className="p-4 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {app.booksRequired}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <p className="text-gray-500 dark:text-gray-400 italic mt-4">
            No details available
          </p>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          User Details
        </h1>
        <Button variant="secondary" onClick={handleBack} size="small">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </span>
        </Button>
      </div>

      {error && (
        <Alert
          variant="error"
          className="mb-6"
          dismissible
          onDismiss={() => setError("")}
        >
          {error}
        </Alert>
      )}

      <div className="mb-6 border-b dark:border-gray-700">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("registration")}
            className={`px-3 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === "registration"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Registration Details
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-3 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === "applications"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Scholarship Applications ({applications.length})
          </button>
        </nav>
      </div>

      {activeTab === "registration" ? (
        <Card
          shadow="md"
          padding="normal"
          rounded="lg"
          className="border border-gray-200"
        >
          {registration ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Applicant Name
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.applicantName}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Academic Year
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.academicYear}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  College Name
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.collegeName}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Course Name
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.courseName}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Mother's Name
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.motherName}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Date of Birth
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.dob &&
                    new Date(registration.dob).toLocaleDateString()}
                </div>
              </div>

              <div className="p-3 rounded-lg md:col-span-2">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Address
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.address}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  State
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.state}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Caste
                </div>
                <div className="text-gray-900 dark:text-white">
                  {registration.caste || "Not specified"}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Gender
                </div>
                <div className="text-gray-900 dark:text-white capitalize">
                  {registration.gender}
                </div>
              </div>

              <div className="p-3 rounded-lg">
                <div className="flex space-x-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Orphan
                    </div>
                    <div>
                      {registration.orphan ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          No
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Disabled
                    </div>
                    <div>
                      {registration.disabled ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          No
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg
                className="h-12 w-12 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>No registration data found for this user.</p>
            </div>
          )}
        </Card>
      ) : (
        <div className="space-y-6">
          {applications.length === 0 ? (
            <Card
              shadow="md"
              padding="normal"
              rounded="lg"
              className="border border-gray-200"
            >
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg
                  className="h-12 w-12 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p>
                  This user has not submitted any scholarship applications yet.
                </p>
              </div>
            </Card>
          ) : (
            applications.map((app, index) => (
              <Card
                key={app._id || index}
                shadow="md"
                padding="normal"
                rounded="lg"
                className="border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {app.applicationType === "schoolFees" &&
                        "School Fees Application"}
                      {app.applicationType === "travelExpenses" &&
                        "Travel Expenses Application"}
                      {app.applicationType === "studyBooks" &&
                        "Study Books Application"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Submitted on: {new Date(app.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Pending
                  </div>
                </div>
                {renderApplicationDetails(app)}
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetail;
