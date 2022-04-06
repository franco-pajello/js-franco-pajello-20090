let productos = [
    {
      id: 1,
      nombre: "Producto 1",
      precio: 950,
      imagen: "./img/imagenproducto.jpg",
    },
    {
      id: 2,
      nombre: "Producto 2",
      precio: 750,
      imagen: "./img/imagenproducto.jpg",
    },
    {
      id: 3,
      nombre: "Producto 3",
      precio: 900,
      imagen: "./img/imagenproducto.jpg",
    },
    {
      id: 4,
      nombre: "Producto 4",
      precio: 450,
      imagen: "./img/imagenproducto.jpg",
    },
    {
      id: 5,
      nombre: "Producto 5",
      precio: 500,
      imagen: "./img/imagenproducto.jpg",
    },
    {
      id: 6,
      nombre: "Producto 6",
      precio: 4500,
      imagen: "./img/imagenproducto.jpg",
    },
    {
      id: 7,
      nombre: "Producto 7",
      precio: 500,
      imagen: "./img/imagenproducto.jpg",
    },
    {
      id: 8,
      nombre: "Producto 8",
      precio: 550,
      imagen: "./img/imagenproducto.jpg",
    },
  ];
  
  const contenedor = document.getElementById("container");
  contenedor.innerHTML = "";
  
  productos.forEach((producto, indice) => {
    let card = document.createElement("div");
    card.classList.add("card", "col-sm-12", "col-lg-3");
    let html = `
      <img src="${producto.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.precio}</p>
        <a href="#cart" class="btn btn-primary" onClick="agregarAlCarrito(${indice})">Comprar</a>
      </div>
        `;
    card.innerHTML = html;
    contenedor.appendChild(card);
  });
  
  let modalCarrito = document.getElementById("cart");
  const agregarAlCarrito = (indiceDelArrayProducto) => {
    //findIndex devuelve el indice del elemento encontrado
    // si no encuentra nada devuelve menos 1 (-1)
    const indiceEncontradoCarrito = cart.findIndex((elemento) => {
      return elemento.id === productos[indiceDelArrayProducto].id;
    });
    if (indiceEncontradoCarrito === -1) {
      //agrego el producto
      const productoAgregar = productos[indiceDelArrayProducto];
      productoAgregar.cantidad = 1;
      cart.push(productoAgregar);
      actualizarStorage(cart);
      dibujarCarrito();
    } else {
      //incremento cantidad
      cart[indiceEncontradoCarrito].cantidad += 1;
      actualizarStorage(cart);
      dibujarCarrito();
    }
  };
  const dibujarCarrito = () => {
    let total = 0;
    modalCarrito.className = "cart";
    modalCarrito.innerHTML = "";
    if (cart.length > 0) {
      cart.forEach((producto, indice) => {
        total = total + producto.precio * producto.cantidad;
        const carritoContainer = document.createElement("div");
        carritoContainer.className = "producto-carrito";
        carritoContainer.innerHTML = `
          <img class="car-img" src="${producto.imagen}"/>
          <div class="product-details">
            ${producto.nombre}
          </div>
          <div class="product-details" > Cantidad: ${producto.cantidad}</div>
          <div class="product-details"> Precio: $ ${producto.precio}</div>
          <div class="product-details"> Subtotal: $ ${
            producto.precio * producto.cantidad
          }</div>
          <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>
           `;
        modalCarrito.appendChild(carritoContainer);
      });
      // Dibujo el total y lo appendeo en el div capturado y guardado en la variable modalCarrito
      const totalContainer = document.createElement("div");
      totalContainer.className = "total-carrito";
      totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
      <button class= "btn btn-danger finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
      modalCarrito.appendChild(totalContainer);
    } else {
      modalCarrito.classList.remove("cart");
    }
  };
  
  let cart = [];
  // si existen datos en el local storage hago la carga inicial desde local storage.
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    dibujarCarrito();
  }
  
  const removeProduct = (indice) => {
    cart.splice(indice, 1);
    actualizarStorage(cart);
    dibujarCarrito();
  };
  const finalizarCompra = () => {
    const total = document.getElementsByClassName("total")[0].innerHTML;
    modalCarrito.innerHTML = "";
    const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> YA CASI ES TUYA LA COMPRA, EL   ${total} </p></div>
    <div class="datos-cliente">
    <p class="datos-parrafo"> Complete el formulario con sus datos para coordinar la entrega</p>
    <button class= "btn btn-danger formulario" id="formulario" onClick="dibujarFormu()"> FORMULARIO </button>
    </div>`;
    modalCarrito.innerHTML = compraFinalizada;
  };
  const dibujarFormu = () => {
    modalCarrito.innerHTML = "";
    const formulario = `
    <h2> DATOS PARA EL ENVÍO </h2>
    <div class="contact__secction-container">
     <div class="row">
       <div class="contact__secction__item">
         <label>Nombre</label>
         <input type="text" id="nombre" placeholder="Nombre"  />
       </div>
       <div class="contact__secction__item">
         <label>E-mail</label>
         <input type="text" id="mail" placeholder="E-mail" />
       </div>
       <div class="contact__secction__item">
         <label>Telefono</label>
         <input type="text" id="telefono" placeholder="Telefono"  />
       </div>
       <div class="contact__secction__item">
         <label>Domicilio</label>
         <input type="text" id="domicilio" placeholder="Domicilio" />
       </div>
       <div class="contact-button">
         <button type="button" class="btn btn-danger envio" onClick="mostrarMensaje()" >Confirmar</button>
       </div>
     </div>
   </div>`;
    modalCarrito.innerHTML = formulario;
  };
  
  const mostrarMensaje = () => {
    const nombreCliente = document.getElementById("nombre").value;
    const domicilioCliente = document.getElementById("domicilio").value;
    modalCarrito.innerHTML = "";
    let mensaje = `<div class="mensaje-final">Gracias ${nombreCliente} por su compra! en 72 horas recibira su paquete en ${domicilioCliente} </div>`;
    modalCarrito.innerHTML = mensaje;
  };
  
  const actualizarStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };