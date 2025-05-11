document.getElementById("accountPageAddress").innerHTML=`
    <div>
      <div class="container py-5">
        <div class="mb-4">
          <h2 class="fw-bold">Your Addresses</h2>
          <p class="text-muted">Manage your shipping and billing addresses</p>
        </div>
        
        <div>
          <!-- Add New Address Card -->
          <div class="col-12 col-md-6 col-lg-4 mb-3">
            <div class="border border-dashed border-secondary rounded p-4 text-center">
              <div class="text-secondary display-4 mb-3">
                <img onclick="openAddressForm()" class="p-2 rounded-full bg-light-gray" src="../assets/icons/plus.svg" alt="" />
              </div>
              <h3 class="h5 mb-2">Add New Address</h3>
              <p class="text-muted mb-3">
                Add a new shipping or billing address
              </p>
              <button class="btn btn-dark" onclick="openAddressForm()">
                Add Address
              </button>
            </div>
          </div>
          <div id="addressContainerId" class="row g-4"></div>
        </div>
      </div>
      
      <!-- Address Form Modal -->
      <div class="modal fade" id="address-form-modal" tabindex="-1" aria-labelledby="addressFormModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content rounded-3 shadow-sm">
            <div class="modal-header border-0 pb-0">
              <h5 class="modal-title" id="form-title">Add Address</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            
            <div class="modal-body">
              <form id="address-form" novalidate autocomplete="on">
                <div class="row g-3">
                  
                  <div class="col-4">
                    <label for="type" class="form-label small">Address Type<span class="text-danger">*</span></label>
                    <select class="form-select form-select-sm" id="type" required>
                      <option value="">Select</option>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Parents">Parents</option>
                      <option value="Other">Other</option>
                    </select>
                    <div class="invalid-feedback">Please select address type.</div>
                  </div>
                  
                  <div class="col-8">
                    <label for="name" class="form-label small">Full Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="name" required />
                    <div class="invalid-feedback">Please enter your full name.</div>
                  </div>
                  
                  <div class="col-12">
                    <label for="street" class="form-label small">Address Line <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="street" placeholder="House no., Street, Landmark" required />
                    <div class="invalid-feedback">Please enter the full address.</div>
                  </div>
                  
                  <div class="col-6">
                    <label for="apt" class="form-label small">Locality / Area</label>
                    <input type="text" class="form-control form-control-sm" id="apt" />
                  </div>
                  
                  <div class="col-6">
                    <label for="city" class="form-label small">City / Town <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="city" required />
                    <div class="invalid-feedback">City is required.</div>
                  </div>
                  
                  <div class="col-6">
                    <label for="state" class="form-label small">State <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="state" required />
                    <div class="invalid-feedback">Please enter the state.</div>
                  </div>
                  
                  <div class="col-6">
                    <label for="zip" class="form-label small">PIN Code <span class="text-danger">*</span></label>
                    <input type="text" class="form-control form-control-sm" id="zip" pattern="[0-9]{6}" maxlength="6" required />
                    <div class="invalid-feedback">Enter valid 6-digit PIN.</div>
                  </div>
                  
                  <div class="col-4">
                    <label for="country" class="form-label small">Country</label>
                    <input type="text" class="form-control form-control-sm" id="country" value="India" readonly />
                  </div>
                  
                  <div class="col-8">
                    <label for="phone" class="form-label small">Mobile Number <span class="text-danger">*</span></label>
                    <input type="tel" class="form-control form-control-sm" id="phone" pattern="[0-9]{10}" maxlength="10" required />
                    <div class="invalid-feedback">Enter valid 10-digit number.</div>
                  </div>
                  
                </div>
                
                <div class="d-flex justify-content-end mt-3">
                  <button type="button" class="btn btn-sm btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-sm btn-dark">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

// Global variables to store addresses data
let addresses = [];
let editingIndex = null;

// Function to open address form modal for adding new or editing existing address
function openAddressForm(index = null) {
  editingIndex = index;
  const form = document.getElementById("address-form");
  
  if (index !== null && addresses[index]) {
    // Editing existing address
    document.getElementById("form-title").innerText = "Edit Address";
    const address = addresses[index];
    document.getElementById("type").value = address.addressType || "";
    document.getElementById("name").value = address.fullName || "";
    document.getElementById("street").value = address.addressLine1 || "";
    document.getElementById("apt").value = address.localityArea || "";
    document.getElementById("city").value = address.cityTown || "";
    document.getElementById("state").value = address.state || "";
    document.getElementById("zip").value = address.pinCode || "";
    document.getElementById("country").value = address.country || "India";
    document.getElementById("phone").value = address.mobileNumber || "";
  } else {
    // Adding new address
    document.getElementById("form-title").innerText = "Add Address";
    form.reset();
  }
  
  // Reset validation state
  form.classList.remove("was-validated");
  
  // Show modal
  new bootstrap.Modal(document.getElementById("address-form-modal")).show();
}





// Function to render addresses in the specified container
async function renderAddresses(containerId) {
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

    // Store fetched addresses in global variable
    addresses = await response.json();
    addresses = await addresses.addresses || [];
    console.log("Fetched addresses : ", addresses);
    // Get the container
    const addressContainer = document.getElementById(containerId);
    if (!addressContainer) {
      console.log(`Container with ID '${containerId}' not found`);
      return;
    }
    
    // Clear previous content
    addressContainer.innerHTML = '';

    // If no addresses found
    if (!addresses || addresses.length === 0) {
      addressContainer.innerHTML = '<div class="col-12"><p class="text-muted">No addresses found.</p></div>';
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
      addressContainer.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="border p-3 rounded-main">
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
              <div class="d-flex flex-wrap mt-2">
                <span>
                  ${!address.defaultAddress ? `<button class="btn btn-sm btn-dark text-white me-2 mb-1" onclick="setDefaultAddress('${address.addressId}')">Set as Default</button>` : ''}
                </span>
                <button class="btn btn-sm btn-outline-dark me-2 mb-1" onclick="openAddressForm(${index})">
                  <img src="../assets/icons/edit.svg" alt=""> Edit
                </button>
                <button class="btn btn-sm btn-outline-danger mb-1" onclick="deleteAddress('${address.addressId}')">
                  <img src="../assets/icons/delete.svg" alt="">
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.log("Error rendering addresses:", error);
  }
}



// Function to set an address as default
async function setDefaultAddress(addressId) {
  try {
    const userId = localStorage.getItem('user-access-id');
    
    if (!userId || !addressId) {
      console.log("Missing user ID or address ID");
      return;
    }
    
    const response = await fetch(`http://localhost:3000/api/address/set-default/${addressId}/${userId}`, {
      method: 'PUT',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error setting default address:", errorData.message);
      return;
    }

    console.log("Default address updated successfully");
    // Refresh addresses
    renderAddresses("addressContainerId");
    
    // Also update dashboard default address if that container exists
    const dashboardContainer = document.getElementById("deshbordDefaultAddress");
    if (dashboardContainer) {
      renderDefaultAddresses();
    }
  } catch (error) {
    console.log("Error setting default address:", error);
  }
}



// Function to delete an address
async function deleteAddress(addressId) {
  try {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }
    
    if (!addressId) {
      console.log("Address ID is required");
      return;
    }
    
    const response = await fetch(`http://localhost:3000/api/address/${addressId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error deleting address:", errorData.message);
      return;
    }

    console.log("Address deleted successfully");
    // Refresh addresses
    renderAddresses("addressContainerId");
    
    // Also update dashboard default address if that container exists
    const dashboardContainer = document.getElementById("deshbordDefaultAddress");
    if (dashboardContainer) {
      renderDefaultAddresses();
    }
  } catch (error) {
    console.log("Error deleting address:", error);
  }
}


// Function to render only default addresses (for dashboard)
async function renderDefaultAddresses() {
  try {
    const userId = localStorage.getItem('user-access-id');
    
    if (!userId) {
      console.log("User ID not found in local storage");
      return;
    }
    
    const response = await fetch(`http://localhost:3000/api/address/get-default-address/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error fetching default address:", errorData.message);
      return;
    }

    const defaultAddress = await response.json();
    const dashboardContainer = document.getElementById("deshbordDefaultAddress");
    
    if (!dashboardContainer) {
      console.log("Dashboard default address container not found");
      return;
    }
    
    dashboardContainer.innerHTML = '';
    
    if (!defaultAddress) {
      dashboardContainer.innerHTML = '<div class="col-12"><p class="text-muted">No default address set.</p></div>';
      return;
    }
    
    dashboardContainer.innerHTML = `
      <div class="col-12">
        <div class="border p-3 rounded-main">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="card-title mb-0 gap-1 d-flex justify-content-left align-items-center fw-bold small">
                <img src="../assets/icons/${defaultAddress.addressType}.svg" alt="" /> ${defaultAddress.addressType}
              </h5>
              <span class="default-address-badge">Default</span>
            </div>
            <p class="card-text mb-1">${defaultAddress.fullName}</p>
            <p class="card-text mb-1">${defaultAddress.addressLine1}</p>
            ${defaultAddress.localityArea ? `<p class="card-text mb-1">${defaultAddress.localityArea}</p>` : ''}
            <p class="card-text mb-1">${defaultAddress.cityTown}, ${defaultAddress.state} ${defaultAddress.pinCode}</p>
            <p class="card-text mb-1">${defaultAddress.country}</p>
            <p class="card-text mb-1">${defaultAddress.mobileNumber}</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.log("Error rendering default address:", error);
  }
}



// Handle form submission
document.getElementById("address-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const form = this;
  
  // Check form validity
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }
  
  // Get user ID
  const userId = localStorage.getItem("user-access-id");
  if (!userId) {
    console.log("User ID not found");
    return;
  }
  
  // Collect form data
  const addressData = {
    userId: userId,
    addressType: document.getElementById("type").value,
    fullName: document.getElementById("name").value,
    addressLine1: document.getElementById("street").value,
    localityArea: document.getElementById("apt").value,
    cityTown: document.getElementById("city").value,
    state: document.getElementById("state").value,
    pinCode: document.getElementById("zip").value,
    country: document.getElementById("country").value,
    mobileNumber: document.getElementById("phone").value,
    // Set as default if it's the first address
    defaultAddress: editingIndex === null && addresses.length === 0
  };
  
  try {
    let response;
    
    if (editingIndex === null) {
      // Add new address
      response = await fetch("http://localhost:3000/api/address/add-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });
    } else {
      // Update existing address
      const addressId = Number(addresses[editingIndex]?.addressId);
      
      if (!addressId) {
        console.log("Invalid address ID for update");
        return;
      }
      console.log("Address id for update: ", addressId)
      response = await fetch(`http://localhost:3000/api/address/update-address/${addressId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });
    }
    
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Address not ${editingIndex === null ? 'added' : 'updated'}:`, errorData.message);
      return;
    }
    
    console.log(`Address ${editingIndex === null ? 'added' : 'updated'} successfully`);
    
    // Hide modal
    bootstrap.Modal.getInstance(document.getElementById("address-form-modal")).hide();
    
    // Refresh addresses
    renderAddresses("addressContainerId");
    
    // Update dashboard default address if that container exists
    const dashboardContainer = document.getElementById("deshbordDefaultAddress");
    if (dashboardContainer) {
      renderDefaultAddresses();
    }
    
    // Reset form validation state
    form.classList.remove("was-validated");
    
  } catch (error) {
    console.log(`Error ${editingIndex === null ? 'adding' : 'updating'} address:`, error);
  }
});



// Initialize the page
document.addEventListener("DOMContentLoaded", function() {
  // Render all addresses
  renderAddresses("addressContainerId");
  
  // Render default address for dashboard if the container exists
  const dashboardContainer = document.getElementById("deshbordDefaultAddress");
  if (dashboardContainer) {
    renderDefaultAddresses();
  }
});