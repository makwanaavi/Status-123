
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Type, Palette, Image, Download, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CATEGORIES = [
  "All",
  "Love",
  "Motivational",
  "Sad",
  "Funny",
  "Life",
  "Friendship",
  "Success",
  "Travel",
  "Nature",
  "Wisdom",
  "Happiness",
  "Dreams",
  "Faith",
  "Family",
  "Attitude",
  "Birthday",
  "Good Morning",
  "Good Night",
  "Festival",
  "Fashion",
  "Sports",
  "Music",
  "Food",
  "Technology",
];

const StatusEditor = ({ page = "create" }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const statuses = useSelector((state) => state.status.statuses);
  const {
    text,
    font,
    fontSize,
    color,
    background,
    alignment,
    availableFonts,
    availableBackgrounds,
    isEditorOpen,
  } = useSelector((state) => state.editor);

  const [category, setCategory] = useState(CATEGORIES[1]);
  const [alignX, setAlignX] = useState(50); // 0 = left, 100 = right
  const [alignY, setAlignY] = useState(50); // 0 = top, 100 = bottom

  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isRoute = true; // Always true for route usage

  const handleClose = () => {
    navigate(-1);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const size = 800;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    // Draw background
    ctx.clearRect(0, 0, size, size);

    // Create a temporary div to render the gradient background
    // Since canvas can't use CSS gradients directly, use a workaround
    // We'll use a linear gradient for the background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    // Parse the gradient colors from the background string
    const match = background.match(/linear-gradient\(135deg, (.+?) (\d+%)?, (.+?) (\d+%)?\)/);
    if (match) {
      gradient.addColorStop(0, match[1]);
      gradient.addColorStop(1, match[3]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    } else {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, size, size);
    }

    // Draw text
    ctx.font = `${fontSize * 2}px "${font}"`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.textBaseline = "middle";

    // Calculate position
    let x = size * (alignX / 100);
    let y = size * (alignY / 100);

    // Handle multi-line text
    const lines = text.split("\n");
    const lineHeight = fontSize * 2 * 1.3;
    const totalHeight = lines.length * lineHeight;
    y = y - totalHeight / 2 + lineHeight / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, x, y + i * lineHeight);
    });

    // Download image
    const link = document.createElement("a");
    link.download = "status.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const editorContent = (
    <div
      className={`w-full flex flex-col md:flex-row items-center justify-center ${
        page ? "min-h-[70vh]  mx-auto my-8" : "h-full"
      }`}
    >
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-1 sm:p-2 md:p-4">
        <div
          className={`relative w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl aspect-square rounded-2xl overflow-hidden shadow-2xl ${
            page ? "border border-gray-200 bg-white" : ""
          }`}
          style={{ background, fontFamily: font }}
        >
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          <div className="relative h-full p-4 sm:p-8 flex items-center justify-center">
            {/* Textarea with absolute positioning based on alignX/alignY */}
            <div
              style={{
                position: "absolute",
                left: `${alignX}%`,
                top: `${alignY}%`,
                transform: "translate(-50%, -50%)",
                width: "calc(100% - 4rem)",
                maxWidth: "100%",
                height: "auto",
                maxHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
            >
              <textarea
                value={text}
                onChange={(e) => dispatch(setText(e.target.value))}
                placeholder="Start typing your status..."
                className={`w-full bg-transparent border-none outline-none resize-none placeholder-white/50`}
                style={{
                  color,
                  fontSize: `clamp(14px, ${fontSize}px, 32px)`,
                  textAlign: alignment,
                  fontFamily: font,
                  overflow: "hidden",
                  minHeight: "60px",
                  maxHeight: "300px",
                  padding: 0,
                  margin: 0,
                  background: "transparent",
                  wordBreak: "break-word",
                }}
                rows={3}
                maxLength={300}
              />
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
      {/* Editor Panel */}
      <div
        initial={page ? false : { x: 400, opacity: 0 }}
        animate={page ? false : { x: 0, opacity: 1 }}
        exit={page ? false : { x: 400, opacity: 0 }}
        className={`w-[50%] bg-white shadow-2xl flex flex-col ${
          page ? "rounded-2xl border border-gray-200 mt-6 md:mt-0 md:ml-8" : ""
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Status Editor
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Tools */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          {/* Category Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <span>Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {CATEGORIES.filter((cat) => cat !== "All").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Font Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Type className="w-4 h-4" />
              <span>Font</span>
            </label>
            <select
              value={font}
              onChange={(e) => dispatch(setFont(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {availableFonts.map((fontName) => (
                <option
                  key={fontName}
                  value={fontName}
                  style={{ fontFamily: fontName }}
                >
                  {fontName}
                </option>
              ))}
            </select>
          </div>
          {/* Font Size */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="48"
              value={fontSize}
              onChange={(e) => dispatch(setFontSize(Number(e.target.value)))}
              className="w-full"
            />
          </div>
          {/* Text Color */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Palette className="w-4 h-4" />
              <span>Text Color</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={color}
                onChange={(e) => dispatch(setColor(e.target.value))}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => dispatch(setColor(e.target.value))}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder="#ffffff"
              />
            </div>
          </div>
          {/* Text Alignment */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Text Alignment
            </label>
            <div className="flex space-x-2 mb-2">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  onClick={() => dispatch(setAlignment(align))}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    alignment === align
                      ? "bg-purple-100 text-purple-700"
                      : " text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-500">
                  Horizontal: {alignX}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alignX}
                  onChange={(e) => setAlignX(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <span className="text-xs text-gray-500">
                  Vertical: {alignY}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alignY}
                  onChange={(e) => setAlignY(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/* Background Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Image className="w-4 h-4" />
              <span>Background</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableBackgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(setBackground(bg))}
                  className={`w-full h-12 rounded-lg border-2 transition-all ${
                    background === bg ? "" : ""
                  }`}
                  style={{ background: bg }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-gray-200 space-y-2 sm:space-y-3">
          <button
            disabled={!text.trim()}
            onClick={handleDownload}
            className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            disabled={!text.trim()}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 className="w-4 h-4" />
            <span>Save & Share</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isRoute && page) {
    // Render as a page (no modal, no AnimatePresence)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header and Footer will be rendered by parent (App.jsx) */}
        <main className="flex-1 flex items-center justify-center">
          {editorContent}
        </main>
      </div>
    );
  }

  // Modal overlay for popup mode
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 backdrop-blur-sm"
      >
        {editorContent}
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusEditor;
