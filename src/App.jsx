import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./Redux/Store";
import StatusEditor from "./components/StatusEditor";
import { setStatuses } from "./Redux/Action";
import { mockStatuses } from "./data/data";
import LikedStatuses from "./pages/LikedStatuses";
import BookmarkedStatuses from "./pages/BookmarkedStatuses";
import useLenis from "./components/useLenis";
import About from "./pages/About";
import FAQ from "./pages/FQA";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  useLenis();
  useEffect(() => {
    // Only set mockStatuses if there is no persisted state
    const persisted = localStorage.getItem("reduxState");
    if (!persisted) {
      store.dispatch(setStatuses(mockStatuses));
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/liked" element={<LikedStatuses />} />
        <Route path="/bookmarked" element={<BookmarkedStatuses />} />
        <Route
          path="/create"
          element={
            <div className="">
              <StatusEditor page="create" />
            </div>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <div className="">
              <StatusEditor page="edit" />
            </div>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
