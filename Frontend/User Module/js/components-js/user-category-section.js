document.getElementById("userCategorySection").innerHTML = `
<section>
    <div class="container category-section">

        <div class="User-section-title d-flex justify-content-between align-items-center">
  <h5>Explore Our <strong class="User-section-title-strong">Categories</strong></h5>
</div>
        <div class="row row-cols-1 row-cols-md-2 g-4 category-row">

            <!-- Category 1 -->
            <div class="col category-col">
                <div class="category-card" style="background-image: url('../assets/images/mobile.jpg');">
                    Mobile Phones
                </div>
            </div>

            <!-- Category 2 -->
            <div class="col category-col">
                <div class="category-card" style="background-image: url('../assets/images/laptop.jpg');">
                    Laptops
                </div>
            </div>

            <!-- Category 3 -->
            <div class="col category-col">
                <div class="category-card" style="background-image: url('../assets/images/Accessories.jpg');">
                    Accessories
                </div>
            </div>

            <!-- Category 4 -->
            <div class="col category-col">
                <div class="category-card" style="background-image: url('../assets/images/smartwatch.jpg');">
                    Smartwatches
                </div>
            </div>

        </div>
    </div>
    </section>
`;