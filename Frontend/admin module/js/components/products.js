// import vivoProducts from "../../../User Module/Frontend/js/products.js";


  document.getElementById("adminProducts").innerHTML = `
 <div class="my-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h5 class="fw-bold">Product Management</h5>
    <button class="btn btn-dark" id="openFormBtn">
      <img src="./assets/icons/plus.svg"> Add New Product
    </button>
  </div>

  
      <div class="table-responsive border rounded">
        <table class="table table-hover" id="productsTable">
          <thead class="table-light">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Selling Price</th>
              <th>Discount %</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
 
<!-- Product Form Modal -->
<div class="modal fade" id="productModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form id="productForm" enctype="multipart/form-data">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">Add / Edit Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="productId">

          <div class="mb-3">
            <label for="productTitle" class="form-label">Product Title</label>
            <input type="text" class="form-control" id="productTitle" required>
          </div>

          <div class="mb-3">
            <label for="productDescription" class="form-label">Product Description</label>
            <textarea class="form-control" id="productDescription" rows="2" required></textarea>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="originalPrice" class="form-label">Original Price</label>
              <div class="input-group">
                <span class="input-group-text">₹</span>
                <input type="number" class="form-control" id="originalPrice" required min="0">
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="sellingPrice" class="form-label">Selling Price</label>
              <div class="input-group">
                <span class="input-group-text">₹</span>
                <input type="number" class="form-control" id="sellingPrice" required min="0">
              </div>
              <div class="mt-2">
                <span class="badge bg-danger" id="discountDisplay">0% OFF</span>
              </div>
            </div>
          </div>


          <div class="row">
           
          <div class="col-md-6 mb-3">
            <label for="productColors" class="form-label">Colors (comma separated hex codes)</label>
            <input type="text" class="form-control" id="productColors" placeholder="#000000, #FFFFFF, linear-gradient(45deg, #1F1C2C, #928DAB)">
            <div id="colorPreview" class="mt-2"></div>
          </div>

          <div class="col-md-6 mb-3">
            <label for="productCategory" class="form-label">Product Category</label>
            <select class="form-select" id="productCategory" required>
              <option value="">Select Category</option>
            </select>
          </div>

          </div>

          
          <div class="card mb-3">
            <div class="card-header bg-light d-flex justify-content-between align-items-center">
              <h6 class="mb-0">Product Sizes / Variants</h6>
              <button type="button" class="btn btn-sm btn-dark" id="addSizeBtn">
                <img src="./assets/icons/plus.svg"> </i> Add Size
              </button>
            </div>
            <div class="card-body" id="sizesContainer">
              <!-- Size fields will be added here -->
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-header bg-light d-flex justify-content-between align-items-center">
              <h6 class="mb-0">Product Specifications</h6>
              <button type="button" class="btn btn-sm btn-dark" id="addSpecBtn">
                <img src="./assets/icons/plus.svg"> </i> Add Specification
              </button>
            </div>
            <div class="card-body" id="specificationsContainer">
              <!-- Specification fields will be added here -->
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="mainImage" class="form-label">Main Image Upload</label>
              <input type="file" class="form-control" id="mainImage" accept="image/*">
              <div class="mt-2" id="mainImagePreview"></div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="casualImages" class="form-label">Casual Images Upload (multiple)</label>
              <input type="file" class="form-control" id="casualImages" accept="image/*" multiple>
              <div class="mt-2" id="casualImagesPreview"></div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6 mb-3">
              <label for="productStock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="productStock" required min="0">
            </div>
            <div class="col-md-6 mb-3">
              <label for="productWarranty" class="form-label">Warranty</label>
              <input type="text" class="form-control" id="productWarranty" placeholder="e.g. 1 Year">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-muted" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-dark">Save Product</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- View Product Modal -->
<div class="modal fade" id="viewModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Product Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="viewDetails"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-muted" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-dark" id="viewEditBtn">Edit product</button>
      </div>
    </div>
  </div>
</div>

`;



// Render Products Table
const renderTable = async () => {
  let products;
  try {
    const response = await fetch('http://localhost:3000/api/product/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const tbody = document.querySelector("#productsTable tbody");
  tbody.innerHTML = "";  // Clear the table body before re-rendering

  products.forEach(product => {
    const discount = Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${product.id}</td>
      <td><img src="${product.mainImage}" alt="${product.productTitle}" class="product-image"></td>
      <td>${product.title}</td>
      <td>₹${product.sellingPrice.toLocaleString('en-IN')}</td>
      <td>${discount}%</td>
      <td>${product.category}</td>
      <td>${product.stock > 0 ? product.stock : '<span class="text-danger">Out of stock</span>'}</td>
      <td>
        <button class="btn btn-muted border btn-sm" onclick="viewProduct('${product.id}')">
          <img src="./assets/icons/eye.svg"> 
        </button>
        <button class="btn bg-dark text-white btn-sm" onclick="editProduct('${product.id}')">
          <img src="./assets/icons/edit.svg"> 
        </button>
        <button class="btn btn-sm" onclick="deleteProduct('${product.id}')" style="background:rgba(255, 133, 133, 0.54); border: none;">
          <img src="./assets/icons/delete.svg"> 
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


renderTable();


// Get highest product ID number to set current ID counter
// let currentId;
// const initializeCurrentId = () => {
//   if (products.length > 0) {
//     let highestId = 0;
//     products.forEach(product => {
//       const idParts = product.id.split('-');
//       if (idParts.length === 3) {
//         const idNumber = parseInt(idParts[2]);
//         if (!isNaN(idNumber) && idNumber > highestId) {
//           highestId = idNumber;
//         }
//       }
//     });
//     currentId = highestId + 1;
//   } else {
//     currentId = 1;
//   }
// };

// initializeCurrentId();

// Category options
const categoryOptions = ["Smartphones", "Tablets", "Laptops", "Accessories", "Wearables"];

// Initialize modal objects
const productModal = new bootstrap.Modal(document.getElementById('productModal'));
const viewModal = new bootstrap.Modal(document.getElementById('viewModal'));

// DOM elements
const openFormBtn = document.getElementById('openFormBtn');
const productForm = document.getElementById('productForm');
const originalPriceInput = document.getElementById('originalPrice');
const sellingPriceInput = document.getElementById('sellingPrice');
const discountDisplay = document.getElementById('discountDisplay');
const colorInput = document.getElementById('productColors');
const colorPreview = document.getElementById('colorPreview');
const categorySelect = document.getElementById('productCategory');
const sizesContainer = document.getElementById('sizesContainer');
const specificationsContainer = document.getElementById('specificationsContainer');
const mainImageInput = document.getElementById('mainImage');
const mainImagePreview = document.getElementById('mainImagePreview');
const casualImagesInput = document.getElementById('casualImages');
const casualImagesPreview = document.getElementById('casualImagesPreview');

// Populate category options
categoryOptions.forEach(cat => {
  const option = document.createElement('option');
  option.value = cat;
  option.textContent = cat;
  categorySelect.appendChild(option);
});

// Open form button click handler
openFormBtn.addEventListener('click', () => {
  resetForm();
  document.getElementById('productModalLabel').textContent = "Add New Product";
  productModal.show();
});




// // Function to create a unique ID based on category
// function createID(category) {
//   const prefix = "VIVO-";
//   const mdfix = category.substring(0, 3).toUpperCase();
//   const suffix = currentId.toString().padStart(3, '0');
//   const id = prefix + mdfix + "-" + suffix;

//   // Check if the ID already exists
//   const existingProduct = products.find(product => product.id === id);
//   if (existingProduct) {
//     currentId++; // Move to next ID if duplicate found
//     return createID(category);
//   }

//   currentId++; // Increment for next use
//   return id;
// }




// Calculate and update discount percentage in real-time
function updateDiscount() {
  const original = parseFloat(originalPriceInput.value) || 0;
  const selling = parseFloat(sellingPriceInput.value) || 0;
  let discount = 0;
  
  if (original > 0 && selling > 0) {
    discount = Math.round(((original - selling) / original) * 100);
  }
  
  discountDisplay.textContent = `${discount}% OFF`;
}




// Add event listeners for price inputs
originalPriceInput.addEventListener('input', updateDiscount);
sellingPriceInput.addEventListener('input', updateDiscount);

// Update color preview
colorInput.addEventListener('input', updateColorPreview);

function updateColorPreview() {
  const colors = colorInput.value.split(',').map(c => c.trim()).filter(c => c);
  colorPreview.innerHTML = '';
  
  colors.forEach(color => {
    const preview = document.createElement('span');
    preview.className = 'color-preview';
    preview.style.background = color;
    colorPreview.appendChild(preview);
  });
}






// Add size/variant field
document.getElementById("addSizeBtn").addEventListener("click", function() {
  addFieldRow(sizesContainer, "Size/Variant");
});

// Add specification field
document.getElementById("addSpecBtn").addEventListener("click", function() {
  addFieldRow(specificationsContainer, "Specification");
});




// Function to add a new field row (used for both sizes and specs)
function addFieldRow(container, labelText) {
  const div = document.createElement("div");
  div.classList.add("row", "mb-2", "align-items-center");
  div.innerHTML = `
    <div class="col-5">
      <input type="text" class="form-control" placeholder="${labelText} Label" required>
    </div>
    <div class="col-5">
      <input type="text" class="form-control" placeholder="${labelText} Value" required>
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-sm remove-row" style="background:rgba(255, 133, 133, 0.54); border: none;">
       <img src="./assets/icons/delete.svg"> 
      </button>
    </div>`;
  
  container.appendChild(div);
  
  div.querySelector('.remove-row').addEventListener('click', function() {
    div.remove();
  });
}



// Handle main image preview
mainImageInput.addEventListener('change', function() {
  mainImagePreview.innerHTML = '';
  if (this.files && this.files[0]) {
    const img = document.createElement('img');
    img.classList.add('product-image');
    img.src = URL.createObjectURL(this.files[0]);
    mainImagePreview.appendChild(img);
  }
});




// Handle casual images preview
casualImagesInput.addEventListener('change', function() {
  casualImagesPreview.innerHTML = '';
  if (this.files && this.files.length > 0) {
    Array.from(this.files).forEach(file => {
      const img = document.createElement('img');
      img.classList.add('product-image', 'me-2');
      img.src = URL.createObjectURL(file);
      casualImagesPreview.appendChild(img);
    });
  }
});




productForm.addEventListener('submit', async function(e) {
  e.preventDefault();



  const formData = new FormData();

  const idField = document.getElementById('productId');
  const isEdit = idField.value !== "";

  const sizeRows = sizesContainer.querySelectorAll('.row');
  const sizes = {};
  sizeRows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    const label = inputs[0].value.trim();
    const value = inputs[1].value.trim();
    if (label && value) {
      sizes[label] = value;
    }
  });

  const specRows = specificationsContainer.querySelectorAll('.row');
  const specifications = {};
  specRows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    const label = inputs[0].value.trim();
    const value = inputs[1].value.trim();
    if (label && value) {
      specifications[label] = value;
    }
  });

  const originalPrice = parseFloat(originalPriceInput.value);
  const sellingPrice = parseFloat(sellingPriceInput.value);
  const discount = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);

  const mainImageUrl = document.getElementById('mainImage').files[0];
  if (!mainImageUrl) {
    alert("Please select a main image.");
    loader.style.display = 'none';
    return;
  }

  if (casualImagesInput.files && casualImagesInput.files.length > 0) {
    Array.from(casualImagesInput.files).forEach(file => {
      formData.append('casualImages', file);
    });
  }

  const category = document.getElementById('productCategory').value;
  const colors = colorInput.value.split(',').map(c => c.trim()).filter(c => c);

  formData.append('productId', idField.value);
  formData.append('productTitle', document.getElementById('productTitle').value);
  formData.append('productDescription', document.getElementById('productDescription').value);
  formData.append('originalPrice', originalPrice);
  formData.append('sellingPrice', sellingPrice);
  formData.append('colors', JSON.stringify(colors));
  formData.append('category', category);
  formData.append('stock', document.getElementById('productStock').value);
  formData.append('warranty', document.getElementById('productWarranty').value);
  formData.append('sizes', JSON.stringify(sizes));
  formData.append('specifications', JSON.stringify(specifications));
  formData.append('mainImage', mainImageUrl);

 
    const res = await fetch('http://localhost:3000/api/product/create', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Server error ${res.status}: ${errorMessage}`);
    }

    const result = await res.json();
    alert(result.message || "Product uploaded!");

    // Fix: Use returned product data
    const savedProduct = result.product || null;

    if (savedProduct) {
      if (isEdit) {
        const index = products.findIndex(p => p.id === savedProduct.id);
        if (index !== -1) {
          products[index] = savedProduct;
        }
      } else {
        products.push(savedProduct);
      }
    }
    renderTable();
    productModal.hide();
});

 




// Reset form function
function resetForm() {
  productForm.reset();
  document.getElementById('productId').value = "";
  sizesContainer.innerHTML = "";
  specificationsContainer.innerHTML = "";
  discountDisplay.textContent = "0% OFF";
  colorPreview.innerHTML = "";
  mainImagePreview.innerHTML = "";
  casualImagesPreview.innerHTML = "";
}

// View product details
window.viewProduct = function (id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  // Store id for edit button
  document.getElementById('viewEditBtn').dataset.id = id;
  
  // Prepare colors display
  const colorsHtml = product.colors.map(color => 
    `<span class="color-preview" style="background: ${color};"></span>`
  ).join('');
  
  // Prepare sizes display
  const sizesHtml = Object.entries(product.sizes).map(([key, value]) => 
    `<div><strong>${key}:</strong> ${value}</div>`
  ).join('');
  
  // Prepare specifications display
  const specsHtml = Object.entries(product.specifications).map(([key, value]) => 
    `<tr><td width="30%"><strong>${key}</strong></td><td>${value}</td></tr>`
  ).join('');
  
  // Prepare casual images display
  const casualImagesHtml = product.casualImages.map(img => 
    `<img src="${img}" alt="Product view" class="product-image me-2">`
  ).join('');
  
  // Calculate discount for display
  const discount = Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100);
  
  document.getElementById('viewDetails').innerHTML = `
    <div class="row">
      <div class="col-md-4 mb-3">
        <img src="${product.mainImage}" alt="${product.title}" class="img-fluid rounded">
        <div class="mt-2">
          ${casualImagesHtml}
        </div>
      </div>
      <div class="col-md-8">
        <h4>${product.title}</h4>
        <span class="badge bg-secondary">${product.id}</span>
        <span class="badge bg-primary">${product.category}</span>
        <span class="badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}">
          ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
        
        <div class="mt-3">
          <h5 class="text-danger">
            ₹${product.sellingPrice.toLocaleString('en-IN')}
            <small class="text-muted text-decoration-line-through">
              ₹${product.originalPrice.toLocaleString('en-IN')}
            </small>
            <span class="badge bg-danger">${discount}% OFF</span>
          </h5>
        </div>
        
        <div class="mt-3">
          <h6>Description:</h6>
          <p>${product.description}</p>
        </div>
        
        <div class="mt-3">
          <h6>Available Colors:</h6>
          <div>${colorsHtml}</div>
        </div>
        
        <div class="mt-3">
          <h6>Variants:</h6>
          <div>${sizesHtml}</div>
        </div>
        
        <div class="mt-3">
          <h6>Warranty: ${product.warranty}</h6>
        </div>
        
        <div class="mt-3">
          <h6>Specifications:</h6>
          <table class="table table-bordered">
            <tbody>${specsHtml}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  viewModal.show();
}

// Edit product from view modal
document.getElementById('viewEditBtn').addEventListener('click', function() {
  const id = this.dataset.id;
  viewModal.hide();
  editProduct(id);
});

window.editProduct = async (id) => {
  let product;
  try {
    const response = await fetch(`http://localhost:3000/api/product/${id}`);
    product = await response.json();
    console.log(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return;
  }

  if (!product) return;

  // Set form fields
  document.getElementById('productModalLabel').textContent = "Edit Product";
  document.getElementById('productId').value = product.id;
  document.getElementById('productTitle').value = product.productTitle;
  document.getElementById('productDescription').value = product.productDescription;
  document.getElementById('originalPrice').value = product.originalPrice;
  document.getElementById('sellingPrice').value = product.sellingPrice;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productStock').value = product.stock;
  document.getElementById('productWarranty').value = product.warranty;



  updateDiscount();
  updateColorPreview();

  // Fill Sizes
  sizesContainer.innerHTML = "";
  (product.ProductSizes || []).forEach(size => {
    const div = document.createElement("div");
    div.classList.add("row", "mb-2", "align-items-center");
    div.innerHTML = `
      <div class="col-5">
        <input type="text" class="form-control" value="${size.key}" required>
      </div>
      <div class="col-5">
        <input type="text" class="form-control" value="${size.value}" required>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-sm remove-row" style="background:rgba(255, 133, 133, 0.54); border: none;">
          <img src="./assets/icons/delete.svg"> 
        </button>
      </div>`;
    sizesContainer.appendChild(div);
    div.querySelector('.remove-row').addEventListener('click', () => div.remove());
  });

  // Fill Specifications
  specificationsContainer.innerHTML = "";
  (product.ProductSpecifications || []).forEach(spec => {
    const div = document.createElement("div");
    div.classList.add("row", "mb-2", "align-items-center");
    div.innerHTML = `
      <div class="col-5">
        <input type="text" class="form-control" value="${spec.key}" required>
      </div>
      <div class="col-5">
        <input type="text" class="form-control" value="${spec.value}" required>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-sm remove-row" style="background:rgba(255, 133, 133, 0.54); border: none;">
          <img src="./assets/icons/delete.svg"> 
        </button>
      </div>`;
    specificationsContainer.appendChild(div);
    div.querySelector('.remove-row').addEventListener('click', () => div.remove());
  });

  // Main image preview
  if (product.mainImage && mainImagePreview) {
    mainImagePreview.innerHTML = `<img src="${product.mainImage}" class="product-image">`;
  }



  // Handle Casual Images
const productImages = product.ProductImages || [];
casualImagesPreview.innerHTML = productImages
  .map(img => {
    const url = productImages.imageUrl;
    return url ? `<img src="${url}" class="product-image me-2">` : '';
  })
  .join('');



// Handle ProductColors
const productColors = product.ProductColors || [];
const colorNames = productColors
  .map(c => {
    if (typeof c === 'string') return c; // Fallback if string
    if (c.color) return c.color;
    if (c.name) return c.name;
    return null;
  })
  .filter(Boolean)
  .join(", ");
document.getElementById('productColors').value = colorNames;




  // Show modal
  productModal.show();
};


// Delete Product
window.deleteProduct  = async (id) => {

  if (confirm("Are you sure you want to delete this product?")) {
    try {
      const response = await fetch(`http://localhost:3000/api/product/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      alert(result.message);
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    renderTable();
  }
}


