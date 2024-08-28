const express = require('express');
const { insertVoucher, getVouchers } = require('../controllers/voucherController');

const router = express.Router();

router.post('/voucher', insertVoucher);
router.get('/vehicleVoucher', getVouchers);

module.exports = router;
