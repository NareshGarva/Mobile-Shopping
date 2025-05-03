// importing the products array from another fiel 
import vivoProducts from "./products.js";
import {handleAddToCart} from "./components-js/user-cart.js";
window.handleAddToCart = handleAddToCart;

const allProducts = window.vivoProducts;

// function to show star rating
export function renderStars(rating) {
  let starhtml = '';
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  
  for (let i = 0; i < full; i++) starhtml += `&#x2605;`;
  if (hasHalf) starhtml += `<svg class="text-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
  <defs>
    <linearGradient id="halfFill">
      <stop offset="50%" stop-color="currentColor"/>
      <stop offset="50%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <path d="M12 2.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.24 1.18-6.88-5-4.87 6.91-1L12 2.5z"
        stroke="currentColor" stroke-width="1" fill="url(#halfFill)" />
</svg>`;
  for (let i = 0; i < empty; i++) starhtml += `&#x2606;`;
  
  return starhtml;
}

  
export function checkInStock(id) {
  const product = vivoProducts.find(p => p.id === id);
  if (!product) return false;
  return product.stock > 0;
}



//to display products in card
export function displayProductCard(productContainerId, productsArray, btnstyle, cardstyle) {
  
  const productContainer = document.getElementById(productContainerId);
  productContainer.innerHTML = ""; // Clear previous content
  
  
  
  // Card Style - Swiper or Normal
  if (cardstyle === "swiper") {
    
    const productCardswipermain = document.createElement("div");
    productCardswipermain.className = "swiper mySwiper";
    
    const productCardswiperinner = document.createElement("div");
    productCardswiperinner.className = "swiper-wrapper";
    
    productContainer.appendChild(productCardswipermain);
    productCardswipermain.appendChild(productCardswiperinner);
    
    // Add pagination and navigation elements if needed
    const pagination = document.createElement("div");
    pagination.className = "swiper-pagination mt-2";
    productCardswipermain.appendChild(pagination);
    
    // Now initialize Swiper AFTER DOM is updated
    setTimeout(() => {
      new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        allowTouchMove: true,
        breakpoints: {
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        },
      });
    }, 0);
    
    productsArray.map(
      (product) => {
        const productCardswiper = document.createElement("div");
        productCardswiper.className = "swiper-slide";
        
        
        
        productCardswiper.innerHTML = `

        <div class="product-card h-100 p-2">
                <div class="productLink">
          <span class="badge badge-custom  bg-danger">${calculateDiscountHTML(product.originalPrice,product.sellingPrice)}% OFF</span>
          <div class="product-img mb-2">
          <img src="${product.mainImage}" alt="${product.title}">
          </div>

          <div class="truncate-title" title="${product.title}">${product.title}</div>
                    <div class="rating text-warning">${renderStars(product.rating || 0)}</div>
              <p class="mb-1">
                <span class="RVSellingPrice fw-bold">₹${product.sellingPrice}</span>
                <small class="text-muted text-decoration-line-through ms-1">₹${product.originalPrice}</small>
              </p>
              
</div>
           ${generateButtons(product.id, (btnstyle))}

        </div>
  `;
        const productLink =  productCardswiper.querySelector(".productLink");
if (productLink) {
  productLink.addEventListener("click", () => {
    viewProduct(product.id);
    redirectToProductPage(product.id);
  });
}


        productCardswiperinner.appendChild(productCardswiper);
      }
    )
    
    
  }
  else {
    
    const productCardstyle = document.createElement("div");
    productCardstyle.className = "row g-2";
    
    productsArray.map((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-6 col-md-4 col-lg-3";
      
      
      
      
      
      // Normal Card Style
      productCard.innerHTML = `
        <div class="product-card h-100 p-2">
        <div class="productLink">
          <span class="badge badge-custom text-dark bg-danger">${calculateDiscountHTML(product.originalPrice,product.sellingPrice)}% OFF</span>
          <div class="product-img mb-2">
          <img src="${product.mainImage}" alt="${product.title}">
          </div>

          <div class="truncate-title" title="${product.title}">${product.title}</div>
                    <div class="rating text-warning">${renderStars(product.rating || 0)}</div>
              <p class="mb-1">
                <span class="RVSellingPrice fw-bold">₹${product.sellingPrice}</span>
                <small class="text-muted text-decoration-line-through ms-1">₹${product.originalPrice}</small>
              </p>
              </div>

           ${generateButtons(product.id, (btnstyle))}

        </div>
      `;
      const productLink = productCard.querySelector(".productLink");
if (productLink) {
  productLink.addEventListener("click", () => {
    viewProduct(product.id);
    redirectToProductPage(product.id);
  });
}
      productContainer.appendChild(productCardstyle);
      productCardstyle.appendChild(productCard);
    });
  }
}


// Button Generator
function generateButtons(id, style) {
  
  if (style == 1) {
    return `
      <div class="product-actions mt-3 d-flex justify-content-between gap-1">
        <a onclick="viewProduct('${id}')" href="/product-details.html?id=${id}" class="btn btn-sm bg-dark text-white w-100">View details</a>
        ${checkInStock(id)?
       `<button class="btn btn-sm btn-outline-dark" onclick="handleAddToCart('${id}')">
          <img src="../assets/icons/pCart.svg">
        </button>` :        `<button class="btn btn-sm btn-outline-dark notify-me" >
          <img src="../assets/icons/notification.svg">
        </button>`}
      </div>
    `;
  } else if (style == 2) {
    return `
      <div class="text-center mt-3">
              ${checkInStock(id)?
       `<button class="btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center gap-2 w-100" onclick="handleAddToCart('${id}')">
          <img style="width:20px;height:20px" src="../assets/icons/pCart.svg">
          <span>Add to cart</span>
        
        </button>` : `<button class="btn btn-sm btn-outline-dark d-flex align-items-center justify-content-center gap-2 w-100 notify-me" >
          <img style="width:20px;height:20px" src="../assets/icons/notification.svg">
          <span>Notify me</span>
        </button>`}
        

      </div>
    `;
  } else if (style == 3) {
    return `
      <div class="mt-3">
        <a onclick="viewProduct('${id}')" href="product-details.html?id=${id}" class="btn bg-dark w-100 text-white btn-sm">View details</a>
      </div>
    `;
  }
  return "";
}


export function redirectToProductPage(id) {
  if (id) {
    
    window.location.href = `../pages/product-details.html?id=${id}`;
    
  } else {
    console.error("Product ID is required for redirection.");
  }
}



export function calculateDiscountHTML(originalPrice, sellingPrice) {
  if (originalPrice <= 0 || sellingPrice < 0) {
    return `<span>Invalid Price</span>`;
  }
  
  if (sellingPrice >= originalPrice) {
    return `<span class="text-secondary">No Discount</span>`;
  }
  
  const discountAmount = originalPrice - sellingPrice;
  const discountPercentage = ((discountAmount / originalPrice) * 100).toFixed(2);
  
  return `
    <span>${discountPercentage}</span>
  `;
}



// truncated title or Expandable title
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("truncate-title")) {
    e.target.classList.toggle("expanded");
  } else {
    document.querySelectorAll(".truncate-title").forEach(t => t.classList.remove("expanded"));
  }
});


// Add to Recently Viewed
export function addToRecentlyViewed(productId, maxItems = 3) {
  let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  
  // Remove if exists
  viewed = viewed.filter(id => id !== productId);
  
  // Add to start
  viewed.unshift(productId);
  
  // Trim to maxItems
  if (viewed.length > maxItems) {
    viewed = viewed.slice(0, maxItems);
  }
  
  localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
}

// Get Recently Viewed with Limit
export function getRecentlyViewedProducts(products, limit) {
  const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  return viewed
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, limit);
}




export function viewProduct(productId, maxRecent = 10) {
  addToRecentlyViewed(productId, maxRecent);
}






// Top Selling Products
function getTopSelling(products) {
  return products.filter(product => product.isTopSelling);
}

// Top Deals (Biggest Discount)
function getTopDeals(products, minDiscount = 10) {
  return products.filter(product => {
    const discount = ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100;
    return discount >= minDiscount;
  });
}

// Specific Category Products
export function getByCategory(products, categoryName, limit) {
  return products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase()).slice(0, limit);
}


// New Arrivals (Added within the last 30 days)
function getNewArrivals(products) {
  const today = new Date();
  return products.filter(product => {
    const added = new Date(product.addedDate);
    const diffDays = (today - added) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  });
}

// Custom Function (e.g. by RAM or processor)
function getBySpecs(products, filter = {}) {
  return products.filter(product => {
    return Object.entries(filter).every(([key, value]) => {
      if (Array.isArray(product.sizes[key])) {
        return product.sizes[key].includes(value);
      }
      return product.sizes[key] === value;
    });
  });
  

}