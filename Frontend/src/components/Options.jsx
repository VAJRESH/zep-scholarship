import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "./ui";

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
    <div className="max-w-2xl mx-auto mt-12">
      <Card
        title="Select Scholarship Option"
        subtitle="Please select one of the following scholarship options to apply for"
        shadow="lg"
        padding="large"
        rounded="lg"
      >
        <div className="space-y-4">
          <Button
            onClick={handleSchoolFees}
            variant="secondary"
            fullWidth
            size="large"
            className="text-left"
          >
            <div>
              <span className="font-medium text-lg">Apply for School Fees</span>
              <p className="text-gray-500 mt-1">
                Financial support for tuition and educational expenses
              </p>
            </div>
          </Button>

          <Button
            onClick={handleTravelExpenses}
            variant="secondary"
            fullWidth
            size="large"
            className="text-left"
          >
            <div>
              <span className="font-medium text-lg">
                Apply for Travel Expenses
              </span>
              <p className="text-gray-500 mt-1">
                Support for commuting and transportation costs
              </p>
            </div>
          </Button>

          <Button
            onClick={handleStudyBooks}
            variant="secondary"
            fullWidth
            size="large"
            className="text-left"
          >
            <div>
              <span className="font-medium text-lg">Apply for Study Books</span>
              <p className="text-gray-500 mt-1">
                Support for textbooks and study materials
              </p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Options;
