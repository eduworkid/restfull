import Product from "../models/ProductModelv1.js";
import path from "path";
import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async (req, res) => {
  try {
    const product = new Product({
      product_name: req.body.product_name,
      price: req.body.price,
      qty: req.body.qty,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["text"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    if (product.image) {
      const imagePath = path.join(__dirname, "../public", product.image);
      await fs.unlink(imagePath);
    }

    res.status(200).send("Data berhasil dihapus");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
};
