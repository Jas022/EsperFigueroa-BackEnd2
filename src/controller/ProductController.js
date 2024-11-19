import { productService } from "../services/productService.js";
import { procesaErrores } from "../utils.js";

export default class ProductController {
  static async getProducts(req, res) {
    try {
      let products = await productService.getProducts();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ products });
    } catch (error) {
      return procesaErrores(res, error);
    }
  }

  static async createProduct(req, res) {
    let { title, ...otros } = req.body;
    if (!title) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `Complete las props requeridas` });
    }

    try {
      let nuevoProducto = await productService.createProduct({
        title,
        ...otros,
      });
      res.setHeader("Content-Type", "application/json");
      return res.status(201).json({ nuevoProducto });
    } catch (error) {
      return procesaErrores(res, error);
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async updateProduct(req, res) {
    const { id } = req.params;
    const { title, ...otros } = req.body;

    if (!title) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    try {
      let productoActualizado = await productService.updateProduct(id, {
        title,
        ...otros,
      });
      if (productoActualizado) {
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json({ productoActualizado });
      } else {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      return procesaErrores(res, error);
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      let productoEliminado = await productService.deleteProduct(id);
      if (productoEliminado) {
        res.setHeader("Content-Type", "application/json");
        return res
          .status(200)
          .json({ message: "Producto eliminado correctamente" });
      } else {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      return procesaErrores(res, error);
    }
  }

  static async addToCart(req, res) {
    const { productId } = req.body;

    if (!productId) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({
        error: "Se debe proporcionar un producto para agregar al carrito",
      });
    }

    try {
      let carritoActualizado = await productService.addToCart(
        req.user.userId,
        productId
      );
      if (carritoActualizado) {
        res.setHeader("Content-Type", "application/json");
        return res
          .status(200)
          .json({ message: "Producto agregado al carrito" });
      } else {
        return res.status(400).json({
          error: "Hubo un problema al agregar el producto al carrito",
        });
      }
    } catch (error) {
      return procesaErrores(res, error);
    }
  }
}
