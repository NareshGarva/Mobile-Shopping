import vivoProducts from "./products.js"; // Ensure correct path
import { renderStars, calculateDiscountHTML,checkInStock } from "./global-product.js"; // Ensure correct path
import {handleAddToCart} from "./components-js/user-cart.js"; // Ensure correct path


const storecurrency = '₹';

document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  
const product = vivoProducts.find(p => p.id == productId);


  if (!product) {
    document.getElementById("userProductPageInfo").innerHTML = `<p class="text-danger">Product not found!</p>`;
    return;
  }
  
  const {
    id: productID,
    title: productTitle,
    description: productDescription,
    originalPrice: productOriginalPrice,
    sellingPrice: productSellingPrice,
    category: productCategory,
    stock: productInStock,
    rating: productRating,
    reviews: productReviews,
    mainImage,
    casualImages,
    specifications,
    warranty
  } = product;
  
  const formatPrice = price => Number(price).toLocaleString('en-IN');
  
  
  
  document.getElementById("userProductPageInfo").innerHTML = `
    <div class="product-page container py-3">
      <!-- Image Slider -->
      <div class="product-images">
        <div id="carouselExample" class="carousel slide main-carousel" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${mainImage}" alt="Product Image" />
            </div>
            ${casualImages.map(img => `
              <div class="carousel-item">
                <img src="${img}" alt="Product Image" />
              </div>`).join("")}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <img src="../assets/icons/leftarrow.svg" alt="" />
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <img src="../assets/icons/rightarrow.svg" alt="" />
          </button>
        </div>

        <!-- Thumbnail Slider -->
        <div class="d-flex overflow-auto mt-2 thumbnail-slider">
          <img src="${mainImage}" alt="Product Image" />
          ${casualImages.map(img => `<img src="${img}" alt="Product Image" />`).join("")}
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
          <img src="../assets/icons/rightarrow.svg" alt="" />
        </button>

        <!-- Action Buttons -->
        <div class="mt-3 d-flex gap-2 align-items-center justify-content-between">
          <div class="counter d-flex align-items-center justify-content-between p-0" >

            


      <button class="btn btn-outline-secondary" type="button" id="decrease">−</button>
      <input id="countInput" type="number" class="form-control text-center count-input" value="1" min="1" style="max-width: 50px;">
      <button class="btn btn-outline-secondary " type="button" id="increase">+</button>
    </div>
    <div id="inStockWarning" class="text-danger small fw-bold mt-1"></div>
  


${checkInStock(productId)?` <button class="product-buy-now-btn d-flex align-items-center justify-content-center gap-2">
            <img src="../assets/icons/shield.svg" alt="" />
            <span>Buy Now</span>
          </button>

          <button class="product-cart-btn" >
            <img src="../assets/icons/PCart.svg" alt="" />
          </button> ` : ` <button class="notify-me d-flex align-items-center justify-content-center gap-2 product-notify-me-btn">
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
            <span >Notify me when available</span>
          </button>`}

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
  specList.innerHTML = Object.entries(specifications)
    .map(([key, value]) => `<li class="list-group-item"><strong>${key}:</strong> ${value}</li>`)
    .join("");
  
  // Populate Warranty
  document.getElementById("warranty-details").innerHTML = `
    <strong>Warranty Details:</strong> Vivo provides ${warranty} year(s) warranty on this product.
  `;
  



    

    const inStockWarning = document.getElementById("inStockWarning");
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const inputField = document.getElementById('countInput');

    const isAvailable = checkInStock(productId);

    if (!isAvailable) {
      decreaseBtn.disabled = true;
      increaseBtn.disabled = true;
      inputField.disabled = true;
      inputField.value = "";
      inStockWarning.innerHTML = `Product is <strong>Out of Stock</strong>`;
    } else {
      
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
    }
  
  
  
  
  
  
  
  
  document.getElementById("ProductVarientSelectorOffcanvas").innerHTML = `

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
    <strong>Total: </strong><span id="offcanvasTotalPrice">₹0</span>
  </div>
  ${checkInStock(productId)?`
  <button class="btn btn-dark px-4 product-cart-btn w-50" >
    Add to Cart
  </button>` : `<button class="btn btn-dark px-4 w-50 notify-me" >
    Notify me
  </button>`}
  
</div>
  </div>
`;


  

  // Price
  const basePrice = product.sellingPrice || product.originalPrice || 0;
  let selectedOptions = {};

  // Parse colors
  const colorVariants = product.colors || [];

  // Parse size variants
  const sizeVariants = product.sizes || {};
  const sizeKeys = Object.keys(sizeVariants); // like RAM, Storage, Dial

  // UI Elements
  const variantContainer = document.getElementById("variantContainer");
  const totalPriceElement = document.getElementById("offcanvasTotalPrice");
  totalPriceElement.innerHTML=`₹ ${basePrice}
  `;

  function renderVariants() {
  variantContainer.innerHTML = "";

  // === Render Colors ===
  if (colorVariants.length > 0) {
    const section = document.createElement("div");
    section.classList.add("mb-3");
    section.innerHTML = `
   <h6 class="fw-bold">Color</h6>

    <div class="mb-2" id="color-options"></div>`;
    variantContainer.appendChild(section);

    const colorContainer = section.querySelector("#color-options");

    colorVariants.forEach((color, index) => {
      const divMain = document.createElement("div");
      divMain.className = "variant-option";
      
      const div = document.createElement("div");
      
      div.style.border = "2px solid #ccc";
      div.style.width = "25px";
      div.style.height = "25px";
      div.style.borderRadius = "50%";
      div.style.background = color;
      divMain.setAttribute("data-type", "Color");
      divMain.setAttribute("data-value", color);

      divMain.addEventListener("click", () => {
        selectedOptions["Color"] = color;
        updateSelectedVariantDisplay();
        document.querySelectorAll('[data-type="Color"]').forEach(el => el.classList.remove("selected"));
        divMain.classList.add("selected");
      });

      if (index === 0) {
        selectedOptions["Color"] = color;
        divMain.classList.add("selected");
      }
colorContainer.appendChild(divMain);
      divMain.appendChild(div);
    });
  }

  // === Render Sizes ===
  sizeKeys.forEach(key => {
    const values = sizeVariants[key];
    if (!values || values.length === 0) return;

    const section = document.createElement("div");
    section.classList.add("mb-3");
    section.innerHTML = `        <h6 class="fw-bold">${key}</h6>
        <div class="mb-2" id="${key}-options"></div>`;
    variantContainer.appendChild(section);

    const container = section.querySelector(`#${key}-options`);

    const valueArray = Array.isArray(values) ? values : [values];

    valueArray.forEach((value, index) => {
      const div = document.createElement("div");
      div.className = "variant-option";
      div.textContent = value;
      div.setAttribute("data-type", key);
      div.setAttribute("data-value", value);

      div.addEventListener("click", () => {
        selectedOptions[key] = value;
        updateSelectedVariantDisplay();
        document.querySelectorAll(`[data-type="${key}"]`).forEach(el => el.classList.remove("selected"));
        div.classList.add("selected");
        
      });

      if (index === 0) {
        selectedOptions[key] = value;
        div.classList.add("selected");
      }

      container.appendChild(div);
    });
  });
}



  renderVariants();
  
  
  
  function updateSelectedVariantDisplay() {
  const specs = Object.entries(selectedOptions)
    .map(([key, val]) => {
      if (key.toLowerCase() === "color") {
        return `<span style="display:inline-block;width:15px;height:15px;border-radius:50px;border:1px solid #000;background:${val};margin:0 5px;vertical-align:middle;"></span>`;
      } else {
        return `${val}`;
      }
    })
    .join(" / ");

  document.getElementById("displayProductSpecifucation").innerHTML = specs;
}


  updateSelectedVariantDisplay();
  
  
  
  

  // Add event listener to all product cart buttons
document.querySelectorAll(".product-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Call your add to cart function
    handleAddToCart(productID, selectedOptions,productSellingPrice,inputField.value);
  });
});
  
  
  
  
});





