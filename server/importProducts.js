const mongoose = require("mongoose");
const csv = require("csvtojson");
const Product = require("./models/Product");
const Manager = require("./models/Manager");
require("dotenv").config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const importCSV = async () => {
  const filePath = "./expanded_warehouse_inventory_with_city.csv"; // Place CSV in root or update path
  const jsonArray = await csv().fromFile(filePath);

  for (const row of jsonArray) {
    try {
      const manager = await Manager.findOne({ warehouseName: row.store_id });
      if (!manager) {
        console.warn(`Manager not found for store_id ${row.store_id}`);
        continue;
      }

      const newProduct = new Product({
        store_id: row.store_id,
        product_id: row.product_id,
        product_name: row.product_name,
        category: row.category,
        current_stock: Number(row.current_stock),
        product_company: row.product_company,
        expiryDate: new Date(row.Expiry_Date),
        productRate: Number(row.Product_Rate),
        totalRate: Number(row.Total_Rate),
        thresholdValue: Number(row.threshold_value),
        managerId: manager._id,
        city:row.City
      });
      
      await newProduct.save();
      console.log(`Inserted: ${row.product_name} in ${row.store_id}`);
    } catch (error) {
      console.error("Error inserting product:", error.message);
    }
  }

  mongoose.disconnect();
};

importCSV();
