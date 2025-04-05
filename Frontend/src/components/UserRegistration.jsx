import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        username: formData.username,
        password: formData.password,
        role: "user",
      });

      console.log("Registration successful:", res.data);

      // Automatically log in the user after registration
      const loginRes = await axios.post("/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("token", loginRes.data.token);
      navigate("/registration"); // Redirect to details form
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.msg || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="user-registration-container">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
            value={formData.username}
          />
        </div>
        <div className="form-group">
          <input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            value={formData.password}
          />
        </div>
        <div className="form-group">
          <input
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
            required
            value={formData.confirmPassword}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default UserRegistration;
