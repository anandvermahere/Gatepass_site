import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './history.css'; // Make sure to create and style this CSS file

function History() {
  const [selectedOption, setSelectedOption] = useState('vehicleVoucher');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data based on the selected option
    Axios.get(`http://localhost:3001/api/${selectedOption}`)
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedOption]);

  const formatDate = (dateString) => {
    // Try to create a Date object from the dateString
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // Return a default value or an empty string if the date is invalid
      return 'N/A';
    }
  
    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  

  return (
    <div className="history-container">
      <div className="options">
        <button 
          className={selectedOption === 'vehicleVoucher' ? 'active' : ''} 
          onClick={() => setSelectedOption('vehicleVoucher')}
        >
          Vehicle Voucher
        </button>
        <button 
          className={selectedOption === 'gatepass' ? 'active' : ''} 
          onClick={() => setSelectedOption('gatepass')}
        >
          Gatepass
        </button>
      </div>
      <div className="data-display">
        {selectedOption === 'vehicleVoucher' ? (
            data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Employee Name</th>
                      <th>Vehicle No.</th>
                      <th>Department Name</th>
                      <th>Inkms</th>
                      <th>Outkms</th>
                      <th>Reason</th>
                      <th>Reason-Details</th>
                      <th>Head Name</th>
                      <th>Way</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.empName}</td>
                          <td>{item.VehicleNo}</td>
                          <td>{item.deptName}</td>
                          <td>{item.Inkms}</td>
                          <td>{item.outkms}</td>
                          <td>{item.reasondd}</td>
                          <td>{item.reason}</td>
                          <td>{item.headName}</td>
                          <td>{item.way}</td>
                          <td>{formatDate(item.submitDate)}</td>
                          <td>{item.submitTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data available.</p>
              )
        ):(
            data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ECR No</th>
                      <th>Vehicle No.</th>
                      <th>Driver Name</th>
                      <th>Owner</th>
                      <th>In Date</th>
                      <th>In Time</th>
                      <th>Cylinder Incount</th>
                      <th>Cylinder Outcount</th>
                      <th>Out Date</th>
                      <th>Out Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.ecrNo}>
                          <td>{item.ecrNo}</td>
                          <td>{item.vehicleNo}</td>
                          <td>{item.driverName}</td>
                          <td>{item.owner}</td>
                          <td>{formatDate(item.InDate)}</td>
                          <td>{item.InTime}</td>
                          <td>{item.TotalInCount}</td>
                          <td>{item.cylinderOutCount}</td>
                          <td>{formatDate(item.OutDate)}</td>
                          <td>{item.OutTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data available.</p>
            )
        )}
      </div>
    </div>
  );
}

export default History;
