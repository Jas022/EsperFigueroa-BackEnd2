import { usuariosModelo } from "./models/usersModel.js";
import bcrypt from 'bcrypt';  


export class UsuariosDAO {
  static async getUsers() {
    return await usuariosModelo.find().populate("pedidos.nroOrden").lean();
  }

  static async getUserBy(filtro = {}) {
    return await usuariosModelo.findOne(filtro).lean();
  }

  static async getUserByEmail(email) {
    try {
      const user = await usuariosModelo.findOne({ email }).lean();
      console.log("Usuario encontrado:", user);
      return user;
    } catch (error) {
      throw new Error("Error al obtener el usuario por email");
    }
  }

  static async createUser(usuario = {}) {
    const { email, password } = usuario;

    
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    try {
      
      usuario.password = password;

      let nuevoUsuario = await usuariosModelo.create(usuario);
      return nuevoUsuario.toJSON();
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  static async updateUser(id, usuario) {
    return await usuariosModelo.findByIdAndUpdate(id, usuario, { new: true });
  }
}
