const express = require('express');
const { insertCylinder, getCylinders, getCylinderInfo, cylinderOutward } = require('../controllers/cylinderController');


const router = express.Router();

router.post('/cylinder', insertCylinder);
router.get('/cylinders', getCylinders);
router.get('/cylinder_info', getCylinderInfo);
router.post('/submit_outward', cylinderOutward);

module.exports = router;
