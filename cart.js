
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});

// Function to show checkout alert message
function showCheckoutAlert() {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.classList.add('show');
    
    // Auto-hide after 3 seconds
    setTimeout(function() {
        alertMessage.classList.remove('show');
    }, 3000);
}

// Function to remove one quantity of a specific item
function removeItem(productName) {
    // Get current cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the product in the cart
    const productIndex = cart.findIndex(item => item.name === productName);
    
    if (productIndex !== -1) {
        // Decrease quantity by 1
        cart[productIndex].quantity -= 1;
        
        // If quantity becomes 0 or less, remove the item completely
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Refresh cart display
        displayCartItems();
    }
}

// Function to remove all items from the cart
function removeAllItems() {
    // Clear the cart array
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Refresh cart display
    displayCartItems();
}

// Function to display cart items in table
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsElement = document.getElementById('cartItems');
    const grandTotalElement = document.getElementById('grandTotal');
    
    // Clear previous cart items
    cartItemsElement.innerHTML = '';
    
    let grandTotal = 0;
    
    // Display each cart item
    cart.forEach(item => {
        const total = item.price * item.quantity;
        grandTotal += total;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${total.toFixed(2)}</td>
            <td>
                <button class="action-btn remove" onclick="removeItem('${item.name}')">Remove Item</button>
            </td>
        `;
        
        cartItemsElement.appendChild(row);
    });
    
    // Update grand total
    grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
}

