  //Sample orders array 
  const orders = [
    {
      id: "ORD-2024-1001",
      status: "Delivered",
      paymentStatus: "Paid",
      total: "₹129.99",
      date: "April 5, 2024",
      transactionId: "TXN-987654",
      trackId: "TRK123456789",
      items: [
        { name: "Wireless Headphones", qty: 1, price: "$89.99" },
        { name: "Phone Case", qty: 2, price: "$19.99" },
      ],
      address: {
        name: "John Doe",
        street: "123 Main St",
        city: "Anytown",
        zip: "12345",
        country: "USA",
      },
      paymentDetails: {
        method: "Credit Card",
        card: "**** **** **** 4242",
        expiry: "04/25",
      },
      timeline: [
        { label: "Order Placed", date: "April 5, 2024" },
        { label: "Payment Received", date: "April 5, 2024" },
        { label: "Processing", date: "April 6, 2024" },
        { label: "Shipped", date: "April 7, 2024" },
        { label: "Delivered", date: "April 10, 2024" },
      ],
    },
    {
      id: "ORD-2024-1002",
      status: "Processing",
      paymentStatus: "Pending",
      total: "$54.00",
      date: "April 8, 2024",
      transactionId: "TXN-123456",
      trackId: "TRK987654321",
      items: [
        { name: "Power Bank", qty: 1, price: "$49.00" },
        { name: "USB Cable", qty: 1, price: "$5.00" },
      ],
      address: {
        name: "Jane Smith",
        street: "456 Park Lane",
        city: "Metro City",
        zip: "67890",
        country: "India",
      },
      paymentDetails: {
        method: "UPI",
        card: "jane@upi",
        expiry: "",
      },
      timeline: [
        { label: "Order Placed", date: "April 8, 2024" },
        { label: "Processing", date: "April 9, 2024" },
      ],
    },
    {
      id: "ORD-2024-1003",
      status: "Shipped",
      paymentStatus: "Paid",
      total: "$299.00",
      date: "April 6, 2024",
      transactionId: "TXN-112233",
      trackId: "TRK654321987",
      items: [
        { name: "Bluetooth Speaker", qty: 1, price: "$99.00" },
        { name: "Smart Watch", qty: 1, price: "$200.00" },
      ],
      address: {
        name: "Ali Khan",
        street: "89 MG Road",
        city: "Delhi",
        zip: "110001",
        country: "India",
      },
      paymentDetails: {
        method: "Debit Card",
        card: "**** **** **** 1111",
        expiry: "06/26",
      },
      timeline: [
        { label: "Order Placed", date: "April 6, 2024" },
        { label: "Payment Received", date: "April 6, 2024" },
        { label: "Shipped", date: "April 9, 2024" },
      ],
    },
    {
      id: "ORD-2024-1004",
      status: "Cancelled",
      paymentStatus: "Refunded",
      total: "$79.99",
      date: "April 3, 2024",
      transactionId: "TXN-445566",
      trackId: "",
      items: [{ name: "Gaming Mouse", qty: 1, price: "$79.99" }],
      address: {
        name: "Priya Sharma",
        street: "21 Residency Road",
        city: "Bangalore",
        zip: "560025",
        country: "India",
      },
      paymentDetails: {
        method: "Net Banking",
        card: "",
        expiry: "",
      },
      timeline: [
        { label: "Order Placed", date: "April 3, 2024" },
        { label: "Cancelled", date: "April 4, 2024" },
        { label: "Refund Initiated", date: "April 5, 2024" },
      ],
    },
    {
      id: "ORD-2024-1005",
      status: "Returned",
      paymentStatus: "Refunded",
      total: "$45.00",
      date: "March 28, 2024",
      transactionId: "TXN-998877",
      trackId: "TRK147258369",
      items: [{ name: "Tripod Stand", qty: 1, price: "$45.00" }],
      address: {
        name: "Ravi Patel",
        street: "12 Civil Lines",
        city: "Ahmedabad",
        zip: "380001",
        country: "India",
      },
      paymentDetails: {
        method: "UPI",
        card: "ravi@ybl",
        expiry: "",
      },
      timeline: [
        { label: "Order Placed", date: "March 28, 2024" },
        { label: "Delivered", date: "April 2, 2024" },
        { label: "Return Requested", date: "April 3, 2024" },
        { label: "Refunded", date: "April 5, 2024" },
      ],
    },
    {
      id: "ORD-2024-1006",
      status: "Delivered",
      paymentStatus: "Paid",
      total: "$119.00",
      date: "April 1, 2024",
      transactionId: "TXN-334455",
      trackId: "TRK741852963",
      items: [{ name: "Fitness Band", qty: 1, price: "$119.00" }],
      address: {
        name: "Meena Reddy",
        street: "5 Lakeview Apartments",
        city: "Hyderabad",
        zip: "500081",
        country: "India",
      },
      paymentDetails: {
        method: "Credit Card",
        card: "**** **** **** 9999",
        expiry: "09/25",
      },
      timeline: [
        { label: "Order Placed", date: "April 1, 2024" },
        { label: "Shipped", date: "April 3, 2024" },
        { label: "Delivered", date: "April 6, 2024" },
      ],
    },
    {
      id: "ORD-2024-1007",
      status: "Processing",
      paymentStatus: "Paid",
      total: "$39.99",
      date: "April 9, 2024",
      transactionId: "TXN-778899",
      trackId: "TRK963852741",
      items: [{ name: "Laptop Sleeve", qty: 1, price: "$39.99" }],
      address: {
        name: "Aman Verma",
        street: "7 Ring Road",
        city: "Mumbai",
        zip: "400001",
        country: "India",
      },
      paymentDetails: {
        method: "UPI",
        card: "aman@paytm",
        expiry: "",
      },
      timeline: [
        { label: "Order Placed", date: "April 9, 2024" },
        { label: "Processing", date: "April 10, 2024" },
      ],
    },
    {
      id: "ORD-2024-1008",
      status: "Delivered",
      paymentStatus: "Paid",
      total: "$210.00",
      date: "March 30, 2024",
      transactionId: "TXN-564738",
      trackId: "TRK321654987",
      items: [{ name: "Tablet", qty: 1, price: "$210.00" }],
      address: {
        name: "Sara Ali",
        street: "19 Airport Road",
        city: "Chennai",
        zip: "600027",
        country: "India",
      },
      paymentDetails: {
        method: "Debit Card",
        card: "**** **** **** 2020",
        expiry: "12/26",
      },
      timeline: [
        { label: "Order Placed", date: "March 30, 2024" },
        { label: "Payment Received", date: "March 30, 2024" },
        { label: "Delivered", date: "April 4, 2024" },
      ],
    },
    {
      id: "ORD-2024-1009",
      status: "Delivered",
      paymentStatus: "Paid",
      total: "$34.00",
      date: "April 2, 2024",
      transactionId: "TXN-332211",
      trackId: "TRK789456123",
      items: [{ name: "Phone Charger", qty: 2, price: "$17.00" }],
      address: {
        name: "Neha Gupta",
        street: "24 City Center",
        city: "Pune",
        zip: "411001",
        country: "India",
      },
      paymentDetails: {
        method: "Net Banking",
        card: "",
        expiry: "",
      },
      timeline: [
        { label: "Order Placed", date: "April 2, 2024" },
        { label: "Shipped", date: "April 3, 2024" },
        { label: "Delivered", date: "April 6, 2024" },
      ],
    },
    {
      id: "ORD-2024-1010",
      status: "Processing",
      paymentStatus: "Pending",
      total: "$59.00",
      date: "April 10, 2024",
      transactionId: "",
      trackId: "",
      items: [
        { name: "Wireless Mouse", qty: 1, price: "$29.00" },
        { name: "Keyboard", qty: 1, price: "$30.00" },
      ],
      address: {
        name: "Vikram Singh",
        street: "88 Highway Street",
        city: "Jaipur",
        zip: "302001",
        country: "India",
      },
      paymentDetails: {
        method: "Cash on Delivery",
        card: "",
        expiry: "",
      },
      timeline: [{ label: "Order Placed", date: "April 10, 2024" }],
    }, ];
    


    document.addEventListener("DOMContentLoaded", () => {
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



    // Function to display a list of orders in the specified container
    function displayOrders(orderlist, containerId) {
      
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear previous content
        
        if (orderlist.length === 0) {
          container.innerHTML = '<p class="text-muted">No orders found.</p>';
          return;
        }
        
        // Sort orders by date (newest first)
        orderlist.sort((a, b) => new Date(b.date) - new Date(a.date));
        const statusOptions = ['Returned', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        function getTodayDate() {
          const today = new Date();
          const options = { year: "numeric", month: "long", day: "numeric" };
          return today.toLocaleDateString("en-US", options);
        }
        window.changeStatus = function(orderIndex, newStatus) {
          orderlist[orderIndex].status = newStatus;
console.log(orderlist[orderIndex].timeline.length);

orderlist[orderIndex].timeline.push({
  label: newStatus,
  date: getTodayDate()
});

  console.log(`Order ID ${orders[orderIndex].id} status changed to: ${newStatus}`);
  console.log(orderlist); // Optional: for debugging
  displayOrders(orders, "orders-table-body"); // Call the function to display orders
}

        
        orderlist.forEach((order, index) => {
          // Generate item list HTML
          
          const itemsHTML = order.items
            .map(
              (item) => `
          <div class="d-flex align-items-start justify-content-between mb-3">
            <div class="me-2 d-flex align-items-start gap-2">
              <div class="item-img"></div>
              <div>
                <p class="mb-1">${item.name}</p>
                <p class="text-muted small mb-1">Qty: ${item.qty}</p>
              </div>
            </div>
            <div class="item-details">
              <strong>${item.price}</strong><br>
            </div>
          </div>
        `
            )
            .join("");
          
          // Generate timeline HTML
          const timelineHTML = order.timeline
            .map(
              (t) => `
          <li>${t.label} — <span class="text-muted">${t.date}</span></li>
        `
            )
            .join("");
          
          // Create order card element
          const tr = document.createElement("tr");
         
          // Main order summary and offcanvas details
          tr.innerHTML = `

      <td>${order.id}</td>
      <td>
      <span class="d-flex align-items-center justify-content-center px-2 rounded-pill  status-${order.status} ">
        <img src="./assets/icons/${order.status}-icon.svg" alt="${order.status} icon" width="20">
         <select class="bg-transparent border-0 form-select-sm" onchange="changeStatus(${index}, this.value)">
              ${statusOptions.map(status => `
                <option value="${status}" ${status === order.status ? 'selected' : ''}>${status}</option>
              `).join('')}
            </select>
        </span>
      </td>
      <td>${order.date}</td>
      <td>${order.items.length} items</td>
      <td><strong>${order.total}</strong></td>
      <td>
        <button class="btn btn-dark btn-sm" data-bs-toggle="offcanvas" href="#details-${containerId}-${order.id}" role="button" aria-controls="details-${containerId}-${order.id}">
          View Details
        </button>
      </td>

  
        <!-- Order details offcanvas -->
        <div id="details-${containerId}-${order.id}" tabindex="1" class="offcanvas offcanvas-bottom w-100 h-100">
          <div class="offcanvas-header bg-light-gray rounded-bottom d-block">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="offcanvas-title">Order details</h5>
              <button class="close-icon" type="button" data-bs-dismiss="offcanvas">
                <img src="./assets/icons/menu-close.svg" alt="" />
              </button>
            </div>
            <div class="d-flex justify-content-left align-items-center gap-3">
              <span class="badge payment-${order.paymentStatus} small">
                Payment: ${order.paymentStatus}
              </span>
              <span class="badge status-${order.status} small">${order.status}</span>
            </div>
          </div>
  
          <!-- Offcanvas body -->
          <div class="p-4 offcanvas-body overflow-auto bg-white">
            <div class="row mb-4">
              <div class="col-12 col-md-3 mb-3">
                <p class="section-title mb-2 fw-bold">Order Summary</p>
                <p class="mb-1">${order.items.length} items</p>
                <p class="mb-1">Total : ${order.total}</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="section-title mb-2 fw-bold">Shipping Status</p>
                <p class="mb-1">${order.status}</p>
                <p class="small text-primary">Track Package (${order.trackId})</p>
              </div>
              <div class="col-12 col-md-3 mb-3">
                <p class="section-title fw-bold">Payment Status</p>
                <p class="mb-1">${order.paymentStatus}</p>
                <p class="mb-1 small text-muted">Transaction ID: ${order.transactionId}</p>
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-6">
                <p class="section-title fw-bold">Items</p>
                ${itemsHTML}
              </div>
              <div class="col-md-6 mb-3">
                <p class="section-title fw-bold">Shipping Address</p>
                <p class="mb-1">${order.address.name}</p>
                <p class="mb-1">${order.address.street}</p>
                <p class="mb-1">${order.address.city}, ${order.address.zip}</p>
                <p class="mb-1">${order.address.country}</p>
              </div>
            </div>
  
            <div class="row">
              <div class="col-md-6 mb-3">
                <p class="section-title fw-bold">Payment Details</p>
                <p class="mb-1">Method: ${order.paymentDetails.method}</p>
                <p class="mb-1">Card: ${order.paymentDetails.card} ${
        order.paymentDetails.expiry ? `(Expires: ${order.paymentDetails.expiry})` : ""
      }</p>
                <p class="mb-1">Status: ${order.paymentStatus}</p>
                <p class="mb-1">Payment Date: ${order.date}</p>
                <p class="mb-1">Transaction ID: ${order.transactionId}</p>
              </div>
              <div class="col-md-6 mb-3">
                <p class="section-title fw-bold">Order Timeline</p>
                <ul class="list-unstyled order-timeline">${timelineHTML}</ul>
              </div>
            </div>
          </div>
  
          <!-- Sticky footer buttons -->
          <div class="sticky-footer bg-light-gray py-3 rounded-top">
            <div class="d-flex justify-content-center align-items-center gap-3">
              <button class="btn bg-dark btn-sm text-white d-flex justify-content-center align-items-center gap-1"><span>Send Invoice</span></button>
            </div>
          </div>
        </div>
      `;
      
         
          container.appendChild(tr); // Append card to container
          // const orderStatusSelect = document.getElementById("orderStatusSelect");
          // orderStatusSelect.addEventListener('change', function() {
          //   updateOrderStatus(this,order.id);
          // });
        });
      
      }
      
 
      displayOrders(orders, "orders-table-body"); // Call the function to display orders

    });

  
  });