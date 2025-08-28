import React from "react";
import { useSelector } from "react-redux";
import StatusCard from "../components/StatusCard";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";

const BookmarkedStatuses = () => {
  const { statuses, activeCategory } = useSelector((state) => state.status);

  const bookmarked = statuses.filter((s) => s.isSaved);

  // Filter by activeCategory from Redux
  const filteredBookmarked =
    activeCategory === "All"
      ? bookmarked
      : bookmarked.filter((s) => s.category === activeCategory);

  const cardsPerPage = 24;
  const pageBookmarked = filteredBookmarked.slice(0, cardsPerPage);
  const emptySlots = cardsPerPage - pageBookmarked.length;

  return (
    <>
      <Header />
      <CategoryFilter />
      <section className="py-6 sm:py-8 mx-auto min-h-screen px-2 sm:px-4 md:px-24">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-pink-600">
          Bookmarked Statuses
        </h2>
        {filteredBookmarked.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No bookmarked statuses yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pageBookmarked.map((status, idx) => (
              <div key={status.id} className="flex justify-center">
                <StatusCard status={status} index={idx} />
              </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, idx) => (
              <div key={`empty-bookmarked-${idx}`} className="opacity-0">
                {/* Empty placeholder */}
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default BookmarkedStatuses;
