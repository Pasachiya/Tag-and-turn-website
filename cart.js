document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    const cartSubtotalEl = document.querySelector("#cart-subtotal");
    const cartTotalEl = document.querySelector("#cart-total");
    const shippingCostEl = document.querySelector("#shipping-cost");
    const checkoutBtn = document.getElementById("checkout-btn");
    const promoInput = document.getElementById("promo-code");
    const applyPromoBtn = document.getElementById("apply-promo");
    const notificationsContainer = document.getElementById("notifications-container");

    const SHIPPING_COST = 5.00;
    const PROMO_CODES = {
        'WELCOME10': 0.1,  // 10% off
        'SCHOLAR20': 0.2   // 20% off for students
    };

    let promoDiscount = 0;

    // Fetch cart from localStorage
    let cart = [];
    try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
    } catch (e) {
        console.error("Error loading cart from localStorage:", e);
    }

    // Function to show notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type !== 'success' ? `notification-${type}` : ''}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'warning' ? 'alert-circle' : 'alert-triangle';
        
        notification.innerHTML = `
            <i data-feather="${icon}"></i>
            ${message}
        `;
        
        notificationsContainer.appendChild(notification);
        feather.replace();
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function displayCart() {
        if (!Array.isArray(cart) || cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i data-feather="shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="product.html" class="btn btn-primary">Explore Products</a>
                </div>
            `;
            cartSubtotalEl.textContent = "$0.00";
            cartTotalEl.textContent = "$5.00";
            shippingCostEl.textContent = "$5.00";
            
            // Hide discount row if present
            const discountRow = document.querySelector('.summary-row.discount');
            if (discountRow) discountRow.style.display = 'none';
        } else {
            // Clear container first to ensure fresh rendering
            cartContainer.innerHTML = '';
            
            // Then populate with cart items
            cartContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                        <div class="quantity-controls">
                            <button onclick="decreaseQuantity(${index})" class="quantity-btn">-</button>
                            <span class="quantity-display">${item.quantity || 1}</span>
                            <button onclick="increaseQuantity(${index})" class="quantity-btn">+</button>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="removeFromCart(${index})" class="btn-remove">
                            <i data-feather="trash-2"></i>
                        </button>
                    </div>
                </div>
            `).join("");

            const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            const discountAmount = subtotal * promoDiscount;
            const total = subtotal + SHIPPING_COST - discountAmount;

            cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            shippingCostEl.textContent = `$${SHIPPING_COST.toFixed(2)}`;
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
            
            // Add or update discount row
            let discountRow = document.querySelector('.summary-row.discount');
            if (promoDiscount > 0) {
                if (!discountRow) {
                    discountRow = document.createElement('div');
                    discountRow.className = 'summary-row discount';
                    
                    const subtotalRow = document.querySelector('.summary-row');
                    subtotalRow.parentNode.insertBefore(discountRow, subtotalRow.nextSibling);
                }
                
                discountRow.innerHTML = `
                    <span>Discount</span>
                    <span>-$${discountAmount.toFixed(2)}</span>
                `;
                discountRow.style.display = 'flex';
            } else if (discountRow) {
                discountRow.style.display = 'none';
            }
        }

        // Reinitialize Feather icons
        feather.replace();
    }

    window.removeFromCart = (index) => {
        // Ensure index is valid before attempting to remove
        if (index < 0 || index >= cart.length) {
            console.error("Invalid index for removal:", index);
            return;
        }
        
        // For debugging
        console.log("Removing item at index:", index);
        console.log("Cart before removal:", [...cart]);
        
        // Remove the item
        cart.splice(index, 1);
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update the cart count in the header
        updateCartCount();
        
        // Force redraw of cart display
        setTimeout(() => {
            displayCart();
            console.log("Cart after removal:", cart);
        }, 0);
        
        showNotification('Item removed from cart');
    };

    window.increaseQuantity = (index) => {
        if (!cart[index].quantity) {
            cart[index].quantity = 1;
        }
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    };

    window.decreaseQuantity = (index) => {
        if (!cart[index].quantity || cart[index].quantity <= 1) {
            cart[index].quantity = 1;
        } else {
            cart[index].quantity--;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    };

    applyPromoBtn.addEventListener("click", () => {
        const promoCode = promoInput.value.toUpperCase();
        
        if (PROMO_CODES[promoCode]) {
            promoDiscount = PROMO_CODES[promoCode];
            showNotification('Promo code applied successfully!');
            displayCart();
        } else {
            showNotification('Invalid promo code', 'warning');
        }
    });

    checkoutBtn.addEventListener("click", () => {
        if (!Array.isArray(cart) || cart.length === 0) {
            showNotification('Your cart is empty', 'warning');
        } else {
            showNotification('Checkout coming soon!');
        }
    });

    // Initial cart display
    displayCart();
});