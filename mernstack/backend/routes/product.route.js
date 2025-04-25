import express from "express";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

// console.log(process.env.MONGO_URI);

router.get("/", getProducts);

router.post("/", createProduct);

// Only update some fields patch or if all the fields all put
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

// Api: Application programming interface ( All it is a man in the middle)

export default router;
