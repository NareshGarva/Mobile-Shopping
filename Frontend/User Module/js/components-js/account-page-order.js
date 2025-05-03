document.getElementById("accountPageOrders").innerHTML=`
    <div >
      <div class="py-4 px-1">
        <div class="mb-4">
          <h4 class="fw-bold text-xl" style="color: #000">Your Orders</h4>
          <p class="text-secondary">View and manage your all ordes here</p>
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
            <a href="#" class="small">Buy Again</a>
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
        const card = document.createElement("div");
        card.className = "mb-3 col";
        
        // Main order summary and offcanvas details
        card.innerHTML = `
      <div class="p-3 rounded-main border">
        <div class="d-flex align-items-center justify-content-between">
          <p class="fw-bold">${order.id}</p>
          <p class="d-flex align-items-center justify-content-center gap-1 rounded-pill px-2 status-${order.status} small"><img src="../assets/icons/${order.status}-icon.svg" alt="">${order.status}</p>
        </div>
        <p class="text-muted fs-6">${order.date}</p>
        <div class="d-flex align-items-center justify-content-between">
          <p class="text-muted">${order.items.length} items</p>
          <p class="fw-bold">${order.total}</p>
        </div>
        <!-- Button to open order details -->
        <button class="btn-custom fw-normal text-main btn-hover-outline border mt-3 w-100 py-2 rounded-main" data-bs-toggle="offcanvas" href="#details-${containerId}-${order.id}" role="button" aria-controls="details-${containerId}-${order.id}">
          View Order Details
        </button>
      </div>

      <!-- Order details offcanvas -->
      <div id="details-${containerId}-${order.id}" tabindex="1" class="offcanvas offcanvas-bottom w-100 h-100">
        <div class="offcanvas-header bg-light-gray rounded-bottom d-block">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="offcanvas-title">Order details</h5>
            <button class="close-icon" type="button" data-bs-dismiss="offcanvas">
              <img src="../assets/icons/menu-close.svg" alt="" />
            </button>
          </div>
          <div>
            <span class="badge payment-${order.paymentStatus} small">
              Payment: ${order.paymentStatus}
            </span>
          </div>
        </div>

        <!-- Offcanvas body -->
        <div class="p-4 offcanvas-body overflow-auto">
          <div class="row mb-4">
            <div class="col-sm-12 mb-3">
              <p class="section-title mb-2 fw-bold">Order Summary</p>
              <p class="mb-1">${order.items.length} items</p>
              <p class="mb-1">Total : ${order.total}</p>
            </div>
            <div class="col-sm-12 mb-3">
              <p class="section-title mb-2 fw-bold">Shipping Status</p>
              <p class="mb-1">${order.status}</p>
              <p class="small text-primary">Track Package (${order.trackId})</p>
            </div>
            <div class="col-sm-12 mb-3">
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
          <p class="small mb-2 text-center">Need help with this order? <a href="#">Contact Support</a></p>
          <div class="d-flex justify-content-center align-items-center gap-3">
            <button class="btn bg-dark btn-sm text-white d-flex justify-content-center align-items-center gap-1"><img src="../assets/icons/download.svg" alt=""><span>Download Invoice</span></button>
            <button class="btn border border-dark btn-sm d-flex justify-content-center align-items-center gap-1"><img src="../assets/icons/repeat.svg" alt=""><span>Reorder</span></button>
          </div>
        </div>
      </div>
    `;
        
        container.appendChild(card); // Append card to container
      });
    }
    
    
    // Get the last 3 orders based on date
    function getLastThreeOrders() {
      const recentOrders = orders
        .slice() // Clone the array
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest first
        .slice(0, 3); // Take first 3
      displayOrders(recentOrders, "lastThreeOrdersSection");
    }
    
    // Populate filter dropdowns based on unique status and payment values
    function populateFilters() {
      const statusSet = new Set();
      const paymentSet = new Set();
      
      orders.forEach(order => {
        statusSet.add(order.status);
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
    
    // Filter orders based on search and filter dropdowns
    function filterOrders() {
      const search = document.getElementById('searchInput').value.toLowerCase();
      const status = document.getElementById('statusFilter').value;
      const payment = document.getElementById('paymentFilter').value;
      
      const filtered = orders.filter(order => {
        const matchesSearch = !search || (
          order.id.toLowerCase().includes(search) ||
          order.address.name.toLowerCase().includes(search) ||
          order.items.some(item => item.name.toLowerCase().includes(search))
        );
        const matchesStatus = !status || order.status === status;
        const matchesPayment = !payment || order.paymentStatus === payment;
        return matchesSearch && matchesStatus && matchesPayment;
      });
      
      displayOrders(filtered, "ordersSectionContainer");
    }
    
    // Add event listeners for real-time filtering
    document.getElementById('searchInput').addEventListener('input', () => filterOrders());
    document.getElementById('statusFilter').addEventListener('change', () => filterOrders());
    document.getElementById('paymentFilter').addEventListener('change', () => filterOrders());
  
  
  
  // Initial lode the page
  getLastThreeOrders();
populateFilters();
filterOrders();