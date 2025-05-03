import vivoProducts from "../products.js";
import productReviews from "../review.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const reviewsArray = productReviews.find(p => p.productId == productId);

  const reviewContainer = document.getElementById("userProductPageReviewSection");

  if (!reviewsArray || !reviewsArray.reviews || reviewsArray.reviews.length === 0) {
    reviewContainer.innerHTML = `<p class="text-danger">No product reviews found!</p>`;
    return;
  }

  const reviews = reviewsArray.reviews;

  // Calculate stats
  const averageRating = calculateAverageRating(reviews);
  const totalReviews = reviews.length;
  const ratingDistribution = getRatingDistribution(reviews);

  // Generate the rating progress bars
  const ratingBars = ratingDistribution.map((item, index) => `
    <div class="d-flex align-items-center">
      <span>${5 - index} ★</span>
      <div class="progress flex-grow-1 mx-2" style="height: 8px;">
        <div class="progress-bar bg-warning" style="width: ${item.percent}%"></div>
      </div>
      <span>${item.percent}%</span>
    </div>
  `).join("");

  // Generate each review card
  const reviewCards = reviews.map(r => `
    <div class="col-md-6 col-lg-4 mb-3">
      <div class="RVCard">
        <div class="d-flex justify-content-between">
          <h6 class="RVUserName">${r.name}</h6>
          <span class="RVDate">${r.date}</span>
        </div>
        <div class="star-rating" data-rating="${r.rating}"></div>
        <p>${r.comment}</p>
      </div>
    </div>
  `).join("");


  // Final HTML
  reviewContainer.innerHTML = `
    <div class="gap-2 justify-content-between container py-3 userProductPageReviewSectionInner">
      <div class="ReviewSection">
        <div class="row mt-3">
          <div class="col-md-6 col-lg-4 mb-3">
            <div class="review-or-img mt-3">
              <div class="Avgcard p-4 shadow-sm">
                <h2 class="text-center">
                  ${averageRating}
                  <span class="text-warning">
                    <div class="star-rating" data-rating="${averageRating}"></div>
                  </span>
                </h2>
                <p class="text-center text-muted">Based on ${totalReviews} reviews</p>
                ${ratingBars}
                <a class="RVwriteReviewBtn w-100 mt-3 d-flex align-items-center justify-content-center gap-3" id="writeReviewBtn" href="#">Write a Review</a>

              </div>

            </div>
          </div>
          ${reviewCards}
        </div>
      </div>
    </div>
  `;

    const reviewBtn = document.getElementById('writeReviewBtn');
    reviewBtn.addEventListener('click', function () {
if (reviewBtn && productId) {
    reviewBtn.href = `../pages/post review.html?id=${productId}`;
  }
    }
    );
});




    
  
  
    
// Average rating calculator
function calculateAverageRating(reviews) {
  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (total / reviews.length).toFixed(1);
}

// Rating distribution
function getRatingDistribution(reviews) {
  const dist = [0, 0, 0, 0, 0]; // Index 0 = 5★, Index 4 = 1★
  reviews.forEach(r => {
    dist[5 - r.rating]++;
  });
  const total = reviews.length;
  return dist.map(count => ({
    count,
    percent: ((count / total) * 100).toFixed(0)
  }));
}