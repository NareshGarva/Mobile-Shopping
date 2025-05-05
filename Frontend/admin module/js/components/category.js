
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
              <option value="1">Active</option>
              <option value="0">Inactive</option>
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




  document.addEventListener('DOMContentLoaded', function() {
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const addCategoryModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
    const addCategoryForm = document.getElementById('addCategoryForm');
    const categoryTableBody = document.getElementById('categoryTableBody');

    addCategoryBtn.addEventListener('click', function() {
      addCategoryForm.reset(); // Clear form before adding new
      addCategoryModal.show();
    });


    window.editCategory = async function(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/category/${id}`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error(`Error fetching category with ID ${id}`);
        }
    
        const categoryToEdit = await response.json();
    
        if (categoryToEdit) {
          document.getElementById('categoryName').value = categoryToEdit.categoryName;
          document.getElementById('categoryStatus').value = categoryToEdit.categoryStatus;
          addCategoryModal.show();
          document.getElementById('addCategoryForm').setAttribute('data-edit-id', id);
        }
    
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Failed to fetch category data. Please try again.");
      }
    };

    
    addCategoryForm.addEventListener('submit', async function(e) {
      e.preventDefault();
    
      const isEdit = addCategoryForm.getAttribute('data-edit-id');
      const payload = {
        categoryName: document.getElementById('categoryName').value,
        categoryStatus: document.getElementById('categoryStatus').value
      };
    
      try {
        const url = isEdit
          ? `http://localhost:3000/api/category/${isEdit}`
          : 'http://localhost:3000/api/category/create';
    
        const method = isEdit ? 'PUT' : 'POST';
    
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
    
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Server error ${res.status}: ${errorMessage}`);
        }
    
        const result = await res.json();
        alert(result.message || (isEdit ? "Category updated!" : "Category uploaded!"));
    
        addCategoryForm.reset();
        addCategoryForm.removeAttribute('data-edit-id');
        addCategoryModal.hide();
        renderCategory();
    
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Something went wrong. Please try again.');
      }
    });

    


  //   addCategoryForm.addEventListener('submit', async function(e) {
  //     e.preventDefault();

  //     let isEdit = null;
  //     isEdit = document.getElementById('addCategoryForm').getAttribute('data-edit-id', id);
  //     const payload = {
  //       categoryName: document.getElementById('categoryName').value,
  //       categoryStatus: document.getElementById('categoryStatus').value
  //     };
  //     try {
  //   const url = isEdit
  //     ? `http://localhost:3000/api/category/${isEdit}`
  //     : 'http://localhost:3000/api/category/create';

  //   const method = isEdit ? 'PUT' : 'POST';
  //   const res = await fetch(url, {
  //     method,
  //     headers: { 'Content-Type': 'application/json' },
  //     body: payload
  //   });

  //   if (!res.ok) {
  //     const errorMessage = await res.text();
  //     throw new Error(`Server error ${res.status}: ${errorMessage}`);
  //   }

  //   const result = await res.json();
  //   alert(result.message || (isEdit ? "Category updated!" : "Category uploaded!"));

  //   addCategoryForm.reset();
  //   addCategoryModal.hide();
  //   renderCategory();
  // } catch (error) {
  //   console.error('Error submitting form:', error);
  //   alert('Something went wrong. Please try again.');
  // }


  
  //   });



    const renderCategory = async () =>{
      let category;
  try {
    const response = await fetch('http://localhost:3000/api/category/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    category = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  
      categoryTableBody.innerHTML = ''; // Clear the table body first

      category.forEach((cat) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${cat.id}</td>
          <td>${cat.categoryName}</td>
          <td>${cat.categoryStatus?"Active":"Inactive"}</td>
          <td>
            <button class="btn btn-dark btn-sm" onclick="editCategory(${cat.id})"><img src="./assets/icons/edit.svg"> Edit</button>
            <button class="btn btn-sm" style="background:rgba(255, 133, 133, 0.54); border: none;" onclick="deleteCategory(${cat.id})"><img src="./assets/icons/delete.svg"></button>
          </td>
        `;
        categoryTableBody.appendChild(newRow);
      });
    }
    renderCategory();



    window.deleteCategory = async function(id) {
      if (confirm("Are you sure you want to delete this category?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/category/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          });
          const result = await response.json();
          alert(result.message);
          
        } catch (error) {
          console.error("Error fetching category:", error);
        }
        renderCategory();
      }
    }

 


    // window.editCategory = async function(id) {
    //   try {
    //     const response = await fetch(`http://localhost:3000/api/category/${id}`,{
    //       method:'GET'
    //     });
    //     if (!response.ok) {
    //       throw new Error(`Error fetching category with ID ${id}`);
    //     }
    
    //     const categoryToEdit = await response.json();
    
    //     if (categoryToEdit) {
    //       // Populate form fields
    //       document.getElementById('categoryName').value = categoryToEdit.categoryName;
    //       document.getElementById('categoryStatus').value = categoryToEdit.categoryStatus;
    
    //       // Show the modal
    //       addCategoryModal.show();
    
    //       // Store current category ID temporarily (for use in submit handler)
    //       document.getElementById('addCategoryForm').setAttribute('data-edit-id', id);
    //     }
    
    //   } catch (error) {
    //     console.error("Error fetching category:", error);
    //     alert("Failed to fetch category data. Please try again.");
    //   }
    // };
    
  });
