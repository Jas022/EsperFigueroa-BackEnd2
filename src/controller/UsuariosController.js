import { UsuariosDAO } from "../dao/UsuariosDAO.js";
import { procesaErrores } from "../utils.js";

export class UsuariosController {
  static async getUsuarios(req, res) {
    try {
      let usuarios = await UsuariosDAO.getUsers();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ usuarios });
    } catch (error) {
      procesaErrores(res, error);
    }
  }

  static async createUser(req, res) {
    let { nombre, email, rol } = req.body;
    if (!nombre || !email) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `Complete nombre | email` });
    }

 

    try {
      let nuevoUsuario = await UsuariosDAO.createUser({ nombre, email, rol });
      res.setHeader("Content-Type", "application/json");
      return res.status(201).json({ nuevoUsuario });
    } catch (error) {
      procesaErrores(res, error);
    }
  }
}
