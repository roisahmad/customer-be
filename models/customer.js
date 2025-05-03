const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  number: Number,
  nameOfLocation: String,
  date: Date,
  loginHour: String,
  name: String,
  age: Number,
  gender: String,
  email: String,
  noTelp: String,
  brandDevice: String,
  digitalInterest: String,
  locationType: String
});

module.exports = mongoose.model('Customer', CustomerSchema);
