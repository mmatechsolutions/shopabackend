// controllers/productController.js

import Product from "../models/Product.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create product",
      error: err.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update product",
      error: err.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete product",
      error: err.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: err.message,
    });
  }
};
