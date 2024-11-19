import { ProductsMongoDAO } from "../dao/ProductsMongoDAO.js"; // Asegúrate de que esta importación es correcta
import { CartMongoManager as CartDAO } from "../dao/CartMongoDAO.js";
import { cartDTO } from "../dto/cartDTO.js";

class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  async createCart() {
    return await this.dao.create();
  }

  async getAllCarts() {
    const carts = await this.dao.getAll();
    return carts.map((cart) => new cartDTO(cart));
  }

  async getCarts() {
    return await this.dao.get();
  }

  async addProductToCart(cid, pid, userCart) {
    let cart = await this.dao.getById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    console.log("Cart:", cart); 

    let product = await ProductsMongoDAO.getById(pid);
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    console.log("Product:", product); 

    let productInCart = cart.products.find((item) => {
      console.log("Item in cart:", item); 
      if (item.product && item.product._id) {
        return item.product._id.toString() === pid;
      }
      return false;
    });

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: product, quantity: 1 });
    }

    await this.dao.update({ _id: cid }, cart);

    return cart;
  }

  async getCartById(id) {
    const cart = await this.dao.getById(id);
    if (!cart) throw new Error("Carrito no encontrado");
    return new cartDTO(cart);
  }
}

export const cartService = new CartService(CartDAO);
