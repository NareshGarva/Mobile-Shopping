// importing the products array from another fiel 
import vivoProducts from "../products.js";
import {getRecentlyViewedProducts,displayProductCard} from "../global-product.js";


document.getElementById("userRecentlyViwedProduct").innerHTML = `
  <section class="container my-5">
    <div class="User-section-title d-flex justify-content-between align-items-center">
      <h5>Recently Viewed <strong class="User-section-title-strong">Products</strong></h5>
    </div>
    
<div id="recentlyViewProductContainer"></div>
  </section>
`;

function renderRecentlyViewed() {
      const recentViewed = getRecentlyViewedProducts(vivoProducts,10);
      displayProductCard("recentlyViewProductContainer",recentViewed,"1", "swiper");
    }
    
renderRecentlyViewed();