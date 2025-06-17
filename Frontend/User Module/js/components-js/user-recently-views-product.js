
import {displayProductCard} from "../global-product.js";


document.getElementById("userRecentlyViwedProduct").innerHTML = `
  <section class="container my-5">
    <div class="User-section-title d-flex justify-content-between align-items-center">
      <h5>Recently Viewed <strong class="User-section-title-strong">Products</strong></h5>
    </div>
    
<div id="recentlyViewProductContainer"></div>
  </section>
`;

async function renderRecentlyViewed() {
  try {
    const productsData = await fetch(`http://localhost:3000/api/recently-viewed/get-by-user/${localStorage.getItem('user-access-id')}`, {
      method: 'GET'
    });

    const recentViewed = await productsData.json();

    // Extract only the Product from each object
    const onlyProducts = recentViewed.map(item => item.Product);
    // Now pass this to your display function
    displayProductCard("recentlyViewProductContainer", onlyProducts, "1", "swiper");
  } catch (error) {
    console.log("Error in fetching products", error);
    // alert("Internal server error");
  }
}

    
renderRecentlyViewed();