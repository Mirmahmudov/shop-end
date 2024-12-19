function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;

    const products = getProducts();
    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        name,
        description,
        price,
        image,
    };

    products.push(newProduct);
    saveProducts(products);

    alert("Product added successfully!");
    document.getElementById("create-form").reset();
});
