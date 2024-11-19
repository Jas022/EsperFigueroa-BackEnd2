import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    nombre: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const usuariosModelo = mongoose.model("usuarios", userSchema);
