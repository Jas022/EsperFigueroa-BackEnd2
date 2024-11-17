import { usuariosModelo } from "./models/usersModel.js";

export class UsuariosDAO {
  static async getUsers() {
    return await usuariosModelo.find().populate("pedidos.nroOrden").lean();
  }

  static async getUserBy(filtro = {}) {
    // {_id:"a8ad9fa9d8sfadsflkajsdf"}   {nombre:"Juan"}
    return await usuariosModelo.findOne(filtro).lean();
  }

  static async createUser(usuario = {}) {
    let nuevoUsuario = await usuariosModelo.create(usuario);
    return nuevoUsuario.toJSON();
  }

  static async updateUser(id, usuario) {
    return await usuariosModelo.findByIdAndUpdate(id, usuario, { new: true });
  }
}
