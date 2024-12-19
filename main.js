// JavaScript Code

const productTable = document.getElementById("product-table");
const editModal = document.getElementById("edit-modal");
const overlay = document.getElementById("overlay");

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
    const products = getProducts();
    productTable.innerHTML = "";
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td class="action-buttons">
                <button class="edit" onclick="openEditModal(${product.id})">Edit</button>
                <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productTable.appendChild(row);
    });
}

function openEditModal(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById("edit-name").value = product.name;
        document.getElementById("edit-description").value = product.description;
        document.getElementById("edit-price").value = product.price;
        document.getElementById("edit-image").value = product.image;
        editModal.dataset.productId = id;
        editModal.classList.add("active");
        overlay.classList.add("active");
    }
}

function closeModal() {
    editModal.classList.remove("active");
    overlay.classList.remove("active");
}

document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = parseInt(editModal.dataset.productId);
    const products = getProducts();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        products[productIndex].name = document.getElementById("edit-name").value;
        products[productIndex].description = document.getElementById("edit-description").value;
        products[productIndex].price = document.getElementById("edit-price").value;
        products[productIndex].image = document.getElementById("edit-image").value;
        saveProducts(products);
        renderProducts();
        closeModal();
    }
});

function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderProducts();
}

// Initialize products if not in localStorage
if (!localStorage.getItem("products")) {
    const initialProducts = [
        { id: 1, name: "Product 1", description: "Description 1", price: "$100", image: "https://via.placeholder.com/100" },
        { id: 2, name: "Product 2", description: "Description 2", price: "$200", image: "https://via.placeholder.com/100" },
        { id: 3, name: "Product 3", description: "Description 3", price: "$300", image: "https://via.placeholder.com/100" },
    ];
    saveProducts(initialProducts);
}

// Initial render
renderProducts();
