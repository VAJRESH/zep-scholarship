import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Input, Button, Alert } from "./ui";

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
    return (
      <div className="max-w-3xl mx-auto my-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-12">
      <Card
        title="Student Registration"
        subtitle="Please fill out your details to continue. You'll only need to do this once."
        shadow="lg"
        padding="large"
        rounded="lg"
        className="border border-gray-200"
      >
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="academicYear"
              name="academicYear"
              label="Academic Year"
              value={data.academicYear}
              onChange={handleChange}
              placeholder="e.g. 2023-2024"
              required
            />

            <Input
              id="date"
              name="date"
              label="Application Date"
              type="date"
              value={data.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="collegeName"
              name="collegeName"
              label="College Name"
              value={data.collegeName}
              onChange={handleChange}
              placeholder="Enter your college name"
              required
            />

            <Input
              id="courseName"
              name="courseName"
              label="Course Name"
              value={data.courseName}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="applicantName"
              name="applicantName"
              label="Applicant Name"
              value={data.applicantName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <Input
              id="motherName"
              name="motherName"
              label="Mother's Name"
              value={data.motherName}
              onChange={handleChange}
              placeholder="Enter your mother's name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="dob"
              name="dob"
              label="Date of Birth"
              type="date"
              value={data.dob}
              onChange={handleChange}
              required
            />

            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                onChange={handleChange}
                value={data.gender}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <Input
            id="address"
            name="address"
            label="Address"
            value={data.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="state"
              name="state"
              label="State"
              value={data.state}
              onChange={handleChange}
              placeholder="Enter your state"
              required
            />

            <Input
              id="caste"
              name="caste"
              label="Caste (Optional)"
              value={data.caste}
              onChange={handleChange}
              placeholder="Enter your caste"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="orphan"
                name="orphan"
                onChange={handleChange}
                checked={data.orphan}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="orphan"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Orphan
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="disabled"
                name="disabled"
                onChange={handleChange}
                checked={data.disabled}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="disabled"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Disabled
              </label>
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="large"
              className="py-4 font-semibold"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Registration;
