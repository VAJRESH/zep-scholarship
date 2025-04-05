import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Login the user
      const loginRes = await axios.post("/api/auth/login", formData);
      console.log("Login response:", loginRes.data);

      if (loginRes.data.token) {
        localStorage.setItem("token", loginRes.data.token);

        // Check if user is admin
        if (loginRes.data.user.role === "admin") {
          console.log("Redirecting to admin dashboard...");
          navigate("/admin");
          return;
        }

        // For normal users, check if they've already filled out registration details
        try {
          const token = loginRes.data.token;
          const registrationRes = await axios.get("/api/registration/check", {
            headers: { "x-auth-token": token },
          });

          if (registrationRes.data.hasRegistered) {
            // User has already filled registration, redirect to options
            console.log(
              "User has already registered, redirecting to options..."
            );
            navigate("/options");
          } else {
            // User needs to fill registration form
            console.log("User needs to fill registration form...");
            navigate("/registration");
          }
        } catch (checkErr) {
          console.error("Error checking registration status:", checkErr);
          // Default to registration page on error
          navigate("/registration");
        }
      } else {
        setError("No token received from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
