const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRouter = require("./routes/orderRoutes");


// Configurations
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Salom, Node.js va Express.js! PostgreSQL');
});

app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);
app.use("/order", orderRouter)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda...`);
});


