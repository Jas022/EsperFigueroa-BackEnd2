import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  stock: { type: Number, required: true },
});

export const productModel = mongoose.model("Product", productSchema);
