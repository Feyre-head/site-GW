async function createPricingCards() {
  let apiDat = [];
  try {
    const response = await fetch("http://172.16.20.238:3000/planos");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    apiData = await response.json();
  } catch (error) {
    console.error("ocorreu um erro ao tentar recuperar o plano", error);
    return;
  }

  const containerRow1 = document.querySelector(
    "#lqd-tab-pricing-monthly .row.m-0 > .col-12:nth-child(1)"
  );
  const containerRow2 = document.querySelector(
    "#lqd-tab-pricing-monthly .row.m-0 > .col-12:nth-child(2)"
  );

  if (!containerRow1 || !containerRow2) {
    console.error(
      "Could not find the target container elements for the pricing cards."
    );
    return;
  }

  // Clear existing content if any (useful if calling this function multiple times)
  containerRow1.innerHTML = "";
  containerRow2.innerHTML = "";

  apiData.forEach((plan, index) => {
    const cardHtml = `
            <div class="co-12 col-md-4 p-0">
              <div class="module-section mx-20 flex flex-wrap bg-white rounded-10 border-0 border-gray-100 shadow-sm transition-all">
                <div class="w-full flex flex-col items-center border-bottom border-gray-100 transition-all pt-15 pb-5 px-35">
                  <div class="mb-20 ld-fancy-heading relative">
                    <p class="font-title text-16 font-bold leading-1 tracking-0 -mb-1em text-amber-600 ld-fh-element inline-block relative">
                      ${plan.type}
                    </p>
                  </div>
                  <div class="ld-fancy-heading relative">
                    <h3 class="font-title text-46 font-bold mb-20 ld-fh-element inline-block relative">
                      ${plan.speed}
                    </h3>
                  </div>
                </div>
                <div class="module-section-bottom w-full flex flex-col py-30 px-55 items-center text-center">
                  <div class="w-full mb-20 -mt-5 iconbox flex flex-grow-1 relative flex-wrap items-center iconbox-circle">
                    <div class="iconbox-icon-wrap mr-15">
                      <div class="iconbox-icon-container inline-flex relative z-1 rounded-full w-25 h-25 text-14 text-amber-600 bg-amber-100">
                        <i aria-hidden="true" class="lqd-icn-ess icon-ion-ios-checkmark"></i>
                      </div>
                    </div>
                    <h3 class="text-14 font-normal m-0 text-secondary lqd-iconbox-heading">
                      ${plan.download}
                    </h3>
                  </div>
                  <div class="w-full mb-20 -mt-5 iconbox flex flex-grow-1 relative flex-wrap items-center iconbox-circle">
                    <div class="iconbox-icon-wrap mr-15">
                      <div class="iconbox-icon-container inline-flex relative z-1 rounded-full w-25 h-25 text-14 text-amber-600 bg-amber-100">
                        <i aria-hidden="true" class="lqd-icn-ess icon-ion-ios-checkmark"></i>
                      </div>
                    </div>
                    <h3 class="text-14 font-normal m-0 text-secondary lqd-iconbox-heading">
                      ${plan.upload}
                    </h3>
                  </div>
                  <div class="w-full mb-20 -mt-5 iconbox flex flex-grow-1 relative flex-wrap items-center iconbox-circle">
                    <div class="iconbox-icon-wrap mr-15">
                      <div class="iconbox-icon-container inline-flex relative z-1 rounded-full w-25 h-25 text-14 text-amber-600 bg-amber-100">
                        <i aria-hidden="true" class="lqd-icn-ess icon-ion-ios-checkmark"></i>
                      </div>
                    </div>
                    <h3 class="text-14 font-normal m-0 text-secondary lqd-iconbox-heading">
                      ${plan.adhesionFee}
                    </h3>
                  </div>
                  <a href="${plan.whatsappLink}"
                     class="btn btn-solid btn-sm btn-block btn-icon-right btn-hover-reveal module-btn-1 text-15 mt-15 rounded-6 font-medium leading-2em bg-red-100 text-amber-600"
                     target="_blank" rel="nofollow">
                    <span class="btn-txt" data-text="Join Simple Plan">Contratar
                    </span>
                    <span class="btn-icon">
                      <i aria-hidden="true"
                          class="lqd-icn-ess icon-md-arrow-forward"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          `;

    // Append to the correct row based on index
    if (index < 3) {
      // First three cards go to the first row
      containerRow1.insertAdjacentHTML("beforeend", cardHtml);
    } else {
      // Remaining cards go to the second row
      containerRow2.insertAdjacentHTML("beforeend", cardHtml);
    }
  });
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", createPricingCards);
