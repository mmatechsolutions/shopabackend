// routes/productRoutes.js

import express from "express";

import {
  getProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/products", getProducts);
router.get("/:id", getSingleProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;
