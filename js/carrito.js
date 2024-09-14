let cart = JSON.parse(localStorage.getItem('cart')) || []; 

function updateCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; 
    let total = 0; 

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p>Precio: $${item.price}</p>
            <p>Cantidad: ${item.quantity}</p>
        `;
        cartContainer.appendChild(itemDiv);
        total += item.price * item.quantity; 
    });

    document.getElementById('total-price').textContent = total.toFixed(2); 
}

updateCart(); 