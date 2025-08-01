import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Alert, Button, Input } from "./ui";

const ViewRecords = () => {
  const [searchId, setSearchId] = useState("");
  const [searchBookNumber, setSearchBookNumber] = useState("");
  const [records, setRecords] = useState(null);
  const [bookSearchResults, setBookSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchType, setSearchType] = useState("id"); // "id" or "bookNumber"
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleSearchById = async () => {
    if (!searchId.trim()) {
      setError("Please enter an ID to search");
      return;
    }

    setLoading(true);
    setError("");
    setRecords(null);
    setBookSearchResults(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/admin/view-records/${searchId.trim()}`,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (response.data.success) {
        setRecords(response.data);
      }
    } catch (err) {
      console.error("Error fetching records:", err);
      setError(
        err.response?.data?.msg || "Failed to fetch records. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByBookNumber = async () => {
    if (!searchBookNumber.trim()) {
      setError("Please enter a book number to search");
      return;
    }

    setLoading(true);
    setError("");
    setRecords(null);
    setBookSearchResults(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/admin/search-by-book-number/${searchBookNumber.trim()}`,
        {
          headers: { "x-auth-token": token },
        }
      );

      console.log("Book search response:", response.data); // Debug log

      if (response.data) {
        // Ensure results is an array
        const results = Array.isArray(response.data.results)
          ? response.data.results
          : [];

        const searchResults = {
          success: true,
          bookNumber: searchBookNumber,
          results: results,
        };
        setBookSearchResults(searchResults);
      }
    } catch (err) {
      console.error("Error searching by book number:", err);
      setError(
        err.response?.data?.msg ||
          "Failed to search by book number. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchType === "id") {
      handleSearchById();
    } else {
      handleSearchByBookNumber();
    }
  };

  const clearResults = () => {
    setRecords(null);
    setBookSearchResults(null);
    setSearchId("");
    setSearchBookNumber("");
    setError("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-GB"); // dd/mm/yyyy format
    } catch {
      return "N/A";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
      case "rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          View Records
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Search for study book applications by ID or book number
        </p>
      </div>

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

      {/* Search Controls */}
      <Card className="mb-8">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="searchById"
                name="searchType"
                value="id"
                checked={searchType === "id"}
                onChange={(e) => setSearchType(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="searchById"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Search by ID
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="searchByBookNumber"
                name="searchType"
                value="bookNumber"
                checked={searchType === "bookNumber"}
                onChange={(e) => setSearchType(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="searchByBookNumber"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Search by Book Number
              </label>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-end">
            {searchType === "id" ? (
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter ID (Generated ID or Application ID)
                </label>
                <Input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter ID..."
                  className="w-full"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            ) : (
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter Book Number
                </label>
                <Input
                  type="number"
                  value={searchBookNumber}
                  onChange={(e) => setSearchBookNumber(e.target.value)}
                  placeholder="Enter book number..."
                  className="w-full"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            )}

            <Button onClick={handleSearch} disabled={loading} className="px-8">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                "Search"
              )}
            </Button>

            {(records || bookSearchResults) && (
              <Button
                onClick={clearResults}
                variant="secondary"
                className="px-6"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Results */}
      {bookSearchResults && bookSearchResults.results && (
        <Card className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Book Search Results
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Found {bookSearchResults.results.length} application(s) with book
              number {bookSearchResults.bookNumber}
            </p>
          </div>

          <div className="space-y-8">
            {bookSearchResults.results.map((result) => (
              <div
                key={result.applicationId}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Set ID: {result.generatedId}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Application ID: {result.applicationId}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      result.status
                    )}`}
                  >
                    {result.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Details */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Student Details
                    </h4>
                    {result.studentDetails ? (
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Name:{" "}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {result.studentDetails.name}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            College:{" "}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {result.studentDetails.collegeName}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Course:{" "}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {result.studentDetails.courseName}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Contact:{" "}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {result.studentDetails.contact || "N/A"}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No student details available
                      </p>
                    )}
                  </div>

                  {/* Book Set Details */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">
                      Book Set Details
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Standard:{" "}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {result.bookSet.standard}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Stream:{" "}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {result.bookSet.stream}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Medium:{" "}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {result.bookSet.medium}
                        </span>
                      </p>
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Books with Number {bookSearchResults.bookNumber}:
                        </h5>
                        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                          {Array.isArray(result.matchingBooks) ? (
                            result.matchingBooks.map((book, index) => (
                              <li key={index}>{book}</li>
                            ))
                          ) : (
                            <li>No matching books found</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {records && (
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Record Details
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                records.application.status
              )}`}
            >
              {records.application.status?.toUpperCase() || "PENDING"}
            </span>
          </div>

          {/* User Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Name
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {records.user.name || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Email
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {records.user.email || "N/A"}
                </p>
              </div>
              {records.studentRegistration && (
                <>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Phone
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.phone || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Applicant Name
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.applicantName || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Mother's Name
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.motherName || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Date of Birth
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(records.studentRegistration.dob)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Gender
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.gender || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Caste
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.caste || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      College Name
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.collegeName || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Course Name
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.courseName || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Address
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.address || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Village Name
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.villageName || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      State
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.state || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Academic Year
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.academicYear || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Registration Date
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(records.studentRegistration.date)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Special Status
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {records.studentRegistration.orphan
                        ? "Orphan"
                        : records.studentRegistration.disabled
                        ? "Disabled"
                        : "None"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Application Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                  clipRule="evenodd"
                />
              </svg>
              Application Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 font-medium">
                  Generated ID
                </p>
                <p className="font-bold text-blue-900 dark:text-blue-300 text-lg">
                  {records.application.generatedId || "Not assigned"}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-600 dark:text-green-400 mb-1 font-medium">
                  Set Number
                </p>
                <p className="font-bold text-green-900 dark:text-green-300 text-lg">
                  {records.application.setNumber || "Not assigned"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Standard
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {records.application.standard || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Stream
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {records.application.stream || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Medium
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {records.application.medium || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Year of Study
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {records.application.yearOfStudy || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Field
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {records.application.field || "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Application Date
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(records.application.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Books Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Assigned Books
            </h3>
            {records.application.bookNumbers &&
            Object.keys(records.application.bookNumbers).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(records.application.bookNumbers).map(
                  ([book, number]) => (
                    <div
                      key={book}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                            {book}
                          </p>
                        </div>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                          #{number}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
                <svg
                  className="w-12 h-12 text-yellow-500 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  No books have been assigned yet.
                </p>
                <p className="text-yellow-600 dark:text-yellow-300 text-sm mt-1">
                  Books will appear here once assigned by an administrator.
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Book Number Search Results */}
      {bookSearchResults && bookSearchResults.results && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Book Number {bookSearchResults.bookNumber} - Search Results
            </h2>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {bookSearchResults.results.length} result(s)
            </span>
          </div>

          {bookSearchResults.results.length > 0 ? (
            <div className="space-y-6">
              {bookSearchResults.results.map((result, index) => (
                <div
                  key={result.applicationId}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Application {index + 1}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        result.status
                      )}`}
                    >
                      {result.status?.toUpperCase() || "PENDING"}
                    </span>
                  </div>

                  {/* User Information */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      User Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {result.studentDetails ? (
                        <>
                          <div>
                            <span className="text-gray-500 text-sm">Name:</span>
                            <p className="font-medium">
                              {result.studentDetails.name || "N/A"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 text-sm">
                              College:
                            </span>
                            <p className="font-medium">
                              {result.studentDetails.collegeName || "N/A"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 text-sm">
                              Course:
                            </span>
                            <p className="font-medium">
                              {result.studentDetails.courseName || "N/A"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 text-sm">
                              Contact:
                            </span>
                            <p className="font-medium">
                              {result.studentDetails.contact || "N/A"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="col-span-3 text-gray-500">
                          No student details available
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Set Details */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Set Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                          Generated ID:
                        </span>
                        <p className="font-bold text-blue-900 dark:text-blue-300">
                          {result.generatedId || "Not assigned"}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Standard:
                        </span>
                        <p className="font-medium">
                          {result.bookSet.standard || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Stream:
                        </span>
                        <p className="font-medium">
                          {result.bookSet.stream || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Matching Books */}
                  <div>
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Books with Number {bookSearchResults.bookNumber}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Array.isArray(result.matchingBooks) &&
                      result.matchingBooks.length > 0 ? (
                        result.matchingBooks.map((book, index) => (
                          <div
                            key={index}
                            className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-3 rounded-lg border"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {book}
                              </span>
                              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                                #{bookSearchResults.bookNumber}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-3 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          No matching books found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                No applications found with book number{" "}
                {bookSearchResults.bookNumber}.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Try searching with a different book number or check if the book
                has been assigned.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ViewRecords;
