document.getElementById("adminDashboard").innerHTML = `
<div>

<div class="d-flex justify-content-between align-items-center g-3 w-100">

<div class="border rounded-3 p-2 px-3">
<p class="fs-6 mb-0 text-secondary">Total Revenue</p>
<p class="fs-2 fw-bold mb-0"><span class="fs-4">₹</span> 73247983</p>
</div>

<div class="border rounded-3 p-2 px-3">
<p class="fs-6 mb-0 text-secondary">Total Orders</p>
<p class="fs-2 fw-bold mb-0"><span class="fs-4">₹</span> 73247983</p>
</div>


<div class="border rounded-3 p-2 px-3">
<p class="fs-6 mb-0 text-secondary">Active Customers</p>
<p class="fs-2 fw-bold mb-0"><span class="fs-4">₹</span> 73247983</p>
</div>


<div class="border rounded-3 p-2 px-3">
<p class="fs-6 mb-0 text-secondary">Conversion Rate</p>
<p class="fs-2 fw-bold mb-0"><span class="fs-4">₹</span> 73247983</p>
</div>

</div>

<div>
<canvas id="tabGraph" class="w-100 h-75">
</canvas>
</div>
</div>
`;



  const tabGraph = document.getElementById('tabGraph').getContext('2d');
  
  new Chart(tabGraph, {
    type: 'bar', // can be 'line', 'pie', 'doughnut', etc.
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
      datasets: [{
        label: 'Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'red', 'blue', 'yellow', 'green', 'purple'
        ],
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

