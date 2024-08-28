const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');
const cylinderRoutes = require('./routes/cylinderRoutes');
const voucherRoutes = require('./routes/voucherRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api', vehicleRoutes);
app.use('/api', cylinderRoutes);
app.use('/api', voucherRoutes);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
