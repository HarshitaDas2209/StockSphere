const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Manager = require("../models/Manager");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, warehouseName } = req.body;
  try {
    const existing = await Manager.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new Manager({ name, email, password: hashedPassword, warehouseName });
    await newManager.save();

    res.status(201).json({ message: "Manager registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});







// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const manager = await Manager.findOne({ email });
        if (!manager) return res.status(400).json({ message: "Invalid credentials" });
        
        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        
        res.json({
            token,
            manager: {
                _id: manager._id,             // 🔐 make sure this is used everywhere
                name: manager.name,
                email: manager.email,
                warehouseName: manager.warehouseName
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;