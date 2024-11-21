import { Router } from "express";
import CartController from "../controller/CartController.js";
import passport from "passport";

const router = Router();


router.get("/", CartController.getCarts);


router.post("/", CartController.createCart);


router.get("/:cid", CartController.getCartById);


router.post(
  "/:cid/product/:pid",
  passport.authenticate("current", { session: false }),
  CartController.addProductToCart
);


router.post(
  "/:cid/purchase",
  passport.authenticate("current", { session: false }),
  CartController.purchaseCart
);

export default router;
