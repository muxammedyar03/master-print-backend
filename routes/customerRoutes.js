// routes/customerRoutes.js
const express = require("express");
const { registerCustomer, loginCustomer, getAll } = require("../controllers/customerController");

const router = express.Router();

// Ro'yxatdan o'tish
router.post("/register", async (req, res) => {
  const { phoneNumber, name, password } = req.body;
  try {
    const token = await registerCustomer(phoneNumber, name, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kirish
router.post("/login", async (req, res) => {
  const { phoneNumber, name, password } = req.body;
  try {
    const token = await loginCustomer(phoneNumber, name, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/login", getAll)

module.exports = router;
