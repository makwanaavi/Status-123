import React from "react";
import { useSelector } from "react-redux";
import StatusCard from "../components/StatusCard";
import CategoryFilter from "../components/CategoryFilter";

const LikedStatuses = () => {
  const { statuses, activeCategory } = useSelector((state) => state.status);

  const liked = statuses.filter((s) => s.isLiked);

  // Filter by activeCategory from Redux
  const filteredLiked =
    activeCategory === "All"
      ? liked
      : liked.filter((s) => s.category === activeCategory);

  const cardsPerPage = 24;
  const pageLiked = filteredLiked.slice(0, cardsPerPage);
  const emptySlots = cardsPerPage - pageLiked.length;

  return (
    <>
      <CategoryFilter />
      <section className="py-6 sm:py-8 min-h-screen px-2 sm:px-4 md:px-24">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-pink-600">
          Liked Statuses
        </h2>
        {filteredLiked.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No liked statuses yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pageLiked.map((status, idx) => (
              <div key={status.id} className="flex justify-center">
                <StatusCard status={status} index={idx} />
              </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, idx) => (
              <div key={`empty-liked-${idx}`} className="opacity-0">
                {/* Empty placeholder */}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default LikedStatuses;
