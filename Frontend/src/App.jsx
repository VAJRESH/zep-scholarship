import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserRegistration from "./components/UserRegistration";
import Registration from "./components/Registration";
import Options from "./components/Options";
import AdminDashboard from "./components/AdminDashboard";
import UserDetail from "./components/UserDetail";
import SchoolFeesForm from "./components/SchoolFeesForm";
import TravelExpensesForm from "./components/TravelExpensesForm";
import StudyBooksForm from "./components/StudyBooksForm";
import UserHistory from "./components/UserHistory";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "./components/ui";

// Navigation Bar Component
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Check if user is admin (simplified version)
    // In a real app, you would verify the role from the token
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  // Hide navbar on login and registration pages
  if (["/login", "/register", "/"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Scholarship Portal</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn && (
              <>
                {isAdmin ? (
                  <button
                    onClick={() => navigate("/admin")}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/options")}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                    >
                      Applications
                    </button>
                    <button
                      onClick={() => navigate("/history")}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                    >
                      History
                    </button>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Layout component that includes the NavBar
const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="container mx-auto p-4 text-gray-900 dark:text-white">
        {children}
      </main>
    </>
  );
};

// User-only route component
const UserRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect admins to dashboard
  if (userRole === "admin") {
    return <Navigate to="/admin" />;
  }

  // Allow access for regular users
  return <Layout>{children}</Layout>;
};

// Admin-only route component
const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect non-admins to options
  if (userRole !== "admin") {
    return <Navigate to="/options" />;
  }

  // Allow access for admins
  return <Layout>{children}</Layout>;
};

// App Component with Layout
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/registration" element={<Registration />} />

          {/* User-only routes */}
          <Route
            path="/options"
            element={
              <UserRoute>
                <Options />
              </UserRoute>
            }
          />
          <Route
            path="/history"
            element={
              <UserRoute>
                <UserHistory />
              </UserRoute>
            }
          />
          <Route
            path="/apply/school-fees"
            element={
              <UserRoute>
                <SchoolFeesForm />
              </UserRoute>
            }
          />
          <Route
            path="/apply/travel-expenses"
            element={
              <UserRoute>
                <TravelExpensesForm />
              </UserRoute>
            }
          />
          <Route
            path="/apply/study-books"
            element={
              <UserRoute>
                <StudyBooksForm />
              </UserRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/admin/users/:id"
            element={
              <AdminRoute>
                <UserDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
