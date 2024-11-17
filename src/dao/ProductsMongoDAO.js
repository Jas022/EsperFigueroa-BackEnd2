import { productModel } from "./models/productModel.js";

export class ProductsMongoDAO {
  static async get(filtro = {}) {
    return await productModel.find(filtro).lean();
  }

  static async getOneBy(filtro = {}) {
    return await productModel.findOne(filtro).lean();
  }

  static async create(product) {
    const nuevoProducto = await productModel.create(product);
    return nuevoProducto.toJSON();
  }

  static async update(id, product) {
    const resultado = await productModel.updateOne({ _id: id }, product);
    if (resultado.nModified === 0) {
      throw new Error("Producto no encontrado o no hay cambios.");
    }
    return resultado;
  }
  static async getProductById(id) {
    return await productModel.findById(id).lean(); 
  }
}
