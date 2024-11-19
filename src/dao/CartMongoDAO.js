import { cartsModel } from "./models/cartsModel.js";

export class CartMongoManager {
  static async create() {
    return await cartsModel.create({ products: [] });
  }

  
  static async getById(id) {
    try {
      return await cartsModel.findById(id).exec(); 
    } catch (error) {
      throw new Error("Error al obtener el carrito");
    }
  }

  static async update(filtro = {}, cart) {
    return await cartsModel.updateOne(filtro, cart);
  }

  static async get(filtro = {}) {
    return await cartsModel.find(filtro).lean();
  }
}
