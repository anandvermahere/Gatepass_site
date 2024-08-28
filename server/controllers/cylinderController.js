const Cylinder = require('../models/Cylinder');

const insertCylinder = (req, res) => {
    const { ECRno, cylinders } = req.body;

    if (!Array.isArray(cylinders)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    Cylinder.insertCylinder(ECRno, cylinders, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Successfully Inserted' });
    });
};

const getCylinders = (req, res) => {
    Cylinder.getCylinders((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

const getCylinderInfo = (req, res) => {
    const ecrNo = req.query.ecrNo;
    Cylinder.getCylinderInfo(ecrNo, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const cylinderOutward = (req, res) => {
    Cylinder.cylinderOutward(req.body, (err) => {
        if(err) {
            return res.status(500).json({error: err.message })
        }
        res.status(200).json({ message: 'Outward entry successfull' })
    });
};

module.exports = {
    insertCylinder,
    getCylinders,
    getCylinderInfo,
    cylinderOutward,
};
