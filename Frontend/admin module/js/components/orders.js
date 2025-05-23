



    document.addEventListener("DOMContentLoaded", async () => {
      let orders = [];


        document.getElementById("adminOrders").innerHTML = `
          <table class="table table-striped">
  <thead>
    <tr>
      <th>Order ID</th>
      <th>Status</th>
      
      <th>Date</th>
      <th>Items</th>
      <th>Total</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody id="orders-table-body">
    <!-- Orders will be inserted here dynamically -->
  </tbody>
</table>
`;


  //load all order
  const res =await fetch(`http://localhost:3000/api/order/get-All-Order`,{
        method: 'GET'
      });

      if(!res.ok){
        console.log("error in fetching orders");
        return;
      }
      const ordersData = await res.json();
      orders = await ordersData.orders;
      console.log("All orders :", orders);





// function updateOrderStatus(selectElement,id) {
//   const selectedValue = selectElement.value;
//   console.log(selectedValue,id);
// }
  orders.forEach((order) => {
    const tr = document.createElement("tr");


// function toggleDetails(orderId) {
//   const details = document.getElementById(`details-${orderId}`);
//   details.style.display = (details.style.display === "none") ? "block" : "none";
// }



   
 
      displayOrders(orders, "orders-table-body"); // Call the function to display orders

    });

   // Utility: Format ISO date to dd/mm/yyyy
function formatDate(isoDateString) {
  const dateObj = new Date(isoDateString);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

function displayOrders(orderlist, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (orderlist.length === 0) {
    container.innerHTML = '<p class="text-muted">No orders found.</p>';
    return;
  }

  orderlist.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  const statusOptions = ['Returned', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // function getTodayDate() {
  //   const today = new Date();
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   return today.toLocaleDateString("en-US", options);
  // }

  orderlist.forEach((order, index) => {
    const itemsHTML = order.OrderItems.map(item => `
      <div class="d-flex align-items-start justify-content-between mb-3">
        <div class="me-2 d-flex align-items-start gap-2">
          <div class="item-img"><img src="${item.minImage}" width="80" height="80"></div>
          <div>
            <p class="mb-1">${item.itemTitle}</p>
            <p class="text-muted small mb-1">Qty: ${item.itemQty}</p>
          </div>
        </div>
        <div class="item-details"><strong>₹${item.itemPrice}</strong></div>
      </div>`).join("");

    const timelineHTML = order.OrderTimelines.map(t => `
      <li>${t.label} — <span class="text-muted">${formatDate(t.date)}</span></li>`).join("");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${order.orderId}</td>
      
      <td>
        <span class="d-flex align-items-center justify-content-center px-2 rounded-pill status-${order.shippingStatus}">
          <img src="./assets/icons/${order.shippingStatus}-icon.svg" alt="${order.shippingStatus} icon" width="20">
          <span class="ms-2">${order.shippingStatus}</span>
        </span>
      </td>
      <td>${formatDate(order.orderDate)}</td>
      <td>${order.OrderItems.length} items</td>
      <td><strong>₹${order.orderAmount}</strong></td>
      <td>
        <button class="btn btn-dark btn-sm" data-bs-toggle="offcanvas" href="#details-${containerId}-${order.orderId}" role="button" aria-controls="details-${containerId}-${order.orderId}">
          View Details
        </button>
      </td>

      <div id="details-${containerId}-${order.orderId}" tabindex="1" class="offcanvas offcanvas-bottom w-100 h-100">
        <div class="offcanvas-header bg-light-gray rounded-bottom d-block">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="offcanvas-title">Order details</h5>
            <button class="close-icon" type="button" data-bs-dismiss="offcanvas">
              <img src="./assets/icons/menu-close.svg" alt="" />
            </button>
          </div>
          <div class="d-flex justify-content-left align-items-center gap-3">
            <span class="badge payment-${order.paymentStatus} small">Payment: ${order.paymentStatus}</span>
            <span class="badge status-${order.shippingStatus} small">${order.shippingStatus}</span>
          </div>
        </div>

        <div class="p-4 offcanvas-body overflow-auto bg-white">
          <div class="row mb-4">
            <div class="col-12 col-md-3 mb-3">
              <p class="section-title mb-2 fw-bold">Order Summary</p>
              <p class="mb-1">${order.OrderItems.length} items</p>
              <p class="mb-1">Total : ₹${order.orderAmount}</p>
            </div>
            <div class="col-12 col-md-3 mb-3">
              <p class="section-title mb-2 fw-bold">Shipping Status</p>
              <p class="mb-1">${order.shippingStatus}</p>
              <p class="small text-primary">Track Package (${order.trackId})</p>
            </div>
            <div class="col-12 col-md-3 mb-3">
              <p class="section-title fw-bold">Payment Status</p>
              <p class="mb-1">${order.paymentStatus}</p>
              <p class="mb-1 small text-muted">Transaction ID: ${order.razorpayPaymentId}</p>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <p class="section-title fw-bold">Items</p>
              ${itemsHTML}
            </div>
            ${order.shippingAddress ? `
            <div class="col-md-3 mb-3">
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

        <div class="sticky-footer bg-light-gray py-3 rounded-top">
          <div class="d-flex justify-content-center align-items-center gap-3">
            <button class="btn bg-dark btn-sm text-white" data-bs-toggle="modal" data-bs-target="#updateModal-${order.orderId}">
              Update Order
            </button>
          </div>
        </div>
      </div>

      <!-- Modal for updating order -->
      <div class="modal fade" id="updateModal-${order.orderId}" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <form id="updateForm-${order.orderId}">
              <div class="modal-header">
                <h5 class="modal-title">Update Order</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Shipping Status</label>
                  <select name="shippingStatus" class="form-select">
                    ${statusOptions.map(status => `
                      <option value="${status}" ${status === order.shippingStatus ? 'selected' : ''}>${status}</option>
                    `).join('')}
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Tracking ID</label>
                  <input type="text" name="trackId" value="${order.trackId || ''}" class="form-control" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" onclick="updateOrder('${order.orderId}')">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    container.appendChild(tr);
  });

// Define updateOrder function globally so it can be called from anywhere
window.updateOrder = async function (orderId) {
  const form = document.getElementById(`updateForm-${orderId}`);
  const shippingStatus = form.shippingStatus.value;
  const trackId = form.trackId.value;
  
  console.log("values : ", shippingStatus, trackId);

  try {
    const response = await fetch('http://localhost:3000/api/order/update/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, shippingStatus, trackId }),
    });

    if (response.ok) {
      console.log("Order updated successfully");
      
      // Close the modal
      const modalElement = document.getElementById(`updateModal-${orderId}`);
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      
      // Reload orders if the function exists
      if (typeof loadOrders === 'function') {
        loadOrders();
      } else {
        // If loadOrders doesn't exist, you might want to refresh the page or call displayOrders again
        console.log("loadOrders function not found. You may need to refresh the page or call displayOrders again.");
      }
    } else {
      const error = await response.text();
      alert("Failed to update order: " + error);
    }
  } catch (err) {
    console.error("Error updating order:", err);
    alert("Something went wrong.");
  }
};





}

      
  
  });