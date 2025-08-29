import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatusEditor from "./components/StatusEditor";
import LikedStatuses from "./pages/LikedStatuses";
import BookmarkedStatuses from "./pages/BookmarkedStatuses";
import About from "./pages/About";
import FAQ from "./pages/FQA";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/liked" element={<LikedStatuses />} />
          <Route path="/bookmarked" element={<BookmarkedStatuses />} />
          <Route path="/create" element={<StatusEditor page="create" />} />
          <Route path="/edit/:category" element={<StatusEditor page="edit" />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;

// use this  whole project and make simple and easy to use with good for beginner development
// make fully simple all redux
// make fully simple all redux
// make fully simple all redux
