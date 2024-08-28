const Vehicle = require('../models/Vehicle');

const insertVehicle = (req, res) => {
    Vehicle.insertVehicle(req.body, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Vehicle info inserted successfully' });
    });
};

const getGatepassData = (req, res) => {
    Vehicle.getGatepassData((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = {
    insertVehicle,
    getGatepassData,
};
