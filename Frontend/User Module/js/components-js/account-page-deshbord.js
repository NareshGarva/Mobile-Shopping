document.getElementById("accountPageDashboard").innerHTML=`
    <div >
      <div class="py-4 px-1">
        <!-- Profile Section -->
        <div class="mb-5">
          <h2 class="fw-bold text-xl mb-4">
            Welcome <span class="fw-normal fst-italic" id="user-Name">Naresh</span>
          </h2>
          <div class="d-md-flex align-items-center justify-content-left gap-5">
            <div id="contact-info">
              <p class="text-secondary">Contact Information</p>
              <p id="email-display">john.doe@example.com</p>
              <p id="phone-display">+91 8382894622</p>
              
              <button id="edit-contact-btn" class="mt-3 mb-4 px-4 py-1 border btn-custom-hover rounded-main">
                Edit your Profile
              </button>
            </div>
            
            
            <div>
              <p class="text-secondary">Default Shipping Address</p>
              <div id="deshbordDefaultAddress"></div>
            </div>
          </div>
        </div>
        
        <!-- Recent Orders Section -->
        <div class="mb-5">
          <h3 class="text-xl fw-bold mb-3">Recent Orders</h3>
          
          <div id="lastThreeOrdersSection" class="row gap-1"></div>
          
        </div>
        
        <!-- Recommended Products -->
        <div>
          <h3 class="text-xl fw-bold mb-4">Recommended For You</h3>
<div id="accountPageRecommendProduct"></div>
        </div>
      </div>
    </div>
`;



const contactInfoDiv = document.getElementById("contact-info");
    const emailDisplay = document.getElementById("email-display");
    const nameDisplay = document.getElementById("user-Name");
    const phoneDisplay = document.getElementById("phone-display");
    const editBtn = document.getElementById("edit-contact-btn");
    
    let contactInfo = {
      name: "User Name",
      email: "john.doe@example.com",
      phone: "+91 8382894622",
    };
    
    editBtn.addEventListener("click", function() {
      if (editBtn.innerText === "Edit your Profile") {
        // Switch to input mode
        nameDisplay.innerHTML = `<input type="text" id="name-input" class="form-control form-control-sm mb-2" value="${contactInfo.name}"  />`;
        emailDisplay.innerHTML = `<input type="email" id="email-input" class="form-control form-control-sm mb-2" value="${contactInfo.email}"  />`;
        phoneDisplay.innerHTML = `<input type="tel" id="phone-input" class="form-control form-control-sm mb-2" value="${contactInfo.phone}" pattern="[0-9+\\s-]+"  />`;
        
        editBtn.innerText = "Save";
      } else {
        // Save the updated values
        const newName = document.getElementById("name-input").value;
        const newEmail = document.getElementById("email-input").value;
        const newPhone = document.getElementById("phone-input").value;
        
        // You can add basic validation here
        if (newEmail && newPhone && newName) {
          contactInfo.name = newName;
          contactInfo.email = newEmail;
          contactInfo.phone = newPhone;
          
          nameDisplay.innerText = contactInfo.name;
          emailDisplay.innerText = contactInfo.email;
          phoneDisplay.innerText = contactInfo.phone;
          editBtn.innerText = "Edit your Profile";
        } else {
          alert("Please fill out valid name,email and phone.");
        }
      }
    });
    
    
    
    
    
    
    
    