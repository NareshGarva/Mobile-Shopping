import { handleAddToCart } from "./components-js/user-cart.js";
import { showNotification } from "./notifications.js";



// function to show star rating
export function renderStars(Review) {
  let ratingSum = 0;
  Review.forEach(review => {
    ratingSum += review.rating;
  });

  const rating = ratingSum/Review.length;

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

  
export function checkInStock(stock) {
  return stock > 0;
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
          <img src="${product.mainImage}" alt="${product.productTitle}">
          </div>

          <div class="truncate-title" title="${product.productTitle}">${product.productTitle}</div>
                    <div class="rating text-warning">${renderStars(product.Reviews)}</div>
              <p class="mb-1">
                <span class="RVSellingPrice fw-bold">₹${product.sellingPrice}</span>
                <small class="text-muted text-decoration-line-through ms-1">₹${product.originalPrice}</small>
              </p>
              
</div>
           ${generateButtons(product.id,product.stock, (btnstyle))}

        </div>
  `;
        const productLink =  productCardswiper.querySelector(".productLink");
if (productLink) {
  productLink.addEventListener("click", () => {
    viewedProduct(product.id);
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
          <img src="${product.mainImage}" alt="${product.productTitle}">
          </div>

          <div class="" title="${product.productTitle}">${product.productTitle}</div>
                    <div class="rating text-warning">${renderStars(product.Reviews)}</div>
              <p class="mb-1">
                <span class="RVSellingPrice fw-bold">₹${product.sellingPrice}</span>
                <small class="text-muted text-decoration-line-through ms-1">₹${product.originalPrice}</small>
              </p>
              </div>

           ${generateButtons(product.id,product.stock, (btnstyle))}

        </div>
      `;
      const productLink = productCard.querySelector(".productLink");
if (productLink) {
  productLink.addEventListener("click", () => {
    viewedProduct(product.id);
    redirectToProductPage(product.id);
  });
}
      productContainer.appendChild(productCardstyle);
      productCardstyle.appendChild(productCard);
    });
  }
}


// Button Generator
function generateButtons(id,stock, style) {
  
  if (style == 1) {
    return `
      <div class="product-actions mt-3 d-flex justify-content-between gap-1">
        <a onclick="viewedProduct('${id}')" href="product-details.html?id=${id}" class="btn btn-sm bg-dark text-white w-100">View details</a>
        ${checkInStock(stock)?
       `<button class="btn btn-sm btn-outline-dark" onclick="addToCartBtn(${id})">
          <img src="../assets/icons/pCart.svg">
        </button>` :        `<button class="btn btn-sm btn-outline-dark notify-me" >
          <img src="../assets/icons/notification.svg">
        </button>`}
      </div>
    `;
  } else if (style == 2) {
    return `
      <div class="text-center mt-3">
              ${checkInStock(stock)?
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
        <a onclick="viewedProduct(${id})" href="product-details.html?id=${id}" class="btn bg-dark w-100 text-white btn-sm">View details</a>
      </div>
    `;
  }
  return "";
}

const loadProduct = async (productId) => {
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

export function getFirstColorAndVariant(product) {
  const color = product.ProductColors?.[0]?.colorValue || null;
  const variant = Object.fromEntries(
    product.ProductSizes?.map(({ type, value }) => [type, value.split(',')[0].trim()]) || []
  );
  return { color, variant };
}

export async function buyNowProduct(id){
    if (localStorage.getItem("session-expiry-time") < Date.now()) {
      showNotification(`Please <a href="../pages/Authentication.html" style="color: red">Login</a> to proceed to checkout`, "error");
      return;
    }
 
  try {
    const userId = localStorage.getItem("user-access-id");
const product = await loadProduct(id);
const orderAmount = product.sellingPrice;
    const { variant,color } = getFirstColorAndVariant(product);
const items = [{
Product:{  mainImage:product.mainImage,
        productTitle:product.productTitle,
        sellingPrice:product.sellingPrice,
        },
        quantity:1,
        color:color,
        cartVarients:variant,
}]
    const draftOrder = await fetch('http://localhost:3000/api/order/create-Order', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        orderAmount,
        items, 
      }),
    });

    if (!draftOrder.ok) {
      const errorData = await draftOrder.json();
      console.log("Order can't be created. Error:", errorData.message || "Unknown error");
      return;
    }

    const responseData = await draftOrder.json();
    console.log("Order created successfully:", responseData);

    // Redirect to checkout page or show checkout modal
    window.location.href = window.location.href = `./Checkout.html?orderId=${responseData.order.orderId}`;
  } catch (err) {
    console.log("Error in creating order", err.message);
  }

}

window.addToCartBtn = function (id){
handleAddToCart(id);
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
export async function addToRecentlyViewed(productId) {
try{
const addRecentlyViewedProduct = await fetch(`http://localhost:3000/api/recently-viewed/add/${localStorage.getItem('user-access-id')}/${productId}`,{
          method: 'POST',
        });
        if(!addRecentlyViewedProduct.ok){
          console.log("Product not added");
          return;
        }
        return console.log("Product added");
}catch(error){
  console.log("error in adding in recently viewed");
}
}






export function viewedProduct(productId) {
  addToRecentlyViewed(productId);
}






// // Top Selling Products
// function getTopSelling(products) {
//   return products.filter(product => product.isTopSelling);
// }

// // Top Deals (Biggest Discount)
// function getTopDeals(products, minDiscount = 10) {
//   return products.filter(product => {
//     const discount = ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100;
//     return discount >= minDiscount;
//   });
// }


// Specific Category Products
export async function getProductByCategory(categoryName) {
  
  // try {
  //   const res = await fetch(`http://localhost:3000/api/product/all/${categoryName}`, {
  //     method: 'GET'
  //   });

  //   const products = await res.json();
  //   return await products;
  // } catch (error) {
  //   console.log("Error in loading product:", error);
  //   alert("Error in loading product");
  //   return null;
  // }
}



// // New Arrivals (Added within the last 30 days)
// function getNewArrivals(products) {
//   const today = new Date();
//   return products.filter(product => {
//     const added = new Date(product.addedDate);
//     const diffDays = (today - added) / (1000 * 60 * 60 * 24);
//     return diffDays <= 30;
//   });
// }

// // Custom Function (e.g. by RAM or processor)
// function getBySpecs(products, filter = {}) {
//   return products.filter(product => {
//     return Object.entries(filter).every(([key, value]) => {
//       if (Array.isArray(product.sizes[key])) {
//         return product.sizes[key].includes(value);
//       }
//       return product.sizes[key] === value;
//     });
//   });
  

// }