document.getElementById("userNavigationMenu").innerHTML = `
  <nav>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="menuoffcanvas">
      <div class="offcanvas-header d-flex justify-content-between align-items-center">
        <h5 class="offcanvas-title">Mobile Shopping</h5>
        <button class="close-icon" type="button" data-bs-dismiss="offcanvas">
          <img src="../assets/icons/menu-close.svg" alt="Close Menu">
        </button>
      </div>
      <div class="offcanvas-body">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link product-nav-btn" href="../pages/product-list.html">Shop All</a>
          </li>
          <hr />
          <li class="nav-item">
            <a class="nav-link product-nav-btn" href="../pages/product-list.html?Category=Tablets" data-filter="new">New Arrivals</a>
          </li>
          <hr />
          <li class="nav-item" id="dropdown">
            <a class="nav-link dropdown-toggle" role="button">
              Shop by category
              <span><img src="../assets/icons/plus.svg"></span>
            </a>
            <ul class="submenu">
              <hr style="display: block">
              <li><a class="dropdown-item product-nav-btn" href="../pages/product-list.html?Category=Smartphone">Smartphones</a></li>
              <li><a class="dropdown-item product-nav-btn" href="../pages/product-list.html?Category=Smartwatche">Smartwatches</a></li>
              <li><a class="dropdown-item product-nav-btn" href="../pages/product-list.html?Category=Audio">Audio</a></li>
              <li><a class="dropdown-item product-nav-btn" href="../pages/product-list.html?Category=Accessories">Accessories</a></li>
            </ul>
          </li>
          <hr />
          <li class="nav-item">
            <a class="nav-link product-nav-btn" href="../pages/product-list.html?Category=Tablets" >Special Sell</a>
          </li>
          <hr />
          <li class="nav-item">
            <a class="nav-link" href="../pages/Contact-us.html">Contact</a>
          </li>
          <hr />
          <li class="nav-item">
            <a class="nav-link d-flex justify-content-between align-items-center" href="../pages/Authentication.html">Login <img src="../assets/icons/rightarrow.svg"></a>
          </li>
          <li class="nav-item Account-Nva d-none">
            <a class="nav-link dropdown-toggle" role="button">
              Account <img src="../assets/icons/plus.svg">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;


  // Custom Dropdown Toggle (Accordion Style)
  document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function() {
      let submenu = this.nextElementSibling;
      let icon = this.querySelector("span");

      if (submenu.classList.contains('show')) {
        submenu.classList.remove('show');
        icon.innerHTML = `
        <img src="../assets/icons/plus.svg">
        `;
      } else {
        document.querySelectorAll('.submenu').forEach(menu => menu.classList.remove('show'));
        document.querySelectorAll('.dropdown-toggle span').forEach(i => i.textContent = "+");
        submenu.classList.add('show');
        icon.innerHTML = `
        <img src="../assets/icons/minus.svg">
        `;
      }
    });
  });

