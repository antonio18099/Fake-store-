let cart = JSON.parse(localStorage.getItem('cart')) || [];

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        const productsContainer = document.getElementById('products-container');
        json.forEach(product => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            const existingProduct = cart.find(item => item.id === product.id);
            const buttonLabel = existingProduct ? `Agregar al carrito (${existingProduct.quantity})` : 'Agregar al carrito';

            cardDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="card-content">
                    <h2>${product.title}</h2>
                    <p>Precio: $${product.price}</p>
                    <p>Categoría: ${product.category}</p>
                    <button class="add-to-cart" data-id="${product.id}">${buttonLabel}</button>
                </div>
            `;
            productsContainer.appendChild(cardDiv);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const product = json.find(item => item.id === productId);
                addToCart(product, e.target);
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function addToCart(product, button) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    const updatedProduct = cart.find(item => item.id === product.id);
    button.innerText = `Agregar al carrito (${updatedProduct.quantity})`;

    // Mostrar notificación en lugar de alerta
    showNotification(`${product.title} ha sido agregado al carrito!`);
}

function showNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    
    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 1000); // Desaparece después de 2 segundos
}
