import React, { useState, useCallback } from 'react';
import '../styles/styles_passengerform.css';
import * as XLSX from 'xlsx';
import ReactFileReader from 'react-file-reader';

const PassengerForm = () => {
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', gender: '' }]);
  const [error, setError] = useState('');
  const passengerLimit = 9; // Set the passenger limit here
  
  const handleInputChange = (index, event) => {
    const values = [...passengers];
    if (event.target.name === 'firstName') {
      values[index].firstName = event.target.value;
    } else if (event.target.name === 'lastName') {
      values[index].lastName = event.target.value;
    } else if (event.target.name === 'gender') {
      values[index].gender = event.target.value;
    }
    setPassengers(values);
  };

  const addPassenger = () => {
    if (passengers.length < passengerLimit) {
      setPassengers([...passengers, { firstName: '', lastName: '', gender: '' }]);
    } else {
      setError('Maximum limit of passengers reached');
    }
  };

  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((passenger, i) => i !== index);
    setPassengers(updatedPassengers);
    setError('');
  };

  const handleExcelUpload = (files) => {
    const file = files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Ignore the first row as it's assumed to be a heading
      excelData.shift();

      if (excelData.length > 0) {
        // Update passengers with Excel data, limited to the top 9
        setPassengers(
          excelData.slice(0, passengerLimit).map((row) => ({
            firstName: row[0] || '',
            lastName: row[1] || '',
            gender: row[2] || '',
          }))
        );

        // ----------------- 9 passenger limiter ----------------------
        if (excelData.length > passengerLimit) {
          setError('Only the top 9 passengers were added due to the limit.');
        } else {
          setError('');
        }
      } else {
        setError('No data found in the Excel file.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission here
    console.log(passengers);
  };

  return (
    <form className="passenger-form" onSubmit={handleSubmit}>
      <ReactFileReader handleFiles={handleExcelUpload} fileTypes={'.csv, .xls, .xlsx'}>
        <button className="upload-button">Upload Excel File</button>
      </ReactFileReader>
      {passengers.map((passenger, index) => (
        <div key={index} className="passenger-item">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={passenger.firstName}
              onChange={(event) => handleInputChange(index, event)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={passenger.lastName}
              onChange={(event) => handleInputChange(index, event)}
              required
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={passenger.gender}
              onChange={(event) => handleInputChange(index, event)}
              required
              className="gender-select"
            >
              <option value="">Select</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </label>
          <button type="button" className="remove-passenger" onClick={() => removePassenger(index)}>
            Remove Passenger
          </button>
        </div>
      ))}
      {error && <p className="error-message">{error}</p>}
      <button type="button" className="add-passenger" onClick={addPassenger}>
        Add Passenger
      </button>
      <br />
      <br />
      <input type="submit" value="Submit" className="add-passenger" />
    </form>
  );
};

export default PassengerForm;
