import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, image, category, stock } = req.body;

  if (!name || !description || !price || !image || !category || !stock) {
    res.status(400).json({ message: "Please provide all fields" });
    return;
  }

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct, // Return the created product
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
    return;
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
    return;
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
    return;
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const {name, description, price, image, category, stock} = req.body;
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true, // optional: ensure schema validation
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
    return;
  }
};