const divPedidos = document.querySelector("#pedidos");
const btnPedidos = document.querySelector("#btnPedidos");
const btnVerProducto = document.querySelector("#btnVerProducto");

btnPedidos.addEventListener("click", async (e) => {
  e.preventDefault();
  divPedidos.textContent = "";

  let respuesta = await fetch("http://localhost:3000/api/ordenes");
  if (respuesta.status >= 400) {
    divPedidos.textContent = `Error al cargar pedidos`;
    return;
  }

  let { ordenes } = await respuesta.json();
  console.log(ordenes);
  ordenes.forEach((o) => {
    let parrafo = document.createElement("p");
    parrafo.innerHTML = `Cliente: <b>${o.cliente.nombre}</b> | Negocio: <b>${o.negocio.nombre}</b> | Nro. Pedido: <b>${o.nroOrden}</b> - Total a Pagar: <b>$${o.total}</b>`;
    let hr = document.createElement("hr");
    divPedidos.append(parrafo, hr);
  });
  btnVerProducto.addEventListener("click", async () => {
  const productoId = "603c1f77bcf86cd799439011";
  
  try {
    const respuesta = await fetch(`http://localhost:3000/api/products/${productoId}`);
    const data = await respuesta.json();

    if (data.product) {
      const producto = data.product;
      divProducto.innerHTML = `
        <h3>Producto: ${producto.title}</h3>
        <p>Descripción: ${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Categoría: ${producto.categoria}</p>
      `;
    } else {
      divProducto.innerHTML = "Producto no encontrado";
    }
  } catch (error) {
    divProducto.innerHTML = "Error al cargar el producto";
  }
});
btnVerProducto.addEventListener("click", async () => {
  const productoId = "603c1f77bcf86cd799439011"; 

  try {
    const respuesta = await fetch(
      `http://localhost:3000/api/products/${productoId}`
    );
    const data = await respuesta.json();

    if (data.product) {
      const producto = data.product;
      divProducto.innerHTML = `
        <h3>Producto: ${producto.title}</h3>
        <p>Descripción: ${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Categoría: ${producto.categoria}</p>
      `;
    } else {
      divProducto.innerHTML = "Producto no encontrado";
    }
  } catch (error) {
    divProducto.innerHTML = "Error al cargar el producto";
  }
});
});
