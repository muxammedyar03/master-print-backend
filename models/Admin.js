// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'admin', // default name
  },
  password: {
    type: String,
    required: true,
    default: 'admin', // default password
  },
  created_at: { type: Date, default: Date.now()},
});

// Parolni xesh qilishdan oldin
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Agar parol o‘zgarmagan bo‘lsa, davom eting

  // Parolni xesh qilish
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);
