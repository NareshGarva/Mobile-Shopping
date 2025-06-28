  document.getElementById("userSearch").innerHTML = `
    <div class="offcanvas offcanvas-top searchoffcanvas" id="searchoffcanvas" tabindex="-1">
      <div class="offcanvas-body">
        <div class="d-flex justify-content-center align-items-center gap-3">
          <form class="d-flex searchform" role="search">
            <input id="searchInput" class="searchinput form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">
              <img src="../assets/icons/search.svg" alt="" />
            </button>
          </form>
          <button class="close-icon" type="button" data-bs-dismiss="offcanvas">
            <img src="../assets/icons/menu-close.svg" alt="" />
          </button>
        </div>
        <hr style="margin:10px auto">
<div class="container">
  <div class="row g-3" id="searchResults"></div>
</div>
      </div>
    </div>
  `;


import { redirectToProductPage,viewedProduct } from "../global-product.js";



  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const form = document.querySelector(".searchform");

  // Real-time search logic
  searchInput.addEventListener("input", async function () {
     const query = this.value.toLowerCase();
    if (!query) {
      searchResults.innerHTML = "";
      return;
    }

    try{
      const res = await fetch('http://localhost:3000/api/product/all');
    if (!res.ok) {
      throw new Error("Product fetch failed");
    }
    const products = await res.json(); 
       const filtered = products.filter(item => item.productTitle.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));
    if (filtered.length === 0) {
      searchResults.innerHTML = `<p>No results found.</p>`;
    } else {
    
      searchResults.innerHTML = filtered
  .map(item => {
    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="product-card border rounded p-2 h-100 d-flex align-items-center gap-2" data-id="${item.id}" style="background: #f9f9f9;">
          <img style="width:70px;height:70px;object-fit:cover;border-radius:6px;background:gray" src="${item.mainImage}" alt="${item.productTitle}">
          <div>
            <p class="mb-0 fw-semibold truncate-title">${item.productTitle}</p>
            <p class="text-muted small mb-0">${item.category}</p>
          </div>
        </div>
      </div>
    `;
  })
  .join("");

    }}
    catch(error){
      console.log("internal server error");
    }
   
 
   

// Now add click event listeners
document.querySelectorAll(".product-card").forEach(card => {
  const productId = card.getAttribute("data-id");
  card.addEventListener("click", () => {
    viewedProduct(productId);
    redirectToProductPage(productId);
  });
});
    }
  );

  // Redirect on form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `../pages/product-list.html?q=${encodeURIComponent(query)}`;
    }
  });