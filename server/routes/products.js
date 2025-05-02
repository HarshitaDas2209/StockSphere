




const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
// const authMiddleware = require('../middleware/authMiddleware');

// Add product route
router.post("/add", auth, async (req, res) => {
  const { name, category, entryDate, quantity } = req.body;
  try {
    const newProduct = new Product({
      managerId: req.manager,
      name,
      category,
      entryDate,
      quantity
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/my-products", auth, async (req, res) => {
    try {
      const products = await Product.find({ managerId: req.manager }); // 🔥 Make sure this line is correct!
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




  router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });






module.exports = router;

