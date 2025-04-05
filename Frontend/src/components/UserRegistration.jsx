import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Input, Button, Alert } from "./ui";

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
    <div className="max-w-md mx-auto my-12">
      <Card
        title="Create Account"
        subtitle="Register for a new account to get started"
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
            placeholder="Choose a username"
            required
          />

          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="large"
              className="py-4 font-semibold"
            >
              Create Account
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Already have an account?
          </p>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => (window.location.href = "/login")}
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserRegistration;
