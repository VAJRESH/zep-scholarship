import React from "react";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const navigate = useNavigate();

  const handleSchoolFees = () => {
    navigate("/apply/school-fees");
  };

  const handleTravelExpenses = () => {
    navigate("/apply/travel-expenses");
  };

  const handleStudyBooks = () => {
    navigate("/apply/study-books");
  };

  return (
    <div className="options-container">
      <h2>Select Scholarship Option</h2>
      <p>
        Please select one of the following scholarship options to apply for:
      </p>
      <button onClick={handleSchoolFees}>Apply for School Fees</button>
      <button onClick={handleTravelExpenses}>Apply for Travel Expenses</button>
      <button onClick={handleStudyBooks}>Apply for Study Books</button>
    </div>
  );
};

export default Options;
