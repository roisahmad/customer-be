const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/customers', require('./routes/customerRoute'));
app.use('/api/analytics', require('./routes/analyticRoute'));

app.get("/", (req, res) => {
  res.send("API Service for Customer Data");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
