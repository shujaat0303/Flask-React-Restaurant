import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import Edit from './routes/Edit';


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />

          
        </Routes>
      </Router>
    );
  }
}

export default App;
