import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.model.js";

dotenv.config();
const app = express();

app.use(express.json()); //allows us to accpet JSON data in the req.body

app.get("/", (req, res) => {
  res.send("Hello World");
});

// console.log(process.env.MONGO_URI);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetch products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product.", error.message);

    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    console.log("error deleting", error.message);
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});

// Api: Application programming interface ( All it is a man in the middle)
