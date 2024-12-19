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
    const products = getProducts();
    const product = products.find(p => p.id === id);

    if (product) {
        const modalDetails = document.getElementById("modal-details");
        modalDetails.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
        `;
        openModal();
    }
}

function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Event listener for closing the modal
document.getElementById("close-modal").addEventListener("click", closeModal);

// Close modal if clicked outside the modal content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
});

// Initialize the page
renderProducts();
