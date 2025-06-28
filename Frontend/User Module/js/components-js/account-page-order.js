document.getElementById("accountPageOrders").innerHTML=`
    <div >
      <div class="py-4 px-1">
        <div class="mb-4">
          <h4 class="fw-bold text-xl" style="color: #000">Your Orders</h4>
          <p class="text-secondary">View and manage all your orders here</p>
        </div>
        
        <div>
          <div class="mb-4">
            <div class="d-md-flex mb-4 gap-2">
              <div class="row g-3 mb-4">
                <div class="col-md-4">
                  <input type="text" id="searchInput" class="form-control" placeholder="Search Orders...">
                </div>
                <div class="col-md-4">
                  <select id="statusFilter" class="form-select">
                    <option value="">All Status</option>
                    
                  </select>
                </div>
                <div class="col-md-4">
                  <select id="paymentFilter" class="form-select">
                    <option value="">All Payments</option>
                    
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="ordersSectionContainer" class="row gap-1">
          <!-- Dynamic order cards will be injected here -->
        </div>
      </div>
    </div>
`;



    let orders = null;

   async function loadOrders(userId){
    try{
      const res =await fetch(`http://localhost:3000/api/order/get-All-Order/${userId}`,{
        method: 'GET'
      });

      if(!res.ok){
        console.log("error in fetching orders");
        return;
      }
      const ordersData = await res.json();
      orders = await ordersData.orders;


      getLastThreeOrders(orders);
      populateFilters(orders);
      filterOrders(orders);
    }catch(error){
      console.log("Error in fetching orders :", error);
      return;
    }
   }
    

   // Utility: Format ISO date to dd/mm/yyyy
function formatDate(isoDateString) {
  const dateObj = new Date(isoDateString);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

// Main Function to Display Orders
function displayOrders(orderlist, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear previous content

  if (!orderlist || orderlist.length === 0) {
    container.innerHTML = '<p class="text-muted">No orders found.</p>';
    return;
  }

  // Sort orders by date (newest first)
orderlist.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));


  orderlist.forEach((order, index) => {
    const itemsHTML = order.OrderItems.map(item => `
      <div class="d-flex align-items-start justify-content-between mb-3">
        <div class="me-2 d-flex align-items-start gap-2">
          <div class="item-img"><img src="${item.minImage}" alt="${item.itemTitle}"></div>
          <div>
            <p class="mb-1">${item.itemTitle}</p>
            <p class="text-muted small mb-1">Qty: ${item.itemQty}</p>
          </div>
        </div>
        <div class="item-details">
          <strong>₹${item.itemPrice}</strong>
        </div>
      </div>
    `).join("");

    const timelineHTML = order.OrderTimelines.map(t => `
      <li>${t.label} — <span class="text-muted">${formatDate(t.date)}</span></li>
    `).join("");

    const card = document.createElement("div");
    card.className = "mb-3 col";

    const orderDetailsId = `details-${containerId}-${order.orderId}`;

    card.innerHTML = `
      <div class="p-3 rounded-main border">
        <div class="d-flex align-items-center justify-content-between">
          <p class="fw-bold">${order.orderId}</p>
          <p class="d-flex align-items-center justify-content-center gap-1 rounded-pill px-2 status-${order.shippingStatus} small">
            <img src="../assets/icons/${order.shippingStatus}-icon.svg" alt="">
            ${order.shippingStatus}
          </p>
        </div>
        <p class="text-muted fs-6">${formatDate(order.orderDate)}</p>
        <div class="d-flex align-items-center justify-content-between">
          <p class="text-muted">${order.OrderItems.length} items</p>
          <p class="fw-bold">₹${order.orderAmount}</p>
        </div>
        <button class="btn-custom fw-normal text-main btn-hover-outline border mt-3 w-100 py-2 rounded-main"
          data-bs-toggle="offcanvas"
          href="#${orderDetailsId}"
          role="button"
          aria-controls="${orderDetailsId}">
          View Order Details
        </button>
      </div>

      <!-- Order details offcanvas -->
      <div id="${orderDetailsId}" tabindex="-1" class="offcanvas offcanvas-bottom w-100 h-100">
        <div class="offcanvas-header bg-light-gray rounded-bottom d-block">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="offcanvas-title">Order details</h5>
            <button class="close-icon" type="button" data-bs-dismiss="offcanvas">
              <img src="../assets/icons/menu-close.svg" alt="" />
            </button>
          </div>
          <div>
            <span class="badge payment-${order.paymentStatus} small">Payment: ${order.paymentStatus}</span>
          </div>
        </div>

        <div class="p-4 offcanvas-body overflow-auto">
          <div class="row mb-4">
            <div class="col-sm-12 col-md-6 mb-3">
              <p class="section-title mb-2 fw-bold">Order Summary</p>
              <p class="mb-1">${order.OrderItems.length} items</p>
              <p class="mb-1">Total: ₹${order.orderAmount}</p>
            </div>
            <div class="col-sm-12 col-md-6 mb-3">
              <p class="section-title mb-2 fw-bold">Shipping Status</p>
              <p class="mb-1">${order.shippingStatus}</p>
              <p class="small text-primary">Track Package (${order.trackId})</p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <p class="section-title fw-bold">Items</p>
              ${itemsHTML}
            </div>
            ${order.shippingAddress ? ` <div class="col-md-3 mb-3">
              <p class="section-title fw-bold">Shipping Address</p>
              <p class="mb-1">${order.shippingAddress.fullName}</p>
              <p class="mb-1">${order.shippingAddress.addressLine1}</p>
              <p class="mb-1">${order.shippingAddress.localityArea}</p>
              <p class="mb-1">${order.shippingAddress.cityTown}, ${order.shippingAddress.pinCode}</p>
              <p class="mb-1">${order.shippingAddress.state}, ${order.shippingAddress.country}</p>
              <p class="mb-1">${order.shippingAddress.mobileNumber}</p>
            </div>
            <div class="col-md-3 mb-3">
              <p class="section-title fw-bold">Billing Address</p>
              <p class="mb-1">${order.billingAddress.fullName}</p>
              <p class="mb-1">${order.billingAddress.addressLine1}</p>
              <p class="mb-1">${order.billingAddress.localityArea}</p>
              <p class="mb-1">${order.billingAddress.cityTown}, ${order.billingAddress.pinCode}</p>
              <p class="mb-1">${order.billingAddress.state}, ${order.billingAddress.country}</p>
              <p class="mb-1">${order.billingAddress.mobileNumber}</p>
            </div>` : ""}
           
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <p class="section-title fw-bold">Payment Details</p>
              <p class="mb-1">Method: ${order.paymentMethod}</p>
              <p class="mb-1">Status: ${order.paymentStatus}</p>
              <p class="mb-1">Payment Date: ${formatDate(order.orderDate)}</p>
              <p class="mb-1">Transaction ID: ${order.razorpayPaymentId}</p>
            </div>
            <div class="col-md-6 mb-3">
              <p class="section-title fw-bold">Order Timeline</p>
              <ul class="list-unstyled order-timeline">${timelineHTML}</ul>
            </div>
          </div>
        </div>

        <!-- Sticky footer -->
        <div class="sticky-footer bg-light-gray py-3 rounded-top text-center">
          <p class="small mb-2">Need help with this order? <a href="#">Contact Support</a></p>
          <div class="d-flex justify-content-center align-items-center gap-3">
          ${order.shippingStatus === "Delivered" ? `<button class="btn bg-dark btn-sm text-white download-invoice-btn d-flex justify-content-center align-items-center gap-1"
              data-order-id="${order.orderId}">
              <img src="../assets/icons/download.svg" alt=""><span>Download Invoice</span>
            </button> <button class="btn bg-dark btn-sm text-white return-order-btn d-flex justify-content-center align-items-center gap-1"
              data-order-id="${order.orderId}">
              <img src="../assets/icons/Return.svg" alt=""><span>Return</span>
            </button>`: order.shippingStatus === "Returned" ? "" : `
             <button class="btn border border-dark btn-sm d-flex justify-content-center align-items-center gap-1 cancle-order-btn" data-order-id="${order.orderId}">Cancle order</button>`}
           
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach download invoice button events
  document.querySelectorAll('.download-invoice-btn').forEach(button => {
    button.addEventListener('click', async () => {
  try {
    const orderId = button.getAttribute('data-order-id');
    const response = await fetch(`http://localhost:3000/api/order/${orderId}/invoice`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch invoice. Status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice_${orderId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    alert("Error downloading invoice. Please try again.");
  }
});

  });

  document.querySelectorAll('.return-order-btn').forEach(button => {
    button.addEventListener('click', async () => {
  try {
    const orderId = button.getAttribute('data-order-id');
  const shippingStatus = "Returned"
    const response = await fetch('http://localhost:3000/api/order/update/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, shippingStatus }),
    });


    if (!response.ok) {
      throw new Error(`failed to return order`);
    }
location.reload();
  } catch (error) {
    console.error("error in returning in order", error);
    alert("Error in return order. Please try again.");
  }
});

  });

  document.querySelectorAll('.cancle-order-btn').forEach(button => {
    button.addEventListener('click', async () => {
  try {
    const orderId = button.getAttribute('data-order-id');
  const orderStatus = "Cancelled"
    const response = await fetch('http://localhost:3000/api/order/update/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, orderStatus }),
    });


    if (!response.ok) {
      throw new Error(`failed to cancel order`);
    }
location.reload();
  } catch (error) {
    console.error("error in canceling in order", error);
    alert("Error in cancel order. Please try again.");
  }
});

  });

  
}

    
    // Get the last 3 orders based on date
    function getLastThreeOrders(orders) {
      
      const recentOrders = orders
        .slice() // Clone the array
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort newest first
        .slice(0, 3); // Take first 3
       
      displayOrders(recentOrders, "lastThreeOrdersSection");
    }
    
    // Populate filter dropdowns based on unique status and payment values
    function populateFilters(orders) {
   
      const statusSet = new Set();
      const paymentSet = new Set();
      
      orders.forEach(order => {
        statusSet.add(order.shippingStatus);
        paymentSet.add(order.paymentStatus);
      });
      
      const statusFilter = document.getElementById('statusFilter');
      const paymentFilter = document.getElementById('paymentFilter');
      
      // Reset filters
      statusFilter.innerHTML = '<option value="">All Status</option>';
      paymentFilter.innerHTML = '<option value="">All Payments</option>';
      
      statusSet.forEach(status => {
        const option = document.createElement('option');
        option.textContent = status;
        option.value = status;
        statusFilter.appendChild(option);
      });
      
      paymentSet.forEach(payment => {
        const option = document.createElement('option');
        option.textContent = payment;
        option.value = payment;
        paymentFilter.appendChild(option);
      });
    }
    
    function filterOrders(orders) {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const status = document.getElementById('statusFilter').value;
  const payment = document.getElementById('paymentFilter').value;

  const filtered = orders.filter(order => {
    const matchesSearch = !search || (
      order.orderId.toString().toLowerCase().includes(search) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(search) ||
      order.OrderItems?.some(item => item.itemTitle?.toLowerCase().includes(search))
    );

    const matchesStatus = !status || order.shippingStatus === status;
    const matchesPayment = !payment || order.paymentStatus === payment;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  displayOrders(filtered, "ordersSectionContainer");
}

    

document.addEventListener('DOMContentLoaded', function(){
const userId = localStorage.getItem("user-access-id");
loadOrders(userId);


    // Add event listeners for real-time filtering
    document.getElementById('searchInput').addEventListener('input', () => filterOrders(orders));
    document.getElementById('statusFilter').addEventListener('change', () => filterOrders(orders));
    document.getElementById('paymentFilter').addEventListener('change', () => filterOrders(orders));
});