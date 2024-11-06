const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    console.log(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message:"Order creation failed", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    
    orders ?
      res.json(orders)
    : res.status(404).json({ error: "Order not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders", error: error.message });
  }
}

module.exports = {createOrder, getAllOrders}