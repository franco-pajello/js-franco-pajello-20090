/* function NuevoProducto(id, producto, precio, img) {
    this.id = id;
    this.producto = producto;
    this.precio = precio;
    this.img = img;

} */



const productos = [{
        id: 0,
        producto: "sampoo graso",
        precio: 500,
        img: "./img-productos/shampoo-graso.jpg"
    },
    {
        id: 1,
        producto: "shampoo seco",
        precio: 500,
        img: "./img-productos/shampoo-seco.jpg "
    },
    {
        id: 2,
        producto: "shampoo normal",
        precio: 500,
        img: "./img-productos/shampoo-normal.jpg"
    },
    {
        id: 3,
        producto: "acondicionador",
        precio: 400,
        img: "./img-productos/acondicionador.jpg"
    },
    {
        id: 4,
        producto: "Balsamo labial",
        precio: 600,
        img: "./img-productos/balsamo-labial.jpg"
    },
    {
        id: 5,
        producto: "Jabon",
        precio: 250,
        img: "./img-productos/jabon-organico-rosa.jpg",
    },

];


/* const productoNuevo = productos.push(new NuevoProducto(6, "jabon", 300, "./img-productos/jabon-facial-para-piel-seca-rosas-2.jpg")); */
const contenedor = document.getElementById("container");
productos.forEach((producto) => {

    let card = document.createElement("div");


    card.classList.add("card", "col-sm-12", "col-lg-3");
    card.innerHTML = `  <img src=${productos.img} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${productos.producto}</h5>
      <p class="card-text">${ productos.precio}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
 
    `;
    contenedor.appendChild(card);
});