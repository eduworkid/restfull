import Product from "../models/ProductModelv1.js";
import path from "path";
import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async (req, res) => {
  try {
    const productModel = new Product();
    const product = {
      product_name: req.body.product_name,
      price: req.body.price,
      qty: req.body.qty,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const productId = await productModel.save(product);
    res.status(201).send({ _id: productId });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const productModel = new Product();
    const products = await productModel.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getById = async (req, res) => {
  try {
    const productModel = new Product();
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  const updates = req.body;
  const allowedUpdates = ["product_name", "price", "qty"];

  const isValidOperation = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const productModel = new Product();
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      updates
    );

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
    const productModel = new Product();
    const product = await productModel.findByIdAndDelete(req.params.id);

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
