import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Alert } from "./ui";

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
          localStorage.setItem("userRole", "admin");
          navigate("/admin");
          return;
        } else {
          localStorage.setItem("userRole", "user");
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
    <div className="max-w-md mx-auto my-12">
      <Card
        title="Welcome Back"
        subtitle="Sign in to your account"
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
          <Input
            id="username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <Button type="submit" variant="primary" fullWidth size="large">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Don't have an account?
          </p>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => (window.location.href = "/register")}
          >
            Register Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
