let cart = JSON.parse(localStorage.getItem('cart')) || [];

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        const productsContainer = document.getElementById('products-container');
        json.forEach(product => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="card-content">
                    <h2>${product.title}</h2>
                    <p>Precio: $${product.price}</p>
                    <p>Categoría: ${product.category}</p>
                    <button class="add-to-cart" onclick='addToCart(${JSON.stringify(product)})'>Agregar al carrito</button>
                </div>
            `;
            productsContainer.appendChild(cardDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} ha sido agregado al carrito!`);
}