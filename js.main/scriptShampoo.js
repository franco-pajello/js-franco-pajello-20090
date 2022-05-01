let carrito = [];
const productos = [{
    id: 0,
    nombre: "shampoo graso",
    precio: 500,
    img: "./img-productos/shampoo-graso.jpg"
  },
  {
    id: 1,
    nombre: "shampoo seco",
    precio: 500,
    img: "./img-productos/shampoo-seco.jpg "
  },
  {
    id: 2,
    nombre: "shampoo normal",
    precio: 500,
    img: "./img-productos/shampoo-normal.jpg"
  },
  {
    id: 3,
    nombre: "acondicionador",
    precio: 400,
    img: "./img-productos/acondicionador.jpg"
  },
  {
    id: 4,
    nombre: "Balsamo labial",
    precio: 600,
    img: "./img-productos/balsamo-labial.jpg"
  },
  {
    id: 5,
    nombre: "Jabon",
    precio: 250,
    img: "./img-productos/jabon-organico-rosa.jpg",

  },

];
const contenedor = document.getElementById("container");
contenedor.className = "row"

productos.forEach((producto) => {

  let card = document.createElement("div");

  card.classList.add("card", "col-sm-12", "col-lg-3");

  card.innerHTML = `  <img src=${producto.img} class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title cardProducto">${producto.nombre}</h5>
  <p class="card-text cardPrecio">${ "$"+ producto.precio}</p>
  <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button"  class="btn btn-primary", id="btnComprar${producto.id}" idProducto="${producto.id}" >Añadir al carrito</button>
  </div> 
  
  </div>`;

  contenedor.appendChild(card);
  let btn = document.getElementById(`btnComprar${producto.id}`);
  btn.addEventListener("click", () => {
    let cantidad = 1
    let precioTotal = 0

    const productoRepetido = carrito.some(elemento => elemento.id === producto.id)
    if (productoRepetido) {

      const prod = carrito.map(prod => {
        if (prod.id === producto.id) {
          prod.cantidad++
          creamosCarrito(carrito)
          return;
        }
      })
    } else {

      obtenerProducto(producto.id, producto.nombre, producto.precio, cantidad, precioTotal)

    }

  })
});


//AGREGAMOS CARRITO COMO MODAL


let headerCarrito = document.getElementById("headerCarrito");

let carritoModal = document.createElement("div")
carritoModal.innerHTML =
  `<button type="button" class="btn btn-primary badge" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Carrito
  </button>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">Carrito</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body" id="modalCarritoBody">

  
  </div>
  <div d-flex justify-content-between>
  <h5><div class="modal-footer" > 
  TOTAL:<p id="precioTotalId"> </p>
  </div></h5>
  <div>
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">vaciar carrito</button>
  </div>
  </div>
  <div class="modal-footer  d-flex justify-content-between">  
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Comprar</button>
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
  
  </div>
  </div>
  </div>
  </div>`
headerCarrito.appendChild(carritoModal);


let precioTotalCard = document.getElementById("precioTotalId")

const modalCarritoBody = document.getElementById("modalCarritoBody");

function creamosCarrito(array) {

  modalCarritoBody.innerHTML = ""

  array.forEach(producto => {

    let productoAgregadoAlCarrito = document.createElement("div")
    productoAgregadoAlCarrito.innerHTML =
      `<div class="alert alert-success" role="alert">
      <h4 class="alert-heading">${producto.nombre} 
      <hr>
      <p class="mb-0">${producto.cantidad}</p>
      <hr>
      <p class="mb-0">${producto.precio}</p> <button id="btnEliminar${producto.id}" type="button" class="btn btn-dark">ELIMINAR</button></h4>
      
      </div> `

    modalCarritoBody.appendChild(productoAgregadoAlCarrito);


    let btnEliminar = document.getElementById(`btnEliminar${producto.id}`);

    btnEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.id)
    })
  });
  precioTotalCard.innerText = carrito.reduce((acc , prod)=> acc + prod.precio * prod.cantidad,0)
}

function obtenerProducto(productoId, productoNombre, productoPrecio, cantidad, precioTotal) {
  let productoIdd = productoId
  let productoNombree = productoNombre
  let productoPrecioo = productoPrecio
  let productoCantidadd = cantidad
  let totalPrecio = precioTotal
  armandoObjDlCarrito(productoIdd, productoNombree, productoPrecioo, productoCantidadd, totalPrecio)

}

function armandoObjDlCarrito(productoIdd, productoNombree, productoPrecioo, productoCantidadd, totalPrecio) {

  const productoDelCarrito = {
    id: productoIdd,
    nombre: productoNombree,
    precio: productoPrecioo,
    cantidad: productoCantidadd,
    total: totalPrecio
  }
  carrito.push(productoDelCarrito)

  creamosCarrito(carrito)

}

function eliminarDelCarrito(elementid) {
  const buscamosElementoId = carrito.find((producto) => producto.id === elementid)
  const indice = carrito.indexOf(buscamosElementoId)
  if(buscamosElementoId.cantidad > 1){
    buscamosElementoId.cantidad --
  }else{

    carrito.splice(indice, 1)
  }
  creamosCarrito(carrito)
}