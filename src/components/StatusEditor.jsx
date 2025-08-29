import React, { useState, useRef } from "react";
import { X, Type, Palette, Image, Download, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

const availableFonts = [
  "Inter",
  "Playfair Display",
  "Montserrat",
  "Roboto",
  "Open Sans",
  "Poppins",
  "Lora",
  "Merriweather",
  "Source Sans Pro",
  "Raleway",
  "Nunito",
  "Ubuntu",
  "Dancing Script",
  "Pacifico",
  "Caveat",
];

const availableBackgrounds = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
];

const StatusEditor = ({ page = "create" }) => {
  const { id } = useParams();
  const statuses = useSelector((state) => state.status.statuses);

  // If editing, load the status; otherwise, use defaults
  const editingStatus =
    page === "edit" && id
      ? statuses.find((s) => String(s.id) === String(id))
      : null;

  const [text, setText] = useState(editingStatus ? editingStatus.text : "");
  const [font, setFont] = useState(
    editingStatus ? editingStatus.font || "Inter" : "Inter"
  );
  const [fontSize, setFontSize] = useState(
    editingStatus ? editingStatus.fontSize || 24 : 24
  );
  const [color, setColor] = useState(
    editingStatus ? editingStatus.color || "#ffffff" : "#ffffff"
  );
  const [background, setBackground] = useState(
    editingStatus
      ? editingStatus.background || availableBackgrounds[0]
      : availableBackgrounds[0]
  );
  const [alignment, setAlignment] = useState(
    editingStatus ? editingStatus.alignment || "center" : "center"
  );
  const [category, setCategory] = useState(
    editingStatus ? editingStatus.category : CATEGORIES[1]
  );
  const [alignX, setAlignX] = useState(50);
  const [alignY, setAlignY] = useState(50);

  const canvasRef = useRef(null);
  const navigate = useNavigate();

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
                onChange={(e) => setText(e.target.value)}
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
              onChange={(e) => setFont(e.target.value)}
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
              onChange={(e) => setFontSize(Number(e.target.value))}
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
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
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
                  onClick={() => setAlignment(align)}
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
                  onClick={() => setBackground(bg)}
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        {editorContent}
      </main>
    </div>
  );
};

export default StatusEditor;
