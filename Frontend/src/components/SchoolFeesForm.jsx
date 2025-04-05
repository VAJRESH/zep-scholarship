import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SchoolFeesForm = () => {
  const [files, setFiles] = useState({
    birthCertificate: null,
    leavingCertificate: null,
    marksheet: null,
    admissionProof: null,
    incomeProof: null,
    bankAccount: null,
    rationCard: null,
  });
  const [fileNames, setFileNames] = useState({
    birthCertificate: "",
    leavingCertificate: "",
    marksheet: "",
    admissionProof: "",
    incomeProof: "",
    bankAccount: "",
    rationCard: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setFileNames((prev) => ({
        ...prev,
        [name]: files[0].name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if all required files are uploaded
    const requiredFiles = [
      "birthCertificate",
      "leavingCertificate",
      "marksheet",
      "admissionProof",
      "incomeProof",
      "bankAccount",
    ];

    const missingFiles = requiredFiles.filter((file) => !files[file]);

    if (missingFiles.length > 0) {
      setError(
        `Please upload all required documents: ${missingFiles.join(", ")}`
      );
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      // Add all files to form data
      Object.keys(files).forEach((key) => {
        if (files[key]) {
          formData.append(key, files[key]);
        }
      });

      // Add application type
      formData.append("applicationType", "schoolFees");

      const token = localStorage.getItem("token");
      await axios.post("/api/applications/school-fees", formData, {
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
      console.error("Error submitting school fees application:", err);
      setError(err.response?.data?.msg || "Failed to submit application");
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Apply for School Fees</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Application submitted successfully! Redirecting to options page...
        </div>
      )}
      <p>Please upload the following documents:</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Birth Certificate *</label>
          <input
            type="file"
            name="birthCertificate"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {fileNames.birthCertificate && (
            <div className="file-name">
              Selected: {fileNames.birthCertificate}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Leaving Certificate (Previous Schooling) *</label>
          <input
            type="file"
            name="leavingCertificate"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {fileNames.leavingCertificate && (
            <div className="file-name">
              Selected: {fileNames.leavingCertificate}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Marksheet (All marksheets combined in one) *</label>
          <input
            type="file"
            name="marksheet"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {fileNames.marksheet && (
            <div className="file-name">Selected: {fileNames.marksheet}</div>
          )}
        </div>

        <div className="form-group">
          <label>Proof of Admission *</label>
          <input
            type="file"
            name="admissionProof"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {fileNames.admissionProof && (
            <div className="file-name">
              Selected: {fileNames.admissionProof}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Proof of Income *</label>
          <input
            type="file"
            name="incomeProof"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {fileNames.incomeProof && (
            <div className="file-name">Selected: {fileNames.incomeProof}</div>
          )}
        </div>

        <div className="form-group">
          <label>Bank Account Details *</label>
          <input
            type="file"
            name="bankAccount"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {fileNames.bankAccount && (
            <div className="file-name">Selected: {fileNames.bankAccount}</div>
          )}
        </div>

        <div className="form-group">
          <label>Ration Card (Optional)</label>
          <input
            type="file"
            name="rationCard"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          {fileNames.rationCard && (
            <div className="file-name">Selected: {fileNames.rationCard}</div>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default SchoolFeesForm;
