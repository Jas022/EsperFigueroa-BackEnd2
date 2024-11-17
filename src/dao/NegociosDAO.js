import { negociosModelo } from "./models/negociosModel.js";

export class NegociosDAO {
  static async getNegocios() {
    return await negociosModelo.find().lean();
  }

  static async getNegocioBy(filtro = {}) {
    return await negociosModelo.findOne(filtro).lean();
  }

  static async createNegocio(negocio) {
    let nuevoNegocio = await negociosModelo.create(negocio);
    return nuevoNegocio.toJSON();
  }
}
