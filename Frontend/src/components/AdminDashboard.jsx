import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("/api/admin/users", {
          headers: { "x-auth-token": token },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
        setLoading(false);
      }
    }
    fetchUsers();
  }, [navigate]);

  const handleUserClick = (id) => {
    navigate(`/admin/users/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <div className="error-message">{error}</div>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <p>Select a user to view their registration details:</p>
          <ul>
            {users.map((user) => (
              <li key={user._id} onClick={() => handleUserClick(user._id)}>
                {user.username}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
