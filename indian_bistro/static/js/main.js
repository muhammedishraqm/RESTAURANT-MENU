// Cart state
let cart = [];

/**
 * Adds an item to the cart or increments its quantity
 */
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`Added ${name} to cart!`);
}

/**
 * Removes an item from the cart
 */
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

/**
 * Updates the quantity of an item
 */
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartUI();
        }
    }
}

/**
 * Re-renders the cart UI and calculates the bill
 */
function updateCartUI() {
    const cartContainer = document.getElementById('cart-container');
    const billSummary = document.getElementById('bill-summary');
    const checkoutForm = document.getElementById('checkout-form');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
        billSummary.style.display = 'none';
        checkoutForm.style.display = 'none';
        return;
    }
    
    billSummary.style.display = 'block';
    checkoutForm.style.display = 'block';
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.name}</strong><br>
                    <small>₹${item.price} each</small>
                </div>
                <div class="cart-item-qty">
                    <button class="q-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="q-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    <span style="margin-left: 10px; font-weight: 600;">₹${itemTotal}</span>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    // Bill Calculation
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    
    document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('gst').innerText = `₹${gst.toFixed(2)}`;
    document.getElementById('total').innerText = `₹${total.toFixed(2)}`;
}

/**
 * Sends order data to the Flask backend
 */
async function placeOrder() {
    const name = document.getElementById('cust-name').value;
    const table = document.getElementById('cust-table').value;
    const phone = document.getElementById('cust-phone').value;
    
    if (!name || !table || !phone) {
        alert("Please fill in all checkout details!");
        return;
    }
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const orderData = {
        customer: {
            name: name,
            table: table,
            phone: phone
        },
        cart: cart
    };
    
    try {
        const response = await fetch('/api/place-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(`Order #${result.order_id} placed! Kitchen is notified.`);
            // Clear cart
            cart = [];
            updateCartUI();
            // Clear form
            document.getElementById('cust-name').value = '';
            document.getElementById('cust-table').value = '';
            document.getElementById('cust-phone').value = '';
        } else {
            alert("Error placing order: " + result.message);
        }
    } catch (error) {
        console.error("Order Error:", error);
        alert("Failed to connect to server.");
    }
}

/**
 * Simple notification helper
 */
function showNotification(message) {
    const note = document.getElementById('notification');
    note.innerText = message;
    note.classList.add('show');
    
    setTimeout(() => {
        note.classList.remove('show');
    }, 3000);
}
