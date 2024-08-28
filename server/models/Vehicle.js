const db = require('../config/db');

class Vehicle {
    static insertVehicle(data, callback) {
        const { ECRno, vehicleNO, driverName, MobileNo, owner } = data;
        const sqlInsert = "INSERT INTO vehicle_info (ecrNo, vehicleNO, driverName, MobileNo, owner, date, time) VALUES (?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_TIME);";
        db.query(sqlInsert, [ECRno, vehicleNO, driverName, MobileNo, owner], callback);
    }

    static getGatepassData(callback) {
        const query = `SELECT v.ecrNo, v.vehicleNo, v.driverName, v.owner, v.date AS InDate, v.time AS InTime, COALESCE(SUM(c.cylinderNo), 0) AS TotalInCount, COALESCE(g.cylinderOutCount, 'N/A') AS cylinderOutCount, COALESCE(g.entry_date, 'N/A') AS OutDate, COALESCE(g.entry_time, 'N/A') AS OutTime 
        FROM vehicle_info v 
        LEFT JOIN cylinder_info c ON v.ecrNo = c.ecrNo 
        LEFT JOIN gatepass_outward g ON v.ecrNo = g.ecrNo 
        GROUP BY v.ecrNo, v.vehicleNo, v.driverName, v.owner, v.date, v.time, g.cylinderOutCount, g.entry_date, g.entry_time 
        LIMIT 0, 1000;`;
        db.query(query, callback);
    }
}

module.exports = Vehicle;
