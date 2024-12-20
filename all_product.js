document.addEventListener('DOMContentLoaded', function() {
    let products = [];
    const productsGrid = document.querySelector('.products-grid');
    const filterForm = document.querySelector('.filter-form');

    // Mobile Filter Toggle
    const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
    const filtersSidebar = document.getElementById('filtersSidebar');
    const closeFilters = document.querySelector('.close-filters');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'filter-overlay';
    document.body.appendChild(overlay);

    // Open filters
    mobileFilterToggle?.addEventListener('click', () => {
        filtersSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close filters
    const closeFilterSidebar = () => {
        filtersSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeFilters?.addEventListener('click', closeFilterSidebar);
    overlay.addEventListener('click', closeFilterSidebar);

    // Fetch products from admin panel/backend
    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Render products to grid
    function renderProducts(products) {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="original-price">₹${product.originalPrice}</span>
                        <span class="discounted-price">₹${product.discountedPrice}</span>
                        <span class="discount-badge">${product.discount}% OFF</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filter functionality
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const filters = {
            category: formData.get('category'),
            brand: formData.get('brand'),
            minPrice: formData.get('minPrice'),
            maxPrice: formData.get('maxPrice'),
            frameType: formData.get('frameType')
        };

        const filteredProducts = products.filter(product => {
            return (!filters.category || product.category === filters.category) &&
                   (!filters.brand || product.brand === filters.brand) &&
                   (!filters.frameType || product.frameType === filters.frameType) &&
                   (!filters.minPrice || product.discountedPrice >= filters.minPrice) &&
                   (!filters.maxPrice || product.discountedPrice <= filters.maxPrice);
        });

        renderProducts(filteredProducts);
    });

    // Clear filters
    document.querySelector('.clear-filter').addEventListener('click', function() {
        filterForm.reset();
        renderProducts(products);
    });

    // Initialize
    fetchProducts();
}); 