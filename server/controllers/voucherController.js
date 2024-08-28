const Voucher = require('../models/Voucher');

const insertVoucher = (req, res) => {
    Voucher.insertVoucher(req.body, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Voucher inserted successfully' });
    });
};

const getVouchers = (req, res) => {
    Voucher.getVouchers((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = {
    insertVoucher,
    getVouchers,
};
