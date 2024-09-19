let carrito = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';
    
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.price * producto.quantity; // Calculamos el total
        const li = document.createElement('li');
        li.className = 'producto';
        li.innerHTML = `
            ${producto.title} - $${producto.price} x ${producto.quantity}
            <div>
                <button class="decrease-btn" onclick="disminuirCantidad(${index})">-</button>
                <button class="increase-btn" onclick="aumentarCantidad(${index})">+</button>
            </div>
        `;
        listaProductos.appendChild(li);
    });

    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(carrito)); // Actualizamos el carrito en localStorage
}

// Función para disminuir la cantidad de un producto
function disminuirCantidad(index) {
    if (carrito[index].quantity > 1) {
        carrito[index].quantity -= 1;
    } else {
        carrito.splice(index, 1); // Si la cantidad es 1, se elimina el producto del carrito
    }
    actualizarCarrito();
}

// Función para aumentar la cantidad de un producto
function aumentarCantidad(index) {
    carrito[index].quantity += 1;
    actualizarCarrito();
}

// Función para limpiar el carrito
function limpiarCarrito() {
    carrito = [];
    localStorage.setItem('cart', JSON.stringify(carrito));
    actualizarCarrito();
}

// Llamar a la función para actualizar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);

// Asignar evento al botón de limpiar carrito
document.getElementById('clear-cart').addEventListener('click', limpiarCarrito);
