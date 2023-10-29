import React, { useState, useEffect } from 'react';
import '../styles/homePage_style.css';
import citiesData from '../data/flight_search.json'; // Import the JSON data
import { Link } from "react-router-dom";

const HomePage = () => {

  var today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const [tripType, setTripType] = useState('one-way'); // Default to one-way
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState(date);
  const [returnDate, setReturnDate] = useState('');
  const [numTravelers, setNumTravelers] = useState(1);
  const [selectedClass, setSelectedClass] = useState('economy');
  const [attemptedSearch, setAttemptedSearch] = useState(false);

  // Populate the dropdown menus with city data from the JSON
  useEffect(() => {
    setFromCity(citiesData.Response.Origin); // Set the "From City" based on the JSON data
    setToCity(citiesData.Response.Destination); // Set the "To City" based on the JSON data
  }, []);

  const isSearchCriteriaValid = () => {
    if (tripType === 'round-trip') {
      return fromCity && toCity && departureDate && returnDate && numTravelers > 0;
    } else {
      return fromCity && toCity && departureDate && numTravelers > 0;
    }
  };

  const handleSearch = () => {
    setAttemptedSearch(true);
    // You can add additional logic here if needed
  };

  return (
    <div>
      <div className="title-bar">
        Flight Booking
      </div>
      <div className="booking-options">
      <div className="trip-type">
          <label>
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === 'one-way'}
              onChange={() => setTripType('one-way')}
            />
            One Way
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={tripType === 'round-trip'}
              onChange={() => setTripType('round-trip')}
            />
            Round Trip
          </label>
        </div>
        <div className="booking-details">
          <label>
            From City:
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value={citiesData.Response.Origin}>
                {citiesData.Response.Origin}
              </option>
            </select>
          </label>
          <label>
            To City:
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            >
              <option value={citiesData.Response.Destination}>
                {citiesData.Response.Destination}
              </option>
            </select>
          </label>
          <label>
            Departure Date:
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={date}
            />
          </label>
          {tripType === 'round-trip' && (
            <label>
              Return Date:
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departureDate}
              />
            </label>
          )}
          <label>
            Number of Travelers:
            <input
              type="number"
              value={numTravelers}
              min={1}
              max={9}
              onChange={(e) => setNumTravelers(e.target.value)}
            />
          </label>
          <label>
            Class:
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </select>
          </label>
        </div>
        <div className="search-button">
          {/* <Link to='/display-flights'> */}
          <Link to={`/display-flights?param1=${tripType}&param2=${fromCity}&param3=${toCity}&param4=${departureDate}&param5=${returnDate}&param6=${numTravelers}&param7=${selectedClass}`}>
            <button
              disabled={!isSearchCriteriaValid()}
              onClick={handleSearch}
            >
              Search
            </button>
          </Link>
          {attemptedSearch && !isSearchCriteriaValid() && (
            <p>Please fill out all required fields before searching.</p>
          )}
          {/* This is not getting printed! ERROR, FIX THIS */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;