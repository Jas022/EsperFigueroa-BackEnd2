import { Router } from "express";
import { UsuariosController } from "../controller/usuariosController.js";


const router = Router();


router.get("/", UsuariosController.getUsuarios);
router.post("/", UsuariosController.createUser);

export { router };
