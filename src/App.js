
import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  page=12;
  render() {
    return <div>
      
        
        <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" key="general" element={<News pageSize={this.page} key="general" country="in" category="general" />} ></Route>
          <Route exact path="/business" key="business" element={<News pageSize={this.page} country="in" category="business" />} ></Route>
          <Route exact path="/entertainment" element={<News pageSize={this.page} key="entertainment" country="in" category="entertainment" />}></Route>
          <Route exact path="/health" element={<News pageSize={this.page} key="health" country="in" category="health" />}></Route>
          <Route exact path="/science" element={<News pageSize={this.page} key="science" country="in" category="science" />}></Route>
          <Route exact path="/sports" element={<News pageSize={this.page} key="sports" country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News pageSize={this.page} key="technology" country="in" category="technology" />}></Route>
        </Routes>
      </Router>
    </div>;
  }
}

