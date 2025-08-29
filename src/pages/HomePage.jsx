import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import StatusGrid from "../components/StatusGrid";
import StatusViewer from "../components/StatusViewer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      aria-label="Home Page"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Ensure Redux Provider wraps this component and categories exist in state */}
      <CategoryFilter onCategorySelect={handleCategorySelect} />
      <StatusGrid />
      <StatusViewer />
    </div>
  );
};

export default HomePage;
