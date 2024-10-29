import { Router } from "express";
import { VillanosManager } from "../dao/VillanosManager.js";
import { procesaErrores } from "../utils.js";
export const router = Router();

router.get("/", async (req, res) => {
  try {
    let villanos = await VillanosManager.get();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ villanos });
  } catch (error) {
    procesaErrores(res, error);
  }
});
