import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Bookmark,
  Share2,
  Download,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedStatus,
  toggleLike,
  toggleSave,
} from "../Redux/Action";

const StatusViewer = () => {
  const dispatch = useDispatch();
  const { selectedStatus, filteredStatuses } = useSelector(
    (state) => state.status
  );

  const handleClose = () => {
    dispatch(setSelectedStatus(null));
  };

  const handleLike = () => {
    if (selectedStatus) {
      dispatch(toggleLike(selectedStatus.id));
    }
  };

  const handleSave = () => {
    if (selectedStatus) {
      dispatch(toggleSave(selectedStatus.id));
    }
  };

  const handleShare = async () => {
    if (!selectedStatus) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Beautiful Status",
          text: selectedStatus.text,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(
        `${selectedStatus.text}\n\n-`
      );
    }
  };

  const handleDownload = async () => {
    if (!selectedStatus) return;

    // Create a canvas to render the status
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Create gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (selectedStatus.background.includes("gradient")) {
        gradient.addColorStop(0, "#667eea");
        gradient.addColorStop(1, "#764ba2");
      } else {
        gradient.addColorStop(0, selectedStatus.background);
        gradient.addColorStop(1, selectedStatus.background);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text
      ctx.fillStyle = selectedStatus.color;
      ctx.font = `32px ${selectedStatus.font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const words = selectedStatus.text.split(" ");
      const lines = [];
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine + (currentLine ? " " : "") + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > canvas.width - 100) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      const lineHeight = 50;
      const startY = canvas.height / 2 - (lines.length * lineHeight) / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
      });

      // Download the image
      const link = document.createElement("a");
      link.download = `status-${selectedStatus.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handlePrevious = () => {
    if (!selectedStatus) return;
    const currentIndex = filteredStatuses.findIndex(
      (s) => s.id === selectedStatus.id
    );
    if (currentIndex > 0) {
      dispatch(setSelectedStatus(filteredStatuses[currentIndex - 1]));
    }
  };

  const handleNext = () => {
    if (!selectedStatus) return;
    const currentIndex = filteredStatuses.findIndex(
      (s) => s.id === selectedStatus.id
    );
    if (currentIndex < filteredStatuses.length - 1) {
      dispatch(setSelectedStatus(filteredStatuses[currentIndex + 1]));
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedStatus) return;

      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "l":
          handleLike();
          break;
        case "s":
          handleSave();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedStatus]);

  if (!selectedStatus) return null;

  const currentIndex = filteredStatuses.findIndex(
    (s) => s.id === selectedStatus.id
  );
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < filteredStatuses.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 min-h-screen z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center"
        onClick={handleClose}
        style={{
          background: "rgba(30, 34, 90, 0.25)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* Navigation Arrows */}
        {canGoPrevious && (
          <button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all z-10"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}

        {canGoNext && (
          <button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all z-10"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        )}

        {/* Close Button */}
        <button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={handleClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Status Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[95vw] max-w-[340px] h-[60vh] max-h-[440px] sm:w-[340px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{
            background: selectedStatus.background,
            fontFamily: selectedStatus.font,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Glassmorphism overlay */}
          <div
            style={{
              background: "rgba(255,255,255,0.10)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "1.25rem",
              border: "1px solid rgba(255,255,255,0.18)",
              zIndex: 2,
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />
          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* Main Text */}
            <div className="flex-1 flex items-center justify-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center leading-relaxed text-base sm:text-lg md:text-xl drop-shadow-md"
                style={{ color: selectedStatus.color }}
              >
                {selectedStatus.text}
              </motion.p>
            </div>
            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between mt-4"
            >
              <span className="text-[10px] uppercase tracking-wide bg-white/20 px-3 py-1 rounded-full text-white/90 backdrop-blur-sm">
                {selectedStatus.category}
              </span>
            </motion.div>
          </div>
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-4 right-4 flex space-x-2 opacity-100"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-colors ${selectedStatus.isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-red-500"
                }`}
            >
              <Heart
                className="w-4 h-4"
                fill={selectedStatus.isLiked ? "currentColor" : "none"}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-colors ${selectedStatus.isSaved
                  ? "bg-yellow-500 text-white"
                  : "bg-white/20 text-white hover:bg-yellow-500"
                }`}
            >
              <Bookmark
                className="w-4 h-4"
                fill={selectedStatus.isSaved ? "currentColor" : "none"}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-blue-500 flex items-center justify-center backdrop-blur-md shadow-md transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-green-500 flex items-center justify-center backdrop-blur-md shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </motion.div>
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-4 text-white/80 text-xs"
          >
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{selectedStatus.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bookmark className="w-4 h-4" />
              <span>{selectedStatus.saves}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>
                {currentIndex + 1} / {filteredStatuses.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusViewer;
