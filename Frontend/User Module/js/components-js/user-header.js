document.getElementById("userHeader").innerHTML=`    <header>
    <div class="container d-flex justify-content-between">
      <div class="menu-logo d-flex align-items-center justify-content-start gap-1">
        <button class="togal-button-open" data-bs-toggle="offcanvas" href="#menuoffcanvas">
          <img src="../assets/icons/menu-open.svg" alt="" />
        </button>
        <div class="logo">
          <a href="../pages/index.html"><img class="logo-img" width="50" src="../assets/images/logo.svg" alt="" /></a>
        </div>
      </div>

      <div class="mobile-icon-btn d-flex align-items-center justify-content-end gap-3">
      <a href="https://mobile-shopping-admin.project.artifyr.in/login.html">Login as admin</a>
        <img href="#searchoffcanvas" data-bs-toggle="offcanvas" src="../assets/icons/search.svg" alt="" />

        <div class="cart-item-counter" data-bs-toggle="offcanvas" href="#cartoffcanvas">
          <img src="../assets/icons/cart.svg" alt="" />
          <div class="item-number">
<span class="itemNumberCounter bdege"></span>
          </div>
        </div>


      </div>


    </div>
  </header>
  `;
