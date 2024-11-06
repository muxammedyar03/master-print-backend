const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { authenticateAdmin, getAll } = require('../controllers/adminController');
const router = express.Router();

// Admin login
router.post('/login', authenticateAdmin);
router.get('/login', getAll)

module.exports = router;
