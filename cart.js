class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartCounter = document.querySelector('.cart-counter');
        this.initCart();
    }

    initCart() {
        // Add cart counter to header
        const cartIcon = document.querySelector('.cart-link');
        if (!cartIcon.querySelector('.cart-counter')) {
            const counter = document.createElement('span');
            counter.className = 'cart-counter';
            counter.textContent = this.cart.length;
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(counter);
        }

        // Add event listeners to Add to Cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.addToCart(e.target.closest('.product-card'));
            });
        });

        this.updateCartCounter();
    }

    addToCart(productCard) {
        const product = {
            id: productCard.querySelector('.add-to-cart-btn').dataset.productId,
            name: productCard.querySelector('.product-name').textContent,
            price: productCard.querySelector('.discounted-price').textContent,
            image: productCard.querySelector('.product-image img').src
        };

        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCounter();
        this.showNotification('Product added to cart!');
    }

    updateCartCounter() {
        const counter = document.querySelector('.cart-counter');
        if (counter) {
            counter.textContent = this.cart.length;
            counter.style.display = this.cart.length ? 'flex' : 'none';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
}); 