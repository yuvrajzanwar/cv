import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import DisplayFlights from './components/DisplayFlights';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/display-flights" element={<DisplayFlights />} />
      </Routes>
    </Router>
  );
}

export default App;