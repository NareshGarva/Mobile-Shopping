// Importing the products array from another file
import vivoProducts from "../products.js";
import { getRecentlyViewedProducts, displayProductCard, getByCategory } from "../global-product.js";

let filteredProducts = [];
let allFilteredBase = [];

const itemsPerPage = 10;
let currentPage = 1;

const filterCategoryEl = document.getElementById("filterCategory");
const filterPriceEl = document.getElementById("filterPrice");
const filterRatingEl = document.getElementById("filterRating");
const filterLabelEl = document.getElementById("filterLabel");
const filterStatusEl = document.getElementById("filterStatus");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

// Helpers
function getUniqueValues(arr, key) {
  return [...new Set(arr.map(p => p[key]))];
}

// Populate filters dynamically
function populateFilters() {
  // Categories
  const categories = getUniqueValues(allFilteredBase, "category");
  categories.forEach(cat => {
    filterCategoryEl.innerHTML += `
      <div class="form-check form-check-inline">
        <input class="form-check-input filter-category" type="checkbox" value="${cat}">
        <label class="form-check-label">${cat}</label>
      </div>
    `;
  });

  // Price Ranges
  const priceRanges = [
    { label: "Under ₹10,000", min: 0, max: 10000 },
    { label: "₹10,001 - ₹30,000", min: 10001, max: 30000 },
    { label: "₹30,001 - ₹50,000", min: 30001, max: 50000 },
    { label: "Above ₹50,000", min: 50001, max: Infinity },
  ];
  priceRanges.forEach((range, i) => {
    filterPriceEl.innerHTML += `
      <div class="form-check form-check-inline">
        <input class="form-check-input filter-price" type="checkbox" data-min="${range.min}" data-max="${range.max}" id="price${i}">
        <label class="form-check-label" for="price${i}">${range.label}</label>
      </div>
    `;
  });

  // Ratings
  [1.0, 2.0, 3.0, 4.0, 5.0].forEach(r => {
    filterRatingEl.innerHTML += `
      <div class="form-check form-check-inline">
        <input class="form-check-input filter-rating" type="checkbox" value="${r}">
        <label class="form-check-label">${r}+ Stars</label>
      </div>
    `;
  });

  // Labels
  const labels = getUniqueValues(allFilteredBase, "warranty");
  labels.forEach(label => {
    filterLabelEl.innerHTML += `
      <div class="form-check form-check-inline">
        <input class="form-check-input filter-label" type="checkbox" value="${label}">
        <label class="form-check-label">${label}</label>
      </div>
    `;
  });
}

// Display products paginated
function displayAllProducts(productsList, page = 1) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = productsList.slice(start, end);
  displayProductCard("productsListSection", paginatedItems, "", "");
  generatePaginationButtons(Math.ceil(productsList.length / itemsPerPage));
  updateStatus(productsList.length);
}

// Pagination
function generatePaginationButtons(totalPages) {
  const paginationEl = document.getElementById("pagination");
  paginationEl.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    paginationEl.innerHTML += `
      <button class="btn btn-sm btn-outline-primary m-1 ${currentPage === i ? "active" : ""}" onclick="goToPage(${i})">${i}</button>
    `;
  }
}
window.goToPage = function (pageNumber) {
  currentPage = pageNumber;
  displayAllProducts(filteredProducts, currentPage);
};

// Apply filters
function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll(".filter-category:checked")).map(el => el.value);
  const selectedRatings = Array.from(document.querySelectorAll(".filter-rating:checked")).map(el => parseFloat(el.value));
  const selectedLabels = Array.from(document.querySelectorAll(".filter-label:checked")).map(el => el.value);
  const selectedPrices = Array.from(document.querySelectorAll(".filter-price:checked")).map(el => ({
    min: parseFloat(el.dataset.min),
    max: parseFloat(el.dataset.max),
  }));

  filteredProducts = allFilteredBase.filter(product => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating));
    const matchLabel = selectedLabels.length === 0 || selectedLabels.includes(product.warranty);
    const matchPrice = selectedPrices.length === 0 || selectedPrices.some(range => product.originalPrice >= range.min && product.originalPrice <= range.max);
    return matchCategory && matchRating && matchLabel && matchPrice;
  });

  currentPage = 1;
  displayAllProducts(filteredProducts, currentPage);
}

// Update filter status
function updateStatus(count) {
  filterStatusEl.innerText = `${count}`;
}

// Clear filters
clearFiltersBtn.addEventListener("click", () => {
  document.querySelectorAll("#filterCanvas input[type='checkbox']").forEach(el => (el.checked = false));
  filteredProducts = [...allFilteredBase];
  currentPage = 1;
  displayAllProducts(filteredProducts, currentPage);
});

// React to filter changes
document.addEventListener("change", e => {
  if (e.target.closest("#filterCanvas")) applyFilters();
});




document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  const productCategory = urlParams.get("Category") || "";
  const productSearch = urlParams.get("q") || "";
  const productLabel = urlParams.get("Label") || "";

  const allCategories = getUniqueValues(vivoProducts, "category").map(c => c.toLowerCase());

  // First, check what q matches
  let qMatchedCategory = "";
  let qSearchProducts = [];

  if (productSearch !== "") {
    const lowerQ = productSearch.toLowerCase();

    // Case 1: q matches a category name
    if (allCategories.includes(lowerQ)) {
      qMatchedCategory = productSearch;
    } else {
      // Case 2: q is a partial product name
      qSearchProducts = vivoProducts.filter(p => p.title.toLowerCase().includes(lowerQ));
    }
  }

  // Now apply logic
  if (!productCategory && !productLabel && !productSearch) {
    allFilteredBase = [...vivoProducts];
  } else if (productCategory && !productLabel) {
    allFilteredBase = getByCategory(vivoProducts, productCategory);
  } else if (!productCategory && productLabel) {
    allFilteredBase = vivoProducts.filter(p => p.warranty?.toLowerCase() === productLabel.toLowerCase());
  } else if (productCategory && productLabel) {
    allFilteredBase = getByCategory(vivoProducts, productCategory).filter(p =>
      p.warranty?.toLowerCase() === productLabel.toLowerCase()
    );
  } else if (productSearch) {
    if (qMatchedCategory) {
      allFilteredBase = getByCategory(vivoProducts, qMatchedCategory);
    } else {
      allFilteredBase = qSearchProducts;
    }
  }

  filteredProducts = [...allFilteredBase];

  populateFilters();
  displayAllProducts(filteredProducts, currentPage);
});