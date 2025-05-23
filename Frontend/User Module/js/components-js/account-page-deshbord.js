document.getElementById("accountPageDashboard").innerHTML=`
    <div >
      <div class="py-4 px-1">
        <!-- Profile Section -->
        <div class="mb-5">
          <h2 class="fw-bold text-xl mb-4">
            Welcome <span class="fw-normal fst-italic" id="user-Name"></span>
          </h2>
          <div class="d-md-flex align-items-center justify-content-left gap-5">
            <div id="contact-info">
              <p class="text-secondary">Contact Information</p>
              <p id="email-display"></p>
              <p id="phone-display"></p>
              
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


let userInfo =[];
let userId = null;


const contactInfoDiv = document.getElementById("contact-info");
    const emailDisplay = document.getElementById("email-display");
    const nameDisplay = document.getElementById("user-Name");
    const phoneDisplay = document.getElementById("phone-display");
    const editBtn = document.getElementById("edit-contact-btn");
    


    editBtn.addEventListener("click", async function() {
      if (editBtn.innerText === "Edit your Profile") {
        // Switch to input mode
        nameDisplay.innerHTML = `<input type="text" id="name-input" class="form-control form-control-sm mb-2" value="${userInfo.name}"  />`;
        emailDisplay.innerHTML = `<input type="email" id="email-input" class="form-control form-control-sm mb-2" value="${userInfo.email}"  />`;
        phoneDisplay.innerHTML = `<input 
  type="tel" 
  id="phone-input" 
  class="form-control form-control-sm mb-2" 
  value="${userInfo.mobile}" 
  pattern="^\d{10}$" 
  maxlength="10"
  title="Please enter exactly 10 digits"
  required
/>
`;
        
        editBtn.innerText = "Save";
      } else {
        // Save the updated values
        const newName = document.getElementById("name-input").value;
        const newEmail = document.getElementById("email-input").value;
        const newPhone = document.getElementById("phone-input").value;
        
        // You can add basic validation here
        if (newEmail && newPhone && newName) {


        try{
          const res = await fetch(`http://localhost:3000/api/auth/update-user`,
            {
              method: 'PUT',
              headers:{
                  "Content-Type": "application/json",
              },
              body:JSON.stringify({
                userId: userId,
                name: newName,
                email: newEmail,
                mobile: newPhone
              })
            }
          );

          if(!res.ok){
            return console.log("User not updated");
          }
          console.log("User updated");
      }catch(error){
        console.log("error in updateing user : ", error);
      }
          
          nameDisplay.innerText = userInfo.name;
          emailDisplay.innerText = userInfo.email;
          phoneDisplay.innerText = userInfo.phone;
          editBtn.innerText = "Edit your Profile";
        } else {
          alert("Please fill out valid name,email and phone.");
        }
      }
    });
    

    document.addEventListener("DOMContentLoaded", async function (){
       userId = localStorage.getItem('user-access-id');
      try{
          const res = await fetch(`http://localhost:3000/api/auth/get-user/${userId}`,
            {
              method: 'GET'
            }
          );

          if(!res.ok){
            console.log("User not found");
          }

          const userData = await res.json();
          userInfo = userData.user;
      
      }catch(error){
        console.log("error in loading user : ", error);
      }
        
          nameDisplay.innerText = userInfo.name;
          emailDisplay.innerText = userInfo.email;
          phoneDisplay.innerText = "+91 " + userInfo.mobile;
    });
    
    
    
    
    
    
    