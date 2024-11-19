import { UsuariosDAO } from "../dao/UsuariosDAO.js";
import { procesaErrores } from "../utils.js";
import { UserDTO } from "../dto/userDTO.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UsuariosController {
  static async getUsuarios(req, res) {
    try {
      let usuarios = await UsuariosDAO.getUsers();

      const usuariosDTO = usuarios.map((user) => new UserDTO(user));
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ usuarios: usuariosDTO });
    } catch (error) {
      procesaErrores(res, error);
    }
  }

  static async createUser(req, res) {
    const { email, password, nombre, rol } = req.body;

    if (!email || !password || !nombre) {
      return res
        .status(400)
        .json({ error: "Email, password y nombre son requeridos" });
    }

    try {
      const usuarioExistente = await UsuariosDAO.getUserByEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Contraseña encriptada: ", hashedPassword);

      const nuevoUsuario = await UsuariosDAO.createUser({
        email,
        password: hashedPassword,
        nombre,
        rol: rol || "user",
      });

      res.status(201).json({ nuevoUsuario });
    } catch (error) {
      res.status(500).json({
        error: "Error inesperado al crear el usuario",
        detalle: error.message,
      });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Debe proporcionar email y contraseña" });
    }

    try {
      const user = await UsuariosDAO.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const cleanPassword = password.trim();

      const isPasswordCorrect = await bcrypt.compare(
        cleanPassword,
        user.password
      );

      console.log("Contraseña ingresada:", cleanPassword);
      console.log("Contraseña encriptada en la DB:", user.password);
      console.log("Comparación de contraseñas:", isPasswordCorrect);

      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Autenticación exitosa",
        token,
      });
    } catch (error) {
      console.error("Error en login:", error.message);
      res
        .status(500)
        .json({ error: "Error en la autenticación", detalle: error.message });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const user = req.user; 
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      
      const userDTO = new UserDTO(user);

      
      return res.status(200).json(userDTO);
    } catch (error) {
      res.status(500).json({
        error: "Error inesperado en el servidor - Intente más tarde",
        detalle: error.message,
      });
    }
  }
}
