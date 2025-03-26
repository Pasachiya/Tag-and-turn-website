document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector(".product-grid");

    const products = [
        {
            id: 1,
            name: "Classic Scholar Bookmark",
            description: "Minimalist design for serious readers",
            price: 9.99,
            image: "./images/bookmark-1.jpg"
        },
        {
            id: 2,
            name: "Nature Lover's Bookmark",
            description: "Eco-friendly design with botanical prints",
            price: 12.99,
            image: "./images/bookmark-2.jpg"
        },
        {
            id: 3,
            name: "Tech Student Bookmark",
            description: "Sleek, modern design for digital natives",
            price: 14.99,
            image: "./images/bookmark-3.jpg"
        },
        {
            id: 4,
            name: "Academic Essentials Bookmark",
            description: "Perfect for research and study",
            price: 11.99,
            image: "./images/bookmark-4.jpg"
        },
        {
            id: 5,
            name: "Creative Writer's Bookmark",
            description: "Inspire your writing journey",
            price: 13.99,
            image: "./images/bookmark-5.jpg"
        },
        {
            id: 6,
            name: "Minimalist Traveler Bookmark",
            description: "Compact and elegant design",
            price: 10.99,
            image: "./images/bookmark-6.jpg"
        }
    ];

    function renderProducts() {
        productContainer.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button onclick="addToCart(${product.id})" class="btn btn-primary">
                            <i data-feather="shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize Feather icons after rendering
        feather.replace();
    }

    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartCount();
            
            // Show a toast-like notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i data-feather="check-circle"></i>
                ${product.name} added to cart
            `;
            document.body.appendChild(notification);
            feather.replace();

            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    };

    renderProducts();
});