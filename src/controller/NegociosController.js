import { NegociosDAO } from "../dao/NegociosDAO.js";
import { procesaErrores } from "../utils.js";

export class NegociosController {
  static async getNegocios(req, res) {
    try {
     
      let negocios = await NegociosDAO.getNegocios();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ negocios });
    } catch (error) {
      procesaErrores(res, error);
    }
  }

  static async createNegocio(req, res) {
    let { nombre, productos } = req.body;
    if (!nombre || !productos) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `Complete nombre | productos` });
    }

    if (!Array.isArray(productos)) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `productos debe ser un array` });
    }


    try {
      let nuevoNegocio = await NegociosDAO.createNegocio({ nombre, productos });
      res.setHeader("Content-Type", "application/json");
      return res.status(201).json({ nuevoNegocio });
    } catch (error) {
      procesaErrores(res, error);
    }
  }
}
