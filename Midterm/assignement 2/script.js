// Midterm Task 3: Working Cart Badge and Mini-Cart
// Student: Abdullah Saleem (FA24-BCS-141)
// Roll number ends on 41 -> N = 41
// Max limit per product = (N % 4) + 2 = (41 % 4) + 2 = 3

let cart = [];
const MAX_LIMIT = (41 % 4) + 2; // = 3

// Function to update the entire cart UI
function updateCartUI() {
  // 1. Update all cart badges on the page
  const badges = document.querySelectorAll('.cart-badge, #cartBadge');
  badges.forEach(function (badge) {
    badge.textContent = cart.length;
  });

  // 2. Render mini-cart list
  const miniCartItems = document.getElementById('miniCartItems');
  if (miniCartItems) {
    miniCartItems.innerHTML = '';

    if (cart.length === 0) {
      miniCartItems.innerHTML = '<p class="mini-cart-empty">Your cart is empty.</p>';
    } else {
      cart.forEach(function (item, index) {
        const itemRow = document.createElement('div');
        itemRow.className = 'mini-cart-item';

        const info = document.createElement('div');
        info.className = 'mini-cart-item-info';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'mini-cart-item-name';
        nameSpan.textContent = item.name;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'mini-cart-item-price';
        priceSpan.textContent = '$' + item.price.toFixed(2);

        info.appendChild(nameSpan);
        info.appendChild(priceSpan);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'mini-cart-remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          cart.splice(index, 1);
          updateCartUI();
        });

        itemRow.appendChild(info);
        itemRow.appendChild(removeBtn);
        miniCartItems.appendChild(itemRow);
      });
    }
  }

  // 3. Calculate total price using reduce()
  const totalEl = document.getElementById('miniCartTotal');
  if (totalEl) {
    const total = cart.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
    totalEl.textContent = '$' + total.toFixed(2);
  }

  // 4. Update product card buttons when limit reached
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(function (card) {
    const btn = card.querySelector('.btn-welly-coral, .btn');
    const titleEl = card.querySelector('.card-title');

    if (btn && titleEl) {
      const productName = titleEl.textContent.trim();
      const count = cart.filter(function (item) {
        return item.name === productName;
      }).length;

      if (count >= MAX_LIMIT) {
        btn.textContent = 'Limit reached';
        btn.classList.add('btn-limit-reached');
      } else {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('btn-limit-reached');
      }
    }
  });
}

// Global click event delegation for "Add to Cart" and cart toggle
document.addEventListener('click', function (e) {
  // Check if cart icon was clicked to toggle mini-cart
  const cartToggle = e.target.closest('#cartToggle, .cart-link');
  if (cartToggle) {
    e.preventDefault();
    const miniCart = document.getElementById('miniCart');
    if (miniCart) {
      miniCart.classList.toggle('active');
    }
    return;
  }

  // Check if "Add to Cart" button on any product card was clicked
  const addBtn = e.target.closest('.product-card .btn-welly-coral, .product-card .btn');
  if (addBtn) {
    e.preventDefault();

    const card = addBtn.closest('.product-card');
    if (!card) return;

    const titleEl = card.querySelector('.card-title');
    const priceEl = card.querySelector('.product-price');
    if (!titleEl || !priceEl) return;

    const productName = titleEl.textContent.trim();
    const priceVal = parseFloat(priceEl.textContent.replace('$', '').trim()) || 0;

    // Count how many of this product are in cart
    const count = cart.filter(function (item) {
      return item.name === productName;
    }).length;

    // Only add if below max limit (3)
    if (count < MAX_LIMIT) {
      cart.push({ name: productName, price: priceVal });
      updateCartUI();
    }
  }
});

// Run once on initial load to set up default UI state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateCartUI);
} else {
  updateCartUI();
}
