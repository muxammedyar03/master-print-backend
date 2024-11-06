// models/Customer.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String,required: true,},
  phoneNumber: { type: String, required: true, unique: true,},
  address: { type: String, },
  telegramUsername: { type: String },
  createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model("Customer", customerSchema);
