const table = document.getElementById("cartTable");
const totalAmountElement = document.getElementById("total");

function calculateTotal() {
    const total = cart.reduce((sum, product) => sum + product.price * product.qty, 0);
    totalAmountElement.textContent = `Total: $${total.toFixed(2)}`;
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.title}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>
            <input type="number" value="${product.qty}" min="1" data-index="${index}">
        </td>
        <td>$${(product.price * product.qty).toFixed(2)}</td>
        <td>
            <button data-index="${index}" class="remove-btn">Remove</button>
        </td>
    `;

    table.appendChild(row);
});
calculateTotal(); 

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", event => {

        const index = event.target.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});


document.querySelectorAll("input[type='number']").forEach(input => {

    input.addEventListener("change", event => {

        const index = event.target.dataset.index;

        const newQty = Number(event.target.value);

        cart[index].qty = newQty;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});

