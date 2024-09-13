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
                    <button class="add-to-cart">Agregar al carrito</button>
                </div>
            `;
            productsContainer.appendChild(cardDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));