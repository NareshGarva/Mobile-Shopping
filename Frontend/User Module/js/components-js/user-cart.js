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
          <input class="cartCouponInput" type="text" id="cartCouponInput" placeholder="Type coupon code here" />
          <button class="couponBtn" id="applyCouponBtn">Apply</button>
        </div>
        <div id="discountDetails"></div>
        <p class="have-a-code d-flex gap-3">
          Have a coupon code? <a href="#" id="applyCoupon">Apply Now</a>
        </p>
      </div>
      <hr />
      <div class="toral-checkout d-flex justify-content-between">
        <div class="cartTotal">
          <p class="catTotalP">Total: ₹ <span id="cartTotal"></span></p>
        </div>
        <button class="carCheckout">Checkout</button>
      </div>
    </div>
  </div>
`;

// Import products array
import { showNotification } from "../notifications.js";
// import { products as vivoProducts } from "../products.js"; // Import products - this was missing

  let cart = []; // Initialize the cart as an empty array
let isCouponApplied = false;
let originalAmount;
// Update Cart Counter
function updateCartCount() {
  let cartItems = document.querySelectorAll(".cartproductlistitems").length;
  document.querySelectorAll(".itemNumberCounter").forEach(el => {
    el.textContent = cartItems > 0 ? cartItems : 0;
  });
}

// Update Total Price
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.Product.sellingPrice * item.quantity, 0);
  document.getElementById("cartTotal").textContent = total;
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
        <div class="rounded" style="width:90px; height:90px;background:#efefef">
          <img class="rounded" src="${item.Product.mainImage}" alt="${item.Product.productTitle}"/>
        </div>
        <div class="cartproductcontent">
          <p class="product-title  m-0">${item.Product.productTitle}</p>

        <p class="product-variant text-muted small m-0 w-100">
  ${item.color ? `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${item.color};margin-left:5px;"></span> / ` : ""}
  ${item.cartVarients.map(variant => `${variant.value}`).join(" / ")}
</p>

          <div>
            <p>Price: ₹<span>${item.Product.sellingPrice * item.quantity}</span></p>
          </div>
          <div class="d-flex justify-content-between align-items-center" >
            <div class="cartproductquality d-flex justify-content-center align-items-center">
              <button class="quantity-btn decrease" data-id="${item.cartId}">−</button>
              <input type="text" class="quantity-input" value="${item.quantity}" readonly>
              <button class="quantity-btn increase" data-id="${item.cartId}">+</button>
            </div>
            <div class="cartdeleteicon">
              <a href="#" class="remove-item" data-id="${item.cartId}">
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
document.getElementById("applyCoupon").addEventListener("click", function(e) {
  e.preventDefault(); // Prevent default link behavior
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

export async function handleAddToCart(id, passedVariant = {}, passedQuantity) {
 console.log("maa me aa gya: ", id);

  if(localStorage.getItem("session-expiry-time") < Date.now()){
    showNotification(`Please <a href="../pages/Authentication.html" style="color: red">Login</a> to add in cart`, "error");
    return;
  }

 console.log("maa me aa gya: 1");
  
  function skipFirst(obj) {
    if (!obj || Object.keys(obj).length === 0) return {};
    return Object.fromEntries(Object.entries(obj).slice(1));
  }
 console.log("maa me aa gya: 2");

  let finalVariant = skipFirst(passedVariant);
  let finalColor = passedVariant?.Color || null;
  let finalQuantity = passedQuantity > 0 ? passedQuantity : 1;
  
 console.log("maa me aa gya: 3",finalColor, finalQuantity, finalVariant);

  // If required data not passed, use defaults
  if (!passedVariant || Object.keys(passedVariant).length === 0) {
    const { variant: defaultVariant, color: defaultColor } = getDefaultVariant(product);
    finalVariant = defaultVariant;
    finalColor = defaultColor;
  } 
  
 
    try{
      const res = await fetch("http://localhost:3000/api/cart/add-to-cart",{
method: "POST",
headers:{
  "Content-Type":"application/json",
},
body: JSON.stringify({
  userId: localStorage.getItem("user-access-id"),
  productId: id,
  quantity: finalQuantity,
       selectedVariant: finalVariant,
       selectedColor: finalColor,
})
      })
      const data = await res.json();
      if(!res.ok){
 showNotification(data.message, "error");
      }
      
      showNotification(data.message, "success");
    }catch(err){
      console.log(err);
    }
  
  loadCart();
  renderCartItems();
  updateCartCount();
  updateCartTotal();
}

// Handle Button Events
document.getElementById("cartproductlist").addEventListener("click", function(e) {
  const target = e.target;
  
  if (target.classList.contains("increase")) {
    const id = target.dataset.id;
    handleIncreaseQty(id);
  }

  if (target.classList.contains("decrease")) {
    const id = target.dataset.id;
    handleDecreaseQty(id);
  }

  if (target.closest(".remove-item")) {
    e.preventDefault();
    const id = target.closest(".remove-item").dataset.id;
    handleRemoveItem(id);
  }
});



// Increase Quantity
async function handleIncreaseQty(id) {
id = Number(id);
const item = cart.find(c => c.cartId === id);
console.log(item);

  if (item) {
    try {
      const res = await fetch("http://localhost:3000/api/cart/update-quantity", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: item.cartId,
          quantity: item.quantity + 1
        })
      });

      if (res.ok) {
        await loadCart(); // Reload the cart data
        renderCartItems(); // Re-render the cart UI
        updateCartCount(); // Update the cart item count
        updateCartTotal(); // Update the total price
        showNotification("Quantity increased successfully.", "success");
      } else {
        const errorData = await res.json();
        showNotification(errorData.message);
      }
    } catch (err) {
      console.error("Error increasing quantity:", err);
      showNotification("Failed to increase quantity. Please try again.", "error");
    }
  } else {
    console.log("Item not found for ID:", id);
  }
}


// Decrease Quantity
async function handleDecreaseQty(id) {
  id = Number(id);
  // Convert the id to a number
  const item = cart.find(p => p.cartId === Number(id));  


  if (item && item.quantity > 1) {
    try {
      const res = await fetch("http://localhost:3000/api/cart/update-quantity", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: item.cartId,
          quantity: item.quantity - 1
        })
      });
const data = await res.json();
      if (res.ok) {
        await loadCart(); // Reload the cart data
        renderCartItems(); // Re-render the cart UI
        updateCartCount(); // Update the cart item count
        updateCartTotal(); // Update the total price
         showNotification(data.message, "success");
      } else {
        
        showNotification(data.message, "error");
      }
    } catch (err) {
      console.error("Error decreasing quantity:", err);
      showNotification("Failed to decrease quantity. Please try again.", "error");
    }
  } else {
    console.log("Item not found for ID or Quantity is 1:", id);
  }
}


// Remove Item
async function handleRemoveItem(id) {
  try {
    // Then sync with server
    const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
      method: "DELETE",
    });
const data = await res.json();
    if(!res.ok){
      showNotification(data.message, "error");
      // throw new error(`HTTP error! status: ${res.status}`);
    }
    
    loadCart();
    renderCartItems();
    updateCartCount();
    updateCartTotal();
    showNotification(data.message, "success");
  } catch (err) {
    console.error("Error removing item:", err);
    showNotification("Failed to remove item. Please try again.", "error");
  }
}





async function loadCart() {


  try {
    // Try to load from API first
    const response = await fetch("http://localhost:3000/api/cart/get-cart-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "userid": localStorage.getItem("user-access-id"), // Ensure correct header format (lowercase "userid")
      },
    });

    // Check if the response is not OK
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Assign fetched data to the cart
    cart = data.cartProducts;
  } catch (err) {
    console.error("Error loading cart:", err.message);
  }



  // Render the UI
  renderCartItems();    // Pass the cart as a parameter
  updateCartCount();    // Pass the cart as a parameter
  updateCartTotal();    // Pass the cart as a parameter
}

//event listener for apply coupon btn
// document.getElementById("applyCouponBtn").addEventListener("click", async function () {
//   const couponCode = document.getElementById("cartCouponInput").value;
//   if(isCouponApplied){
//     showNotification("Only one coupon can applied.", "error");
//     return;
//   }
//   if (!couponCode) {
//     showNotification("Enter the coupon code", "error");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:3000/api/coupon/apply", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         couponCode,
//         orderAmount: parseFloat(document.getElementById("cartTotal").innerText)
//       })
//     });

//     if (!res.ok) {
//       showNotification("Invalid coupon code!");
//       return;
//     }

//     const resData = await res.json();
//     const finalAmount = resData.finalAmount;
//     const discount = resData.discount;
//     document.getElementById("cartTotal").innerText = finalAmount;

//     document.getElementById("discountDetails").innerHTML = `
//     <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
//   <div class="d-flex">
//     <div class="toast-body">
//     ${couponCode} applied - you save ${discount}₹
//     </div>
//     <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
//   </div>
// </div>`

//     isCouponApplied = true;
//     showNotification("Coupon code applied!", "success");
//   } catch (error) {
//     console.log("Error in validating coupon", error);
//     showNotification("Error in validating coupon code!", "error");
//   }
// });




// Event listener for apply coupon button
document.getElementById("applyCouponBtn").addEventListener("click", async function () {
  const couponCode = document.getElementById("cartCouponInput").value.trim();
// Store original price globally
originalAmount = parseFloat(document.getElementById("cartTotal").innerText);
  if (isCouponApplied) {
    showNotification("Only one coupon can be applied.", "error");
    return;
  }

  if (!couponCode) {
    showNotification("Enter the coupon code", "error");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/coupon/apply", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        couponCode,
        orderAmount: originalAmount
      })
    });

    if (!res.ok) {
      showNotification("Invalid coupon code!", "error");
      return;
    }

    const resData = await res.json();
    const finalAmount = resData.finalAmount;
    const discount = resData.discount || 0;
    
    document.getElementById("cartTotal").innerText = finalAmount;

    // Render toast
    document.getElementById("discountDetails").innerHTML = `
      <div id="couponToast" class="align-items-center p-2 border border-success status-Delivered show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <strong>${couponCode.toUpperCase()}</strong> applied – you saved <strong>₹${discount}</strong>
          </div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" id="closeCouponToast"></button>
        </div>
      </div>`;

    isCouponApplied = true;
    showNotification("Coupon code applied!", "success");

    // Add event listener for toast close
    document.getElementById("closeCouponToast").addEventListener("click", function () {
      // Reset everything
      document.getElementById("cartTotal").innerText = originalAmount.toFixed(2);
      isCouponApplied = false;
      document.getElementById("discountDetails").innerHTML = ""; // Clear toast
      showNotification("Coupon removed!", "info");
    });

  } catch (error) {
    console.error("Error in validating coupon", error);
    showNotification("Error in validating coupon code!", "error");
  }
});






// event listener for checkout btn.
document.querySelector(".carCheckout").addEventListener("click", async function() {
  if (cart.length === 0) {
    showNotification("Your cart is empty");
    return;
  }

  console.log("the cart items : ",cart)
  
  if (localStorage.getItem("session-expiry-time") < Date.now()) {
    showNotification(`Please <a href="../pages/Authentication.html" style="color: red">Login</a> to proceed to checkout`, "error");
    return;
  }

  try {
    const userId = localStorage.getItem("user-access-id");

    const draftOrder = await fetch('http://localhost:3000/api/order/create-Order', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        orderAmount: parseFloat(document.getElementById("cartTotal").innerText),
        items: cart, // Directly passing the array, no need for stringify
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
});




document.addEventListener("DOMContentLoaded", function(){
// Initialize cart on page load
loadCart();
});
