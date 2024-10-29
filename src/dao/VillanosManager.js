import { villanosModel } from "./models/villanosModel.js";

export class VillanosManager {
  static async get() {
    return await villanosModel.find().lean();
  }

  static async create(villano = {}) {
    let nuevoVillano = await villanosModel.create(villano);
    return nuevoVillano.toJSON();
  }
}

