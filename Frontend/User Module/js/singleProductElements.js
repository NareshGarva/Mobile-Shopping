import { renderStars, calculateDiscountHTML } from "./global-product.js";
import { handleAddToCart } from "./components-js/user-cart.js";

// Declare the product variable globally
let product = null;
const storecurrency = '₹';
let productId =null;

// Fetch products from the server
async function getProductById(productId) {
  try {
    const res = await fetch(`http://localhost:3000/api/product/${productId}`);
    if (!res.ok) {
      throw new Error("Product fetch failed");
    }
    const product = await res.json(); 
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
// Format price with Indian numbering system
const formatPrice = price => {
  // Ensure price is a number
  const numPrice = Number(price);
  return isNaN(numPrice) ? "0" : numPrice.toLocaleString('en-IN');
};

// Check if product is in stock
function checkInStock(stockValue) {
  return stockValue > 0;
}

// Initialize the page with product details
async function initializePage(productId) {
  if (!productId) {
    document.getElementById("userProductPageInfo").innerHTML = `
      <div class="alert alert-danger">
        <p class="text-danger">No product ID specified!</p>
      </div>
    `;
    return;
  }

  try {
    // Fetch product data
    product = await getProductById(productId);
    review(product);
   
    // Handle product not found
    if (!product) {
      document.getElementById("userProductPageInfo").innerHTML = `
        <div class="alert alert-danger">
          <p class="text-danger">Product not found!</p>
        </div>
      `;
      return;
    }
    
    // Destructure product properties with default values for missing data
    const {
      id: productID = "",
      productTitle: productTitle = "Untitled Product",
      productDescription: productDescription = "",
      originalPrice: productOriginalPrice = 0,
      sellingPrice: productSellingPrice = 0,
      category: productCategory = "",
      stock: productInStock = 0,
      rating: productRating = 0,
      reviews: productReviews = [],
      mainImage = "",
      ProductImages = [],
      ProductSpecifications = {},
      warranty = 0
    } = product;
    
    // Check if product is in stock based on stock value
    const isAvailable = checkInStock(productInStock);
    
    // Render the main product information section
    document.getElementById("userProductPageInfo").innerHTML = `
      <div class="product-page container py-3">
        <!-- Image Slider -->
        <div class="product-images">
          <div id="carouselExample" class="carousel slide main-carousel" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${mainImage}" alt="${productTitle}" />
              </div>
              ${ProductImages && ProductImages.length > 0 ? ProductImages.map(img => `
                <div class="carousel-item">
                  <img src="${img.imageUrl}" alt="${productTitle}" />
                </div>`).join("") : ""}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <img src="../assets/icons/leftarrow.svg" alt="Previous" />
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <img src="../assets/icons/rightarrow.svg" alt="Next" />
            </button>
          </div>

          <!-- Thumbnail Slider -->
          <div class="d-flex overflow-auto mt-2 thumbnail-slider">
            <img src="${mainImage}" alt="${productTitle}" class="thumbnail-img" data-bs-target="#carouselExample" data-bs-slide-to="0" />
            ${ProductImages && ProductImages.length > 0 ? ProductImages.map((img, index) => `
              <img src="${img.imageUrl}" alt="${productTitle}" class="thumbnail-img" data-bs-target="#carouselExample" data-bs-slide-to="${index + 1}" />
            `).join("") : ""}
          </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <h2 class="product-title">${productTitle}</h2>
          <div class="star-rating">${renderStars(productRating)}</div>

          <p class="ProductDefaultVarientDisplay">
            <span style="display:block;color:#000">Selected Specifications:</span>
            <span id="displayProductSpecifucation"></span>
          </p>
          <p>${productDescription}</p>
          <p class="price">
            <span class="sellingPrice">${storecurrency}${formatPrice(productSellingPrice)}</span> 
            <span class="original-price originalPrice small">${storecurrency}${formatPrice(productOriginalPrice)}</span> 
            (<span class="text-danger">${calculateDiscountHTML(productOriginalPrice, productSellingPrice)}% OFF</span>)
          </p>
          
          <button class="chooseVarient d-flex align-items-center justify-content-between"
            data-bs-toggle="offcanvas"
            data-bs-target="#variantSelector"
            data-price="${productSellingPrice}"
            data-id="${productID}">
            <span>Choose Variants</span>
            <img src="../assets/icons/rightarrow.svg" alt="Choose Variants" />
          </button>

          <!-- Action Buttons -->
          <div class="mt-3 d-flex gap-2 align-items-center justify-content-between">
            <div class="counter d-flex align-items-center justify-content-between p-0">
              <button class="btn btn-outline-secondary" type="button" id="decrease">−</button>
              <input id="countInput" type="number" class="form-control text-center count-input" value="1" min="1" style="max-width: 50px;">
              <button class="btn btn-outline-secondary" type="button" id="increase">+</button>
            </div>
            <div id="inStockWarning" class="text-danger small fw-bold mt-1"></div>

            ${isAvailable ? `
              <button class="product-buy-now-btn d-flex align-items-center justify-content-center gap-2" id="buyNowBtn">
                <img src="../assets/icons/shield.svg" alt="Buy Now" />
                <span>Buy Now</span>
              </button>

              <button class="product-cart-btn" id="addToCartBtn">
                <img src="../assets/icons/PCart.svg" alt="Add to Cart" />
              </button>
            ` : `
              <button class="notify-me d-flex align-items-center justify-content-center gap-2 product-notify-me-btn" id="notifyMeBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell">
                  <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
                </svg>
                <span>Notify me when available</span>
              </button>
            `}
          </div>

          <hr class="ProductPageHr">

          <!-- Product Details Section -->
          <div class="accordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true">
                  Specifications
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                <div class="accordion-body">
                  <ul id="specifications-list" class="list-group"></ul>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo">
                  Warranty
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                <div class="accordion-body" id="warranty-details"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
// Populate Specifications
const specList = document.getElementById("specifications-list");

// Check if ProductSpecifications is an array and has data
if (Array.isArray(ProductSpecifications) && ProductSpecifications.length > 0) {
  specList.innerHTML = ProductSpecifications
    .map(
      (spec) =>
        `<li class="list-group-item"><strong>${spec.specKey}:</strong> ${spec.specValue}</li>`
    )
    .join("");
} else {
  specList.innerHTML = "<li class='list-group-item'>No specifications available</li>";
}

    
    // Populate Warranty
    document.getElementById("warranty-details").innerHTML = `
      <strong>Warranty Details:</strong> ${warranty} warranty on this product.
    `;

    // Setup quantity controls
    setupQuantityControls(isAvailable, productID);
    
    // Setup variant selector
    setupVariantSelector(product, isAvailable, productID);
    
    // Setup thumbnail click events for image carousel
    setupThumbnailCarousel();
    
  } catch (error) {
    console.error("Error initializing product page:", error);
    document.getElementById("userProductPageInfo").innerHTML = `
      <div class="alert alert-danger">
        <p>Failed to load product details. Please try again later.</p>
      </div>
    `;
  }
}













// Setup quantity controls
function setupQuantityControls(isAvailable, productId) {
  const inStockWarning = document.getElementById("inStockWarning");
  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');
  const inputField = document.getElementById('countInput');

  if (!decreaseBtn || !increaseBtn || !inputField) {
    console.error("Quantity control elements not found!");
    return;
  }

  if (!isAvailable) {
    // Disable controls when product is out of stock
    decreaseBtn.disabled = true;
    increaseBtn.disabled = true;
    inputField.disabled = true;
    inputField.value = "";
    if (inStockWarning) {
      inStockWarning.innerHTML = `Product is <strong>Out of Stock</strong>`;
    }
  } else {
    // Setup quantity controls when product is in stock
    decreaseBtn.addEventListener('click', () => {
      let value = parseInt(inputField.value) || 1;
      if (value > 1) {
        inputField.value = value - 1;
      }
    });

    increaseBtn.addEventListener('click', () => {
      let value = parseInt(inputField.value) || 1;
      inputField.value = value + 1;
    });
    
    // Ensure input is always a valid number
    inputField.addEventListener('change', () => {
      let value = parseInt(inputField.value) || 1;
      if (value < 1) value = 1;
      inputField.value = value;
    });
    

    
    // Setup cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(inputField.value) || 1;
        // Use selectedOptions from storage or create empty object
        const selectedOptions = window.productSelectedOptions || {};
        handleAddToCart(productId, selectedOptions, quantity);
      });
    }
    
    // Setup buy now button if needed
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        // Implement buy now functionality
        console.log("Buy Now clicked");
        // Redirect to checkout or handle buy now process
      });
    }
  }
}

// Setup thumbnail carousel click events
function setupThumbnailCarousel() {
  const thumbnails = document.querySelectorAll('.thumbnail-img');
  if (!thumbnails.length) return;
  
  const carousel = document.querySelector('#carouselExample');
  if (!carousel) return;
  
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) {
        bsCarousel.to(index);
      }
    });
  });
}

// Setup variant selector
function setupVariantSelector(product, isAvailable, productId) {
  // Get or create the variant selector container
  let variantContainer = document.getElementById("ProductVarientSelectorOffcanvas");
  if (!variantContainer) {
    variantContainer = document.createElement("div");
    variantContainer.id = "ProductVarientSelectorOffcanvas";
    document.body.appendChild(variantContainer);
  }
  
  // Create the variant selector offcanvas
  variantContainer.innerHTML = `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="variantSelector">
      <div class="offcanvas-header">
        <h5 class="fw-bold">Select product variant</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <div id="variantContainer"></div>
      </div>
      <div class="fixed-bottom bg-white p-1 px-3 border-top d-flex justify-content-between align-items-center shadow" style="z-index: 1055;">
        <div>
          <strong>Total: </strong><span id="offcanvasTotalPrice">${storecurrency}${formatPrice(product.sellingPrice || 0)}</span>
        </div>
        ${isAvailable ? `
          <button class="btn btn-dark px-4 offcanvas-cart-btn w-50" id="offcanvasAddToCartBtn">
            Add to Cart
          </button>
        ` : `
          <button class="btn btn-dark px-4 w-50 notify-me" id="offcanvasNotifyBtn">
            Notify me
          </button>
        `}
      </div>
    </div>
  `;

  // Initialize selected options globally using a safer approach
  window.productSelectedOptions = {};
  
  // Base price
  const basePrice = product.sellingPrice || product.originalPrice || 0;
  
  // Parse variants
  renderVariants(product);
  
  // Initial update
  updateSelectedVariantDisplay();
  
  // Add event listener to offcanvas cart button
  const offcanvasAddToCartBtn = document.getElementById('offcanvasAddToCartBtn');
  if (offcanvasAddToCartBtn) {
    offcanvasAddToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(document.getElementById('countInput')?.value) || 1;
      handleAddToCart(productId, window.productSelectedOptions || {}, basePrice, quantity);
      // Close the offcanvas
      const offcanvasElement = document.getElementById('variantSelector');
      if (offcanvasElement) {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvas) {
          offcanvas.hide();
        }
      }
    });
  }
}




// Render variants in the offcanvas
function renderVariants(product) {
  
  const variantContainer = document.getElementById("variantContainer");
  if (!variantContainer) return;

  // Clear previous content
  variantContainer.innerHTML = "";

  // === Render Colors ===
  const colorVariants = product.ProductColors || [];
  if (colorVariants.length > 0) {
    const section = document.createElement("div");
    section.classList.add("mb-3");
    section.innerHTML = `
      <h6 class="fw-bold">Color</h6>
      <div class="mb-2 d-flex flex-wrap gap-2" id="color-options"></div>
    `;
    variantContainer.appendChild(section);

    const colorContainer = section.querySelector("#color-options");
    if (colorContainer) {
      colorVariants.forEach((colorObj, index) => {
        const { colorValue } = colorObj;

        const divMain = document.createElement("div");
        divMain.className = "variant-option";

        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.width = "25px";
        div.style.height = "25px";
        div.style.borderRadius = "50%";
        div.style.background = colorValue;
        divMain.setAttribute("data-type", "Color");
        divMain.setAttribute("data-value", colorValue);

        // Event listener for color selection
        divMain.addEventListener("click", () => {
          window.productSelectedOptions["Color"] = colorValue;
          updateSelectedVariantDisplay();
          document.querySelectorAll('[data-type="Color"]').forEach(el => el.classList.remove("selected"));
          divMain.classList.add("selected");
        });

        // Preselect the first color
        if (index === 0) {
          window.productSelectedOptions["Color"] = colorValue;
          divMain.classList.add("selected");
        }

        colorContainer.appendChild(divMain);
        divMain.appendChild(div);
      });
    }
  }

  // === Render Sizes ===
  const sizeVariants = product.ProductSizes || [];
  if (sizeVariants.length > 0) {
    // Group by type (like RAM, Storage)
    const groupedSizes = sizeVariants.reduce((acc, sizeObj) => {
      const { type, value } = sizeObj;
      acc[type] = value.split(", ");
      return acc;
    }, {});

    // Iterate over each size type
    Object.keys(groupedSizes).forEach(type => {
      const values = groupedSizes[type];
      if (!values || values.length === 0) return;

      const section = document.createElement("div");
      section.classList.add("mb-3");
      section.innerHTML = `
        <h6 class="fw-bold">${type}</h6>
        <div class="mb-2 d-flex flex-wrap gap-2" id="${type.replace(/\s+/g, '-').toLowerCase()}-options"></div>
      `;
      variantContainer.appendChild(section);

      // Use a sanitized ID to avoid issues with spaces or special characters
      const safeKey = type.replace(/\s+/g, '-').toLowerCase();
      const container = section.querySelector(`#${safeKey}-options`);

      if (!container) return;

      // Render size options
      values.forEach((value, index) => {
        const div = document.createElement("div");
        div.className = "variant-option";
        div.textContent = value;
        div.setAttribute("data-type", type);
        div.setAttribute("data-value", value);

        // Event listener for size selection
        div.addEventListener("click", () => {
          window.productSelectedOptions[type] = value;
          updateSelectedVariantDisplay();
          document.querySelectorAll(`[data-type="${type}"]`).forEach(el => el.classList.remove("selected"));
          div.classList.add("selected");
        });

        // Preselect the first option for each type
        if (index === 0) {
          window.productSelectedOptions[type] = value;
          div.classList.add("selected");
        }

        container.appendChild(div);
      });
    });
  }
}




// Update the displayed selected variants
function updateSelectedVariantDisplay() {
  const displayElement = document.getElementById("displayProductSpecifucation");
  if (!displayElement) return;
  
  if (!window.productSelectedOptions || Object.keys(window.productSelectedOptions).length === 0) {
    displayElement.innerHTML = "No options selected";
    return;
  }
  
  const specs = Object.entries(window.productSelectedOptions)
    .map(([key, val]) => {
      if (key.toLowerCase() === "color") {
        return `<span style="display:inline-block;width:15px;height:15px;border-radius:50px;border:1px solid #000;background:${val};margin:0 5px;vertical-align:middle;"></span>`;
      } else {
        return `${val}`;
      }
    })
    .join(" / ");

  displayElement.innerHTML = specs || "Default";
}



async function authUserOrder(product) {
    const res = await fetch(`http://localhost:3000/api/order/auth-order/${product.productTitle}/${localStorage.getItem('user-access-id')}`, {
      method: 'GET'
    });
  //   const data = await res.json();
  //  const order = await data.data;
    return res.ok;
}

// Average rating calculator
function calculateAverageRating(reviews) {
  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (total / reviews.length).toFixed(1);
}

// Rating distribution
function getRatingDistribution(reviews) {
  const dist = [0, 0, 0, 0, 0]; // Index 0 = 5★, Index 4 = 1★
  reviews.forEach(r => {
    dist[5 - r.rating]++;
  });
  const total = reviews.length;
  return dist.map(count => ({
    count,
    percent: ((count / total) * 100).toFixed(0)
  }));
}


async function review(product){
  const reviews = product.Reviews;  
  const reviewContainer = document.getElementById("userProductPageReviewSection");

 console.log("product in review :",product)

  // const reviews = reviewsArray.Reviews;

  // Calculate stats
  const averageRating = calculateAverageRating(reviews);
  const totalReviews = reviews.length;
  const ratingDistribution = getRatingDistribution(reviews);

  // Generate the rating progress bars
  const ratingBars = ratingDistribution.map((item, index) => `
    <div class="d-flex align-items-center">
      <span>${5 - index} ★</span>
      <div class="progress flex-grow-1 mx-2" style="height: 8px;">
        <div class="progress-bar bg-warning" style="width: ${item.percent}%"></div>
      </div>
      <span>${item.percent}%</span>
    </div>
  `).join("");

  // Generate each review card
  const reviewCards = reviews.map(r => `
    <div class="col-md-6 col-lg-4 mb-3">
      <div class="RVCard">
        <div class="d-flex justify-content-between">
          <h6 class="RVUserName">${r.name}</h6>
          <span class="RVDate">${r.date}</span>
        </div>
        <div class="star-rating" data-rating="${r.rating}"></div>
        <p>${r.comment}</p>
      </div>
    </div>
  `).join("");

 if (!reviews|| reviews.length === 0) {


    if(await authUserOrder(product)){
reviewContainer.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center text-center">
  <p>No product reviews found!</p>
  <a 
    id="writeReviewBtn" 
    href="" 
    class="btn btn-dark w-25 d-flex justify-content-center align-items-center gap-3"
  >
    Write a Review
  </a>
</div> `;
   
}
    else{
      console.log("user not buy this")
    reviewContainer.innerHTML = `<p class="text-center">No product reviews found!</p>`;
    return;}

  }
else{
// Final HTML
  reviewContainer.innerHTML = `
    <div class="gap-2 justify-content-between container py-3 userProductPageReviewSectionInner">
      <div class="ReviewSection">
        <div class="row mt-3">
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="review-or-img mt-3">
              <div class="Avgcard p-4 shadow-sm">
                <h2 class="text-center">
                  ${averageRating}
                  <span class="text-warning">
                    <div class="star-rating" data-rating="${averageRating}"></div>
                  </span>
                </h2>
                <p class="text-center text-muted">Based on ${totalReviews} reviews</p>
                ${ratingBars}
                ${await authUserOrder(product) ? `
                <a class="RVwriteReviewBtn w-100 mt-3 d-flex align-items-center justify-content-center gap-3" id="writeReviewBtn" href="#">Write a Review</a>` : "Only authorised user can write review."}
              </div>
            </div>
          </div>
          ${reviewCards}
        </div>
      </div>
    </div>
  `;
                }

  

    const reviewBtn = document.getElementById('writeReviewBtn');
    reviewBtn.addEventListener('click', function () {
if (reviewBtn && productId) {
    reviewBtn.href = `../pages/post review.html?product_id=${productId}`;
  }
    }
    );

}


  



// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  productId = urlParams.get("id");
  
  if (!productId) {
    document.getElementById("userProductPageInfo").innerHTML = `
      <div class="alert alert-danger">
        <p class="text-danger">No product ID specified in URL.</p>
      </div>
    `;
    return;
  }
  
  initializePage(productId);

});