const db = require('../config/db');

class Voucher {
    static insertVoucher(data, callback) {
        const { empName, VehicleNo, deptName, Inkms, Outkms, reason, reasondd, headName, way } = data;
        const sqlInsert = "INSERT INTO vehicle_voucher (empName, VehicleNo, deptName, Inkms, Outkms, reason, reasondd, headName, way, submitDate, submitTime) VALUES (?,?,?,?,?,?,?,?,?, CURRENT_DATE, CURRENT_TIME);";
        db.query(sqlInsert, [empName, VehicleNo, deptName, Inkms, Outkms, reason, reasondd, headName, way], callback);
    }

    static getVouchers(callback) {
        const query = `SELECT * FROM vehicle_voucher`;
        db.query(query, callback);
    }
}

module.exports = Voucher;
