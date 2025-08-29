import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, Heart, Bookmark, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { setActiveCategory } from "../Redux/Action";

const Header = () => {
  const dispatch = useDispatch();
  const { categories, activeCategory } = useSelector((state) => state.status);
  const statuses = useSelector((state) => state.status.statuses);

  const likedCount = statuses.filter((s) => s.isLiked).length;
  const bookmarkedCount = statuses.filter((s) => s.isSaved).length;

  const [searchValue, setSearchValue] = React.useState("");
  const [showCatDropdown, setShowCatDropdown] = React.useState(false);
  const [filteredCats, setFilteredCats] = React.useState([]);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Update filteredCats when searchValue changes
  React.useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredCats([]);
      setShowCatDropdown(false);
      return;
    }
    const filtered = (categories || [])
      .filter(
        (cat) =>
          cat.toLowerCase() !== "all" &&
          cat.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    setFilteredCats(filtered);
    setShowCatDropdown(filtered.length > 0);
  }, [searchValue, categories]);

  // Handle selecting a category from dropdown or pressing Enter
  const handleCategorySelect = (cat) => {
    dispatch(setActiveCategory(cat));
    setSearchValue("");
    setShowCatDropdown(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Enter key in search bar
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && filteredCats.length > 0) {
      handleCategorySelect(filteredCats[0]);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white px-2 sm:px-4 md:px-12 lg:px-24">
      <div className="w-full mx-auto">
        {/* MOBILE: logo + menu button row, then search bar below */}
        <div className="flex flex-col md:flex-row items-center justify-between h-auto sm:h-16 py-2 sm:py-0 gap-3 sm:gap-0">
          {/* Top row for mobile: logo and menu button */}
          <div className="flex w-full md:w-auto items-center justify-between md:justify-start mb-2 sm:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-2xl sm:text-3xl">
                  S
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-pink-600 bg-clip-text text-transparent select-none">
                <Link to={"/"}>Status</Link>
              </h1>
            </div>
            {/* Hamburger Menu Button (Mobile/Tablet) */}
            <button
              className="md:hidden flex items-center justify-center p-2 rounded-full bg-pink-50 hover:bg-pink-100 transition ml-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              {menuOpen ? (
                <X className="w-7 h-7 text-pink-600" />
              ) : (
                <Menu className="w-7 h-7 text-pink-600" />
              )}
            </button>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-pink-500 font-medium text-sm sm:text-base">
            <Link to={"/"} className="hover:text-pink-700 transition">
              Home
            </Link>
            <Link to={"/about"} className="hover:text-pink-700 transition">
              About
            </Link>
            <Link to={"/contact"} className="hover:text-pink-700 transition">
              Contact
            </Link>
            <Link to={"/faq"} className="hover:text-pink-700 transition">
              FAQ
            </Link>
          </div>
          {/* Search Bar - always below logo/menu on mobile, inline on desktop */}
          <div className="w-full sm:flex-1 max-w-full sm:max-w-md mx-0 sm:mx-4 mb-2 sm:mb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowCatDropdown(filteredCats.length > 0)}
                onBlur={() => setTimeout(() => setShowCatDropdown(false), 100)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search statuses, categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 text-sm sm:text-base transition"
              />
              {/* Category Suggestions Dropdown */}
              {showCatDropdown && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-auto">
                  {filteredCats.map((cat) => (
                    <div
                      key={cat}
                      onMouseDown={() => handleCategorySelect(cat)}
                      className="px-4 py-2 hover:bg-pink-100 cursor-pointer text-gray-700"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/create"
              className="flex items-center space-x-2 bg-pink-600 text-white px-3 sm:px-4 py-2 rounded-full hover:shadow-lg transition text-sm sm:text-base font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
            </Link>
            <Link to="/liked" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {likedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                    {likedCount}
                  </span>
                )}
              </motion.div>
            </Link>
            <Link to="/bookmarked" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                    {bookmarkedCount}
                  </span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="exit"
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-full bg-white z-[999] shadow-2xl flex flex-col items-center justify-center px-6 py-8"
            style={{ minWidth: 220 }}
          >
            <div className="flex items-center justify-between w-full max-w-xs mx-auto mb-8">
              <span className="text-2xl font-bold text-pink-600">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-pink-100 transition"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-pink-600" />
              </button>
            </div>
            <div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-2">
              <Link
                to="/"
                className="py-3 px-2 text-lg font-medium text-gray-700 hover:text-pink-600 transition w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="py-3 px-2 text-lg font-medium text-gray-700 hover:text-pink-600 transition w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="py-3 px-2 text-lg font-medium text-gray-700 hover:text-pink-600 transition w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="py-3 px-2 text-lg font-medium text-gray-700 hover:text-pink-600 transition w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                FAQ
              </Link>
              {/* <Link
                to="/create"
                className="mt-6 flex items-center space-x-2 bg-pink-600 text-white px-4 py-3 rounded-full hover:shadow-lg transition text-base font-semibold w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                <Plus className="w-5 h-5" />
                <span>Create</span>
              </Link> */}
              <div className="flex items-center justify-between mt-8 w-full">
                <Link
                  to="/liked"
                  className="relative flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  <span>Liked</span>
                  {likedCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                      {likedCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/bookmarked"
                  className="relative flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <Bookmark className="w-5 h-5" />
                  <span>Bookmarked</span>
                  {bookmarkedCount > 0 && (
                    <span className="ml-1 bg-yellow-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                      {bookmarkedCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Overlay for menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[998]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;

