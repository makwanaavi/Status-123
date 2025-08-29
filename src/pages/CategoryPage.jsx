import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../Redux/Action";
import CategoryFilter from "../components/CategoryFilter";
import StatusGrid from "../components/StatusGrid";
import StatusViewer from "../components/StatusViewer";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.status);

  useEffect(() => {
    if (category && activeCategory !== category) {
      dispatch(setActiveCategory(category));
    }
  }, [category, activeCategory, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryFilter />
      <StatusGrid />
      <StatusViewer />
    </div>
  );
};

export default CategoryPage;
