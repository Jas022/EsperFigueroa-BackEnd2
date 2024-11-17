import mongoose from "mongoose";

export const ordenesModelo = mongoose.model(
  "ordenes",
  new mongoose.Schema(
    {
      nroOrden: { type: String, unique: true },
      cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
      },
      negocio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "negocios",
      },
      pedido: Array,
      total: Number,
      status: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);
