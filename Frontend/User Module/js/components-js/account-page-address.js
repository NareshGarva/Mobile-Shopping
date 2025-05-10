document.getElementById("accountPageAddress").innerHTML=`
    <div >
      <div class="container py-5">
        <div class="mb-4">
          <h2 class="fw-bold">Your Addresses</h2>
          <p class="text-muted">Manage your shipping and billing addresses</p>
        </div>
        
        <div class="row g-4">
          <!-- Add New Address Card -->
          <div class="col-12 col-md-6 col-lg-4">
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
          <div id="addressContainerId"></div>
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






let addresses = []; // Your full address list
    let defaultAddresses = []; // Only the default addresses
    let editingIndex = null;
    
    function openAddressForm(index = null) {
      editingIndex = index;
      if (index !== null) {
        const address = addresses[index];
        document.getElementById("form-title").innerText = "Edit Address";
        document.getElementById("type").value = address.type;
        document.getElementById("name").value = address.name;
        document.getElementById("street").value = address.street;
        document.getElementById("apt").value = address.apt;
        document.getElementById("city").value = address.city;
        document.getElementById("state").value = address.state;
        document.getElementById("zip").value = address.zip;
        document.getElementById("country").value = address.country;
        document.getElementById("phone").value = address.phone;
      } else {
        document.getElementById("form-title").innerText = "Add Address";
        document.getElementById("address-form").reset();
      }
      new bootstrap.Modal(
        document.getElementById("address-form-modal")
      ).show();
    }
    
    // Renders the list of saved addresses into the given container by ID
    function renderAddresses(addressesArray, addressContainerId) {
      const addressList = document.getElementById(addressContainerId); // Use the passed ID
      addressList.innerHTML = ''; // Clear existing content
      
      // Check if addresses array is empty
      if (addressesArray.length === 0) {
        addressList.innerHTML = '<p class="text-muted">No Address Found.</p>';
        return;
      }
      
      // Sort addresses to show 'default' ones first or recent additions (optional)
      const sortedAddresses = [...addressesArray].sort((a, b) => {
        if (a.default) return -1;
        if (b.default) return 1;
        return 0;
      });
      
      // Loop through each address and create its card
      sortedAddresses.forEach((address, index) => {
        addressList.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="border p-3 rounded-main">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0 gap-1 d-flex justify-content-left align-items-center fw-bold small"><img src="../assets/icons/${address.type}.svg" alt="" /> ${address.type}</h5>
                            
                            ${address.default ? '<span class="default-address-badge">Default</span>' : ''}
                        </div>
                        <p class="card-text mb-1">${address.name}</p>
                        <p class="card-text mb-1">${address.street}</p>
                        ${address.apt ? `<p class="card-text mb-1">${address.apt}</p>` : ''}
                        <p class="card-text mb-1">${address.city}, ${address.state} ${address.zip}</p>
                        <p class="card-text mb-1">${address.country}</p>
                        <p class="card-text mb-2">${address.phone}</p>
                        <div class="d-flex flex-wrap mt-2">
                        <span>
                            ${!address.default ? `<button class="btn btn-sm btn-dark text-white me-2 mb-1" onclick="setDefaultAddress(${index})">Set as Default</button>` : ''}</span>
                            <button class="btn btn-sm btn-outline-dark me-2 mb-1" onclick="openAddressForm(${index})"><img src="../assets/icons/edit.svg" alt=""> Edit</button>
                            <button class="btn btn-sm btn-outline-danger mb-1" onclick="deleteAddress(${index})"><img  src="../assets/icons/delete.svg" alt=""> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
      });
    }
    



    function setDefaultAddress(index) {
      addresses.forEach((address, i) => {
        address.default = i === index;
      });
      renderAddresses(addresses, "addressContainerId");
    }
    


    function deleteAddress(index) {
      addresses.splice(index, 1);
      if (
        addresses.length > 0 &&
        !addresses.some((address) => address.default)
      ) {
        addresses[0].default = true;
      }
      renderAddresses(addresses, "addressContainerId");
    }
    


    document.getElementById("address-form").addEventListener("submit", async function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const form = this;
      
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return; // Don't proceed if the form is invalid
      }
      
      const address = {
        userId: localStorage.getItem("user-access-id"),
        addressType: document.getElementById("type").value,
        defaultAddress: editingIndex === null && addresses.length === 0,
        fullName: document.getElementById("name").value,
        addressLine1: document.getElementById("street").value,
        localityArea: document.getElementById("apt").value,
        cityTown: document.getElementById("city").value,
        state: document.getElementById("state").value,
        pinCode: document.getElementById("zip").value,
        country: document.getElementById("country").value,
        mobileNumber: document.getElementById("phone").value,
      };
      
      if (editingIndex === null) {
      
        try{
          const response = await fetch("http://localhost:3000/api/address/add-address", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
          });
          const data = await response.json();
          if(response.ok){console.log("Address added successfully", data);
          }
        }catch(error){
          console.log("error in adding address : ", error);
        }
      } else {
         try{
          const response = await fetch(`http://localhost:3000/api/address/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
          });
          const data = await response.json();
          if(response.ok){console.log("Address Updated successfully", data);
          }
        }catch(error){
          console.log("error in adding address : ", error);
        }
      }
      
      bootstrap.Modal.getInstance(document.getElementById("address-form-modal")).hide();
      renderAddresses(addresses, "addressContainerId");
      form.classList.remove("was-validated"); // Reset validation state after successful submission
    });
    


    //rendring the default address for deshbord tab
    function updateDefaultAddresses() {
      defaultAddresses = addresses.filter(addr => addr.default === true);
      renderAddresses(defaultAddresses, "deshbordDefaultAddress");
    }
    
    
    
    
        // Initial page load then function calling 
    setInterval(() => {
      updateDefaultAddresses();
    }, 1000);
    renderAddresses(addresses, "addressContainerId");