import React, { useState } from 'react';
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx';
import PassengerForm from './PassengerForm';

const FormComponent = () => {

    const [formFields, setFormFields] = useState({
        firstName: '',
        lastName: '',
        gender: ''
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            // console.log(excelData[0]);

            // Assuming your Excel contains one row of data
            if (excelData.length > 0) {
                const [firstName, lastName, gender] = excelData[1];
                setFormFields({ firstName, lastName, gender });
            }


            // Extract relevant data from excelData and format it as needed

            // Make an API call to your backend to handle mass booking
        //     axios.post('YOUR_BACKEND_ENDPOINT', formattedData)
        //         .then((response) => {
        //             console.log(response.data);
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <PassengerForm data={formFields} />
        </div>
    );
};

export default FormComponent;
