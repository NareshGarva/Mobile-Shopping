document.getElementById("ProductVarientSelectorOffcanvas").innerHTML = `
  <div class="offcanvas offcanvas-end" tabindex="-1" id="variantSelector">
    <div class="offcanvas-header">
<h5 class="fw-bold">Select product variant</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div id="variantContainer"></div>
    </div>
    <div class="fixed-bottom bg-white p-3 border-top d-flex justify-content-between align-items-center shadow" style="z-index: 1055;">
  <div>
    <strong>Total: </strong><span id="offcanvasTotalPrice">₹0</span>
  </div>
  <button class="btn btn-dark px-4" id="addToCartBtn">
    Add to Cart
  </button>
</div>
  </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const product = window.vivoProducts.find(p => p.id === productId);
  if (!product) return alert("Product not found!");

  // Price
  const basePrice = product.sellingPrice || product.originalPrice || 0;
  let selectedOptions = {};

  // Parse colors
  const colorVariants = product.colors || [];

  // Parse size variants
  const sizeVariants = product.sizes || {};
  const sizeKeys = Object.keys(sizeVariants); // like RAM, Storage, Dial

  // UI Elements
  const variantContainer = document.getElementById("variantContainer");
  const totalPriceElement = document.getElementById("offcanvasTotalPrice");
  totalPriceElement.innerHTML=`₹ ${basePrice}
  `;

  function renderVariants() {
  variantContainer.innerHTML = "";

  // === Render Colors ===
  if (colorVariants.length > 0) {
    const section = document.createElement("div");
    section.classList.add("mb-3");
    section.innerHTML = `
   <h6 class="fw-bold">Color</h6>

    <div class="mb-2" id="color-options"></div>`;
    variantContainer.appendChild(section);

    const colorContainer = section.querySelector("#color-options");

    colorVariants.forEach((color, index) => {
      const divMain = document.createElement("div");
      divMain.className = "variant-option";
      
      const div = document.createElement("div");
      
      div.style.border = "2px solid #ccc";
      div.style.width = "25px";
      div.style.height = "25px";
      div.style.borderRadius = "50%";
      div.style.background = color;
      divMain.setAttribute("data-type", "Color");
      divMain.setAttribute("data-value", color);

      divMain.addEventListener("click", () => {
        selectedOptions["Color"] = color;
        document.querySelectorAll('[data-type="Color"]').forEach(el => el.classList.remove("selected"));
        divMain.classList.add("selected");
      });

      if (index === 0) {
        selectedOptions["Color"] = color;
        divMain.classList.add("selected");
      }
colorContainer.appendChild(divMain);
      divMain.appendChild(div);
    });
  }

  // === Render Sizes ===
  sizeKeys.forEach(key => {
    const values = sizeVariants[key];
    if (!values || values.length === 0) return;

    const section = document.createElement("div");
    section.classList.add("mb-3");
    section.innerHTML = `        <h6 class="fw-bold">${key}</h6>
        <div class="mb-2" id="${key}-options"></div>`;
    variantContainer.appendChild(section);

    const container = section.querySelector(`#${key}-options`);

    const valueArray = Array.isArray(values) ? values : [values];

    valueArray.forEach((value, index) => {
      const div = document.createElement("div");
      div.className = "variant-option";
      div.textContent = value;
      div.setAttribute("data-type", key);
      div.setAttribute("data-value", value);

      div.addEventListener("click", () => {
        selectedOptions[key] = value;
        document.querySelectorAll(`[data-type="${key}"]`).forEach(el => el.classList.remove("selected"));
        div.classList.add("selected");
        
      });

      if (index === 0) {
        selectedOptions[key] = value;
        div.classList.add("selected");
      }

      container.appendChild(div);
    });
  });
}


document.getElementById("addToCartBtn").addEventListener("click", () => {


  // You can also store in localStorage or call your cart API here
  alert("Added to cart!");
});
  renderVariants();
  
});




