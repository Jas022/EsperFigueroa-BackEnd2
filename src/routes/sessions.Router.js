import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const router = Router();


router.get("/error", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(401).json({ error: `Error al autenticar` });
});


router.get("/", (req, res) => {
 
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json({ message: "Usuario autenticado", user: req.user });
  } else {
    return res.status(401).json({ message: "No autenticado" });
  }
});


router.post(
  "/registro",
  passport.authenticate("registro", {
    session: false,
    failureFlash: false, 
  }),
  (req, res) => {
    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({
      payload: `Registro exitoso para ${req.user.nombre}`,
      usuario: req.user,
    });
  },
  (err, req, res) => {
    res.status(401).json({ error: `Error al autenticar: ${err.message}` });
  }
);



router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureFlash: false, 
  }),
  (req, res) => {
    let token = jwt.sign(req.user, config.SECRET, { expiresIn: 3600 });
    res.cookie("tokenCookie", token, { httpOnly: true });
    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({
      payload: `Login exitoso para ${req.user.nombre}`,
      usuarioLogueado: req.user,
    });
  },
  (err, req, res) => {
    res.status(401).json({ error: `Error al autenticar: ${err.message}` });
  }
);

router.post("/error", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(401).json({ error: `Error al autenticar` });
});
