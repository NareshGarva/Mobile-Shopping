
    // Store selected addresses
    let selectedShippingAddressId = null;
    let selectedBillingAddressId = null;
    let orderData = null;
    let total;
    
    // Function to validate address selection
    function validateAddressSelection() {
      const addressError = document.getElementById('addressErrorMessage');
      const billingError = document.getElementById('billingErrorMessage');
      const sameAsShipping = document.getElementById('sameShippingAddress').checked;
      const purchaseButtons = document.querySelectorAll('#completeDesktopPurchase, #completeMobilePurchase');
      
      // Clear previous error messages
      addressError.style.display = 'none';
      if (billingError) billingError.style.display = 'none';
      
      // Validate shipping address
      if (!selectedShippingAddressId) {
        addressError.style.display = 'block';
        purchaseButtons.forEach(btn => {
          btn.classList.add('disabled-button');
        });
        return false;
      }
      
      // Validate billing address if not same as shipping
      if (!sameAsShipping && !selectedBillingAddressId) {
        billingError.style.display = 'block';
        purchaseButtons.forEach(btn => {
          btn.classList.add('disabled-button');
        });
        return false;
      }
      
      // All validations passed
      purchaseButtons.forEach(btn => {
        btn.classList.remove('disabled-button');
      });
      return true;
    }
    



// Function to render addresses in the specified container
async function renderAddresses() {
  try {
    // Get user ID from local storage
    const userId = localStorage.getItem('user-access-id');

    if (!userId) {
      console.log("User ID not found in local storage");
      return;
    }

    // Fetch addresses from API
    const response = await fetch(`http://localhost:3000/api/address/get-address/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error fetching addresses:", errorData.message);
      return;
    }

    // Store fetched addresses in a variable
    const data = await response.json();
    const addresses = data.addresses || [];

    // Get the container
    const shippingContainer = document.getElementById('allUserAddresses');
    const billingContainer = document.getElementById('billingAddresses');

    if (!shippingContainer || !billingContainer) {
      console.log("Address containers not found");
      return;
    }

    // Clear previous content
    shippingContainer.innerHTML = '';
    billingContainer.innerHTML = '';

    // If no addresses found
    if (!addresses.length) {
      shippingContainer.innerHTML = '<div class="swiper-slide"><p class="text-muted">No addresses found. Please add a shipping address to continue.</p></div>';
      return;
    }

    // Sort addresses - default addresses first
    const sortedAddresses = [...addresses].sort((a, b) => {
      if (a.defaultAddress) return -1;
      if (b.defaultAddress) return 1;
      return 0;
    });


    // Render each address
    sortedAddresses.forEach((address, index) => {
      const addressHTML = `
        <div class="swiper-slide">
          <div class="address-card border p-3 rounded ${index === 0 ? 'selected' : ''}" data-address-id="${address.addressId}">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="card-title mb-0 gap-1 d-flex justify-content-left align-items-center fw-bold small">
                  <img src="../assets/icons/${address.addressType}.svg" alt="" /> ${address.addressType}
                </h5>
                ${address.defaultAddress ? '<span class="default-address-badge">Default</span>' : ''}
              </div>
              <p class="card-text mb-1">${address.fullName}</p>
              <p class="card-text mb-1">${address.addressLine1}</p>
              ${address.localityArea ? `<p class="card-text mb-1">${address.localityArea}</p>` : ''}
              <p class="card-text mb-1">${address.cityTown}, ${address.state} ${address.pinCode}</p>
              <p class="card-text mb-1">${address.country}</p>
              <p class="card-text mb-1">${address.mobileNumber}</p>
            </div>
          </div>
        </div>
      `;

      shippingContainer.innerHTML += addressHTML;
      billingContainer.innerHTML += addressHTML;

      // Set the first address as selected by default
      if (index === 0) {
        selectedShippingAddressId = address.addressId;
        selectedBillingAddressId = address.addressId;
      }
    });

    // Initialize Swiper for shipping addresses
    new Swiper(".shippingSwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    // Address card selection
    document.querySelectorAll('#allUserAddresses .address-card').forEach(card => {
      card.addEventListener('click', function () {
        document.querySelectorAll('#allUserAddresses .address-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedShippingAddressId = this.getAttribute('data-address-id');
        validateAddressSelection();
      });
    });

    // Handle checkbox for same billing address
    const sameAddressCheckbox = document.getElementById('sameShippingAddress');
    sameAddressCheckbox.addEventListener('change', function () {
      const billingContainer = document.getElementById('billingAddressesContainer');

      if (this.checked) {
        billingContainer.style.display = 'none';
        selectedBillingAddressId = selectedShippingAddressId;
      } else {
        billingContainer.style.display = 'block';
        selectedBillingAddressId = null;

        new Swiper(".billingSwiper", {
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });

        document.querySelectorAll('#billingAddresses .address-card').forEach(card => {
          card.addEventListener('click', function () {
            document.querySelectorAll('#billingAddresses .address-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedBillingAddressId = this.getAttribute('data-address-id');
            validateAddressSelection();
          });
        });
      }
      validateAddressSelection();
    });

    validateAddressSelection();

  } catch (error) {
    console.log("Error rendering addresses:", error);
  }
}
 


    // Function to fetch and render order items
    async function fetchAndRenderOrderSummary(orderId) {
      try {
        
        const response = await fetch(`http://localhost:3000/api/order/${orderId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error fetching order data:", errorData.message);
          return;
        }

        const Data = await response.json();
        orderData = await Data.order;
        console.log("This is the order data :",orderData);
        renderOrderSummary(orderData);
        setupPurchaseButtons(orderData);
      }
      
        
        
       catch (error) {
        console.log("Error fetching order data:", error);
      }
    
    }

  // Function to render order summary
function renderOrderSummary(data) {
  const shippingCharges = 0;

  // Corrected GST function
  const GST = function getGST(itemsAmount) {
    return itemsAmount * 0.18; // Assuming GST is 18%
  };

  // Corrected Total Amount function
  const totalAmount = function getTotal(itemsAmount, gst) {
    return gst + shippingCharges + itemsAmount;
  };


  if (!data) {
    console.log("Invalid order data");
    return;
  }

  // Render order items for desktop
  const desktopOrderItems = document.getElementById('desktopOrderItems');
  desktopOrderItems.innerHTML = '';

  // Render order items for mobile
  const mobileOrderItems = document.getElementById('mobileOrderItems');
  mobileOrderItems.innerHTML = '';

  // Update mobile item count
  document.getElementById('mobileItemCount').textContent = data.OrderItems.length;

  // Render each order item
  data.OrderItems.forEach(item => {
    const itemHTML = `
      <div class="order-item">
        <img src="${item.minImage}" alt="${item.itemTitle}" class="order-item-image">
        <div class="order-item-details">
          <div class="item-name">${item.itemTitle}</div><span style="background-color: ${item.itemColor}; border-radius: 50%; width:15px; height: 15px; display: inline-block;"></span>
 / 
          ${item.orderItemVarients.map(varient => `<span>${varient.value}</span>`).join(' / ')}
          <div class="item-quantity">Qty: ${item.itemQty}</div>
        </div>
        <div class="order-item-price">₹${item.itemPrice.toFixed(2)}</div>
      </div>
    `;

    desktopOrderItems.innerHTML += itemHTML;
    mobileOrderItems.innerHTML += itemHTML;
  });

  // Render summary calculations for desktop
  const desktopSummary = document.getElementById('desktopSummaryCalculations');
  const mobileSummary = document.getElementById('mobileSummaryCalculations');

  const gstAmount = GST(data.orderAmount);
   total = totalAmount(data.orderAmount, gstAmount);

  const summaryHTML = `
    <div class="summary-row">
      <span>Subtotal (${data.OrderItems.length} items)</span>
      <span>₹${data.orderAmount}</span>
    </div>
    <div class="summary-row">
      <span>Shipping</span>
      <span>₹${shippingCharges}</span>
    </div>
    <div class="summary-row">
      <span>Tax</span>
      <span>₹${gstAmount.toFixed(2)}</span>
    </div>
    <div class="summary-row summary-total">
      <span>Total</span>
      <span>₹${total.toFixed(2)}</span>
    </div>
  `;

  desktopSummary.innerHTML = summaryHTML;
  mobileSummary.innerHTML = summaryHTML;

  // Update mobile total price
  document.querySelector('.total-price').textContent = `₹${total.toFixed(2)}`;

}

    // Function to handle mobile order summary toggle
    function setupMobileSummary() {
      const toggleElement = document.querySelector('.mobile-summary-toggle');
      const detailsElement = document.querySelector('.mobile-summary-details');
      const toggleIcon = document.querySelector('.toggle-icon');
      
      if (toggleElement && detailsElement) {
        toggleElement.addEventListener('click', function() {
          detailsElement.classList.toggle('open');
          toggleIcon.textContent = detailsElement.classList.contains('open') ? '▼' : '▲';
        });
      }
      
      // Show mobile order summary on small screens
      function handleResize() {
        const mobileSummary = document.querySelector('.mobile-order-summary');
        if (window.innerWidth < 768) {
          mobileSummary.style.display = 'block';
        } else {
          mobileSummary.style.display = 'none';
        }
      }
      
      // Initial check
      handleResize();
      
      // Listen for window resize
      window.addEventListener('resize', handleResize);
    }
    

// set up checkout btn
function setupPurchaseButtons(data) {

  const desktopButton = document.getElementById('completeDesktopPurchase');
  const mobileButton = document.getElementById('completeMobilePurchase');

  const handlePurchase = async function () {
    if (!validateAddressSelection()) {
      showNotification("Please select a valid address.", "error");
      return;
    }

    const orderData = {
      orderId: data.orderId,
      orderAmount: total,
      paymentMethod: "Online",
    };

    try {
      const res = await fetch('http://localhost:3000/api/order/capture-payment', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const RazorpayRES = await res.json();
        showNotification(RazorpayRES.message || "Payment initialization failed.", "error");
        return;
      }

      const RazorpayRES = await res.json();

      const userRES = await fetch(`http://localhost:3000/api/auth/get-user/${localStorage.getItem('user-access-id')}`);
      if (!userRES.ok) {
        const userError = await userRES.json();
        showNotification(userError.message || "User fetch failed.", "error");
        return;
      }

      const userData = await userRES.json();
      const User = userData.user;

      const options = {
        key: RazorpayRES.key,
        amount: RazorpayRES.amount,
        currency: "INR",
        name: "Mobile Shopping",
        description: "Order Checkout",
        image: "https://res.cloudinary.com/nareshgarva/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1747483963/favicon_tg1yr7.svg",
        order_id: RazorpayRES.razorpayOrderId,
        confirm_close: true,
        handler: async function (response) {
          console.log("Payment successful: ", response);

          // Verify Razorpay signature on the backend
          const verifyRES = await fetch("http://localhost:3000/api/order/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: User.email,
              orderId:data.orderId ,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

      console.log("Payment varifaction res : ",verifyRES)

          if (!verifyRES.ok) {
            const verifyError = await verifyRES.json();
            showNotification(verifyError.message || "Payment verification failed!", "error");
            return;
          }

          const verifyData = await verifyRES.json();
          if (!verifyData.isValid) {
         const orderData = {
orderStatus: "Cancelled"
         }
            const orderRES = await fetch(`http://localhost:3000/api/order/update_order/${data.orderId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });
            
            showNotification("Invalid payment detected. Transaction aborted.", "error");
            return;
          }
       

          // Verified → Now update order
          const orderUpdateData = {
            orderAmount: total,
            paymentStatus: 'Paid',
            orderStatus: 'Complete',
            billingAddressId: selectedBillingAddressId,
            shippingAddressId: selectedShippingAddressId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          };

          const orderRES = await fetch(`http://localhost:3000/api/order/update_order/${data.orderId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderUpdateData),
          });

          if (!orderRES.ok) {
            const orderError = await orderRES.json();
            showNotification(orderError.message || "Order update failed.", "error");
            return;
          }

          const mailData = {
            message : 
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
    }
    h2 {
      color: #28a745;
    }
    .order-summary {
      margin-top: 20px;
      border-collapse: collapse;
      width: 100%;
    }
    .order-summary th, .order-summary td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .order-summary th {
      background-color: #f2f2f2;
    }
    .total {
      font-weight: bold;
      color: #001f55;
    }
    .btn {
      display: inline-block;
      margin-top: 30px;
      padding: 12px 20px;
      background-color: #000;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      margin-top: 40px;
      font-size: 14px;
      color: #888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>Thank You for Your Order, ${User.name}!</h2>
    <p>Your order has been confirmed. Below are your order details:</p>

    <p><strong>Order ID:</strong> ${data.orderId}</p>
    <p><strong>Order Date:</strong> ${data.orderDate}</p>

    <table class="order-summary">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
     ${data.OrderItems.map(item => `
  <tr>
    <td style="display: flex; justify-content: flex-start; gap: 3px; align-items: flex-start;"><img src="${item.minImage}" width="50" height="50"> <span>${item.itemTitle}<span></td>
    <td>${item.itemQty}</td>
    <td>${item.itemPrice}</td>
  </tr>
`).join('<br>')}

      
       
      
        <tr>
          <td colspan="2" class="total">Total</td>
          <td class="total">${total}</td>
        </tr>
      </tbody>
    </table>

    <p>Estimated Delivery: <strong>7 Days</strong></p>
    <a href="http://127.0.0.1:5500/Frontend/User%20Module/pages/account.html" class="btn">View My Order</a>

    <div class="footer">
      <p>If you have any questions, <a href="{{support_link}}">contact our support team</a>.</p>
      <p>Thank you for shopping with Mobile Shopping!</p>
    </div>
  </div>
</body>
</html>

`,
subject : "Order Conformation",
email: User.email,
          }


          const mailRes = await fetch(`http://localhost:3000/api/email/send-mail`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mailData),
          });
          window.location.href = "http://127.0.0.1:5500/Frontend/User%20Module/pages/account.html";
        },
        prefill: {
          name: User.name,
          email: User.email,
          contact: User.mobile,
        },
        theme: { color: "#000000" },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Error during purchase:", err.message);
      showNotification("Payment failed. Please try again.", "error");
    }
  };

  desktopButton.addEventListener('click', handlePurchase);
  mobileButton.addEventListener('click', handlePurchase);
}



    // Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
       // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
 const orderId = urlParams.get("orderId");

if(!orderId){
  return window.location.href = "http://127.0.0.1:5500/Frontend/User%20Module/pages/index.html"; 
}

      renderAddresses();
      fetchAndRenderOrderSummary(orderId);
      setupMobileSummary();
      
      
      // Setup add address buttons
      document.getElementById('addShippingAddress').addEventListener('click', function() {
        // Add shipping address functionality - redirect or open modal
        alert("Add shipping address functionality would go here");
      });
      
      document.getElementById('addBillingAddress').addEventListener('click', function() {
        // Add billing address functionality - redirect or open modal
        alert("Add billing address functionality would go here");
      });
    });
