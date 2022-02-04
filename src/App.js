import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";

const App = () => {
  const page = 12;
  // apiKey = process.env.REACT_APP_NEWS_API_KEY
  const apiKey = "af9c5e9a47404860b2369577054801b5";
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color="#DC3545" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            key="general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={page}
                key="general"
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            key="business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={page}
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={page}
                key="entertainment"
                country="in"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={page}
                key="health"
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={page}
                key="science"
                country="in"
                category="science"
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={page}
                key="sports"
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={page}
                key="technology"
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;
