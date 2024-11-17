import { usuariosModelo } from "../dao/models/usersModel.js"

export class UsersMongoDAO {
  static async getBy(filtro = {}) {
    console.log(filtro);
    return await usuariosModelo.findOne(filtro).lean();
  }

  static async create(usuario) {
    return await usuariosModelo.create(usuario);
  }
}
