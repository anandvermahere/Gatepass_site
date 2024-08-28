import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './showdata.css';
import OutwardForm from './Outward';

function CylinderList() {
  const [cylinders, setCylinders] = useState([]);
  const [selectedCylinderIndex, setSelectedCylinderIndex] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    Axios.get('http://localhost:3001/api/cylinders')
      .then((response) => {
        setCylinders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDivClick = (index) => {
    setSelectedCylinderIndex(index);
  };

  const closePopup = () => {
    setSelectedCylinderIndex(null);
  };

  return (
    <div className='outward'>
      <h1>Outward Entry</h1>
      <div className='all-entries'>
        {cylinders.map((cylinder, index) => (
          <div key={index} className="cylinder-container">
            <div className='eachrow' onClick={() => handleDivClick(index)}>
              <div className='rows'>
                <p>ECR No</p>
                <div className='value'>{cylinder.ecrNo}</div>
              </div>
              <div className='rows'>
                <p>Vehicle No</p>
                <div className='value'>{cylinder.vehicleNo}</div>
              </div>
              <div className='rows'>
                <p>Driver Name</p>
                <div className='value'>{cylinder.driverName}</div>
              </div>
              <div className='rows'>
                <p>Total Cylinder</p>
                <div className='value'>{cylinder.totalCylinderCount}</div>
              </div>
            </div>
            {selectedCylinderIndex === index && <OutwardForm closePopup={closePopup} cylinder={cylinder} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CylinderList;
