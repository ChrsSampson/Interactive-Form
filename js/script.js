// Selectors
const nameInput = document.getElementById("name");
const emailInput = document.getElementById('email');
const jobSelect = document.getElementById('title');
const otherBox = document.getElementById('other-job-role');
const colorBox = document.getElementById('color');
const designBox = document.getElementById('design');
const activiesContainer = document.getElementById('activities');
const activitiesTotal = document.getElementById('activities-cost');
const payMethod = document.getElementById('payment');
const paypalDesc = document.getElementById('paypal');
const bitcoinDesc = document.getElementById('bitcoin');
const creditDesc = document.getElementById('credit-card'); 
const submitBtn = document.querySelector('button[type="submit"]');


// Global Variables
let totalValidation = 0;
const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let usedTimes = []


// Content loaded event listener
document.addEventListener("DOMContentLoaded", () =>{
    nameInput.focus();
    otherBox.style.display = "none";
    colorBox.disabled = true;
    payMethod.value = "credit-card";
    ResetPayMethod();

})


// Realtime Email validation
emailInput.onkeyup = (e) => {
    
    const error = document.getElementById('email-hint');
    if(e.target.value.match(validEmail)){
        emailInput.style.border = "2px solid green"
        error.style.display = "none";
    }
    else{
        emailInput.style.borderColor = "red"
        error.style.display = "block";
    }
}


// Hide the "other job box" unelss selected
jobSelect.onchange = (e) => {
    console.info("change")
    if(e.target.value == "other"){
        otherBox.style.display = "block"
    }
    else{
        otherBox.style.display = "none"
    }
}


// Enable Shirt color on theme select.
designBox.onchange = (e) =>{
    // enable color box
    colorBox.disabled = false;
    
    const options = colorBox.children;
    for(let i = 0; i < options.length; i++){
        let themeOption = e.target.value; //gets value of design box
        let dataTheme = options[i].getAttribute('data-theme') //gets data theme of options
        if(themeOption == dataTheme){
            options[i].hidden = false;
            // console.info(options[i].textContent + "show")
        }
        else{
            options[i].hidden = true;
            // console.info(options[i].textContent + "hide")
        }
    }
}


// Adds up the total for the Selected form options
activiesContainer.onchange = (e) => {
    let sessions = activiesContainer.querySelectorAll('[type="checkbox"]');
    total = 0;
    
    sessions.forEach((session) => {
        if(session.checked){
            total += parseInt(session.getAttribute('data-cost'));

        };
    })
     activitiesTotal.textContent = `Total: $${total}`;
     
    totalValidation = total; 
}


// Reset Pay Method Format
function ResetPayMethod(){
    let payArray = [paypalDesc, bitcoinDesc, creditDesc];
    payArray.forEach((method) => {
        method.style.display = "none";
    })

    let opt = payMethod.value.toString(); 
    
    switch (opt){
        case "credit-card":  
            creditDesc.style.display = "block"
            break;
        case "paypal":
            paypalDesc.style.display = "block"
            break;
        case "bitcoin":
            bitcoinDesc.style.display = "block"
            break;
    }   
}

// Change pay descriptor on change 
payMethod.onchange = () => {
    ResetPayMethod();
}

// "Custom" Validation
// This is pretty bad but I am lazy and maybe one day I will fix it. 
// Everytime I look at it its gets worse. Its like staring at the sun. 
function Validation(){
    let valid = true;
    // Check Name
    const nameError = document.getElementById("name-hint")
    if(nameInput.value === ""){
        nameError.style.display = "block";
        valid = false;
        
    }
    else{
        nameError.style.display = "none"
    };

    //Check Email
    const emailError = document.getElementById('email-hint')
    if(!emailInput.value.match(validEmail)){
        emailError.style.display = "block"
        valid = false;
    }
    else{
        emailError.style.display = "none"
    };

    // Check Activities Selected
    const totalError = document.getElementById('activities-hint');
    if(totalValidation == 0){
        totalError.style.display = "block";
        valid = false;
    }
    else{
        totalError.style.display = "none"
    };

    // Check Credit card format
    const creditBox = document.getElementById('cc-num')
    const creditError = document.getElementById('cc-hint')
    if(creditBox.value.length < 13 || creditBox.value.length > 16){
        creditError.style.display = "block";
        valid = false; 
    }
    else{
        creditError.style.display = "none"
    };

    // check zip code
    const zipBox = document.getElementById('zip') 
    const zipError = document.getElementById('zip-hint')
    if(zipBox.value.length < 5 || zipBox.value.length > 5){
        zipError.style.display = "block";
        valid = false;
    }
    else{
        zipError.style.display = "none"
    };

    // check CVV 
    const cvvBox = document.getElementById('cvv')
    const cvvError = document.getElementById('cvv-hint')
    if(cvvBox.value.length < 3 || cvvBox.value.length > 3){
        cvvError.style.display = "block";
        valid = false;
    }
    else{
        cvvError.style.display = "none"
    };

    if(valid = false){
        const formError = document.getElementById("form-hint")
        formError.style.display = "block"
    }
    else{
        formError.style.display = "none"
    };

    return valid;
}

document.addEventListener('submit', () => {
    

})
