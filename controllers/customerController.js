// controllers/customerController.js
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");  // Agar parolni tekshirishni xohlasangiz, bcryptni qo'shishingiz mumkin

// Foydalanuvchi ro'yxatdan o'tishi
const registerCustomer = async (phoneNumber, name, password) => {
  let customer = await Customer.findOne({ phoneNumber });
  if (customer) {
    throw new Error("Bu telefon raqami bilan foydalanuvchi mavjud.");
  }

  customer = new Customer({ phoneNumber, name, password });

  if (password) {
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(password, salt);
  }

  await customer.save();
  const token = jwt.sign(
    { customerId: customer._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

// Foydalanuvchi tizimga kirishi
const loginCustomer = async (phoneNumber, name, password) => {
  const customer = await Customer.findOne({ phoneNumber, name });
  if (!customer) {
    throw new Error("Foydalanuvchi topilmadi.");
  }

  if (password && customer.password) {
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      throw new Error("Noto'g'ri parol.");
    }
  }

  const token = jwt.sign(
    { customerId: customer._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

const getAll = async (req, res) => {
  const customer = await Customer.find()

  customer 
  ? res.json({message: "succesfully get all", customer}) 
  : res.status(404).json("No admin found")
}


module.exports = { registerCustomer, loginCustomer, getAll };
