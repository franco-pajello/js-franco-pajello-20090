/* function NuevoProducto(id, producto, precio, img) {
  this.id = id;
  this.producto = producto;
  this.precio = precio;
  this.img = img;

} */


 class ProductoCarrito {
  constructor(producto) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.cantidad = 1;
    this.precio = producto.precio;
    this.precioTotal = producto.precio;
  }

  agregarUnidad() {
     this.cantidad++;
  }

  quitarCantidadDelStock() {
    this.cantidad --;
  }

  actualizarPrecioTotal() {
   this.precioTotal = this.precio * this.cantidad;
  }
}



const productos = [{
    id: 0,
    nombre: "sampoo graso",
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
let carrito = [];
/* 
const productoNuevo = productos.push(new NuevoProducto(6, "jabon", 300, "./img-productos/jabon-facial-para-piel-seca-rosas-2.jpg")); */


const contenedor = document.getElementById("container");
contenedor.className = "row"

productos.forEach((producto) => {

  let card = document.createElement("div");


  card.classList.add("card", "col-sm-12", "col-lg-3", );

  card.innerHTML = `  <img src=${producto.img} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">${ "$"+ producto.precio}</p>
      <div class="btn-group" role="group" aria-label="Basic example">
      <button id="btnComprar${producto.id}" type="button"  class="btn btn-primary">comprar</button>
      </div> 

    </div>`;

  contenedor.appendChild(card);

  let btn = document.getElementById(`btnComprar${producto.id}`);

  btn.onclick = () => agregarCarrito(producto.id);
});

function agregarCarrito(idDelProducto) {
  let productoEnCarrito = carrito.includes(idDelProducto)

  if (productoEnCarrito === true) {
   /*  let index = carrito.findIndex((elemento) => elemento.id === alfajorEnCarrito.id); */

        carrito[productoEnCarrito].agregarUnidad();
        carrito[productoEnCarrito].actualizarPrecioTotal();
        creamosCarrito(carrito) 
      } 
  if (productoEnCarrito === false) {



    carrito.push(new ProductoCarrito(productos[idDelProducto]));
  }

  creamosCarrito(carrito) 
  
}
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
<h5 class="modal-title" id="exampleModalLabel">Mi Carrito</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body" id="modalCarritoBody">

</div>
<div class="modal-footer" >
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

</div>
</div>
</div>
</div>`
headerCarrito.appendChild(carritoModal);

let modalCarritoBody = document.getElementById("modalCarritoBody");
function creamosCarrito(array) {

for (let producto of array) {
  let productoAgregadoAlCarrito = document.createElement("div")
  productoAgregadoAlCarrito.innerHTML =
  `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">${producto.nombre} 
  <p>${producto.precio}</p>
  <hr>
  <p class="mb-0">${producto.cantidad}</p>
  <hr>
<p class="mb-0">$${producto.precio} <button id="btnEliminar${producto.id}" type="button" class="btn btn-dark">ELIMINAR</button></h4></p>
</div> ` 

modalCarritoBody.appendChild(productoAgregadoAlCarrito);

}
}

