import { Router } from "express";
import ProductController from "../controller/ProductController.js";
import { isAdmin, isUser } from "../middleware/authorization.js";
import { verificaToken } from "../middleware/auth.js";

export const router = Router();


router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);


router.post("/cart", verificaToken, isUser, ProductController.addToCart);


router.use(verificaToken, isAdmin); 
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);
