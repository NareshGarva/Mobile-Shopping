document.getElementById("userFaqSection").innerHTML=`
<section class="container my-5">
        <div class="User-section-title d-flex justify-content-between align-items-center">
  <h5>Frequently Asked <strong class="User-section-title-strong">Questions</strong></h5>
</div>
  
  <div class="accordion" id="faqAccordion">
    
    <!-- Question 1 -->
    <div class="accordion-item">
      <h2 class="accordion-header" id="faqHeading1">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1" aria-expanded="true">
          How can I place an order on MobiKart?
        </button>
      </h2>
      <div id="faqCollapse1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          To place an order, simply browse our products, add items to your cart, proceed to checkout, and complete the payment process. You will receive an order confirmation via email.
        </div>
      </div>
    </div>

    <!-- Question 2 -->
    <div class="accordion-item">
      <h2 class="accordion-header" id="faqHeading2">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2">
          What payment methods do you accept?
        </button>
      </h2>
      <div id="faqCollapse2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          We accept credit/debit cards, UPI, net banking, and digital wallets such as Paytm, Google Pay, and PhonePe.
        </div>
      </div>
    </div>

    <!-- Question 3 -->
    <div class="accordion-item">
      <h2 class="accordion-header" id="faqHeading3">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse3">
          How can I track my order?
        </button>
      </h2>
      <div id="faqCollapse3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Once your order is shipped, you will receive a tracking link via email or SMS. You can also track your order from your account dashboard.
        </div>
      </div>
    </div>

    <!-- Question 4 -->
    <div class="accordion-item">
      <h2 class="accordion-header" id="faqHeading4">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse4">
          What is your return policy?
        </button>
      </h2>
      <div id="faqCollapse4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          We offer a 7-day return policy for most products. The item must be unused, in its original packaging, and include all accessories.
        </div>
      </div>
    </div>

    <!-- Question 5 -->
    <div class="accordion-item">
      <h2 class="accordion-header" id="faqHeading5">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse5">
          Do you offer cash on delivery (COD)?
        </button>
      </h2>
      <div id="faqCollapse5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Yes, we offer COD in select locations. Availability will be shown at checkout.
        </div>
      </div>
    </div>

  </div>
</section>
`;