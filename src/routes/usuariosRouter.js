import { Router } from "express";
import { UsuariosController } from "../controller/usuariosController.js";
import { verificaToken } from "../middleware/auth.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/current", verificaToken, (req, res) => {
  res.json({
    message: "Autenticación exitosa",
    user: req.user,
  });
});
router.get("/", UsuariosController.getUsuarios);
router.post("/", UsuariosController.createUser);   
router.post("/login", UsuariosController.loginUser);

export { router };
