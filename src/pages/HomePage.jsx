import React from "react";
import CategoryFilter from "../components/CategoryFilter";
import StatusGrid from "../components/StatusGrid";
import StatusViewer from "../components/StatusViewer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ensure Redux Provider wraps this component and categories exist in state */}
      <CategoryFilter />
      <StatusGrid />
      <StatusViewer />
    </div>
  );
};

export default HomePage;
