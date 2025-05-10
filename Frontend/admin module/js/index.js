document.getElementById("accountPageHeader").innerHTML = `
  <header class="px-3 py-2 border-bottom sticky-top bg-white">
    <button id="mobilemenutogal" class="d-md-none" type="button">
      <img src="./assets/icons/menu-open.svg" alt="Open Menu" />
    </button>
    <a class="d-none d-md-flex align-items-center gap-2 logolink" href="../pages/index.html">
    
      <img src="./assets/images/favicon.svg" alt="" style="width: 35px; height: 35px" />
      <span class="fs-6 fw-bold">Admin Module</span>
    </a>
    
  </header>
  
  <!-- Sidebar -->
  <div id="siderbaroffcanvas" class="sidebarOffcanvas d-md-block">
    <div class="d-flex d-md-none align-items-center justify-content-between border-bottom px-2">
      <a class="d-flex align-items-center gap-2 logolink" href="../pages/index.html">
        <img src="./assets/images/favicon.svg" alt="" style="width: 35px; height: 35px" />
        <span class="fs-6 fw-bold">Mobile Shopping</span>
      </a>
      <button id="closeSidebar" class="close-btn d-md-none">
        <img class="" src="./assets/icons/menu-close.svg" alt="" />
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
          <a class="nav-link" href="#Orders">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-open-icon lucide-package-open">
              <path d="M12 22v-9" />
              <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
              <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
              <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
            </svg>
            <span>Orders</span></a>
        </li>
        
        <li class="nav-item">
          <a class="nav-link" href="#Products"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scan-line-icon lucide-scan-line"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>
            <span>Products</span></a>
        </li>
        
         <li class="nav-item">
          <a class="nav-link" href="#Categories"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-filter-icon lucide-list-filter"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
            <span>Categories</span></a>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="#Reviews"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
            <span>Reviews</span></a>
        </li>
         <li class="nav-item">
          <a class="nav-link" href="#Coupons"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tags-icon lucide-tags"><path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="6.5" cy="9.5" r=".5" fill="currentColor"/></svg>
            <span>Coupons</span></a>
        </li> <li class="nav-item">
          <a class="nav-link" href="#Customers"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Customers</span></a>
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
  localStorage.removeItem("admin-access-token"); // Remove JWT token
  localStorage.removeItem("admin-access-id"); // Remove  access id
  localStorage.removeItem("admin-session-expiry-time"); // Remove expiry time
  window.location.href = "/Frontend/admin%20module/login.html"; // Redirect to login page
}


const sidebar = document.getElementById("siderbaroffcanvas");
const openBtn = document.getElementById("mobilemenutogal");
const closeBtn = document.getElementById("closeSidebar");
const sidebarLinks = document.querySelectorAll(
  ".sidebarOffcanvas .nav-link"
);
const contentSections = {
  dashboard: document.getElementById("dashboard"),
  Orders: document.getElementById("Orders"),
  Products: document.getElementById("Products"),
  Categories: document.getElementById("Categories"),
  Coupons: document.getElementById("Coupons"),
  Customers: document.getElementById("Customers"),
  logout: document.getElementById("logout"),
};

openBtn.addEventListener("click", () => {
  sidebar.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

sidebarLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
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
