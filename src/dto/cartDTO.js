export class cartDTO {
  constructor(cart) {
    if (!cart || !cart._id || !cart.products) {
      throw new Error("Datos del carrito incompletos");
    }

    this.id = cart._id;
    this.products = cart.products.map((product) => ({
      productId: product.product._id,
      title: product.product.title,
      description: product.product.descripcion,
      price: product.product.precio,
      quantity: product.quantity,
    }));
  }
}
