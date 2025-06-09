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
    <div id="modals-container">
      <!-- Modals will be inserted here -->
    </div>
  `;

  // Load all orders
  const res = await fetch(`http://localhost:3000/api/order/get-All-Order`, {
    method: 'GET'
  });

  if (!res.ok) {
    console.log("error in fetching orders");
    return;
  }
  
  const ordersData = await res.json();
  orders = await ordersData.orders;
  console.log("All orders :", orders);

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
  const modalsContainer = document.getElementById("modals-container");
  container.innerHTML = '';
  modalsContainer.innerHTML = '';

  if (orderlist.length === 0) {
    container.innerHTML = '<p class="text-muted">No orders found.</p>';
    return;
  }

  orderlist.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  const statusOptions = ['Returned', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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

    // Create table row
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
    `;
    container.appendChild(tr);

    // Create offcanvas details
    const offcanvasDiv = document.createElement("div");
    offcanvasDiv.id = `details-${containerId}-${order.orderId}`;
    offcanvasDiv.className = "offcanvas offcanvas-bottom w-100 h-100";
    offcanvasDiv.setAttribute("tabindex", "1");
    
    offcanvasDiv.innerHTML = `
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
            <p class="small text-primary">Track Package (${order.trackId || 'N/A'})</p>
          </div>
          <div class="col-12 col-md-3 mb-3">
            <p class="section-title fw-bold">Payment Status</p>
            <p class="mb-1">${order.paymentStatus}</p>
            <p class="mb-1 small text-muted">Transaction ID: ${order.razorpayPaymentId || 'N/A'}</p>
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
            <p class="mb-1">Transaction ID: ${order.razorpayPaymentId || 'N/A'}</p>
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
          <button class="btn bg-dark btn-sm text-white send-invoice-btn d-flex justify-content-center align-items-center gap-1"
              data-order-id="${order.orderId}" data-user-id="${order.userId}">
             <span>Send Invoice</span>
          </button>
        </div>
      </div>
    `;
    
    // Append offcanvas to body (they should be direct children of body)
    document.body.appendChild(offcanvasDiv);

    // Create modal for updating order
    const modalDiv = document.createElement("div");
    modalDiv.className = "modal fade";
    modalDiv.id = `updateModal-${order.orderId}`;
    modalDiv.setAttribute("tabindex", "-1");
    
    modalDiv.innerHTML = `
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
                <select id="shippingStatus-${order.orderId}" name="shippingStatus" class="form-select">
                  ${statusOptions.map(status => `
                    <option value="${status}" ${status === order.shippingStatus ? 'selected' : ''}>${status}</option>
                  `).join('')}
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Tracking ID</label>
                <input type="text" id="trackId-${order.orderId}" name="trackId" value="${order.trackId || ''}" class="form-control" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" onclick="updateOrder('${order.orderId}')">Update</button>
            </div>
          </form>
        </div>
      </div>
    `;
    
    modalsContainer.appendChild(modalDiv);
  });

  // FIXED: Add event listeners AFTER creating the buttons
  attachEmailEventListeners();
}

// FIXED: Separate function to attach email event listeners
function attachEmailEventListeners() {
  document.querySelectorAll('.send-invoice-btn').forEach(button => {
    button.addEventListener('click', async (event) => {
      try {
        // Prevent any default behavior
        event.preventDefault();
        
        const orderId = button.getAttribute('data-order-id');
        const userId = button.getAttribute('data-user-id');

      

        // Get user info first
        const userRes = await fetch(`http://localhost:3000/api/auth/get-user/${userId}`, {
          method: 'GET',
        });
        
        if (!userRes.ok) {
          throw new Error(`Failed to fetch user data. Status: ${userRes.status}`);
        }
        
        const userData = await userRes.json();
        const user = userData.user;

        // Fetch the invoice as a Blob (PDF)
        const invoiceRes = await fetch(`http://localhost:3000/api/order/${orderId}/invoice`, {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf',
          },
        });

        if (!invoiceRes.ok) {
          throw new Error(`Failed to fetch invoice. Status: ${invoiceRes.status}`);
        }

        const pdfBlob = await invoiceRes.blob();
        const base64Pdf = await blobToBase64(pdfBlob);

        // Prepare the email content
        const mailData = {
          message: generateEmailHtml(user.name || user.fullName || 'Customer'), // FIXED: Use actual user name
          subject: "Order Confirmation",
          email: user.email,
          pdf: base64Pdf,
          pdfFileName: `invoice_${orderId}.pdf`,
        };

        // Send email API request
        const mailRes = await fetch(`http://localhost:3000/api/email/send-mail`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mailData),
        });

        if (!mailRes.ok) {
          const errorText = await mailRes.text();
          throw new Error(`Failed to send email: ${errorText}`);
        }

        alert("Invoice emailed successfully!");

      } catch (error) {
        console.error("Email sending error:", error);
        alert("Error sending invoice email: " + error.message);
      } finally {
        // Reset button state
        button.innerHTML = originalText;
        button.disabled = false;
      }
    });
  });
}

// Define updateOrder function globally so it can be called from anywhere
window.updateOrder = async function (orderId) {
  // Get form elements by their specific IDs
  const shippingStatusElement = document.getElementById(`shippingStatus-${orderId}`);
  const trackIdElement = document.getElementById(`trackId-${orderId}`);
  
  if (!shippingStatusElement || !trackIdElement) {
    alert("Error: Form elements not found");
    return;
  }
  
  const shippingStatus = shippingStatusElement.value;
  const trackId = trackIdElement.value;

  try {
    const response = await fetch('http://localhost:3000/api/order/update/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, shippingStatus, trackId }),
    });

    if (response.ok) {
      alert("Order updated successfully");
      
      // Close the modal
      const modalElement = document.getElementById(`updateModal-${orderId}`);
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      
      // Reload the page or refresh orders
      location.reload(); // Simple solution to refresh the data
      
    } else {
      const error = await response.text();
      console.error("Update failed:", error);
      alert("Failed to update order: " + error);
    }
  } catch (err) {
    console.error("Error updating order:", err);
    alert("Something went wrong: " + err.message);
  }
};

// Helper to convert Blob to Base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function generateEmailHtml(userName) {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 6px;">
      <h2 style="color: #28a745;">Hello ${userName},</h2>
      <p>Thank you for placing your order with us!</p>
      <p>Here is your order invoice.</p>
      <p style="margin-top: 20px;">If you have any questions, feel free to contact our support team.</p>
      <p>Best regards,<br><strong>Mobile Shopping Team</strong></p>
    </div>
  </body>
</html>
`;
}