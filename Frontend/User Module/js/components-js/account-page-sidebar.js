document.getElementById("accountPageHeader").innerHTML=`
  <header class="px-3 py-2 border-bottom sticky-top bg-white">
    <button id="mobilemenutogal" class="d-md-none" type="button">
      <img src="../assets/icons/menu-open.svg" alt="Open Menu" />
    </button>
    <a class="d-none d-md-flex align-items-center gap-2 logolink" href="../pages/index.html">
    
      <img src="../assets/images/favicon.svg" alt="" style="width: 35px; height: 35px" />
      <span class="fs-6 fw-bold">Mobile Shopping</span>
    </a>
    
  </header>
  
  <!-- Sidebar -->
  <div id="siderbaroffcanvas" class="sidebarOffcanvas d-md-block">
    <div class="d-flex d-md-none align-items-center justify-content-between border-bottom px-2">
      <a class="d-flex align-items-center gap-2 logolink" href="../pages/index.html">
        <img src="../assets/images/favicon.svg" alt="" style="width: 35px; height: 35px" />
        <span class="fs-6 fw-bold">Mobile Shopping</span>
      </a>
      <button id="closeSidebar" class="close-btn d-md-none">
        <img class="" src="../assets/icons/menu-close.svg" alt="" />
      </button>
    </div>
    <div class="sidebar-offcanvas-body">
      <ul class="nav flex-column py-3">
        <li class="nav-item">
          <a class="nav-link active" href="#dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
              <path d="M9 22V12h6v10" />
            </svg>
            <span>Dashboard</span></a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="#order">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-open-icon lucide-package-open">
              <path d="M12 22v-9" />
              <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
              <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
              <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
            </svg>
            <span>Order</span></a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="#address"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-house-icon lucide-map-pin-house">
              <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
              <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
              <path d="M18 22v-3" />
              <circle cx="10" cy="10" r="3" />
            </svg>
            <span>Address</span></a>
        </li>
        
        <li class="nav-item border-bottom mt-4"></li>
        <li class="nav-item mt-3 border border-danger-subtle rounded-main" onclick="logout()">
          <a class="nav-link fw-bold text-danger justify-content-between" href="#logout"><span>Log Out </span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg></a>
        </li>
      </ul>
    </div>
  </div>
`;

function logout() {
  localStorage.removeItem("token"); // Remove JWT token
  window.location.href = "/Frontend/User%20Module/pages/Authentication.html"; // Redirect to login page
}


const sidebar = document.getElementById("siderbaroffcanvas");
    const openBtn = document.getElementById("mobilemenutogal");
    const closeBtn = document.getElementById("closeSidebar");
    const sidebarLinks = document.querySelectorAll(
      ".sidebarOffcanvas .nav-link"
    );
    const contentSections = {
      dashboard: document.getElementById("dashboard"),
      order: document.getElementById("order"),
      address: document.getElementById("address"),
      logout: document.getElementById("logout"),
    };
    
    openBtn.addEventListener("click", () => {
      sidebar.classList.add("show");
    });
    
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
    
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        sidebarLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
        
        const targetId = this.getAttribute("href").substring(1);
        
        Object.keys(contentSections).forEach((id) => {
          contentSections[id].classList.add("d-none");
        });
        contentSections[targetId]?.classList.remove("d-none");
        
        if (window.innerWidth < 768) {
          sidebar.classList.remove("show");
        }
      });
    });
    