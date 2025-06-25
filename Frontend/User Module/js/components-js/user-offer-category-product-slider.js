// import vivoProducts from "../products.js";
import {
  redirectToProductPage,viewedProduct,
  calculateDiscountHTML,
  renderStars,
  buyNowProduct,
} from "../global-product.js";

// Inject HTML without calling filterProducts immediately
document.getElementById("userOfferCategoryProductSlider").innerHTML = `
<section class="container">
  <div class="User-section-title d-flex justify-content-between align-items-center">
    <h5>Over Exclusive <strong class="User-section-title-strong">Deals</strong></h5>
  </div>
  <div class="category-buttons">
    <button class="category-button active" data-category="Smartphone">Smartphone</button>
    <button class="category-button" data-category="Smartwatch">Smartwatch</button>
    <button class="category-button" data-category="Audio">Audio</button>
    <button class="category-button" data-category="Accessories">Accessories</button>
  </div>
  <div class="product-grid">
    <div id="product-container"></div>
  </div>
</section>
`;

async function loadProducts(category) {
    try {
    const res = await fetch(`http://localhost:3000/api/product/all/${category}`, {
      method: 'GET'
    });

    const products = await res.json();
    return products;
  } catch (error) {
    console.log("Error in loading product:", error);
    alert("Error in loading product");
    return null;
  }
}


document.addEventListener("DOMContentLoaded", () => {

 
// Now it's safe to call the initial render
filterProducts("Smartphone", document.querySelector(".category-button"));

// ... Rest of your product list and functions below (unchanged)
async function filterProducts(category, element) {
  document
    .querySelectorAll(".category-button")
    .forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
  const products = await loadProducts(category);
  renderProducts(products);
  
}
// Event delegation for category buttons
document.querySelectorAll(".category-button").forEach((button) => {
  button.addEventListener("click", function() {
    const category = this.getAttribute("data-category");
    filterProducts(category, this);
  });
});
 
})




function renderProducts(filteredProducts) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear before rendering

  if (!filteredProducts.length) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  // First product layout
  const firstWrapper = document.createElement("div");
  firstWrapper.className = "first-product";

  const firstCard = createProductCard(filteredProducts[0]);
  firstWrapper.appendChild(firstCard);
  container.appendChild(firstWrapper);

  // Other products layout
  const otherWrapper = document.createElement("div");
  otherWrapper.className = "other-products-container";

  filteredProducts.slice(1).forEach(product => {
    const card = createProductCard(product);
    const wrapper = document.createElement("div");
    wrapper.className = "other-products";
    wrapper.appendChild(card);
    otherWrapper.appendChild(wrapper);
  });

  container.appendChild(otherWrapper);
}





function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.className = "product";
  productCard.innerHTML = generateProductHTML(product);
  
  productCard.addEventListener("click", () => {
    viewedProduct(product.id);
    // redirectToProductPage(product.id);
    buyNowProduct(product.id);
  });

  return productCard;
}


 




function generateProductHTML(product) {
  if (!product) return "";

  const discount = calculateDiscountHTML(product.originalPrice, product.sellingPrice);
  const stars = renderStars(product.Reviews);



  return `
    <div class="product-card">
      <p class="discount-tag">New Arrival | <span class="text-dark">${discount}% OFF</span></p>
      <img src="${product.mainImage}" alt="${product.productTitle}" class="img-fluid">

      <div class="product-info mt-2">
        <h5>${product.productTitle}</h5>
        <p class="text-warning star-rating">${stars}</p>
        <p class="price-container">
          <del>₹${product.originalPrice}</del>
          <strong>₹${product.sellingPrice}</strong>
        </p><button data-id="${product.id}" class="buy-now-button">Buy Now</button>

      </div>
    </div>
  `; 
}

