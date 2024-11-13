const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const categoryRoutes = require("./modules/category/routes/categoryRoutes");



// Configurations
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Salom, Node.js va Express.js! PostgreSQL');
});
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda...`);
});


