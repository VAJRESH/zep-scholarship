import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui";

const Options = () => {
  const navigate = useNavigate();

  // Custom SVG icons
  const icons = {
    schoolFees: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
    travelExpenses: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 6v12M4 10h16"></path>
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      </svg>
    ),
    studyBooks: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
      </svg>
    ),
    arrowRight: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    ),
  };

  const scholarshipOptions = [
    {
      title: "Apply for School Fees",
      description: "Financial support for tuition and educational expenses",
      icon: icons.schoolFees,
      path: "/apply/school-fees",
      color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
    },
    {
      title: "Apply for Travel Expenses",
      description: "Support for commuting and transportation costs",
      icon: icons.travelExpenses,
      path: "/apply/travel-expenses",
      color:
        "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/50",
    },
    {
      title: "Apply for Study Books",
      description: "Support for textbooks and study materials",
      icon: icons.studyBooks,
      path: "/apply/study-books",
      color:
        "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/50",
    },
  ];

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <Card
        title="Select Scholarship Option"
        subtitle="Please select one of the following scholarship options to apply for"
        shadow="xl"
        padding="large"
        rounded="xl"
        className="border border-gray-200 dark:border-gray-700 max-w-full"
      >
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {scholarshipOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => navigate(option.path)}
              className={`cursor-pointer p-5 rounded-lg ${option.color} ${option.hoverColor} transition-all duration-200 transform hover:scale-[1.02] border border-transparent hover:border-opacity-50 hover:border-current flex flex-col h-full`}
            >
              <div className="p-3 rounded-full bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 self-start mb-3">
                {option.icon}
              </div>
              <h3 className="font-semibold text-lg">{option.title}</h3>
              <p className="mt-2 opacity-80 flex-grow">{option.description}</p>
              <div className="mt-4 self-end">{icons.arrowRight}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Need help choosing? Contact student support at support@university.edu
        </div>
      </Card>
    </div>
  );
};

export default Options;
