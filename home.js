function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function renderProducts() {
    const productContainer = document.getElementById("product-container");
    const products = getProducts();
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products available. Please add some products.</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
            <button onclick="viewProduct(${product.id})">View Details</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function viewProduct(id) {
    alert(`You clicked on product ID: ${id}`);
    // Additional logic for viewing a product can be added here
}

// Initialize the page
renderProducts();
