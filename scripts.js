document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const noProductsMessage = document.querySelector('.no-products');

    const products = [
        { defaultPrice: 20, defaultQuantity: 250, id: 23, name: 'Mango', category: 'fruits', price: 50, image: '/images/food/burger.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 24, name: 'Pineapple', category: 'fruits', price: 45, image: '/images/Bekary/cake3.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 25, name: 'Chilli', category: 'vegetables', price: 12, image: '/images/ibacco/ice-cream.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 26, name: 'Garlic', category: 'vegetables', price: 30, image: '/images/leafy/salad-leaf.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 27, name: 'Ginger', category: 'vegetables', price: 35, image: '/images/Bekary/pizza.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 28, name: 'Pomegranate', category: 'fruits', price: 60, image: '/images/Bekary/cake4.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 29, name: 'Kiwi', category: 'fruits', price: 70, image: '/images/ibacco/ice-cream1.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 30, name: 'Coconut', category: 'fruits', price: 20, image: '/images/vegetables/tomato.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 31, name: 'Almond', category: 'groceries', price: 90, image: '/images/food/burger.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 32, name: 'Cashew', category: 'groceries', price: 80, image: '/images/ibacco/ice-cream2.png' },
        { defaultPrice: 20, defaultQuantity: 250, id: 33, name: 'Bread', category: 'groceries', price: 25, image:'/images/Bekary/cake2.png' },
    ];

    function renderProducts(products) {
        productList.innerHTML = '';
        if (products.length === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: <span class="product-cost">${product.defaultPrice} Rs</span></p>
                    <div class="quantity-controls">
                        <button class="decrease-btn">-</button>
                        <span class="quantity">${product.defaultQuantity} grams</span>
                        <button class="increase-btn">+</button>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                productList.appendChild(productItem);

                const increaseBtn = productItem.querySelector('.increase-btn');
                const decreaseBtn = productItem.querySelector('.decrease-btn');
                const quantitySpan = productItem.querySelector('.quantity');
                const costSpan = productItem.querySelector('.product-cost');
                const addToCartBtn = productItem.querySelector('.add-to-cart');

                let quantity = product.defaultQuantity;
                let cost = product.defaultPrice;

                increaseBtn.addEventListener('click', (e) => {
                   
                    quantity += 250;
                    cost = (quantity / 250) * product.defaultPrice;
                    quantitySpan.textContent = `${quantity} grams`;
                    costSpan.textContent = `${cost} Rs`;
                });

                decreaseBtn.addEventListener('click', (e) => {
                 
                    if (quantity > 250) {
                        quantity -= 250;
                        cost = (quantity / 250) * product.defaultPrice;
                        quantitySpan.textContent = `${quantity} grams`;
                        costSpan.textContent = `${cost} Rs`;
                    }
                });

                addToCartBtn.addEventListener('click', () => {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];

                    // Ensure cart is an array
                    if (!Array.isArray(cart)) {
                        cart = [];
                    }

                    const existingProductIndex = cart.findIndex(item => item.id === product.id);

                    if (existingProductIndex > -1) {
                        // Product already in cart, update quantity and cost
                        cart[existingProductIndex].quantity += quantity;
                        cart[existingProductIndex].cost = (cart[existingProductIndex].quantity / 250) * product.defaultPrice;
                    } else {
                        // Product not in cart, add new entry
                        cart.push({
                            ...product,
                            quantity,
                            cost
                        });
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`${product.name} added to cart`);
                });
            });
        }
    }

    document.getElementById('category').addEventListener('change', (event) => {
        const category = event.target.value;
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    });

    document.getElementById('search').addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        renderProducts(filteredProducts);
    });

    renderProducts(products);
});
