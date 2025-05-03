
document.getElementById("adminCategory").innerHTML = `

 <div class="container">
<div class=" d-flex justify-content-between align-items-center">
  <h5 class="mb-4">Category Manager</h5>
  <button id="addCategoryBtn" class="btn btn-dark"><img src="./assets/icons/plus.svg"> Add Category</button>
</div>
<table class="table table-bordered table-hover text-center align-middle rounded">
  <thead class="table-dark">
    <tr>
      <th scope="col">Category ID</th>
      <th scope="col">Category Name</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody id="categoryTableBody">
    <!-- Category rows will be dynamically inserted here -->
  </tbody>
</table>

<div id="addCategoryModal" class="modal fade" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addCategoryModalLabel">Add Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="addCategoryForm">
          <div class="mb-3">
            <label for="categoryName" class="form-label">Category Name</label>
            <input type="text" class="form-control" id="categoryName" required>
          </div>
          
          <div class="mb-3">
            <label for="categoryStatus" class="form-label">Category Status</label>
            <select class="form-select" id="categoryStatus" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-muted" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-dark" id="saveCategoryBtn">Save</button>
          </div>
        </form>
      </div>
      
    </div>
  </div>
</div>

</div>
`;



// Sample data for categories
  let category = [];

  document.addEventListener('DOMContentLoaded', function() {
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const addCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
    const addCategoryForm = document.getElementById('addCategoryForm');
    const categoryTableBody = document.getElementById('categoryTableBody');

    addCategoryBtn.addEventListener('click', function() {
      addCategoryForm.reset(); // Clear form before adding new
      addCategoryModal.show();
    });

    addCategoryForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const categoryName = document.getElementById('categoryName').value;
      const categoryStatus = document.getElementById('categoryStatus').value;

      let categoryId;
      if (category.length === 0) {
        categoryId = 1;
      } else {
        categoryId = category[category.length - 1].id + 1;
      }

      category.push({
        id: categoryId,
        name: categoryName,
        status: categoryStatus
      });

      addCategoryForm.reset();
      addCategoryModal.hide();
      renderCategory();
    });

    function renderCategory() {
      categoryTableBody.innerHTML = ''; // Clear the table body first

      category.forEach((cat) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${cat.id}</td>
          <td>${cat.name}</td>
          <td>${cat.status}</td>
          <td>
            <button class="btn btn-dark btn-sm" onclick="editCategory(${cat.id})"><img src="./assets/icons/edit.svg"> Edit</button>
            <button class="btn btn-sm" style="background:rgba(255, 133, 133, 0.54); border: none;" onclick="deleteCategory(${cat.id})"><img src="./assets/icons/delete.svg"></button>
          </td>
        `;
        categoryTableBody.appendChild(newRow);
      });
    }

    window.deleteCategory = function(id) {
      if (confirm("Are you sure you want to delete this category?")) {
        category = category.filter(cat => cat.id !== id);
        renderCategory();
      }
    }

    window.editCategory = function(id) {
      const categoryToEdit = category.find(cat => cat.id === id);
      if (categoryToEdit) {
        document.getElementById('categoryName').value = categoryToEdit.name;
        document.getElementById('categoryStatus').value = categoryToEdit.status;
        addCategoryModal.show();
        
        // Remove old category before adding new (optional logic)
        category = category.filter(cat => cat.id !== id);
      }
    }
  });
