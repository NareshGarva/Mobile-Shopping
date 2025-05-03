import vivoProducts from "../products.js";
import {
  getByCategory,
  redirectToProductPage,viewProduct,
  calculateDiscountHTML,
  renderStars,
} from "../global-product.js";

// Inject HTML without calling filterProducts immediately
document.getElementById("userOfferCategoryProductSlider").innerHTML = `
<section class="container">
  <div class="User-section-title d-flex justify-content-between align-items-center">
    <h5>Over Exclusive <strong class="User-section-title-strong">Deals</strong></h5>
  </div>
  <div class="category-buttons">
    <button class="category-button active" data-category="Smartphones">Smartphones</button>
    <button class="category-button" data-category="Tablets">Tablets</button>
    <button class="category-button" data-category="Accessories">Accessories</button>
    <button class="category-button" data-category="Wearables">Wearables</button>
  </div>
  <div class="product-grid">
    <div id="product-container"></div>
  </div>
</section>
`;

// Event delegation for category buttons
document.querySelectorAll(".category-button").forEach((button) => {
  button.addEventListener("click", function() {
    const category = this.getAttribute("data-category");
    filterProducts(category, this);
  });
});

// Now it's safe to call the initial render
filterProducts("Smartphones", document.querySelector(".category-button"));

// ... Rest of your product list and functions below (unchanged)
function filterProducts(category, element) {
  document
    .querySelectorAll(".category-button")
    .forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
  
  renderProducts(getByCategory(vivoProducts,category,5));
  
}

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
    viewProduct(product.id);
    redirectToProductPage(product.id);
  });

  return productCard;
}

function generateProductHTML(product) {
  if (!product) return "";

  const discount = calculateDiscountHTML(product.originalPrice, product.sellingPrice);
  const stars = renderStars(product.rating);

  return `
    <div class="product-card">
      <p class="discount-tag">${discount}% OFF</p>
      <img src="${product.mainImage}" alt="${product.title}" class="img-fluid">

      <div class="product-info mt-2">
        <h5>${product.title}</h5>
        <p class="text-warning star-rating">${stars}</p>
        <p class="price-container">
          <del>₹${product.originalPrice}</del>
          <strong>₹${product.sellingPrice}</strong>
        </p>
        <button onclick="viewProduct('${product.id}')" href="/product-details.html?id=${product.id}" class="buy-now-button">Buy Now</button>
      </div>
    </div>
  `;
}