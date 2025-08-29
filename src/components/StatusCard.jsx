import React from "react";
import { Heart, Bookmark, Share2, Download, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleLike, toggleSave } from "../Redux/Action";
import { useNavigate } from "react-router-dom";

const StatusCard = ({ status }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(toggleLike(status.id));
  };

  const handleSave = (e) => {
    e.stopPropagation();
    dispatch(toggleSave(status.id));
  };

  const handleView = () => {
    navigate(`/edit/${status.category}`, { state: { status } });
  };

  const colors = [
    "#F8BBD0", // Light Pink
    // "#E1BEE7", // Lavender
    // "#BBDEFB", // Light Blue
    // "#B2EBF2", // Aqua Blue
    // "#C8E6C9", // Light Green
    // "#DCEDC8", // Pale Green
    // "#FFF9C4", // Light Yellow
    // "#FFECB3", // Light Amber
    // "#FFE0B2", // Light Orange
    // "#FFCCBC", // Peach
    // "#D7CCC8", // Beige
    // "#F5F5F5", // Light Grey
    // "#E0F7FA", // Cyan Tint
    // "#F1F8E9", // Mint Green
    // "#F9FBE7", // Lemon Tint
    // "#FFF3E0", // Cream Orange
    // "#F3E5F5", // Light Purple
    // "#EDE7F6", // Soft Violet
    // "#E8EAF6", // Pale Indigo
    // "#ECEFF1", // Cool Grey
  ];

  // Pick a random background color for each card instance
  const [bgColor] = React.useState(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  // Simple color logic for text and avatar
  const textColor = "#222";
  const avatarColor = "#ec4899";

  // Responsive card size
  const [cardSize, setCardSize] = React.useState({ width: 160, height: 220 });

  React.useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1850) setCardSize({ width: 340, height: 400 });
      else if (w >= 1600) setCardSize({ width: 340, height: 400 });
      else if (w >= 1200) setCardSize({ width: 340, height: 400 });
      else if (w >= 900) setCardSize({ width: 340, height: 400 });
      else if (w >= 640) setCardSize({ width: 340, height: 400 });
      else setCardSize({ width: 340, height: 400 });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dummy handlers for share/download
  const handleShare = (e) => {
    e.stopPropagation();
    // Implement share logic if needed
  };
  const handleDownload = (e) => {
    e.stopPropagation();
    // Implement download logic if needed
  };

  return (
    <div
      className="group cursor-pointer h-full w-full flex flex-col items-center relative mx-auto"
      // Added mx-auto for horizontal centering, removed any margin classes
      onClick={handleView}
      style={{
        zIndex: 0,
        width: cardSize.width,
        height: cardSize.height,
      }}
    >
      <div className="flex-1 flex flex-col w-full h-full">
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 w-full h-full"
          style={{
            background: bgColor,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Floating Avatar */}
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 shadow-lg bg-black"
            style={{
              color: avatarColor,
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #ec4899",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            <User className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between z-10">
            {/* Main Text */}
            <div className="flex-1 flex items-center justify-center">
              <p
                className="text-center leading-relaxed drop-shadow-md"
                style={{
                  color: textColor,
                  fontSize: "clamp(16px, 2.5vw, 22px)",
                  textAlign: status.text.length > 100 ? "left" : "center",
                  textShadow: bgColor
                    ? "0 2px 8px rgba(0,0,0,0.25)"
                    : "0 2px 8px rgba(255,255,255,0.25)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  lineHeight: 1.5,
                  marginTop: 32,
                }}
              >
                {status.text}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] uppercase tracking-wide bg-pink-500 px-3 py-1 rounded-full text-white/90 backdrop-blur-sm">
                {status.category}
              </span>
            </div>
          </div>

          {/* Unique Docked Hover Actions */}
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 z-30 w-fit">
            <div className="dock-actions opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center gap-2 px-4 py-2 rounded-full glass-dock">
              <button
                title={status.isLiked ? "Unlike" : "Like"}
                onClick={handleLike}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110
                  ${
                    status.isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white text-red-500"
                  }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={status.isLiked ? "currentColor" : "none"}
                />
              </button>
              <button
                title={status.isSaved ? "Unsave" : "Save"}
                onClick={handleSave}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110
                  ${
                    status.isSaved
                      ? "bg-yellow-500 text-white"
                      : "bg-white text-yellow-500"
                  }`}
              >
                <Bookmark
                  className="w-5 h-5"
                  fill={status.isSaved ? "currentColor" : "none"}
                />
              </button>
              <button
                title="Share"
                onClick={handleShare}
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 bg-white text-blue-500"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                title="Download"
                onClick={handleDownload}
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 bg-green-500 text-white"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glass-dock {
          background: rgba(255,255,255,0.18);
          box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.10);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.18);
        }
        `}
      </style>
    </div>
  );
};

export default StatusCard;
