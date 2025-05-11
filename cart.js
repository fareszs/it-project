
// Initialize cart if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add products to cart
function addToCart(productName, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    
    if (quantity <= 0) {
        alert("Please select a valid quantity");
        return;
    }
    
    // Get current cart
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex !== -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Added ${quantity} ${productName} to cart!`);
}

// Function to display cart items in table
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
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
        `;
        
        cartItemsElement.appendChild(row);
    });
    
    // Update grand total
    grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
}


