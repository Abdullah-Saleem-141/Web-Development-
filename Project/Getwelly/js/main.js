document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const freeShippingThreshold = 35.0;

    const cartCountBadge = document.getElementById('cartCountBadge');
    const cartDrawerCount = document.getElementById('cartDrawerCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const shippingStatusText = document.getElementById('shippingStatusText');
    const shippingProgressBar = document.getElementById('shippingProgressBar');

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartCountBadge) cartCountBadge.textContent = totalItems;
        if (cartDrawerCount) cartDrawerCount.textContent = totalItems;
        if (cartSubtotal) cartSubtotal.textContent = '$' + subtotal.toFixed(2);

        // Update Free Shipping Progress
        if (shippingStatusText && shippingProgressBar) {
            if (subtotal >= freeShippingThreshold) {
                shippingStatusText.textContent = 'You unlocked Free Shipping!';
                shippingProgressBar.style.width = '100%';
            } else {
                const remaining = freeShippingThreshold - subtotal;
                shippingStatusText.textContent = 'Add $' + remaining.toFixed(2) + ' more for Free Shipping';
                const percent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
                shippingProgressBar.style.width = percent + '%';
            }
        }

        // Toggle Empty State vs Items
        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.classList.remove('d-none');
            if (cartItemsList) cartItemsList.innerHTML = '';
            if (checkoutBtn) checkoutBtn.disabled = true;
        } else {
            if (emptyCartMessage) emptyCartMessage.classList.add('d-none');
            if (checkoutBtn) checkoutBtn.disabled = false;

            if (cartItemsList) {
                cartItemsList.innerHTML = '';
                cart.forEach((item, index) => {
                    const row = document.createElement('div');
                    row.className = 'cart-item-row';
                    row.innerHTML = `
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <p class="cart-item-price mb-1">$${item.price.toFixed(2)}</p>
                            <div class="d-flex align-items-center">
                                <button class="cart-qty-btn" data-action="decrease" data-index="${index}">-</button>
                                <span class="cart-qty-num">${item.quantity}</span>
                                <button class="cart-qty-btn" data-action="increase" data-index="${index}">+</button>
                            </div>
                        </div>
                        <button class="cart-remove-btn ms-2" data-action="remove" data-index="${index}" title="Remove item">
                            <i class="bi bi-trash3"></i>
                        </button>
                    `;
                    cartItemsList.appendChild(row);
                });
            }
        }
    }

    // Add to Cart Buttons
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const img = this.getAttribute('data-img');

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, img, quantity: 1 });
            }

            updateCartUI();

            // Open Offcanvas Drawer
            const cartDrawerEl = document.getElementById('cartDrawer');
            if (cartDrawerEl && window.bootstrap) {
                const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartDrawerEl);
                offcanvas.show();
            }
        });
    });

    // Delegate quantity and remove actions inside Cart
    if (cartItemsList) {
        cartItemsList.addEventListener('click', function (e) {
            const targetBtn = e.target.closest('button');
            if (!targetBtn) return;

            const action = targetBtn.getAttribute('data-action');
            const index = parseInt(targetBtn.getAttribute('data-index'), 10);

            if (isNaN(index) || !cart[index]) return;

            if (action === 'increase') {
                cart[index].quantity += 1;
            } else if (action === 'decrease') {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }
            } else if (action === 'remove') {
                cart.splice(index, 1);
            }

            updateCartUI();
        });
    }

    // Live Product Search Filter
    const desktopSearch = document.getElementById('desktopSearchInput');
    const mobileSearch = document.getElementById('mobileSearchInput');

    function filterProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        const productCols = document.querySelectorAll('.products-section .col-6');

        productCols.forEach(col => {
            const name = col.querySelector('.product-name')?.textContent.toLowerCase() || '';
            const desc = col.querySelector('.product-desc')?.textContent.toLowerCase() || '';
            if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                col.style.display = '';
            } else {
                col.style.display = 'none';
            }
        });
    }

    if (desktopSearch) {
        desktopSearch.addEventListener('input', function () {
            filterProducts(this.value);
        });
    }

    if (mobileSearch) {
        mobileSearch.addEventListener('input', function () {
            filterProducts(this.value);
        });
    }

    updateCartUI();
});
