// Product Data
const products = [
    { id: 1, name: 'Phone', price: 10000 },
    { id: 2, name: 'Laptop', price: 50000 },
    { id: 3, name: 'Headphones', price: 2000 },
    { id: 4, name: 'Keyboard', price: 1500 },
    { id: 5, name: 'Mouse', price: 800 },
];

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productEl = document.getElementById('products');
const cartEl = document.getElementById('cartItems');
const totalEl = document.getElementById('total');

// Save cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Render Products
function renderProducts(list) {
    productEl.innerHTML = '';

    list.forEach((p) => {
        const div = document.createElement('div');
        div.className = 'card';

        div.innerHTML = `
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;

        productEl.appendChild(div);
    });
}

// Add to cart
function addToCart(id) {
    const item = cart.find((i) => i.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ id, qty: 1 });
    }

    saveCart();
    renderCart();
}

// Change quantity
function changeQty(id, qty) {
    const item = cart.find((i) => i.id === id);

    item.qty += qty;

    if (item.qty <= 0) {
        cart = cart.filter((i) => i.id !== id);
    }

    saveCart();
    renderCart();
}

// Remove item
function removeItem(id) {
    cart = cart.filter((i) => i.id !== id);
    saveCart();
    renderCart();
}

// Render Cart
function renderCart() {
    cartEl.innerHTML = '';

    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);

        const div = document.createElement('div');
        div.className = 'cart-item';

        div.innerHTML = `
        <span>${product.name} (₹${product.price}) x ${item.qty}</span>
        <div class="actions">
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <button onclick="removeItem(${item.id})">❌</button>
        </div>
      `;

        cartEl.appendChild(div);
    });

    updateTotal();
}

// Total Calculation
function updateTotal() {
    let total = 0;

    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        total += product.price * item.qty;
    });

    const tax = total * 0.1;
    const final = total + tax;

    totalEl.textContent = `Total: ₹${total} | Tax (10%): ₹${tax.toFixed(2)} | Final: ₹${final.toFixed(2)}`;
}

// Search
document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = products.filter((p) => p.name.toLowerCase().includes(value));

    renderProducts(filtered);
});

// Init
renderProducts(products);
renderCart();