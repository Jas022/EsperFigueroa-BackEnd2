import { ordenesModelo } from "./models/ordenesModel.js";

export class OrdenesDAO {
  static async getOrdenes() {
    return await ordenesModelo.find().lean();
  }

  static async createOrden(orden = {}) {
    let nuevaOrden = await ordenesModelo.create(orden);
    return nuevaOrden.toJSON();
  }
}
