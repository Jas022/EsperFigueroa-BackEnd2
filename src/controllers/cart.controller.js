const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.body.cartId);
    cart.products.push(req.body.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
