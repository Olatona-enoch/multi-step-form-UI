let currentStep = 1;
const steps = document.querySelectorAll(".step");
const StepIndicators = document.querySelectorAll(".step-indicator"); 
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("previousBtn");

// const nextBtn = document.querySelector(`#step-${currentStep} #nextBtn`);
// const prevBtn = document.querySelector(`#step-${currentStep} #previousBtn`);


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
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--; // Move to the previous step
        showStep();
    }
}

function showStep() {
    steps.forEach((s, index) => {
        s.classList.toggle("active", index + 1=== currentStep);
    });

    StepIndicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index + 1 === currentStep);
    });

    // Dynamically select "Next" and "Back" buttons based on the current step
    const nextBtn = document.querySelector(`#step-${currentStep} #nextBtn`);
    const prevBtn = document.querySelector(`#step-${currentStep} #previousBtn`);

    if (nextBtn) {
        nextBtn.addEventListener("click", (event) => {
            event.preventDefault();
            nextStep();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", (event) => {
            event.preventDefault();
            prevStep();
        });
    }
}

showStep();



// function optionCard() {
    
// }
const optionCards = document.querySelectorAll(".optionCard");
optionCards.forEach(card => {
    card.classList.remove("selected")
    card.addEventListener("click",function () {
        optionCards.forEach(card => card.classList.remove("selected"))
        card.classList.toggle("selected");
    })
});