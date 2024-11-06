const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  text: { type: String },
  Font: { type: String, default: "sans-serif"},
  logoPosition: { type: String, required: true},
  logoALigment: { type: String, enum: ["front", "back"], required: true},
  logoSize: { type: String, required: true},
  logo: { type: String },
  status: { type: String, enum: ["pending", "processing", "completed"], default: "pending" },
  delivery: { type: String, enum: ["pickup", "delivery"], required: true },
  paymentMethod: { type: String, enum: ["card", "cash"], required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
