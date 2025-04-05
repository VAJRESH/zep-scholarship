import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [data, setData] = useState({
    academicYear: "",
    date: "",
    collegeName: "",
    courseName: "",
    applicantName: "",
    motherName: "",
    dob: "",
    address: "",
    state: "",
    caste: "",
    gender: "",
    orphan: false,
    disabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user has already completed registration
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("/api/registration/check", {
          headers: { "x-auth-token": token },
        });

        if (res.data.hasRegistered) {
          // User has already registered, redirect to options
          navigate("/options");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error checking registration:", err);
        setError("An error occurred while checking your registration status");
        setLoading(false);
      }
    };

    checkRegistration();
  }, [navigate]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/registration", data, {
        headers: { "x-auth-token": token },
      });
      navigate("/options");
    } catch (err) {
      console.error("Error submitting registration:", err);
      setError(
        err.response?.data?.msg ||
          "An error occurred while submitting your registration"
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="registration-container">
      <h2>Student Registration</h2>
      <p>
        Please fill out your details to continue. You'll only need to do this
        once.
      </p>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="academicYear"
            onChange={handleChange}
            placeholder="Academic Year"
            value={data.academicYear}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            name="date"
            onChange={handleChange}
            type="date"
            value={data.date}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="collegeName"
            onChange={handleChange}
            placeholder="College Name"
            value={data.collegeName}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="courseName"
            onChange={handleChange}
            placeholder="Course Name"
            value={data.courseName}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="applicantName"
            onChange={handleChange}
            placeholder="Applicant Name"
            value={data.applicantName}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="motherName"
            onChange={handleChange}
            placeholder="Mother's Name"
            value={data.motherName}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            name="dob"
            onChange={handleChange}
            type="date"
            value={data.dob}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="address"
            onChange={handleChange}
            placeholder="Address"
            value={data.address}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="state"
            onChange={handleChange}
            placeholder="State"
            value={data.state}
            required
          />
        </div>
        <div className="form-group">
          <input
            name="caste"
            onChange={handleChange}
            placeholder="Caste"
            value={data.caste}
          />
        </div>
        <div className="form-group">
          <select
            name="gender"
            onChange={handleChange}
            value={data.gender}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group checkbox">
          <label>
            Orphan
            <input
              type="checkbox"
              name="orphan"
              onChange={handleChange}
              checked={data.orphan}
            />
          </label>
        </div>
        <div className="form-group checkbox">
          <label>
            Disabled
            <input
              type="checkbox"
              name="disabled"
              onChange={handleChange}
              checked={data.disabled}
            />
          </label>
        </div>
        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
};

export default Registration;
