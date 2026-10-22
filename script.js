(function() {
  "use strict";

  let carrito = [];

  // Catálogo actualizado con solo 3 bebidas de 250ml
  const productos = {
    "papas-pollo": { nombre: "Papas Locas de pollo", precio: 38 },
    "coca-250": { nombre: "Coca-Cola 250 ml", precio: 5 },
    "fanta-250": { nombre: "Fanta 250 ml", precio: 5 },
    "sprite-250": { nombre: "Sprite 250 ml", precio: 5 }
  };

  const listaDOM = document.getElementById("lista-carrito");
  const contadorDOM = document.getElementById("contador");
  const cantidadTotalDOM = document.getElementById("cantidad-total");
  const totalElementoDOM = document.getElementById("total-carrito");
  const avisoDOM = document.getElementById("aviso");
  
  let temporizadorAviso;

  function agregarAlCarrito(id) {
    const producto = productos[id];
    if (!producto) { mostrarAviso("No se encontró el producto"); return; }

    const existente = carrito.find(item => item.id === id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ id: id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    actualizarCarrito();
    mostrarAviso("¡Producto agregado al carrito!");
  }

  function actualizarCarrito() {
    let unidades = 0;
    let total = 0;

    carrito.forEach(item => {
      unidades += item.cantidad;
      total += item.precio * item.cantidad;
    });

    contadorDOM.textContent = unidades;
    cantidadTotalDOM.textContent = unidades + (unidades === 1 ? " unidad" : " unidades");
    totalElementoDOM.textContent = "Bs " + total.toFixed(2); 

    listaDOM.innerHTML = "";

    if (carrito.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "vacio";
      vacio.textContent = "Aquí no hay nada todavía. ¡No dejes que te gane el antojo!";
      listaDOM.appendChild(vacio);
      return;
    }

    carrito.forEach((item, indice) => {
      const fila = document.createElement("div");
      fila.className = "item";

      const informacion = document.createElement("div");
      
      const nombre = document.createElement("p");
      nombre.className = "item-nombre";
      nombre.textContent = item.nombre;

      const precio = document.createElement("p");
      precio.className = "item-precio";
      precio.textContent = "Bs " + item.precio + " x " + item.cantidad + " = Bs " + (item.precio * item.cantidad).toFixed(2);

      informacion.append(nombre, precio);

      const controles = document.createElement("div");
      controles.className = "controles";

      const restar = document.createElement("button");
      restar.className = "cantidad-btn";
      restar.textContent = "−";
      restar.setAttribute("aria-label", "Restar uno");
      restar.addEventListener("click", () => cambiarCantidad(indice, -1));

      const cantidad = document.createElement("span");
      cantidad.className = "cantidad";
      cantidad.textContent = item.cantidad;

      const sumar = document.createElement("button");
      sumar.className = "cantidad-btn";
      sumar.textContent = "+";
      sumar.setAttribute("aria-label", "Sumar uno");
      sumar.addEventListener("click", () => cambiarCantidad(indice, 1));

      const quitar = document.createElement("button");
      quitar.className = "quitar";
      quitar.textContent = "Quitar";
      quitar.setAttribute("aria-label", "Eliminar producto");
      quitar.addEventListener("click", () => eliminarProducto(indice));

      controles.append(restar, cantidad, sumar, quitar);
      fila.append(informacion, controles);
      listaDOM.appendChild(fila);
    });
  }

  function cambiarCantidad(indice, cambio) {
    if (!carrito[indice]) return;
    carrito[indice].cantidad += cambio;
    if (carrito[indice].cantidad <= 0) {
      carrito.splice(indice, 1);
    }
    actualizarCarrito();
  }

  function eliminarProducto(indice) {
    if (!carrito[indice]) return;
    carrito.splice(indice, 1);
    actualizarCarrito();
    mostrarAviso("Producto eliminado");
  }

  function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    mostrarAviso("Carrito vaciado");
  }

  function irAlCarrito() {
    document.getElementById("carrito").scrollIntoView({ behavior: "smooth" });
  }

  function mostrarAviso(texto) {
    avisoDOM.textContent = texto;
    avisoDOM.hidden = false;
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => {
      avisoDOM.hidden = true;
    }, 2200);
  }

  function confirmarPedido() {
    if (carrito.length === 0) { mostrarAviso("Primero agrega un producto"); return; }

    // ¡RECUERDA CAMBIAR ESTE NÚMERO POR EL DEL CLIENTE!
    const numeroWhatsApp = "59162280649"; 
    if (!numeroWhatsApp) { mostrarAviso("Falta configurar el WhatsApp"); return; }

    let mensaje = "¡Hola! Quiero hacer este pedido:\n\n";
    let total = 0;

    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      mensaje += item.cantidad + " - " + item.nombre + " - Bs " + subtotal.toFixed(2) + "\n";
    });

    mensaje += "\nTotal a pagar: Bs " + total.toFixed(2);
    mensaje += "\n\n¿Me confirman cuánto tiempo tardará, por favor?";

    const url = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensaje);
    window.location.href = url;
  }

  window.irAlCarrito = irAlCarrito;
  window.agregarAlCarrito = agregarAlCarrito;
  window.vaciarCarrito = vaciarCarrito;
  window.confirmarPedido = confirmarPedido;

  actualizarCarrito();
})();