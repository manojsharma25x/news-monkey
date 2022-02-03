import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  page = 12;
  // apiKey = process.env.REACT_APP_NEWS_API_KEY
  apiKey = "af9c5e9a47404860b2369577054801b5"
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#DC3545" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              key="general"
              element={
                <News setProgress={this.setProgress} apiKey={this.apiKey} 
                  pageSize={this.page}
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
                <News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.page} country="in" category="business" />
              }
            ></Route>
            <Route
              exact
              path="/entertainment"
              element={
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.page}
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
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.page}
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
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.page}
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
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.page}
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
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.page}
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
  }
}
