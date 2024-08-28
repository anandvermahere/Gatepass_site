const db = require('../config/db');

class Cylinder {
    static insertCylinder(ECRno, cylinders, callback) {
        const query = 'INSERT INTO cylinder_info (ECRno, cylinderType, gas, cylinderNo, cylinderOwner) VALUES ?';
        const values = cylinders.map(row => [
            ECRno,
            row.cylinderType,
            row.gas,
            row.cylinderNo,
            row.cylinderOwner,
        ]);

        db.query(query, [values], callback);
    }

    static getCylinders(callback) {
        const query = `SELECT v.ecrNo, v.vehicleNo, v.driverName, SUM(c.cylinderNo) AS totalCylinderCount 
                       FROM vehicle_info v 
                       LEFT JOIN cylinder_info c ON v.ecrNo = c.ecrNo 
                       WHERE v.status = 'pending' 
                       GROUP BY v.ecrNo 
                       ORDER BY v.ecrNo;`;
        db.query(query, callback);
    }

    static getCylinderInfo(ecrNo, callback) {
        const query = `SELECT * FROM cylinder_info WHERE ecrNo = ?`;
        db.query(query, [ecrNo], callback);
    }

    static cylinderOutward(data, callback) {
        const { ecrNo, incounts, outCounts, remarks, entryDate, entryTime } = data;

        const updateStatusQuery = `UPDATE vehicle_info SET status = 'completed' WHERE ecrNo = ?`;

        db.query(updateStatusQuery, [ecrNo], callback);

        const sqlInsert = `INSERT INTO gatepass_outward (ecrNo, cylinderIncount, cylinderOutCount, remarks, entry_date, entry_time) VALUES (?, ?, ?, ?, ?, ?)`;

        db.query(sqlInsert, [ecrNo, incounts, outCounts, remarks, entryDate, entryTime], callback);
    }
}

module.exports = Cylinder;

