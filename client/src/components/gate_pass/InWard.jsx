import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InWard.module.css"; // Import the CSS module
import Cylinder from "./Cylinder_info.jsx";
import Axios from "axios";

export default function InWard() {
  const [vgplecrNo, setVgplecrNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [driverName, setDriverName] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [showNextComponent, setShowNextComponent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!vgplecrNo) {
      const newECR = generateEcrNumber();
      setVgplecrNo(newECR);
    }
  }, [vgplecrNo]);

  const generateEcrNumber = () => {
    const currentEcrNumber = parseInt(localStorage.getItem("currentEcrNumber")) || 1000;
    const newEcrNumber = currentEcrNumber + 1;
    localStorage.setItem("currentEcrNumber", newEcrNumber);
    return `${newEcrNumber}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowNextComponent(true);
    
    navigate('/inward/cylinder', {
      state: {
        vgplecrNo,
        vehicleNo,
        driverName,
        mobileNo,
        owner: dealerName
      }
    });
  };

  return (
    <div className={styles.formContainer}>
      <h1>Gatepass Entry</h1>
      <form className={styles.formBody} onSubmit={handleSubmit}>
        <section className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <h2>Number</h2>
          </div>
          <div className={styles.fields}>
            <div className={styles.inputGroup}>
              <label htmlFor="vgplecrNo" className={styles.inputLabel}>Vgpl ECR No</label>
              <input
                id="vgplecrNo"
                className={styles.inputField}
                type="text"
                value={vgplecrNo}
                name="vgplecrNo"
                readOnly
              />
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <h2>Vehicle</h2>
          </div>
          <div className={styles.fields}>
            <div className={styles.inputGroup}>
              <label htmlFor="vehicleNo" className={styles.inputLabel}>Vehicle No</label>
              <input
                id="vehicleNo"
                className={styles.inputField}
                type="text"
                value={vehicleNo}
                placeholder="ABC 1234"
                name="vehicleNo"
                onChange={(e) => setVehicleNo(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="driverName" className={styles.inputLabel}>Driver Name</label>
              <input
                id="driverName"
                className={styles.inputField}
                type="text"
                value={driverName}
                placeholder="Enter Name"
                name="driverName"
                onChange={(e) => setDriverName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="mobileNo" className={styles.inputLabel}>Mobile No</label>
              <input
                id="mobileNo"
                className={styles.inputField}
                type="text"
                value={mobileNo}
                name="mobileNo"
                placeholder="5551234567"
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <h2>Owner</h2>
          </div>
          <div className={styles.fields}>
            <div className={styles.inputGroup}>
              <label htmlFor="dealerName" className={styles.inputLabel}>Dealer Name</label>
              <input
                id="dealerName"
                className={styles.inputField}
                type="text"
                value={dealerName}
                name="dealerName"
                placeholder="Dealer Name"
                onChange={(e) => setDealerName(e.target.value)}
              />
            </div>
          </div>
        </section>
        <button className={styles.nextButton} type="submit">Next</button>
      </form>
    </div>
  );
}
