import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { setActiveCategory } from "../Redux/Action";
import { useNavigate } from "react-router-dom";

const CategoryFilter = () => {
  const dispatch = useDispatch();

  const categories = Array.isArray(rawCategories) ? rawCategories : [];
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {

  };

  const handleWheel = (e) => {
    if (e.shiftKey && scrollRef.current && e.currentTarget.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation(); // Prevent scroll event from bubbling up
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full bg-white sticky top-16 z-40 mx-auto px-2 sm:px-4 md:px-12 lg:px-24 py-2 sm:py-4 border-dashed border-b-2 border-pink-500">
      <div className="w-full mx-auto py-2 sm:py-4">
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2"
          ref={scrollRef}
          onWheel={handleWheel}
          tabIndex={0}
          aria-label="Category list, scrollable horizontally with Shift+Wheel"
        >
          {categories.length === 0 ? (
            <span className="text-gray-400 px-4">No categories found.</span>
          ) : (
            categories.map((category) => (
              <a
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap mt-2 text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-600 "
                }`}
              >
                {category}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
