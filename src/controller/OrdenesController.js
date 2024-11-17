import { isValidObjectId } from "mongoose";
import { procesaErrores } from "../utils.js";
import { OrdenesDAO } from "../dao/OrdenesDAO.js";
import { NegociosDAO } from "../dao/NegociosDAO.js";
import { UsuariosDAO } from "../dao/UsuariosDAO.js";

export class OrdenesController {
  static async getOrdenes(req, res) {
    try {
      let ordenes = await OrdenesDAO.getOrdenes();
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ ordenes });
    } catch (error) {
      procesaErrores(res, error);
    }
  }

  static async createOrden(req, res) {
    let { uid, nid, pedido } = req.body;

    if (!uid || !nid || !pedido) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `Complete uid, nid, y pedido` });
    }

    if (!isValidObjectId(nid) || !isValidObjectId(uid)) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `formato incorrecto uid / nid` });
    }

    if (!Array.isArray(pedido)) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(400)
        .json({ error: `El pedido debe ser con formato array` });
    }

    // validaciones y proceso...
    let negocio = await NegociosDAO.getNegocioBy({ _id: nid });
    if (!negocio) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(400)
        .json({ error: `No existen negocios con id ${nid}` });
    }

    let usuario = await UsuariosDAO.getUserBy({ _id: uid });
    if (!usuario) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(400)
        .json({ error: `No existen usuarios con id ${uid}` });
    }

    let error = false;
    let errorDetalle = [];
    pedido.forEach((i) => {
      let producto = negocio.productos.find((p) => p.id == i.id);
      if (producto) {
        i.descrip = producto.descrip;
        i.precio = producto.precio;
        i.subtotal = producto.precio * i.cantidad;
      } else {
        error = true;
        errorDetalle.push(`ítem con id ${i.id} no existe en el menú`);
      }
    });
    if (error) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(400)
        .json({
          error: `Algún ítem no existe en el negocio ${negocio.nombre}`,
          errorDetalle,
        });
    }

    let nroOrden = Date.now();
    let total = pedido.reduce((acum, item) => (acum += item.subtotal), 0);

    try {
      let nuevaOrden = await OrdenesDAO.createOrden({
        nroOrden,
        cliente: uid,
        negocio: nid,
        pedido,
        total,
      });

      usuario.pedidos.push({
        nroOrden: nuevaOrden._id,
      });

      await UsuariosDAO.updateUser(uid, usuario);

      res.setHeader("Content-Type", "application/json");
      return res.status(201).json({ nuevaOrden });
    } catch (error) {
      procesaErrores(res, error);
    }
  }
}
