// Load cart from localStorage or initialize empty
let cart = [];
try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        // Ensure all cart items have a quantity property
        cart.forEach(item => {
            if (!item.quantity) item.quantity = 1;
        });
    }
} catch (e) {
    console.error("Error loading cart:", e);
    cart = [];
}

// Update cart count in nav
function updateCartCount() {
    const cartCountEls = document.querySelectorAll('#cart-count');
    if (Array.isArray(cart)) {
        const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCountEls.forEach(el => (el.textContent = itemCount));
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Add item to cart
export function addItemToCart(item) {
    // Check if item already exists in cart (matching both id and style if applicable)
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.selectedStyle === item.selectedStyle
    );
    
    if (existingItemIndex >= 0) {
        // If item exists, increase quantity
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        // Otherwise add new item with quantity 1
        item.quantity = 1;
        cart.push(item);
    }
    
    updateCartCount();
    return cart;
}

// Get the cart
export function getCart() {
    return cart;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);