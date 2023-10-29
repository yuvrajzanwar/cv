import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/displayFlights_style.css';
import flightData from '../data/flight_search.json'; // Import the JSON data

const DisplayFlights = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  var today = new Date(), date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  // Extract URL parameters
  const tripTypeParam = searchParams.get('param1');
  const fromCityParam = searchParams.get('param2');
  const toCityParam = searchParams.get('param3');
  const departureDateParam = searchParams.get('param4');
  const returnDateParam = searchParams.get('param5');
  const numTravelersParam = searchParams.get('param6');
  const selectedClassParam = searchParams.get('param7');

  // State variables for form fields
  const [tripType, setTripType] = useState(tripTypeParam || 'one-way');
  const [fromCity, setFromCity] = useState(fromCityParam || '');
  const [toCity, setToCity] = useState(toCityParam || '');
  const [departureDate, setDepartureDate] = useState(departureDateParam || '');
  const [returnDate, setReturnDate] = useState(returnDateParam || '');
  const [numTravelers, setNumTravelers] = useState(numTravelersParam || 1);
  const [selectedClass, setSelectedClass] = useState(selectedClassParam || 'economy');

  // Filter the flights based on input criteria
  const filteredFlights = flightData.Response.Results[0].filter((flight) => {
    const flightDepartureDate = flight.Segments[0][0].Origin.DepTime.split('T')[0];
    return (
      flight.Segments[0][0].Origin.Airport.AirportCode === fromCity &&
      flight.Segments[0][0].Destination.Airport.AirportCode === toCity &&
      flightDepartureDate === departureDate &&
      (returnDate === '' || flight.Segments[0][0].ArrTime.split('T')[0] === returnDate)
    );
  });

  // console.log(filteredFlights);
  // console.log(flightData.Response.Results[0]);

  // Event handlers for form fields
  const handleTripTypeChange = (newTripType) => {
    setTripType(newTripType);
  };

  const handleFromCityChange = (newFromCity) => {
    setFromCity(newFromCity);
  };

  const handleToCityChange = (newToCity) => {
    setToCity(newToCity);
  };

  const handleDepartureDateChange = (newDepartureDate) => {
    setDepartureDate(newDepartureDate);
  };

  const handleReturnDateChange = (newReturnDate) => {
    setReturnDate(newReturnDate);
  };

  const handleNumTravelersChange = (newNumTravelers) => {
    setNumTravelers(newNumTravelers);
  };

  const handleSelectedClassChange = (newSelectedClass) => {
    setSelectedClass(newSelectedClass);
  };

  return (
    <div>
      <div className="navbar">
        <div className="navItem">
          <label>
            Trip Type:
            <select value={tripType} onChange={(e) => handleTripTypeChange(e.target.value)}>
              <option value="one-way">One Way</option>
              <option value="round-trip">Round Trip</option>
            </select>
          </label>
        </div>
        <div className="navItem">
          <label>
            From:
            <input type="text" value={fromCity} onChange={(e) => handleFromCityChange(e.target.value)} />
          </label>
        </div>
        <div className="navItem">
          <label>
            To:
            <input type="text" value={toCity} onChange={(e) => handleToCityChange(e.target.value)} />
          </label>
        </div>
        <div className="navItem">
          <label>
            Depart Date:
            <input type="date" value={departureDate} min={date} onChange={(e) => handleDepartureDateChange(e.target.value)} />
          </label>
        </div>
        <div className="navItem">
          <label>
            Return Date:
            <input type="date" value={returnDate} min={departureDate} onChange={(e) => handleReturnDateChange(e.target.value)} />
          </label>
        </div>
        <div className="navItem">
          <label>
            Passengers & Class:
            <input type="number" min="1" max="9" value={numTravelers} onChange={(e) => handleNumTravelersChange(e.target.value)} />
            <select value={selectedClass} onChange={(e) => handleSelectedClassChange(e.target.value)}>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </select>
          </label>
        </div>
        <div className="navItem">
          <button>Search</button>
        </div>
      </div>

      <div>
        {/* These are all the flights (read from the JSON) */}
        {filteredFlights.map((flight, index) => (
          <div key={index} className="flight-details">
            <div className="left-section">
              <div className="airline">
                <p className="airline-name">{flight.Segments[0][0].Airline.AirlineName}</p>
                <p className="flight-number">Flight Number: {flight.Segments[0][0].Airline.AirlineCode + "-" + flight.Segments[0][0].Airline.FlightNumber}</p>
              </div>
              <div className="flight-times">
                <p className="flight-dates">
                  {new Date(flight.Segments[0][0].Origin.DepTime).toDateString()} &rarr; {new Date(flight.Segments[0][0].Destination.ArrTime).toDateString()}
                </p>
                <p className="flight-hours">
                  {new Date(flight.Segments[0][0].Origin.DepTime).toLocaleTimeString()} &rarr; {new Date(flight.Segments[0][0].Destination.ArrTime).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="right-section">
              <div className="price">
                Price: {flight.Fare.OfferedFare} INR
              </div>
              <div className="button-container">
                <button className="book-button">Book</button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DisplayFlights;
