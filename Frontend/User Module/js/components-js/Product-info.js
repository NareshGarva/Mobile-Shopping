document.getElementById("userProductPageInfo").innerHTML = `
 <div class="product-page container py-3">
      <!-- Image Slider -->
      <div class="product-images">
        <div id="carouselExample" class="carousel slide main-carousel" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://picsum.photos/250?random=1" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=2" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=3" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=2" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=3" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=2" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=3" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=2" alt="Product Image" />
            </div>
            <div class="carousel-item">
              <img src="https://picsum.photos/250?random=3" alt="Product Image" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                  <img src="../assets/icons/leftarrow.svg" alt="" />
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <img src="../assets/icons/rightarrow.svg" alt="" />
          </button>
        </div>

        <!-- Thumbnail Slider -->
        <div class="d-flex overflow-auto mt-2 thumbnail-slider">
          <img src="https://picsum.photos/250?random=1" class="active" onclick="changeSlide(0)" />
          <img src="https://picsum.photos/250?random=2" onclick="changeSlide(1)" />
          <img src="https://picsum.photos/250?random=3" onclick="changeSlide(2)" />
          <img src="https://picsum.photos/250?random=2" onclick="changeSlide(3)" />
          <img src="https://picsum.photos/250?random=3" onclick="changeSlide(4)" />
          <img src="https://picsum.photos/250?random=2" onclick="changeSlide(5)" />
          <img src="https://picsum.photos/250?random=3" onclick="changeSlide(6)" />
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <h2 class="product-title">${productTitle}</h2>
          <div class="star-rating" id="podutStarRating">${renderStars(productRating)}</div>
 <p class="ProductDefaultVarientDisplay">
 <span style="display:block;color:#000">Selected Specifications:</span>
          <span id="selectedColor">Gold</span> /
          <span id="selectedRam">8GB</span> /
          <span id="selectedStorage">256GB SSD</span>
        </p>
        <p id="productDiscription"></p>
        <p class="price">
          <span class="sellingPrice" ></span> <span class="original-price originalPrice"></span> (<span id="productDiscountPersentage" class="product-dicount"></span>)
        </p>
        <button class="chooseVarient d-flex align-items-center justify-content-between"
           data-bs-toggle="offcanvas"
        data-bs-target="#variantSelector"><span>Choose Variants</span><img src="../assets/icons/rightarrow.svg" alt="" /></button>

        <!-- Action Buttons -->
        <div class="mt-3 d-flex gap-2 align-items-center justify-content-between">
          <div class="counter d-flex align-items-center justify-content-between">
            <button class="decrease">-</button>
            <input type="tel" class="count-input" value="1" min="0">
            <button class="increase">+</button>
          </div>


          <button class="product-buy-now-btn d-flex align-items-center justify-content-center gap-2">                  <img src="../assets/icons/shield.svg" alt="" /><span>Buy Now</span></button>
          <button class="product-cart-btn onclick="addProductToCart(product, {
  RAM: "12GB",
  Storage: "256GB",
  Processor: "Snapdragon 870"
}, "#FFA500"); "><img src="../assets/icons/PCart.svg" alt="" /></button>
        </div>



        <hr class="ProductPageHr">



        <!-- Product Details Section -->
         <div class="accordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Specifications
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
              <div class="accordion-body" id="specifications-list">

              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Warranty
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
              <div class="accordion-body" id="warranty-details">

              </div>
            </div>
          </div>
   
        </div>
      </div>
    </div>
`;
  