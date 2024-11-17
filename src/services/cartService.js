import { CartMongoManager as CartDAO } from "../dao/CartMongoDAO.js";

class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  async createCart() {
    return await this.dao.create();
  }
  async getAllCarts() {
    return await this.dao.get();
  }

  async getCarts() {
    return await this.dao.get();
  }

  async getCartById(id) {
    return await this.dao.getCartById(id);
  }

  async updateCart(id, cart) {
    console.log(id, cart);
    let resultado = await this.dao.update({ _id: id }, cart);
    console.log(resultado);
    if (resultado.modifiedCount > 0) {
      return await this.dao.getBy({ _id: id });
    }
    throw new Error(`Problemas al actualizar cart ${id}`);
  }
}

export const cartService = new CartService(CartDAO);
