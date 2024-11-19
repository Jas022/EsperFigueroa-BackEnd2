import jwt from "jsonwebtoken";
import { config } from "../config/config.js"; 

export const verificaToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 

  if (!token) {
    return res.status(403).json({ error: "No se proporcionó un token" });
  }

  try {
    
    const decoded = jwt.verify(token, config.SECRET);
    console.log(decoded);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Token no válido" });
  }
};


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
      return res.status(403).json({
        error: `No tiene privilegios suficientes para acceder al recurso solicitado`,
      });
    }

    next();
  };
};
