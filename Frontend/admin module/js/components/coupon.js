document.getElementById("adminCoupon").innerHTML = `

<div class="container">
  <div class="d-flex justify-content-between align-items-center">
    <h5 class="mb-4">Coupon Manager</h5>
    <button id="addCouponBtn" class="btn btn-dark"><img src="./assets/icons/plus.svg"> Add Coupon</button>
  </div>

  <table class="table table-bordered table-hover text-center align-middle rounded">
    <thead class="table-dark">
      <tr>
        <th scope="col">Coupon ID</th>
        <th scope="col">Coupon code</th>
        <th scope="col">Status</th>
        <th scope="col">Expiry date</th>
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
              <label for="CouponCode" class="form-label">Coupon Code</label>
              <input type="text" class="form-control" id="CouponCode" required>
              <div class="invalid-feedback">Please enter a Coupon Code.</div>
            </div>

            <div class="mb-3">
              <label for="CouponExpiry" class="form-label">Coupon Expiry</label>
              <input type="date" class="form-control" id="CouponExpiry">
              <div class="invalid-feedback">Please select an expiry date.</div>
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

document.addEventListener('DOMContentLoaded', function() {
  const addCouponBtn = document.getElementById('addCouponBtn');
  const addCouponModal = new bootstrap.Modal(document.getElementById('addCouponModal'));
  const addCouponForm = document.getElementById('addCouponForm');
  const couponTableBody = document.getElementById('couponTableBody');
  const couponCodeInput = document.getElementById('CouponCode');
  const couponExpiryInput = document.getElementById('CouponExpiry');
  const couponStatusInput = document.getElementById('CouponStatus');
  const neverExpireCheckbox = document.getElementById('neverExpireCheckbox');

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

  // Form Submission
  addCouponForm.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!addCouponForm.checkValidity()) {
      addCouponForm.classList.add('was-validated');
      return;
    }

    const couponCode = couponCodeInput.value.trim().toUpperCase(); // Save in Uppercase
    const couponStatus = couponStatusInput.value;
    const expiry = neverExpireCheckbox.checked ? 'Never' : couponExpiryInput.value;

    let couponId = Coupon.length ? Coupon[Coupon.length - 1].id + 1 : 1;

    Coupon.push({
      id: couponId,
      name: couponCode,
      expiry: expiry,
      status: couponStatus
    });

    addCouponForm.classList.remove('was-validated');
    addCouponForm.reset();
    couponExpiryInput.disabled = false;
    addCouponModal.hide();
    renderCoupon();
  });

  // Render Coupon Table
  function renderCoupon() {
    couponTableBody.innerHTML = '';

    Coupon.forEach((cou) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${cou.id}</td>
        <td>${cou.name}</td>
        <td>${cou.status}</td>
        <td>${cou.expiry}</td>
        <td>
          <button class="btn btn-dark btn-sm" onclick="editCoupon(${cou.id})"><img src="./assets/icons/edit.svg"> Edit</button>
          <button class="btn btn-sm" style="background:rgba(255, 133, 133, 0.54); border: none;" onclick="deleteCoupon(${cou.id})"><img src="./assets/icons/delete.svg"></button>
        </td>
      `;
      couponTableBody.appendChild(newRow);
    });
  }

  // Delete Coupon
  window.deleteCoupon = function(id) {
    if (confirm("Are you sure you want to delete this Coupon?")) {
      Coupon = Coupon.filter(cou => cou.id !== id);
      renderCoupon();
    }
  };

  // Edit Coupon
  window.editCoupon = function(id) {
    const couponToEdit = Coupon.find(cou => cou.id === id);
    if (couponToEdit) {
      couponCodeInput.value = couponToEdit.name;
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
      addCouponModal.show();

      // Remove old coupon
      Coupon = Coupon.filter(cou => cou.id !== id);
    }
  };
});
