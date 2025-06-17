document.getElementById("adminCoupon").innerHTML = `

<div class="container">
  <div class="d-flex justify-content-between align-items-center">
    <h5 class="mb-4">Coupon Manager</h5>
    <button id="addCouponBtn" class="btn btn-dark"><img src="./assets/icons/plus.svg"> Add Coupon</button>
  </div>

  <table class="table table-bordered table-hover text-center align-middle rounded">
    <thead class="table-dark">
      <tr>
        <th scope="col">Coupon code</th>
        <th scope="col">Type</th>
        <th scope="col">Coupon value</th>
        <th scope="col">Expiry date</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody id="couponTableBody">
      <!-- Coupon rows will be dynamically inserted here -->
    </tbody>
  </table>

  <div id="addCouponModal" class="modal fade" tabindex="-1" aria-labelledby="addCouponModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="addCouponForm" novalidate>
          <div class="modal-header">
            <h5 class="modal-title" id="addCouponModalLabel">Add Coupon</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
          <div class="mb-3"> 
  <div class="d-flex flex-wrap">

    <!-- Percentage Discount Option -->
    <div class="form-check form-check-inline">
      <input 
        class="btn-check" 
        type="radio" 
        name="CouponType" 
        id="PercentageDiscount" 
        value="Percentage" 
        required 
        autocomplete="off"
        checked
      >
      <label 
        class="btn btn-outline-dark rounded-pill px-4 py-2" 
        for="PercentageDiscount"
      >
        Percentage Discount
      </label>
    </div>

    <!-- Fixed Discount Option -->
    <div class="form-check form-check-inline">
      <input 
        class="btn-check" 
        type="radio" 
        name="CouponType" 
        id="FixedDiscount" 
        value="Fixed" 
        required 
        autocomplete="off"
      >
      <label 
        class="btn btn-outline-dark rounded-pill px-4 py-2" 
        for="FixedDiscount"
      >
        Fixed Discount
      </label>
    </div>
  </div>
</div>

            <div class="mb-3">
              <label for="CouponCode" class="form-label">Coupon Code</label>
              <input type="text" class="form-control" id="CouponCode" required>
              <div class="invalid-feedback">Please enter a Coupon Code.</div>
            </div>

           

  <div class="mb-3">
              <label for="DiscountValue" class="form-label">Discount Value</label>
              <input type="number" class="form-control" id="DiscountValue" required>
              <div class="invalid-feedback">Please enter discount value.</div>
            </div>

            <div class="mb-3">
              <label for="CouponExpiry" class="form-label">Coupon Expiry</label>
              <input type="date" class="form-control" id="CouponExpiry">
              <div class="invalid-feedback">Please select an valid expiry date.</div>
            </div>

            <div class="form-check mb-3">
              <input type="checkbox" class="form-check-input" id="neverExpireCheckbox">
              <label class="form-check-label" for="neverExpireCheckbox">Never Expire</label>
            </div>

            <div class="mb-3">
              <label for="CouponStatus" class="form-label">Coupon Status</label>
              <select class="form-select" id="CouponStatus" required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div class="invalid-feedback">Please select a Coupon Status.</div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-dark" id="saveCouponBtn">Save</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>
`;

// Coupon array
let Coupon = [];
let isEdit = false;

document.addEventListener('DOMContentLoaded', function() {
 


  let couponType ="" ;
  const addCouponBtn = document.getElementById('addCouponBtn');
  const addCouponModal = new bootstrap.Modal(document.getElementById('addCouponModal'));
  const addCouponForm = document.getElementById('addCouponForm');
  const couponTableBody = document.getElementById('couponTableBody');
  const couponCodeInput = document.getElementById('CouponCode');
  const percentageDiscount = document.getElementById('PercentageDiscount');
  const fixedDiscount = document.getElementById('FixedDiscount');
  const discountValue = document.getElementById('DiscountValue');
  const couponExpiryInput = document.getElementById('CouponExpiry');
  const couponStatusInput = document.getElementById('CouponStatus');
  const neverExpireCheckbox = document.getElementById('neverExpireCheckbox');


  

  
    // Function to update placeholder based on selection
    function updatePlaceholder() {
      //Handle coupone type & discount value input
  if(fixedDiscount.checked){
    couponType = fixedDiscount.value;
    discountValue.placeholder = "Please enter discount amount";
  }else{
    couponType = percentageDiscount.value;
    discountValue.placeholder = "Please enter % value between 0 to 100";
  }
    }


// Get today’s date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    // Set min attribute to today
    couponExpiryInput.min = today;

  
    // Run initially to set default placeholder
    updatePlaceholder();

    // Add event listeners
    fixedDiscount.addEventListener("change", updatePlaceholder);
    percentageDiscount.addEventListener("change", updatePlaceholder);


  // Handle 'Never Expire' Checkbox
  neverExpireCheckbox.addEventListener('change', function () {
    if (this.checked) {
      couponExpiryInput.disabled = true;
      couponExpiryInput.value = '';
      couponExpiryInput.classList.remove('is-invalid');
    } else {
      couponExpiryInput.disabled = false;
    }
  });

  // Open Add Coupon Modal
  addCouponBtn.addEventListener('click', function() {
    addCouponForm.reset();
    couponExpiryInput.disabled = false;
    addCouponModal.show();
  });



  // Form Submission[]
  addCouponForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!addCouponForm.checkValidity()) {
      addCouponForm.classList.add('was-validated');
      return;
    }

    const couponCode = couponCodeInput.value.trim().toUpperCase(); // Save in Uppercase
    const couponStatus = couponStatusInput.value;
    const expiry = neverExpireCheckbox.checked ? 'Never' : couponExpiryInput.value;


try{
  const res = await fetch(isEdit ? "http://localhost:3000/api/coupon/update/coupons" : "http://localhost:3000/api/coupon/add/coupons",{
    method: isEdit ? 'PUT' : 'POST',
    headers:{
    'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      couponCode,
      expiry,
      couponStatus,
      couponType,
      discountValue : discountValue.value
    })
  });
  const data = await res.json();

if(!res.ok){
  alert(data.message);
  return;
}
alert(data.message);
return;
}catch(error){
  console.log("error : ", error);
  alert("Internal server error");
}


    addCouponForm.classList.remove('was-validated');
    addCouponForm.reset();
    couponExpiryInput.disabled = false;
    addCouponModal.hide();
    renderCoupon();
  });



 // Render Coupon Table
async function renderCoupon() {
  try {
    const res = await fetch('http://localhost:3000/api/coupon/get-all/coupons', {
      method: 'GET'
    });

    // Check response status
    if (!res.ok) {
      throw new Error("Error in fetching coupons");
    }

    Coupon = await res.json();
    
   
 console.log("all coupons :",Coupon)
    // If no coupons available
    if (!Coupon || !Coupon.length) {
      throw new Error("No coupons available");
    }

   
    // Clear the table body before rendering
    couponTableBody.innerHTML = '';

    // Loop through and render each coupon
    Coupon.forEach((cou) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${cou.code}</td>
        <td>${cou.discountType}</td>
        <td>${cou.discountValue}</td>
        <td>${cou.expiry}</td>
        <td>${cou.status}</td>
        <td>
          <button class="btn btn-dark btn-sm" onclick="editCoupon(${cou.couponId})">
            <img src="./assets/icons/edit.svg"> Edit
          </button>
          <button class="btn btn-sm" style="background:rgba(255, 133, 133, 0.54); border: none;" onclick="deleteCoupon(${cou.couponId})">
            <img src="./assets/icons/delete.svg">
          </button>
        </td>
      `;
      couponTableBody.appendChild(newRow);
    });

  } catch (error) {
    console.error("Error in loading coupons:", error.message);
    couponTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-danger fw-bold">No coupons found!</td>
      </tr>
    `;
  }
}


  // Delete Coupon
window.deleteCoupon = async function(id) {
  if (confirm("Are you sure you want to delete this Coupon?")) {
    try {
      const res = await fetch(`http://localhost:3000/api/coupon/coupons/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);
      renderCoupon();
    } catch (error) {
      console.error("Error:", error);
      alert("Internal server error");
    }
  }
};


  // Edit Coupon
  window.editCoupon = function(id) {
    const couponToEdit = Coupon.find(cou => cou.couponId === id);
   
    if (couponToEdit) {
      couponCodeInput.value = couponToEdit.code;
      couponCodeInput.disabled = true;

 if (couponToEdit.discountType === 'Percentage') {
  percentageDiscount.checked = true;
  fixedDiscount.checked = false;
} else {
  fixedDiscount.checked = true;
  percentageDiscount.checked = false;
}

      if (couponToEdit.expiry === 'Never') {
        neverExpireCheckbox.checked = true;
        couponExpiryInput.disabled = true;
        couponExpiryInput.value = '';
      } else {
        neverExpireCheckbox.checked = false;
        couponExpiryInput.disabled = false;
        couponExpiryInput.value = couponToEdit.expiry;
      }
      couponStatusInput.value = couponToEdit.status;
      discountValue.value = couponToEdit.discountValue;
      isEdit = true;
      addCouponModal.show();
    }

    
  };

  //initial load all coupons 
  renderCoupon();
});
