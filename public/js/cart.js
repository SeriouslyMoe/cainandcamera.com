
// Toggle cart modal
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart-button');

if (cartButton && cartModal) {
  cartButton.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
  });
}

if (closeCartButton && cartModal) {
  closeCartButton.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
}

// Add item to cart
const addToCart = async (id, name, price, quantity = 1) => {
  const response = await fetch('/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, price, quantity }),
  });
  const data = await response.json();
  updateCartUI(data.cart);
};

// Remove item from cart
const removeFromCart = async (id) => {
  const response = await fetch('/cart/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const data = await response.json();
  updateCartUI(data.cart);
};

// Update cart UI
const updateCartUI = (cart) => {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  // Clear existing items
  cartItems.innerHTML = '';

  // Add new items
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="flex justify-between items-center">
        <div>
          <p class="font-bold">${item.name}</p>
          <p class="text-sm text-gray-600">$${item.price} x ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 p-2" title="Remove item" aria-label="Remove item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" style="stroke: #b91c1c; stroke-width: 2px;" stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="18" y1="6" x2="6" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
  });

  // Update cart count and total
  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);
};

// Fetch cart data on page load
const fetchCart = async () => {
  const response = await fetch('/cart');
  const data = await response.json();
  updateCartUI(data.cart);
};

fetchCart();