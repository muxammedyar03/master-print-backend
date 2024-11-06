const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const createAdminIfNotExist = async () => {
  try {
    let admin = await Admin.findOne({ name: 'admin' });

    if (!admin) {
      const salt = await bcrypt.genSalt(10); 
      const hashedPassword = await bcrypt.hash('admin', salt); 

      admin = new Admin({
        name: 'admin',
        password: hashedPassword, 
      });

      await admin.save(); 
      console.log("Admin muvaffaqiyatli yaratildi!");
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
};

createAdminIfNotExist();



const authenticateAdmin = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Adminni ma'lumotlar bazasidan olish
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(400).json({ message: 'Admin topilmadi' });
    }
    if (admin.password !== password) {
      return res.status(400).json({ message: 'Parol noto‘g‘ri' });
    }

    const token = jwt.sign(
      { sub: admin._id, name: admin.name, 
        iat: admin.created_at ? Math.floor(admin.created_at.getTime() / 1000) : Math.floor(Date.now() / 1000)},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: 'Admin muvaffaqiyatli kirdi!',
      token,
    });

  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi', error: error.message });
  }
};

 const getAll = async (req, res) => {
    const admin = await Admin.find()

    admin 
    ? res.json({message: "succesfully get all", admin}) 
    : res.status(404).json("No admin found")
 }

module.exports = {
  authenticateAdmin,
  getAll
};