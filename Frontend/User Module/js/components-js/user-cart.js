// Set Cart UI
document.getElementById("userCart").innerHTML = `
  <div class="Cart offcanvas offcanvas-end Caroffcanvas" id="cartoffcanvas" tabindex="-1">
    <div id="notification-container"></div>
    <div class="offcanvas-header d-flex justify-content-between align-items-center">
      <h5 class="offcanvas-title">Your cart • <span class="itemNumberCounter"></span> <span>item</span></h5>
      <button class="close-icon" type="button" data-bs-dismiss="offcanvas">
        <img src="../assets/icons/menu-close.svg" alt="" />
      </button>
    </div>

    <div class="offcanvas-body">
      <div class="cart-empty-message">Your cart is empty.</div>
      <div id="cartproductlist" class="cartproductlist"></div>
    </div>

    <div class="offcanvas-footer cartfooter">
      <div>
        <div class="cartCoupon justify-content-between align-items-center" style="display: none;">
          <input class="cartCouponInput" type="text" placeholder="Type coupon code here" />
          <button class="couponBtn">Apply</button>
        </div>
        <p class="have-a-code d-flex gap-3">
          Have a coupon code? <a href="#" id="applyCoupon">Apply Now</a>
        </p>
      </div>
      <hr />
      <div class="toral-checkout d-flex justify-content-between">
        <div class="cartTotal">
          <p class="catTotalP">Total: ₹ <span id="cratTotal"></span></p>
        </div>
        <button class="carCheckout">Checkout</button>
      </div>
    </div>
  </div>
`;

// Import products array
import vivoProducts from "../products.js";
// Import products array
import {showNotification} from "../notifications.js";

// Initialize empty cart
let cart = [];


// Update Cart Counter
function updateCartCount() {
  let cartItems = document.querySelectorAll(".cartproductlistitems").length;
  document.querySelectorAll(".itemNumberCounter").forEach(el => {
    el.textContent = cartItems > 0 ? cartItems : 0;
  });
}

// Update Total Price
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  document.getElementById("cratTotal").textContent = total;
}

// Render Cart Items
function renderCartItems() {
  const cartList = document.getElementById("cartproductlist");
  cartList.innerHTML = "";
  
  const emptyMessage = document.querySelector(".cart-empty-message");
  if (cart.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
  
  cart.forEach((item) => {
    
    const cartItem = document.createElement("div");
    cartItem.className = "fade-in cartproductlistitems d-flex justify-content-between align-items-center";
    cartItem.innerHTML = `
      <div class="cartproductimg d-flex justify-content-left align-items-center gap-2">
        <div class="rounded" style="width:90px; height:90px;background:gray">
          <img class="rounded" src="${item.mainImage}" alt="${item.title}"/>
        </div>
        <div class="cartproductcontent">
<p class="product-title m-0">${item.title}</p>

<p class="product-variant text-muted small m-0 w-100">
  ${item.selectedColor ? `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${item.selectedColor};margin-left:5px;"></span> / ` : ""}
  ${Object.entries(item.selectedVariant || {}).map(([key, value]) => `
    ${ value }
    `).join(" / ")}
</p>
          <div>
            <p>Price: ₹<span>${item.sellingPrice * item.quantity}</span></p>
          </div>
          <div class="d-flex justify-content-between align-items-center" >
            <div class="cartproductquality d-flex justify-content-center align-items-center">
              <button class="quantity-btn decrease" data-id="${item.id}">−</button>
              <input type="text" class="quantity-input" value="${item.quantity}" readonly>
              <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <div class="cartdeleteicon">
              <a href="#" class="remove-item" data-id="${item.id}">
                <img src="../assets/icons/delete.svg" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    cartList.appendChild(cartItem);
  });
}

// Toggle Coupon Field
document.getElementById("applyCoupon").addEventListener("click", function() {
  let cartCoupon = document.querySelector(".cartCoupon");
  cartCoupon.style.display = cartCoupon.style.display === "none" ? "flex" : "none";
});


function getDefaultVariant(product) {
  const sizes = product.sizes;
  let variant = {};
  
  if (sizes) {
    for (const key in sizes) {
      if (Array.isArray(sizes[key])) {
        variant[key] = sizes[key][0]; // Pick first item from array
      } else {
        variant[key] = sizes[key]; // Directly assign string (like Processor)
      }
    }
  }
  
  const color = product.colors?.[0] || null;
  
  return { variant, color };
}



export function handleAddToCart(id, passedVariant = {}, passedPrice, passedQuantity) {
  
  const product = vivoProducts.find(p => p.id === id);
  const inCart = cart.find(item => item.id === id);
  
  function skipFirst(obj) {
  return Object.fromEntries(Object.entries(obj).slice(1));
}

let finalVariant = skipFirst(passedVariant);

  let finalColor = passedVariant.Color;
  
  let finalPrice = passedPrice;
  let finalQuantity = passedQuantity;
  
  // If required data not passed, use defaults
  if (!passedVariant || Object.keys(passedVariant).length === 0) {
    const { variant: defaultVariant, color: defaultColor } = getDefaultVariant(product);
    finalVariant = defaultVariant;
    finalColor = defaultColor;
  }
  
  if (!passedPrice) {
    finalPrice = product.sellingPrice;
  }
  
  if (!passedQuantity || passedQuantity <= 0) {
    finalQuantity = 1;
  }
  
  if (inCart) {
    inCart.quantity += finalQuantity;
  } else {
    cart.push({
      ...product,
      sellingPrice: finalPrice,
      quantity: finalQuantity,
      selectedVariant: finalVariant,
      selectedColor: finalColor
    });
  }
  
  renderCartItems();
  updateCartCount();
  updateCartTotal();
  saveCart();
  showNotification("Added to cart");
}





// Handle Button Events
document.getElementById("cartproductlist").addEventListener("click", function(e) {
  const target = e.target;
  
  // Increase Quantity
  if (target.classList.contains("increase")) {
    const id = target.dataset.id;
    handleIncreaseQty(id);
  }
  
  // Decrease Quantity
  if (target.classList.contains("decrease")) {
    const id = target.dataset.id;
    handleDecreaseQty(id);
  }
  
  // Remove Item
  if (target.closest(".remove-item")) {
    e.preventDefault();
    const id = target.closest(".remove-item").dataset.id;
    handleRemoveItem(id);
  }
});

// Increase Quantity
function handleIncreaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item && item.quantity < 10) {
    item.quantity++;
    renderCartItems();
    updateCartCount();
    updateCartTotal();
    saveCart();
  }
}

// Decrease Quantity
function handleDecreaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
    renderCartItems();
    updateCartCount();
    updateCartTotal();
    saveCart();
  }
}

// Remove Item
function handleRemoveItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCartItems();
  updateCartCount();
  updateCartTotal();
  saveCart();
}


function saveCart() {
  localStorage.setItem("userCartData", JSON.stringify(cart));
}


function loadCart() {
  const savedCart = localStorage.getItem("userCartData");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCartItems(); // This should be a defined function
    updateCartCount(); // Optional function to show cart count
    updateCartTotal(); // Optional function to show total
  }
}
loadCart();