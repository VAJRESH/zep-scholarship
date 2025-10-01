import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ui";
import logo from "../../../public/assets/logo.jpg"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const isRegistrationPage = location.pathname === "/registration";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Check authentication status on every render and on storage change
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole");
      setIsLoggedIn(!!token);
      setUserRole(role);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("popstate", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("popstate", checkAuth);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/", { replace: true });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg dark:bg-gray-800/90 backdrop-blur-sm"
          : "bg-white shadow dark:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {isLoggedIn ? (
                <>
                  {isRegistrationPage ? (
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        navigate("/");
                      }}
                    >
                      <img src={logo} alt=""  width="60px" className="mx-2"/>
                      <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                        ZEP Scholarship Portal
                      </span>
                    </div>
                  ) : (
                    <>
                      <img src={logo} alt=""  width="60px" />
                      <span className="text-xl font-bold text-blue-700 dark:text-blue-400 mx-4">
                        ZEP Scholarship Portal
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <img src={logo} alt=""  width="60px" className="mx-2"/>
                  <Link
                    to="/"
                    className="text-xl font-bold text-blue-600 dark:text-blue"
                  >
                    ZEP Scholarship Portal
                  </Link>
                </>
              )}
            </div>

            {/* Desktop navigation links - only show when not logged in */}
            {!isLoggedIn && (
              <div className="hidden md:flex ml-10 space-x-8">
                <Link
                  to="/about-us"
                  className="text-gray-900 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  About Us
                </Link>
                <Link
                  to="/how-to-apply"
                  className="text-gray-900 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  How to Apply
                </Link>
                <Link
                  to="/faq"
                  className="text-gray-900 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-900 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  Contact
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Authentication buttons or user menu */}
            {isLoggedIn ? (
              <div className="flex space-x-3">
                {isRegistrationPage ? (
                  <>
                    <button
                      onClick={() => {
                        handleLogout();
                        navigate("/");
                      }}
                      className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : userRole === "admin" ? (
                  <>
                    <Link
                      to="/admin"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/all-applications"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      Applications
                    </Link>
                    <Link
                      to="/admin/view-records"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      View Records
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/options"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      Applications
                    </Link>
                    <Link
                      to="/history"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      History
                    </Link>
                    <Link
                      to="/profile"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/about-us"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/how-to-apply"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How to Apply
                  </Link>
                  <Link
                    to="/faq"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </>
              ) : (
                <>
                  {userRole === "admin" ? (
                    <>
                      <Link
                        to="/admin"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/all-applications"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Applications
                      </Link>
                      <Link
                        to="/admin/view-records"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        View Records
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/options"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Applications
                      </Link>
                      <Link
                        to="/history"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        History
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
