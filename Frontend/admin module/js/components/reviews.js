document.getElementById("adminReview").innerHTML = `
<div class="container-fluid">
  <div class="">
    <h5 class="mb-4">Review Manager</h5>
  </div>

  <table class="table table-bordered table-hover text-center align-middle rounded">
    <thead class="table-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Rating</th>
        <th scope="col">Message</th>
        <th scope="col">Date</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody id="reviewsTableBody">
      <!-- Reviews rows will be dynamically inserted here -->
    </tbody>
  </table>
  
  `;

  let Reviews;

  async function allReviews() {
    try {
      const res = await fetch('http://localhost:3000/api/review/all');
      if (!res.ok) {
        alert("Review fetch failed");
        return [];
      }
      Reviews = await res.json();
      return Reviews;
    } catch (error) {
      alert("Error fetching reviews");
      return [];
    }
  }
  

  

  
  document.addEventListener("DOMContentLoaded", async function () {
     await allReviews();
   
    function randerReviewTable()
    {
        document.getElementById("reviewsTableBody").innerHTML = Reviews.map(reviews => `
            <tr>
            <td>${reviews.name}</td>
            <td>${reviews.rating}</td>
            <td>${reviews.comment}</td>
            <td>${reviews.date}</td>
            <td>
            <button class="btn btn-danger btn-sm" onclick="deleteReview(${reviews.reviewId})">Delete</button>
            </td>
            `).join('');
    }
randerReviewTable();


window.deleteReview = async function (id) {
  try {
    const res = await fetch(`http://localhost:3000/api/review/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorData = await res.json(); // Get the error message from the response
      return alert(errorData.message);
    }
    randerReviewTable(); // Make sure this is the correct function name
    return alert("Review deleted successfully");
  } catch (error) {
    console.log("error comes in catch block");
    console.error("Error:", error.message);
    alert("Error deleting review");
  }
};

});


