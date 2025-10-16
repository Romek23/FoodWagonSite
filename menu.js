const products = [
    {id:1, name:'Бургер класичний', desc:'Соковитий яловичий бургер з сиром', price:'149 грн', img:'images/burger.jpg', category:'burgers'},
    {id:2, name:'Піца Маргарита', desc:'Тонка основа, соус помідор, моцарела', price:'199 грн', img:'images/pizza-margarita.jpg', category:'pizza'},
    {id:3, name:'Сет з куркою', desc:'Набір з курячих крилець та соусів', price:'249 грн', img:'images/chicken-set.jpg', category:'chicken'},
    {id:4, name:'Салат місцевий', desc:'Зелень, курка, овочі та соус власного рецепту', price:'99 грн', img:'images/salad.jpg', category:'salads'},
    {id:5, name:'Бургер з беконом', desc:'З яловичиною, беконом та сиром чеддер', price:'169 грн', img:'images/burger-bacon.jpg', category:'burgers'},
    {id:6, name:'Піца Пепероні', desc:'З салямі пепероні та сиром моцарела', price:'219 грн', img:'images/pizza-pepperoni.jpg', category:'pizza'},
    {id:7, name:'Курка гриль', desc:'Стегно курки гриль з травами', price:'129 грн', img:'images/chicken-grill.jpg', category:'chicken'},
    {id:8, name:'Салат Цезар', desc:'З куркою, крутонами та соусом цезар', price:'119 грн', img:'images/caesar-salad.jpg', category:'salads'}
]
document.addEventListener('DOMContentLoaded', function() {
    var products = [
        {id:1, name:'Бургер класичний', desc:'Соковитий яловичий бургер з сиром', price:'149 грн', img:'images/burger.jpg', category:'burgers'},
        {id:2, name:'Піца Маргарита', desc:'Тонка основа, соус помідор, моцарела', price:'199 грн', img:'images/pizza-margarita.jpg', category:'pizza'},
        {id:3, name:'Сет з куркою', desc:'Набір з курячих крилець та соусів', price:'249 грн', img:'images/chicken-set.jpg', category:'chicken'},
        {id:4, name:'Салат місцевий', desc:'Зелень, курка, овочі та соус власного рецепту', price:'99 грн', img:'images/salad.jpg', category:'salads'},
        {id:5, name:'Бургер з беконом', desc:'З яловичиною, беконом та сиром чеддер', price:'169 грн', img:'images/burger-bacon.jpg', category:'burgers'},
        {id:6, name:'Піца Пепероні', desc:'З салямі пепероні та сиром моцарела', price:'219 грн', img:'images/pizza-pepperoni.jpg', category:'pizza'},
        {id:7, name:'Курка гриль', desc:'Стегно курки гриль з травами', price:'129 грн', img:'images/chicken-grill.jpg', category:'chicken'},
        {id:8, name:'Салат Цезар', desc:'З куркою, крутонами та соусом цезар', price:'119 грн', img:'images/caesar-salad.jpg', category:'salads'}
    ];

    var menuGrid = document.getElementById('menuGrid');
    var categoryBtns = document.querySelectorAll('.category-btn');

    function renderMenu(category = 'all') {
        menuGrid.innerHTML = '';
        var filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
        
        if (filteredProducts.length === 0) {
            menuGrid.innerHTML = '<p class="no-products">Страви не знайдено</p>';
            return;
        }
        
        filteredProducts.forEach(function(p) {
            var item = document.createElement('article');
            item.className = 'menu-item';
            item.innerHTML = `
                <div class="menu-item-media">
                    <img src="${p.img}" alt="${p.name}" width="320" height="220">
                </div>
                <div class="menu-item-body">
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                    <div class="menu-item-meta">
                        <span class="price">${p.price}</span>
                        <button class="btn btn-primary" data-id="${p.id}">Додати в замовлення</button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(item);
        });
    }
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderMenu(this.dataset.category);
        });
    });

    renderMenu();
});

function addToCart(productId) {
    var product = products.find(p => p.id === productId);
    if (!product) return;
    
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            desc: product.desc,
            price: product.price,
            img: product.img,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAddToCartMessage(product.name);
}

function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('.cart-count').forEach(count => {
        count.textContent = totalItems;
    });
}

function showAddToCartMessage(productName) {
    console.log('Додано в кошик:', productName);
}


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') && e.target.dataset.id) {
        e.preventDefault();
        addToCart(parseInt(e.target.dataset.id));
    }
});


updateCartCount();
function showAddToCartMessage(productName) {
    const message = document.createElement('div');
    message.style.cssText = `
    position : fixed;
    top: 20px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    `;
    message.textContent = `✅ ${productName} додано в кошик! `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    } , 3000)
}