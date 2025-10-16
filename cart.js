document.addEventListener('DOMContentLoaded', function() {
    var cartItemsList = document.getElementById('cartItemsList');
    var itemsTotal = document.getElementById('itemsTotal');
    var deliveryCost = document.getElementById('deliveryCost');
    var totalCost = document.getElementById('totalCost');
    var checkoutBtn = document.getElementById('checkoutBtn');
    var addressModal = document.getElementById('addressModal');
    var addressForm = document.getElementById('addressForm');

    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    updateCartDisplay();
    
    function updateCartDisplay() {
        renderCartItems();
        updateCartSummary();
        updateCartCount();
    }
    
    function renderCartItems() {
        cartItemsList.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty">
                    <p>🛒 Ваш кошик порожній</p>
                    <a href="menu.html" class="btn btn-primary">Перейти до меню</a>
                </div>
            `;
            return;
        }
        
        cart.forEach(function(item, index) {
            var cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <span class="item-price">${item.price}</span>
                    <button class="remove-btn" data-index="${index}">🗑️</button>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
        });
        
        addCartEventListeners();
    }
    
    function addCartEventListeners() {
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
                updateCartDisplay();
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                cart[index].quantity++;
                saveCart();
                updateCartDisplay();
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                var index = parseInt(this.dataset.index);
                cart.splice(index, 1);
                saveCart();
                updateCartDisplay();
            });
        });
    }
    
    function updateCartSummary() {
        var itemsTotalValue = cart.reduce(function(total, item) {
            var price = parseInt(item.price);
            return total + (price * item.quantity);
        }, 0);
        
        var delivery = 50;
        var total = itemsTotalValue + delivery;
        
        itemsTotal.textContent = itemsTotalValue + ' грн';
        deliveryCost.textContent = delivery + ' грн';
        totalCost.textContent = total + ' грн';
    }
    
    function updateCartCount() {
        var totalItems = cart.reduce(function(total, item) {
            return total + item.quantity;
        }, 0);
        
        document.querySelectorAll('.cart-count').forEach(count => {
            count.textContent = totalItems;
        });
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Обробник кнопки оформлення замовлення
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Кошик порожній!');
                return;
            }
            openAddressModal();
        });
    }
    
    function openAddressModal() {
        addressModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    
    function closeAddressModal() {
        addressModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    
    // Закриття модалки
    document.querySelectorAll('[data-close="true"]').forEach(function(el) {
        el.addEventListener('click', closeAddressModal);
    });
    
    addressModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) closeAddressModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && addressModal.getAttribute('aria-hidden') === 'false') closeAddressModal();
    });
    
    if (addressForm) {
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var address = document.getElementById('delivery-address').value;
            var notes = document.getElementById('delivery-notes').value;
            var paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
           
            var btn = addressForm.querySelector('button[type="submit"]');
            btn.textContent = '🎉 Замовлення прийнято!';
            
            setTimeout(function() {
                
                cart = [];
                saveCart();
                updateCartDisplay();
                
                closeAddressModal();
                addressForm.reset();
                btn.textContent = '✅ Підтвердити замовлення';
                
                alert('Дякуємо за замовлення! Кур\'єр вирушить до вас найближчим часом.');
            }, 2000);
        });
    }
});