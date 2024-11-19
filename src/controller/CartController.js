import { isValidObjectId } from "mongoose";
import { cartService } from "../services/cartService.js";
import { procesaErrores } from "../utils.js";
import { cartDTO } from "../dto/cartDTO.js";

class CartController {
  static async createCart(req, res) {
    try {
      const nuevoCart = await cartService.createCart();
      const cartFormatted = new cartDTO(nuevoCart); 
      return res.status(201).json({ cart: cartFormatted });
    } catch (error) {
      procesaErrores(res, error);
    }
  }

  static async getCarts(req, res) {
    try {
      const carts = await cartService.getCarts();
      const cartsFormatted = carts.map((cart) => new cartDTO(cart)); 
      return res.status(200).json(cartsFormatted);
    } catch (error) {
      procesaErrores(res, error);
    }
  }

  static async getCartById(req, res) {
    const { cid } = req.params;

    if (!isValidObjectId(cid)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    try {
      const cart = await cartService.getCartById(cid);
      if (!cart) {
        return res
          .status(404)
          .json({ error: `Carrito no encontrado con ID ${cid}` });
      }
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({
        error: "Error inesperado en el servidor - Intente más tarde",
        detalle: error.message,
      });
    }
  }

  static async addProductToCart(req, res) {
    const { cid, pid } = req.params;

    if (!cid || !pid) {
      return res
        .status(400)
        .json({ error: "Debe proporcionar el ID del carrito y del producto" });
    }

    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
      return res
        .status(400)
        .json({ error: "El formato de los IDs es inválido" });
    }

    try {
      const updatedCart = await cartService.addProductToCart(
        cid,
        pid,
        req.user.cart
      );
      const cartFormatted = new cartDTO(updatedCart); 
      return res.status(200).json({ cart: cartFormatted });
    } catch (error) {
      procesaErrores(res, error);
    }
  }

  static async purchaseCart(req, res) {
    const { cid } = req.params;

    if (!isValidObjectId(cid)) {
      return res
        .status(400)
        .json({ error: "El formato del ID del carrito es inválido" });
    }

    try {
      const purchaseResult = await cartService.purchaseCart(
        cid,
        req.user.cart,
        req.user.email
      );
      return res.status(200).json(purchaseResult);
    } catch (error) {
      procesaErrores(res, error);
    }
  }
}

export default CartController;
