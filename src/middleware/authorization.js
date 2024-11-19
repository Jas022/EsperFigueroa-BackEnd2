export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({
      error: "Acción no permitida. Se requiere rol de administrador.",
    });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (req.user.rol !== "user") {
    return res.status(403).json({
      error:
        "Acción no permitida. Solo los usuarios pueden agregar productos al carrito.",
    });
  }
  next();
};
