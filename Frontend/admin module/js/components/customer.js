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
      
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody id="customerTableBody">
      <!-- Customer rows will be dynamically inserted here -->
    </tbody>
  </table>
  
  `;

  let customers;

  async function allCustomers() {
    try {
      const res = await fetch('http://localhost:3000/api/customer/all');
      if (!res.ok) {
        alert("Customers fetch failed");
        return [];
      }
      customers = await res.json();
      return customers;
    } catch (error) {
      alert("Error fetching customers on customer page");
      return [];
    }
  }
  

  

  
  document.addEventListener("DOMContentLoaded", async function () {
    await allCustomers();
   
    function randerCustomerTable()
    {
        document.getElementById("customerTableBody").innerHTML = customers.map(customers => `
            <tr>
            <td>${customers.id}</td>
            <td>${customers.name}</td>
            <td>${customers.email}</td>
            <td>
            <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${customers.id})">Delete</button>
            </td>
            `).join('');
    }
randerCustomerTable();


window.deleteCustomer = async function (id) {
  try {
    const res = await fetch(`http://localhost:3000/api/customer/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json(); // Get the error message from the response
      return alert(errorData.message);
    }
    randerCustomerTable(); // Make sure this is the correct function name
    return alert("Customer deleted successfully");
  } catch (error) {
    console.log("error comes in catch block");
    console.error("Error:", error.message);
    alert("Error deleting customer");
  }
};

});


