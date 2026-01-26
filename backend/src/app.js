const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/payment', paymentRoutes);

// Default route
app.get('/', (req, res) => res.send('Backend is running!'));

module.exports = app;
