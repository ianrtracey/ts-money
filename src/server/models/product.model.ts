import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String
});

export const Product = mongoose.model("Product", productSchema);
