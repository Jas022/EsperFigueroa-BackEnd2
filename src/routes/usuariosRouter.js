// src/routes/usuariosRouter.js

import { Router } from "express";

const router = Router();


const usuarios = [
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "Ana" },
];


router.get("/", (req, res) => {
  res.json(usuarios); 
});


export { router }; 
