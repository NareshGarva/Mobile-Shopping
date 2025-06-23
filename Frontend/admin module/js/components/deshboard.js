document.getElementById("adminDashboard").innerHTML = `
<div class="container py-4">
  <!-- Filter & Header Section -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold">Monitor your growth</h2>
    <div>
      <span class="text-muted me-2">Showing data of</span>
      <select id="filterByTime" class="form-select form-select-sm bg-black text-white border-white d-inline w-auto">
        <option value="Today">Today</option>
        <option value="Last 3 days">Last 3 days</option>
        <option value="last week">Last Week</option>
        <option value="last Month">Last Month</option>
        <option value="Custom">Custom</option>
      </select>
    </div>
  </div>

  <!-- Custom Date Picker Section: Hidden unless "Custom" is selected -->
  <div id="customDatePicker" class="gap-3 my-3 justify-content-center align-items-center g-3" style="display: none;">
    <div>
      <label class="form-label">From:</label>
      <input type="date" id="startDate" class="form-control border-dark">
    </div>
    <div>
      <label class="form-label">To:</label>
      <input type="date" id="endDate" class="form-control border-dark">
    </div>
    <div class="align-self-end">
      <button class="btn btn-outline-dark" id="applyCustomDate">Apply</button>
    </div>
  </div>



  <!-- Cards Section -->
  <div class="row g-3 mb-4">
    <div class="col-3">
      <div class="border rounded-3 p-3 bg-black text-white">
        <p class=" mb-1">Total Revenue</p>
        <h4 id="revenue">₹0</h4>
      </div>
    </div>
    <div class="col-3">
      <div class="border rounded-3 p-3 bg-black text-white">
        <p class="mb-1">Total Orders</p>
        <h4 id="orders">0</h4>
      </div>
    </div>
    <div class="col-3">
      <div class="border rounded-3 p-3 bg-black text-white">
        <p class="mb-1">Active Customers</p>
        <h4 id="customers">0</h4>
      </div>
    </div>
    <div class="col-3">
      <div class="border rounded-3 p-3 bg-black text-white">
        <p class="mb-1">Conversion Rate</p>
        <h4 id="rate">0%</h4>
      </div>
    </div>
  </div>

  <!-- Chart Type Selector -->
  <div class="mb-3">
    <select id="chartType" class="form-select form-select-sm bg-black text-white border-white w-auto">
      <option value="bar">Bar Chart</option>
      <option value="line">Line Chart</option>
    </select>
  </div>

  <!-- Chart Canvas -->
  <canvas id="tabGraph" height="100"></canvas>
</div>
`;

let chart; // Global chart instance
const ctx = document.getElementById("tabGraph").getContext("2d");

// Fetch data from backend
async function fetchData(filter = "Today") {
  const response = await fetch(`http://localhost:3000/api/dashboard-data/filter-type/${filter}`);
  const data = await response.json();
console.log(data)
  // Update Cards
  document.getElementById("revenue").textContent = `₹${data.revenue}`;
  document.getElementById("orders").textContent = `${data.orders}`;
  document.getElementById("customers").textContent = `${data.customers}`;
  document.getElementById("rate").textContent = `${data.rate}%`;

  return data;
}

// Draw or update the chart
function drawChart(labels, values, type = "bar") {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        label: 'Order',
        data: values,
        borderColor: '#252525',
        backgroundColor: 'rgba(0, 0, 0, 0.58)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: 'black' } },
        y: { ticks: { color: 'black' }, beginAtZero: true }
      },
      plugins: { legend: { labels: { color: 'black' } } }
    }
  });
}

// Update dashboard for default filters (non-Custom)
async function updateDashboard() {
  const filter = document.getElementById("filterByTime").value;
  // If 'Custom' filter is selected, wait for user to use the Apply button.
  if (filter === "Custom") {
    return;
  }
  const data = await fetchData(filter);
  const chartType = document.getElementById("chartType").value;
  drawChart(data.chartLabels, data.chartData, chartType);
}

// Event handler for filter changes
document.getElementById("filterByTime").addEventListener("change", () => {
  const selected = document.getElementById("filterByTime").value;
  // Show or hide custom date picker based on selection
  document.getElementById("customDatePicker").style.display = selected === "Custom" ? "flex" : "none";
  if (selected !== "Custom") {
    updateDashboard();
  }
});

// Event handler for chart type changes (only for non-Custom, else use apply button)
document.getElementById("chartType").addEventListener("change", updateDashboard);

// Event handler for custom date apply button
document.getElementById("applyCustomDate").addEventListener("click", async () => {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  if (!startDate || !endDate) {
    alert("Please select both dates.");
    return;
  }
  const chartType = document.getElementById("chartType").value;
  // Fetch using custom date parameters – adjust endpoint if needed.
  const response = await fetch(`http://localhost:3000/api/dashboard-data/filter-type/${startDate}/${endDate}`);
  const data = await response.json();
  
  // Update Cards
  document.getElementById("revenue").textContent = `₹${data.revenue}`;
  document.getElementById("orders").textContent = `₹${data.orders}`;
  document.getElementById("customers").textContent = `₹${data.customers}`;
  document.getElementById("rate").textContent = `₹${data.rate}`;

  drawChart(data.chartLabels, data.chartData, chartType);
});

// Initial load
updateDashboard();
