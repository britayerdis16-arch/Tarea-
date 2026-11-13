const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {

    menu.classList.toggle("activo");

});

const enlacesMenu = document.querySelectorAll("#menu a");

enlacesMenu.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        menu.classList.remove("activo");

    });

});

const modoBtn = document.getElementById("modoBtn");

modoBtn.addEventListener("click", function () {

    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")) {

        modoBtn.textContent = "☀️";

    } else {

        modoBtn.textContent = "🌙";

    }

});

const arribaBtn = document.getElementById("arribaBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        arribaBtn.classList.add("mostrar");

    } else {

        arribaBtn.classList.remove("mostrar");

    }

});


arribaBtn.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

const botonesAgregar =
    document.querySelectorAll(".agregar");

const carritoBtn =
    document.getElementById("carritoBtn");

const carritoPanel =
    document.getElementById("carritoPanel");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const carritoProductos =
    document.getElementById("carritoProductos");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const totalCarrito =
    document.getElementById("totalCarrito");

const vaciarCarrito =
    document.getElementById("vaciarCarrito");


let carrito = [];

botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const nombre =
            boton.dataset.nombre;

        const precio =
            Number(boton.dataset.precio);


        const productoExistente =
            carrito.find(function (producto) {

                return producto.nombre === nombre;

            });


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });

        }


        actualizarCarrito();


        // Cambiar temporalmente el botón

        boton.textContent = "Agregado ✓";

        boton.style.backgroundColor = "#75a982";


        setTimeout(function () {

            boton.textContent =
                "Agregar al carrito";

            boton.style.backgroundColor =
                "#2E7D32";

        }, 1500);

        carritoPanel.classList.add("abierto");

    });

});

carritoBtn.addEventListener("click", function () {

    carritoPanel.classList.add("abierto");

});

cerrarCarrito.addEventListener("click", function () {

    carritoPanel.classList.remove("abierto");

});


// ACTUALIZAR CARRITO

function actualizarCarrito() {

    carritoProductos.innerHTML = "";


    if (carrito.length === 0) {

        carritoProductos.innerHTML =
            '<p class="carrito-vacio">Tu carrito está vacío.</p>';

        contadorCarrito.textContent = "0";

        totalCarrito.textContent = "₡0";

        return;

    }


    let cantidadTotal = 0;
    let total = 0;


    carrito.forEach(function (producto, indice) {

        cantidadTotal += producto.cantidad;

        total += producto.precio * producto.cantidad;


        const item =
            document.createElement("div");

        item.classList.add("carrito-item");


        item.innerHTML = `

            <div class="carrito-item-info">

                <h3>${producto.nombre}</h3>

                <p>
                    ₡${producto.precio.toLocaleString("es-CR")}
                </p>

            </div>


            <div class="carrito-cantidad">

                <button
                    class="cantidad-btn"
                    onclick="cambiarCantidad(${indice}, -1)"
                >
                    −
                </button>

                <span>
                    ${producto.cantidad}
                </span>

                <button
                    class="cantidad-btn"
                    onclick="cambiarCantidad(${indice}, 1)"
                >
                    +
                </button>

            </div>


            <button
                class="eliminar-item"
                onclick="eliminarProducto(${indice})"
            >
                🗑️
            </button>

        `;


        carritoProductos.appendChild(item);

    });


    contadorCarrito.textContent =
        cantidadTotal;


    totalCarrito.textContent =
        "₡" + total.toLocaleString("es-CR");

}


// CAMBIAR CANTIDAD

function cambiarCantidad(indice, cambio) {

    carrito[indice].cantidad += cambio;


    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);

    }


    actualizarCarrito();

}

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}

vaciarCarrito.addEventListener("click", function () {

    if (carrito.length === 0) {

        alert("El carrito ya está vacío.");

        return;

    }

    carrito = [];

    actualizarCarrito();

});

const pedidoBtn =
    document.getElementById("pedidoBtn");


pedidoBtn.addEventListener("click", function () {

    // Ir directamente al formulario

    document.getElementById("contacto").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(function () {

        const mensaje =
            document.getElementById("mensaje");

        mensaje.focus();

        mensaje.value =
            "Quiero solicitar un dibujo personalizado. Mi idea es: ";

    }, 700);

});

const formulario =
    document.getElementById("formulario");

const mensajeFormulario =
    document.getElementById("mensajeFormulario");


formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();


    const nombre =
        document.getElementById("nombre").value.trim();

    const correo =
        document.getElementById("correo").value.trim();

    const mensaje =
        document.getElementById("mensaje").value.trim();

    if (
        nombre === "" ||
        correo === "" ||
        mensaje === ""
    ) {

        mensajeFormulario.textContent =
            "Por favor, completa todos los campos.";

        mensajeFormulario.style.color =
            "#c94f62";

        return;

    }

    const formatoCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!formatoCorreo.test(correo)) {

        mensajeFormulario.textContent =
            "Ingresa un correo electrónico válido.";

        mensajeFormulario.style.color =
            "#c94f62";

        return;

    }

    mensajeFormulario.textContent =
        "¡Mensaje enviado correctamente! ♡";

    mensajeFormulario.style.color =
        "#4c9b6b";


    formulario.reset();

});

const imagenesGaleria =
    document.querySelectorAll(
        ".galeria-container img"
    );


imagenesGaleria.forEach(function (imagen) {

    imagen.addEventListener("click", function () {

        imagen.classList.toggle("seleccionada");

    });

});