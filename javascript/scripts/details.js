const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


const url = `https://dummyjson.com/products/${productId}`;



fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(product => {
    const productDetailsDiv = document.getElementById('productDetails');

    const productTitle = product.title;
    const productDescription = product.description;
    const productPrice = product.price;
    const productImage = product.images[0] || 'https://via.placeholder.com/300';

    productDetailsDiv.innerHTML = `
      <img src="${productImage}" alt="${productTitle}" style="max-width: 300px;">
      <h2>${productTitle}</h2>
      <p>${productDescription}</p>
      <p>Price: $${productPrice}</p>
    `;

    const title = productTitle;
    const price = productPrice;

    console.log('Product Title:', title);
    console.log('Product Price:', price);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  document.getElementById("addtoCartBtn").addEventListener("click", () => {
    const qty = document.getElementById("quantity").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productToAdd = {
        id: productId, 
        title: document.querySelector("#productDetails h2").textContent, 
        price: parseFloat(document.querySelector("#productDetails p:nth-of-type(2)").textContent.replace("Price: $", "")), 
        qty: parseInt(qty, 10) 
    };

    cart.push(productToAdd);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart successfully!");
});