document.getElementById("adminCustomer").innerHTML = `
<div class="container-fluid">
  <div class="">
    <h5 class="mb-4">Customer Manager</h5>
  </div>

  <table class="table table-bordered table-hover text-center align-middle rounded">
    <thead class="table-dark">
      <tr>
        <th scope="col">Customer ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody id="customerTableBody">
      <!-- Customer rows will be dynamically inserted here -->
    </tbody>
  </table>
  
  `;

  let customers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "inactive" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", status: "active" },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", status: "pending" },
    { id: 5, name: "David Wilson", email: "david.wilson@example.com", status: "inactive" },
    { id: 6, name: "Sophia Brown", email: "sophia.brown@example.com", status: "active" },
    { id: 7, name: "Chris Lee", email: "chris.lee@example.com", status: "pending" },
    { id: 8, name: "Olivia Martin", email: "olivia.martin@example.com", status: "active" },
    { id: 9, name: "Daniel Garcia", email: "daniel.garcia@example.com", status: "inactive" },
    { id: 10, name: "Isabella Clark", email: "isabella.clark@example.com", status: "active" }
  ];

  
  document.addEventListener("DOMContentLoaded", function () {
    function randerCustomerTable()
    {
        document.getElementById("customerTableBody").innerHTML = customers.map(customers => `
            <tr>
            <td>${customers.id}</td>
            <td>${customers.name}</td>
            <td>${customers.email}</td>
            <td>${customers.status}</td>
            <td>
            <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customers.id})">Delete</button>
            </td>
            `).join('');
    }
randerCustomerTable();

window.deleteCustomer = function (id) {
    customers = customers.filter(customers => customers.id !== id);
    randerCustomerTable();
} 
});


