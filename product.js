document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector(".product-grid");
    const categoryFilter = document.querySelector("#category-filter");
    const priceFilter = document.querySelector("#price-filter");
    const priceValue = document.querySelector("#price-value");

    const products = [
        // Bookmarks
        {
            id: 1,
            category: "Bookmarks",
            name: "Classic Scholar Bookmark",
            description: "Minimalist design for serious readers",
            price: 9.99,
            image: "./images/bookmark-1.jpg"
        },
        {
            id: 2,
            category: "Bookmarks",
            name: "Nature Lover's Bookmark",
            description: "Eco-friendly design with botanical prints",
            price: 12.99,
            image: "./images/bookmark-2.jpg"
        },
        {
            id: 3,
            category: "Bookmarks",
            name: "Minimalist Traveler Bookmark",
            description: "Compact and elegant design",
            price: 10.99,
            image: "./images/bookmark-3.jpg"
        },

        // T-Shirts
        {
            id: 4,
            category: "T-Shirts",
            name: "Eco-Friendly Graphic Tee",
            description: "Organic cotton with bold custom prints",
            price: 24.99,
            image: "./images/tshirt-1.jpg"
        },
        {
            id: 5,
            category: "T-Shirts",
            name: "Scholar Spirit T-Shirt",
            description: "Perfect for university pride",
            price: 22.99,
            image: "./images/tshirt-2.jpg"
        },
        {
            id: 6,
            category: "T-Shirts",
            name: "Minimalist Logo Tee",
            description: "Sleek and simple eco-conscious design",
            price: 19.99,
            image: "./images/tshirt-3.jpg"
        },

        // Bags
        {
            id: 7,
            category: "Bags",
            name: "Reusable Canvas Tote",
            description: "Durable and stylish for everyday use",
            price: 19.99,
            image: "./images/bag-1.jpeg"
        },
        {
            id: 8,
            category: "Bags",
            name: "Eco-Backpack",
            description: "Sustainable materials for students",
            price: 34.99,
            image: "./images/bag-2.png"
        },
        {
            id: 9,
            category: "Bags",
            name: "Printed Shopping Bag",
            description: "Custom art on recycled fabric",
            price: 15.99,
            image: "./images/bag-3.png"
        },

        // Banners
        {
            id: 10,
            category: "Banners",
            name: "Custom Event Banner",
            description: "Vibrant, weather-resistant design",
            price: 49.99,
            image: "./images/banner-1.jpg"
        },
        {
            id: 11,
            category: "Banners",
            name: "Eco-Friendly Trade Show Banner",
            description: "Sustainable and eye-catching",
            price: 59.99,
            image: "./images/banner-2.jpeg"
        },
        {
            id: 12,
            category: "Banners",
            name: "Celebration Banner",
            description: "Perfect for parties and events",
            price: 39.99,
            image: "./images/banner-3.jpeg"
        },

        // Art Prints
        {
            id: 13,
            category: "Art Prints",
            name: "Nature Art Print",
            description: "High-quality eco-friendly wall art",
            price: 29.99,
            image: "./images/art-1.jpg"
        },
        {
            id: 14,
            category: "Art Prints",
            name: "Abstract Scholar Print",
            description: "Bold design for modern spaces",
            price: 34.99,
            image: "./images/art-2.jpg"
        },
        {
            id: 15,
            category: "Art Prints",
            name: "Vintage Map Print",
            description: "Eco-printed classic artwork",
            price: 27.99,
            image: "./images/art-3.jpeg"
        }
    ];

    let filteredProducts = [...products];

    function renderProducts(productsToRender) {
        const categories = [...new Set(productsToRender.map(p => p.category))];
        let html = '';

        categories.forEach(category => {
            html += `<h2 class="category-title">${category}</h2>`;
            html += productsToRender
                .filter(product => product.category === category)
                .map(product => `
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
        });

        productContainer.innerHTML = html || '<p>No products match your filters.</p>';
        feather.replace();
    }

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const maxPrice = parseFloat(priceFilter.value);

        filteredProducts = products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const priceMatch = product.price <= maxPrice;
            return categoryMatch && priceMatch;
        });

        renderProducts(filteredProducts);
    }

    // Update price display when slider moves
    priceFilter.addEventListener('input', () => {
        priceValue.textContent = `$${priceFilter.value}`;
        applyFilters();
    });

    // Apply filters when category changes
    categoryFilter.addEventListener('change', applyFilters);

    // Cart functionality (keeping your existing code)
    window.addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCartCount();
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <i data-feather="check-circle"></i>
                ${product.name} added to cart
            `;
            document.body.appendChild(notification);
            feather.replace();
            setTimeout(() => notification.remove(), 3000);
        }
    };

    // Initial render
    renderProducts(products);
});