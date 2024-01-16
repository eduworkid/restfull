import { mongoose } from "mongoose";

const todoSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("product", todoSchema);

export default Product;
