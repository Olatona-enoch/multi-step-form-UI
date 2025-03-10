let currentStep = 1;
const steps = document.querySelectorAll(".step");
const StepIndicators = document.querySelectorAll(".step-indicator"); 
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("previousBtn");
const buttonGrid = document.getElementById("button-grid");


const prices = {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 },
    addOnlineService: { monthly: 1, yearly: 10 },
    addLargerStorage: { monthly: 2, yearly: 20 },
    addCustomProfile: { monthly: 2, yearly: 20 }
};

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }else{
            event.preventDefault();
            nextStep();
            
        }
  
        form.classList.add('was-validated')
       
      }, false)
    })
})()

function nextStep() {
    if (currentStep < steps.length) {
        currentStep++; // Move to the next step
        showStep();
        updateSummary();
    } 
    if (currentStep === 4) {
        nextBtn.innerHTML = "Submit";
        nextBtn.addEventListener("click", showConfirmation);
    }


}

function prevStep() {
    if (currentStep > 1) {
        currentStep--; // Move to the previous step
        showStep();
    }
}
// nextBtn.addEventListener("click", (event) => {
//     event.preventDefault();
//     nextStep();
// });
prevBtn.addEventListener("click", (event) => {
    event.preventDefault();
    prevStep();

});

function showStep() {
    nextBtn.innerHTML = "Next Step";
    nextBtn.removeEventListener("click", showConfirmation);

    steps.forEach((s, index) => {
        s.classList.toggle("active", index + 1=== currentStep);
    });

    StepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index + 1 === currentStep);
    });

    if(currentStep > 1){
        buttonGrid.classList.remove("justify-content-end");
        buttonGrid.classList.add("justify-content-between");
    
        prevBtn.style.display = "block";
    }else{
        prevBtn.style.display = "none";
        buttonGrid.classList.add("justify-content-end");
        buttonGrid.classList.remove("justify-content-between");
    
    }   
}

const optionCards = document.querySelectorAll(".optionCard");
optionCards.forEach(card => {
    card.addEventListener("click",function () {
        optionCards.forEach(card => card.classList.remove("selected"));
        card.classList.toggle("selected");
    })
});

const arcadePackage = document.getElementById("arcadePackage");
const advancedPackage = document.getElementById("advancedPackage");
const proPackage = document.getElementById("proPackage");

//Add Ons
const addOnlineService = document.getElementById("addOnlineService");
const addLargerStorage = document.getElementById("addLargerStorage");
const addCustomProfile = document.getElementById("addCustomProfile");

function addSpan(name) {
    const span = document.createElement("span");
    span.classList.add("custom-darkblue", "small", "mt-0");
    span.innerHTML = "2 months free";
    name.appendChild(span);

}

function removeSpan(name) {
    const existingSpan = name.querySelector("span"); // Find the span
    if (existingSpan) {
        name.removeChild(existingSpan); // Remove it if it exists
    }
}
let periodicity = "Monthly";
const customSwitch = document.querySelector(".custom-switch");
customSwitch.addEventListener("change",function () {
    if (this.checked) {
        periodicity = "Yearly";
        arcadePackage.querySelector("p").innerHTML = `$${prices.arcade["yearly"]}/yr`;
        addSpan(arcadePackage);

        advancedPackage.querySelector("p").innerHTML = `$${prices.advanced["yearly"]}/yr`;
        addSpan(advancedPackage);

        proPackage.querySelector("p").innerHTML = `$${prices.pro["yearly"]}/yr`;
        addSpan(proPackage);

        // Update add-ons prices
        addOnlineService.innerHTML = `+$${prices.addOnlineService["yearly"]}/yr`;
        addLargerStorage.innerHTML = `+$${prices.addLargerStorage["yearly"]}/yr`;
        addCustomProfile.innerHTML = `+$${prices.addCustomProfile["yearly"]}/yr`;

    }else {
        periodicity = "Monthly";
        arcadePackage.querySelector("p").innerHTML = `$${prices.arcade["monthly"]}/mo`;
        removeSpan(arcadePackage);
        advancedPackage.querySelector("p").innerHTML = `$${prices.advanced["monthly"]}/mo`;
        removeSpan(advancedPackage);
        proPackage.querySelector("p").innerHTML = `$${prices.pro["monthly"]}/mo`;
        removeSpan(proPackage);

        // Update add-ons prices
        addOnlineService.innerHTML = `+$${prices.addOnlineService["monthly"]}/mo`;
        addLargerStorage.innerHTML = `+$${prices.addLargerStorage["monthly"]}/mo`;
        addCustomProfile.innerHTML = `+$${prices.addCustomProfile["monthly"]}/mo`;


    }
})

function getSelectedPlan() {
    let selectedPlan = document.querySelector(".optionCard.selected");
    if (!selectedPlan) return null; // If no plan is selected, return null

    let planName = selectedPlan.querySelector("h5").textContent.trim(); // Get the plan name
    let planPrice = selectedPlan.querySelector("p").textContent.trim(); // Get the price
    return { planName, planPrice };
}

function getSelectedAddOns() {
    let selectedAddOns = [];
    let checkboxes = document.querySelectorAll(".custom-checkbox:checked");

    checkboxes.forEach(checkbox => {
        let addOnName = checkbox.parentElement.querySelector(".addOnName").textContent.trim();
        let addOnPrice = checkbox.parentElement.parentElement.querySelector(".Add-onsPrice").textContent.trim();
        selectedAddOns.push({ addOnName, addOnPrice });

    });

    return selectedAddOns;
}

const checkboxes = document.querySelectorAll(".custom-checkbox");
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
       let inputGroupText = checkbox.parentElement.parentElement;

        if (checkbox.checked) {
            inputGroupText.classList.add("picked"); // Apply the custom class
        } else {
            inputGroupText.classList.remove("picked"); // Remove the custom class
        }
    });
});


function updateSummary() {
    let selectedPlan = getSelectedPlan();
    let selectedAddOns = getSelectedAddOns();

    let packageSummary = document.getElementById("packageSummary");
    const customUl = document.querySelector(".custom-ul");
    let totalperiod = document.getElementById("totalperiod")
    let totalprice = document.getElementById("totalprice");

    packageSummary.querySelector("h1").innerHTML = `${selectedPlan.planName}(${periodicity})`;
    packageSummary.querySelector("#packagePrice").innerHTML = `${selectedPlan.planPrice}`;

    const addOnItems = customUl.querySelectorAll("li:not(:first-child)"); 
    addOnItems.forEach(item => item.remove()); 

    let finalprice = parseFloat(selectedPlan.planPrice.replace(/[^0-9.]/g, "")); // Extract price

    
    if (selectedAddOns) {
        selectedAddOns.forEach(addOn => {
            const newli = document.createElement("li");
            newli.classList.add("d-flex", "justify-content-between", "align-items-center", "py-2");
            newli.innerHTML =`
                <div class="custom-gray custom-small">${addOn.addOnName}</div>
                <div class="custom-darkblue custom-small">${addOn.addOnPrice}</div>
            `;
            customUl.appendChild(newli);

            finalprice += parseFloat(addOn.addOnPrice.replace(/[^0-9.]/g, ""));
    
        });    

    }
    if (periodicity == "Yearly") {
        totalperiod.innerHTML= `(per year)`;
        totalprice.innerHTML= `+$${finalprice}/yr`;
    }else{
        totalperiod.innerHTML= `(per month)`;
        totalprice.innerHTML= `+$${finalprice}/mo`;

    }

}
const changeLink = document.getElementById("changeLink");
changeLink.addEventListener("click",function changePackage(event){
        currentStep =2;
        event.preventDefault();
        showStep();
    }
)

function showConfirmation(event) {
    // const stepFour = document.getElementById("step-4");
    // stepFour.innerHTML = `
    // <div class="d-flex align-items-center justify-content-center">
    //         <div class="spinner-grow text-primary" role="status">
    //             <span class="visually-hidden">Loading...</span>
    //         </div>
    // </div>
    // `;
    // console.log('Timeout executed after 3 seconds');
    event.preventDefault();
    if (currentStep = 5) {
        // Hide all steps
        steps.forEach(step => step.classList.remove("active"));
        steps.forEach((s, index) => {
            s.classList.toggle("active", index + 1=== currentStep);
        });


        // Optionally, hide the navigation buttons
        nextBtn.style.display = "none";
        prevBtn.style.display = "none";
        

        // Find and show the confirmation slide
        const confirmationSlide = document.getElementById("confirmationSlide");
        const timeoutId = setTimeout(() => {
            console.log('Timeout executed after 5 seconds');
            if (confirmationSlide) {
                confirmationSlide.classList.add("active");
                confirmationSlide.innerHTML=`
                <img src="assets/images/icon-thank-you.svg" alt="" class="p-2" style="width: 25%;">
                    <h1 class="custom-darkblue fs-3 fw-bold py-2 ">Thank you!</h1>
                    <p class="lead custom-gray">Thanks for confirming Your subscription! we hope you have
                    fun using our platform. if you ever need support, please feel
                    free to email us at support@loremgaming.com
                </p>
                `;
            }
    
        }, 3000);


    }
    
}



