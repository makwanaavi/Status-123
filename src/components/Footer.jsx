import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";
import { setActiveCategory } from "../Redux/Action";

const Footer = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.status);

  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "About Us", "Contact Us", "FAQs"],
    },
  ];

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-pink-100 via-white to-purple-100 shadow-2xl mt-24">
      {/* Wave SVG Divider */}
      <div className="absolute top-0 left-0 w-full -translate-y-full pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-24"
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="#f472b6"
            fillOpacity="0.2"
          />
        </svg>
      </div>
      <div className="relative z-10 px-2 sm:px-6 md:px-24 py-8 sm:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-20 py-8 md:py-12 border-b border-gray-200 text-gray-600">
          {/* Logo and About */}
          <div className="flex flex-col gap-4 items-start mb-10 md:mb-0 max-w-xs">
            <div className="flex items-center mb-2 sm:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-3xl">S</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-pink-600 bg-clip-text text-transparent select-none">
                  <Link to={"/"}>Status</Link>
                </h1>
              </div>
            </div>
            <p className="text-base text-gray-500 mb-8">
              Discover, create, and share the best status updates for every mood
              and moment.
            </p>
          </div>
          {/* Links & Categories */}
          <div className="flex flex-1 flex-col sm:flex-row gap-8 md:gap-12 w-full md:w-auto">
            {/* Quick Links */}
            <nav aria-label="Quick Links" className="min-w-[150px]">
              <h3 className="font-bold text-lg text-gray-900 mb-4 tracking-wide">
                Quick Links
              </h3>
              <ul className="text-base space-y-3">
                <li>
                  <Link
                    to="/"
                    className="hover:underline hover:text-pink-600 transition font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:underline hover:text-pink-600 transition font-medium"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:underline hover:text-pink-600 transition font-medium"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:underline hover:text-pink-600 transition font-medium"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Categories */}
            <nav aria-label="Categories" className="min-w-[100px]">
              <h3 className="font-bold text-lg text-gray-900 mb-4 tracking-wide">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories
                  .filter((cat) => cat !== "All")
                  .map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className="px-4 py-1 rounded-full bg-pink-500 text-white font-medium text-sm 
                   shadow-md border border-pink-300
                
                   transition-all duration-300 ease-in-out"
                    >
                      {cat}
                    </button>
                  ))}
              </div>
            </nav>
            {/* Socials */}
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <p className="py-8 text-center text-base md:text-lg text-gray-600 font-semibold tracking-wide">
            © 2025 Status. All Rights Reserved.
          </p>
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-pink-100 hover:text-pink-600 transition text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-blue-100 hover:text-blue-400 transition text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-blue-100 hover:text-blue-700 transition text-xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-red-100 hover:text-red-600 transition text-xl"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
