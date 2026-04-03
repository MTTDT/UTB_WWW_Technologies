const table = document.getElementById("productTable");

async function loadProducts() {
    const products = await fetch("https://dummyjson.com/products").then(res => res.json()).then(data => {console.log(data.products); return data.products;});


    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <a href="details.html?id=${product.id}">
                    ${product.title}
                </a>
            </td>
            <td>$${product.price}</td>
        `;

        table.appendChild(row);

    });
}
loadProducts();