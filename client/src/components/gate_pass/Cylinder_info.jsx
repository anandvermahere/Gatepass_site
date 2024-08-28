import React, { useState } from "react";
import styles from "./Cylinder_info.module.css"; // Import the CSS module
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const INITIAL_ROW_STATE = {
  cylinderType: "",
  gas: "",
  cylinderNo: "",
  cylinderOwner: "",
};

export default function Cylinder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { vgplecrNo, vehicleNo, driverName, mobileNo, owner } = location.state || {};

  const [cylinderRows, setCylinderRows] = useState([INITIAL_ROW_STATE]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setCylinderRows(prevRows =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [name]: value } : row
      )
    );
  };

  const handleAddRow = () => {
    setCylinderRows([...cylinderRows, INITIAL_ROW_STATE]);
  };

  const handleEdit = () => {
    console.log("handle edit")
    navigate('/inward', {state : {vgplecrNo}});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(vgplecrNo, cylinderRows);
    
    Axios.post("http://localhost:3001/api/vehicle", {
      ECRno: vgplecrNo,
      vehicleNO: vehicleNo,
      driverName: driverName,
      MobileNo: mobileNo,
      owner: owner,
    }).then(() => {
      Axios.post("http://localhost:3001/api/cylinder", {
        ECRno: vgplecrNo,
        cylinders: cylinderRows
      })
      .then(() => {
        alert("Successfully Inserted");
        navigate('/inward');
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response) {
          alert(`Error inserting data: ${error.response.data.error}`);
        } else if (error.request) {
          alert("No response from the server.");
        } else {
          alert("Error in setting up the request: " + error.message);
        }
      });
    });
  };

  return (
    <div className={styles.mainCylinder}>
      <div className={styles.vehicleDetails}>
        <div className={styles.incoming}>
          <label>ECR No. : </label>
          {vgplecrNo}
        </div>
        <div className={styles.incoming}>
          <label>Vehicle No. : </label>
          {vehicleNo}
        </div>
        <div className={styles.incoming}>
          <label>Driver Name : </label>
          {driverName}
        </div>
        <div className={styles.incoming}>
          <label>Dealer Name : </label>
          {owner}
        </div>
        <div className={styles.incoming}>
          <button className={styles.editBtn} onClick={handleEdit}>Edit</button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Cylinder Details</h2>
        {cylinderRows.map((row, index) => (
          <div key={index} className={styles.cylinderRow}>
            <div className={`${styles.boxContainer} ${styles.cylinderType}`}>
              <h4 className={styles.label}>Cylinder Type</h4>
              <select
                className={styles.select}
                name="cylinderType"
                value={row.cylinderType}
                onChange={(e) => handleInputChange(index, e)}
              >
                <option value="">Select</option>
                <option value="Cylinder">Cylinder</option>
                <option value="Dura">Dura</option>
                <option value="Skid">Skid</option>
                <option value="Cascade">Cascade</option>
                <option value="Canister">Canister</option>
              </select>
            </div>

            <div className={`${styles.boxContainer} ${styles.gas}`}>
              <h4 className={styles.label}>Gas</h4>
              <select
                className={styles.select}
                name="gas"
                value={row.gas}
                onChange={(e) => handleInputChange(index, e)}
              >
                <option value="">Select</option>
                <option value="Fire">Fire</option>
                <option value="SCBA">SCBA</option>
                <option value="O2">O2</option>
                <option value="N2">N2</option>
                <option value="CO2">CO2</option>
                <option value="H2">H2</option>
                <option value="Ar">Ar</option>
                <option value="Zero Air">Zero Air</option>
                <option value="N2O">N2O</option>
                <option value="He">He</option>
                <option value="Cal. Mix.">Cal. Mix</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className={`${styles.boxContainer} ${styles.numberOfCylinder}`}>
              <h4 className={styles.label}>Cylinder Count</h4>
              <input
                className={styles.inputField}
                type="text"
                name="cylinderNo"
                value={row.cylinderNo}
                placeholder="Enter count"
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>

            <div className={`${styles.boxContainer} ${styles.cylinderOwner}`}>
              <h4 className={styles.label}>Cylinder Owner</h4>
              <select
                className={styles.select}
                name="cylinderOwner"
                value={row.cylinderOwner}
                onChange={(e) => handleInputChange(index, e)}
              >
                <option value="">Select</option>
                <option value="Party">Party</option>
                <option value="Dealer">Dealer</option>
                <option value="Vgpl">Vgpl</option>
              </select>
            </div>
          </div>
        ))}

        <div className={styles.btnAdd}>
          <button className={styles.addCylinder} type="button" onClick={handleAddRow}>
            Add
          </button>
        </div>

        <button className={`${styles.submitBtn} ${styles.btnSave}`} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
