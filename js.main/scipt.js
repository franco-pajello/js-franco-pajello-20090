const productos = [];
const stockDisponible = [];
let productoSeleccionado = 0;
let productoSeleccionado1 = 0;
let productoSeleccionado2 = 0;
let productoSeleccionado3 = 0;
let productoSeleccionado4 = 0;
let total = 0;

function sumar(a, b, c, d, e) {

    total = a + b + c + d + e;
}

function mostrar(mensaje) {
    alert(mensaje)
}

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);

    }

}

productos.push(new Producto("yerba $500", "500"));
productos.push(new Producto("azucar $70", "70"));
productos.push(new Producto("bizcochito $50", "50"));
productos.push(new Producto("sal $70", "70"));
productos.push(new Producto("aceite $150", "150"));
productos.push(new Producto("total", ""));
productos.push(new Producto("presione x para salir", ""));

productos.forEach(element => {

    stockDisponible.push(element.nombre + "  ")

});


for (let i = 0; i < 3; i++) {

   let productoElegido =  prompt(stockDisponible)



    if (productoElegido == "x") {
        alert("Gracias por su elegirnos");
        break
    }



    if (productoElegido != "x" || productoElegido != "") {

        switch (productoElegido) {
            case "yerba":
                alert("Elegiste yerba");
                productoSeleccionado = 500;
                break;
            case "azucar":
                alert("Elegiste azucar");
                productoSeleccionado1 = 70;
                break;
            case "bizcochito":
                alert("elegiste bizcochito");
                productoSeleccionado2 = 50;
                break;
            case "sal":
                alert("Elegiste sal");
                productoSeleccionado3 = 70;
                break;
            case "aceite":
                alert("Elegiste aceite");
                productoSeleccionado4 = 150;
                break;

            case "total":

                sumar(productoSeleccionado, productoSeleccionado1, productoSeleccionado2, productoSeleccionado3, productoSeleccionado4);
                mostrar(total)
                break;
            default:
                if (productoElegido == "") {
                    alert("Ingrese un producto del stock");

                }

                alert("Ingrese un producto del stock");


                break;



        }


    }

}