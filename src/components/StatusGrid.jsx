import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatusCard from "./StatusCard";
import { useParams } from "react-router-dom";
import { setActiveCategory } from "../Redux/Action";

const StatusGrid = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { statuses, activeCategory } = useSelector((state) => state.status);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sync category from URL to Redux state
  useEffect(() => {
    if (category && activeCategory !== category) {
      dispatch(setActiveCategory(category));
    }
    // If no category in URL, you may want to reset to "All"
    if (!category && activeCategory !== "All") {
      dispatch(setActiveCategory("All"));
    }
    // eslint-disable-next-line
  }, [category]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1850) {
        setItemsPerPage(18);
      } else if (window.innerWidth >= 1600) {
        setItemsPerPage(16);
      } else if (window.innerWidth >= 1550) {
        setItemsPerPage(14);
        
      } else if (window.innerWidth >= 1450) {
        setItemsPerPage(12);
      } else if (window.innerWidth >= 1024) {
        setItemsPerPage(11);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(12);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredStatuses =
    activeCategory === "All"
      ? statuses
      : statuses.filter((s) => s.category === activeCategory);

  const totalPages = Math.ceil(filteredStatuses.length / itemsPerPage);

  const pageStatuses = filteredStatuses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const emptySlots = itemsPerPage - pageStatuses.length;

  return (
    <section
      className="py-4 sm:py-8 px-1 sm:px-2 md:px-4 max-w-full mx-auto relative"
      style={{
        overflow: "hidden",
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-4 sm:gap-8 md:gap-10 
          relative z-10
        "
      >
        {pageStatuses.map((status, index) => (
          <StatusCard key={status.id} status={status} index={index} />
        ))}
        {/* Empty slots to fill up the grid */}
        {Array.from({ length: emptySlots }).map((_, idx) => (
          <div key={`empty-${idx}`} className="opacity-0" />
        ))}
      </div>

      {filteredStatuses.length > itemsPerPage && (
        <div className="flex flex-col items-center mt-8 space-y-4">
          <div className="flex justify-center items-center space-x-12">
            <button
              className="px-4 py-2 rounded text-white bg-pink-500 font-medium disabled:opacity-50 mt-12"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="px-2 text-gray-700 mt-12">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded text-white bg-pink-500 font-medium disabled:opacity-50 mt-12"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          {/* Numbered page buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded-full border text-sm font-semibold transition-colors ${
                  page === i + 1
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-pink-500 border-gray-300 hover:bg-pink-100"
                }`}
                onClick={() => setPage(i + 1)}
                disabled={page === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredStatuses.length === 0 && (
        <div className="text-center py-16 sm:py-20">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl sm:text-3xl">🔍</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            No statuses found
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Try adjusting your search or browse different categories
          </p>
        </div>
      )}
      <style>
        {`
        @keyframes bg-move {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        `}
      </style>
    </section>
  );
};

export default StatusGrid;

