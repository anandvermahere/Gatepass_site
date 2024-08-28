import React, { useEffect, useState } from "react";
import Axios from "axios";
import './outward.css';

export default function OutwardForm(props) {
  const [cylinderInfo, setCylinderInfo] = useState([]);
  const [outCounts, setOutCounts] = useState({});
  const [remarksPopup, setRemarksPopup] = useState(false);
  const [currentRemarks, setCurrentRemarks] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [entryTime, setEntryTime] = useState('');

  useEffect(() => {
    // Fetch data from the backend API using the ecrNo from props
    Axios.get(`http://localhost:3001/api/cylinder_info?ecrNo=${props.cylinder.ecrNo}`)
      .then((response) => {
        setCylinderInfo(response.data);
        // Initialize outCounts state with the same value as inCount for each cylinder entry
        const initialOutCounts = response.data.reduce((acc, info, index) => {
          acc[index] =info.cylinderNo || ''; // Initialize outCount as empty
          return acc;
        }, {});
        setOutCounts(initialOutCounts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    const currentDate = new Date();
    setEntryDate(currentDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    setEntryTime(currentDate.toTimeString().split(' ')[0]); // Format as HH:MM:SS

  }, [props.cylinder.ecrNo]);

  const handleOutChange = (index, value) => {
    // Update the outCounts state with the new value
    setOutCounts((prevOutCounts) => {
      const updatedOutCounts = {
        ...prevOutCounts,
        [index]: value,
      };
  
      // Check if the current value of outCounts is different from cylinderNo
      if (parseInt(cylinderInfo[index].cylinderNo, 10) !== parseInt(value, 10)) {
        setRemarksPopup(true); // Open the remarks popup if values differ
      } else{
        setRemarksPopup(false);
      }
  
      return updatedOutCounts;
    });
  };
  

  const closeRemarksPopup = () => {
    setRemarksPopup(false);
  };

  const handleRemarksChange = (e) => {
    setCurrentRemarks(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalOutCounts = Object.values(outCounts).reduce((sum, count) => sum + parseInt(count, 10), 0);
    console.log(totalOutCounts);

    const formData = {
      ecrNo: props.cylinder.ecrNo,
      incounts: props.cylinder.totalCylinderCount,
      outCounts: totalOutCounts,
      remarks: currentRemarks,
      entryDate: entryDate,
      entryTime: entryTime,
    };
    // Send data to the backend
    Axios.post('http://localhost:3001/api/submit_outward', formData)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
        props.closePopup(); // Invoke closePopup as a function
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="container">
      <button className="close-popup" onClick={() => {props.closePopup()}}>X</button>
      <form onSubmit={handleSubmit}>
        {cylinderInfo.map((info, index) => (
          <div key={index} className="cylinder-row">
            <div className="info">
              <label>Cylinder Type</label>
              <p>{info.cylinderType}</p>
            </div>
            <div className="info">
              <label>Gas</label>
              <p>{info.gas}</p>
            </div>
            <div className="info">
              <label>In Count</label>
              <input
                type="Number"
                value={info.cylinderNo} // Prefilled and non-editable
                readOnly
              />
            </div>
            <div className="info">
              <label>Out Count</label>
              <input
                type="Number"
                value={outCounts[index] || ''} // Initialized with empty string
                onChange={(e) => handleOutChange(index, e.target.value)} // Editable field
              />
            </div>
          </div>
        ))}
        {remarksPopup && (
          <div className="remarks-popup">
            <h3>Add Remarks</h3>
            <textarea
              value={currentRemarks}
              onChange={handleRemarksChange}
            />
            <button onClick={closeRemarksPopup}>Close</button>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
