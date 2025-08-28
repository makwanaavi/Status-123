import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./Redux/Store";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import StatusGrid from "./components/StatusGrid";
import StatusViewer from "./components/StatusViewer";
import StatusEditor from "./components/StatusEditor";
import { setStatuses } from "./Redux/Action";
import { mockStatuses } from "./data/data";
import About from "./About";
import FAQ from "./FQA";
import Contact from "./Contact";
import LikedStatuses from "./pages/LikedStatuses";
import BookmarkedStatuses from "./pages/BookmarkedStatuses";
import Footer from "./components/Footer";
import useLenis from "./components/useLenis";

const App = () => {
  useLenis();
  useEffect(() => {
    // Only set mockStatuses if there is no persisted state
    const persisted = localStorage.getItem("reduxState");
    if (!persisted) {
      store.dispatch(setStatuses(mockStatuses));
    }
  }, []);

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryFilter />
      <StatusGrid />
      <StatusViewer />
      <Footer />
    </div>
  );

  return (
    <Provider store={store}>
      <Router>
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
                <Header />
                <StatusEditor fullPage={true} />
                <Footer />
              </div>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <div className="">
                <Header />
                <StatusEditor fullPage={true} />
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
