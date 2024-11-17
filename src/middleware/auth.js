//import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
//export const auth = (req, res, next) => {
// console.log(req.cookies);

// if (!req.cookies.tokenCookie) {
//   res.setHeader("Content-Type", "application/json");
//   return res.status(401).json({ error: `Unauthorized - no llega token` });
// }

// let token = req.cookies.tokenCookie;
// try {
//   req.user = jwt.verify(token, config.SECRET);
// } catch (error) {
//   res.setHeader("Content-Type", "application/json");
//   return res.status(401).json({ error: `${error.message}` });
// }

// next();
//};

export const auth = (permisos = []) => {
  return (req, res, next) => {
    if (!Array.isArray(permisos)) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(500)
        .json({ error: `Error en permisos de la ruta... :(` });
    }

    permisos = permisos.map((p) => p.toLowerCase());
    if (permisos.includes("public")) {
      return next();
    }

    if (!req.user || !req.user.rol) {
      res.setHeader("Content-Type", "application/json");
      return res.status(401).json({ error: `No hay usuarios autenticados` });
    }

    if (!permisos.includes(req.user.rol.toLowerCase())) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(403)
        .json({
          error: `No tiene privilegios suficientes para acceder al recurso solicitado`,
        });
    }

    next();
  };
};