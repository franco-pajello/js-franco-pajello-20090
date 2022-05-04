
window.onload = function(){
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage.length >=1){
    carrito=storage;
    creamosCarrito(storage)
  }
}


let carrito = [];
const contenedor = document.getElementById("container");
contenedor.className = "row"
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {

    data.forEach((producto) => {

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

        Swal.fire({
          toast: true,
          padding: '1em',
          color: '#716add',
          position: 'top-end',
          icon: 'success',
          title: 'producto agregado al carrito',
          showConfirmButton: false,
          timer: 1000
        })

        let cantidad = 1
        let precioTotal = 0

        const productoRepetido = carrito.some(elemento => elemento.id === producto.id)

        let prod;
        productoRepetido ? ((prod = carrito.map(prod => {
          ((prod.id === producto.id ? ((prod.cantidad++), (btnCarrito.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0),(creamosCarrito(carrito)))) : NaN))
        }))) : obtenerProducto(producto.id, producto.nombre, producto.precio, cantidad, precioTotal);
           addadd()
         
      })
    });
  }).catch((error) => {
    alert("error al cargar los datos")
  })

let headerCarrito = document.getElementById("headerCarrito");

let carritoModal = document.createElement("div")
carritoModal.innerHTML =
  `<button type="button" class="btn btn-primary badge " data-bs-toggle="modal" data-bs-target="#exampleModal">
  Carrito <p class="d-inline" id="btnCarrito"> </p>
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
  <div class=" d-flex justify-content-around">
  <h5 class="d-inline"><div class="modal-footer d-inline " > 
  TOTAL: $<p id="precioTotalId" class="d-inline"> </p>
  </div></h5>
  <div class="d-inline">
  <button type="button" id="btnVaciarCarrito" class="btn btn-secondary">vaciar carrito</button>
  </div>
  </div>
  <div class="modal-footer  d-flex justify-content-between">  
  <button type="button" class="btn btn-secondary" id="btnComprar" data-bs-dismiss="modal">Comprar</button>
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir comprando</button>
  
  </div>
  </div>
  </div>
  </div>`
headerCarrito.appendChild(carritoModal);

let btnVaciarCarrito = document.getElementById(`btnVaciarCarrito`)

btnVaciarCarrito.addEventListener("click", () => {

  vaciarCarrito(carrito)
})

let btnCarrito = document.getElementById("btnCarrito")

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
      <div class=" d-flex justify-content-between">
      <p class="mb-0 d-inline" >c/u : $${producto.precio}</p> <button id="btnEliminar${producto.id}" type="button" class="btn btn-dark d-inline">ELIMINAR</button></h4>
      </div>
      </div> `

    modalCarritoBody.appendChild(productoAgregadoAlCarrito);
    let btnEliminar = document.getElementById(`btnEliminar${producto.id}`);

    btnEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.id)
      addadd()
     
    })

  });
  precioTotalCard.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
  btnCarrito.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
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

  buscamosElementoId.cantidad > 1 ? ((buscamosElementoId.cantidad--), (btnCarrito.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0))) : carrito.splice(indice, 1);
  
  creamosCarrito(carrito)
  
}

function vaciarCarrito(array) {

  let largoDelArrayCarritoVacio = ""
  array.length >= 1 ? ((largoDelArrayCarritoVacio = array.splice(0)), (modalCarritoBody.innerHTML = ""), (precioTotalCard.innerText = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)), (largoDelArrayCarritoVacio.push(creamosCarrito))) : (swal.fire({
    toast: true,
    padding: '1em',
    color: '#716add',
    position: 'center',
    icon: 'error',
    title: 'El carrito se encuentra vacio',
    showConfirmButton: false,
    timer: 1000
  }))

  addadd()
  btnCarrito.innerText = carrito.length = ""
}
let btnComprar = document.getElementById("btnComprar")
btnComprar.addEventListener("click",()=>{


if(carrito.length>=1){

  
  Swal.fire({
  position: 'center',
  icon: 'info',
  title:"Informacion del envio",
  html: `<form class="row g-3" id="formulario">
  <div class="col-md-4">
  <label for="validationDefault01" class="form-label" id="nombre">Nombre</label>
  <input type="text" class="form-control" id="validationDefault01" value="" required>
  </div>
  <div class="col-md-4">
  <label for="validationDefault02" class="form-label" id="apellido">Apellido</label>
  <input type="text" class="form-control" id="validationDefault02" value="" required>
  </div>
  <div class="col-md-4">
  <label for="validationDefaultUsername" class="form-label" id="email">Email</label>
  <div class="input-group">
  <input type="email" class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required>
  <span class="input-group-text" id="inputGroupPrepend2">@</span>
  </div>
  </div>
  <div class="col-md-6">
  <label for="validationDefault03" class="form-label">Provincia</label>
  <input type="text" class="form-control" id="validationDefault03" required>
  </div>
  <div class="col-md-6">
  <label for="validationDefault04" class="form-label">Partido</label>
  <input type="text" class="form-control" id="validationDefault04" required>

  </select>
  </div>
  <div class="col-md-4">
  <label for="validationDefault05" class="form-label">C/postal</label>
  <input type="number"  class="form-control" id="validationDefault05" required>
  </div>
  <div class="col-md-4">
  <label for="validationDefault06" class="form-label">Calle</label>
  <input type="text" class="form-control" id="validationDefault06" required>
  </div>
  <div class="col-md-4">
  <label for="validationDefault07" class="form-label">Altura</label>
  <input type="number"  min="1" class="form-control" id="validationDefault07" required>
  </div>
  <div class="col-12">
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
  <label class="form-check-label" for="invalidCheck2">
  Agree to terms and conditions
  </label>
  </div>
  </div>
  <div class="col-12">
  <button class="btn btn-primary" type="submit">Confirmar compra</button >
 
  </div>
  </form>
  <p id="log"></p>`,
  showConfirmButton: false,
  
})

}else{
  Swal.fire({
    toast:true,
    position: 'center',
    icon: 'error',
    title: 'El carrito se encuentra vacio',
    showConfirmButton: false,
    timer: 1000
  })
}
})

function addadd(){
  localStorage.setItem("carrito", JSON.stringify(carrito))

}
