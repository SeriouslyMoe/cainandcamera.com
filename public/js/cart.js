
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
        <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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