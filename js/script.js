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
const creditInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const form = document.getElementById('form');

// Content loaded event listener
document.addEventListener("DOMContentLoaded", () =>{
    nameInput.focus();
    otherBox.style.display = "none";
    colorBox.disabled = true;
    payMethod.value = "credit-card";
    ResetPayMethod();
    
    
})

// ------------------
// Form Behavior
// ------------------

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
        }
        else{
            options[i].hidden = true;
        }
    }
}


// Adds up the total for the Selected form options
activiesContainer.onchange = () => {
    let sessions = activiesContainer.querySelectorAll('[type="checkbox"]');
    total = 0;
    
    sessions.forEach((session) => {
        if(session.checked){
            total += parseInt(session.getAttribute('data-cost'));

        };
    })
     activitiesTotal.textContent = `Total: $${total}`;
     
    totalValidation = total;
    checkEvents(); 
}

// Checkbox Accessibility Highlighting 
const checkboxs = activiesContainer.querySelectorAll('[type="checkbox"]');

checkboxs.forEach((box) => {
    // highlight checkbox container on focus
    box.addEventListener('focus', (e) => {
        box.parentElement.classList.add('focus');
    })

    // remove highlight on blur
    box.addEventListener('blur', (e) =>{
        box.parentElement.classList.remove('focus');
    })
})

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



//--------------------
//Validation Functions
//--------------------

//validation variables that all need to return true
let validName = false;
let validEmail = false;
let validEvent = false;
let validCC = false;
let validZip = false;
let validCVV = false;

// Selectors for Errors
const nameError = document.getElementById('name-hint');
const emailError = document.getElementById('email-hint');
const activeError = document.getElementById('activities-hint');
const ccError = document.getElementById('cc-hint');
const zipError = document.getElementById('zip-hint');
const cvvError = document.getElementById('cvv-hint');

//Error Function that shows and hides errors (error message optional) 
//True = no error  False = error
function updateError(bool, errorTarget, errorMsg){
    if(bool){
        errorTarget.classList.add('valid');
        errorTarget.classList.remove('not-valid');
        errorTarget.style.display = "block";
        errorTarget.textContent = ""
    }
    else{
        errorTarget.classList.add('not-valid');
        errorTarget.classList.remove('valid');
        errorTarget.style.display = "block";
        if(errorMsg != undefined || errorMsg != ""){
            errorTarget.textContent = errorMsg;
        }
        // Fallback Error Message
        else{
            errorTarget.textContent = "That is not valid"
        }
    }
}

//Check name for not null in realtime and on submit
nameInput.onkeyup = (e) => {
    checkName();
}
// Checks user input against a couple filters to give accurate errors
function checkName(){
    if(!nameInput.value.match(/^$/)){
        validName = true;
        updateError(validName, nameError,);
    }
    else{
        validName = false;
    }
    updateError(validName, nameError, "Name Cannot be Blank");
    return validName;
}


// Realtime Email validation (Works) can Also call on submit 
emailInput.onkeyup = () => {
    checkEmail();
    
}

// This gets called on submit 
function checkEmail(){
    //format: (anything)@(anything but whitespace).(any letters and not whitespace)
    const emailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+(@\S[a-zA-Z0-9-])+(.\S[a-zA-z]+)*$/;
    if(emailInput.value.match(emailFormat)){
        validEmail = true
    }
    else{
        validEmail = false
    }
    updateError(validEmail, emailError, "This email could not be validated");
    return validEmail;
}

// Event validation in realtime (event listener line 79)

// This also gets called on submit
function checkEvents(){
    const events  = activiesContainer.querySelectorAll('input[type="checkbox"]')
    let eveChecked = 0;
    events.forEach((eve) => {
        if(eve.checked){
            eveChecked++
        };
    })
    if(eveChecked > 0){
        validEvent = true;
    }
    else{
        validEvent = false;
    };
    updateError(validEvent, activeError, "You need to select at least one event")
    return validEvent;
}



// checks if credit card validation needs to run (called on form submit event)
//runs non-realtime and realtime validation functions 
function creditValidator(){
    if(payMethod.value == "credit-card"){
       if( checkCC() && checkZip() && checkCVV() ){
           return true;
       }
       else{
           return false;
       };    
    }
    else{
        return true;
    }
}


//Credit card validation functions in realtime 
// Checks if CC numbe is number and valid length
creditInput.onkeyup = () => {
    checkCC();
}
//runs cc input throught filters to check formating (used in realtime and called on submit by credit validator)
function checkCC(){
    let validCard = /^[0-9]{13,16}$/
    if(creditInput.value.match(validCard)){
        validCC = true;
        updateError(validCC, ccError);
        return true
    }
    if(creditInput.value.match(/\D/)){
        validCC = false;
        updateError(validCC, ccError, "Credit card numbers should only container numbers");
        return false
    }
    if(creditInput.value.match(/^[0-9]{16,}$/) || creditInput.value.match(/^[0-9]{0,12}$/)){
        validCC = false;
        updateError(validCC, ccError, "Credit card numbers should be between 13-16 numbers");
        return false
    }
    else{
        validCC = false;
        updateError(validCC, ccError, "This is not a valid card number")
        return false
    }
}

// Check zip format (exactly 5 numbers)
function checkZip(){
    if(zipInput.value.match(/^[0-9]{5}$/)){
        validZip = true;
        updateError(validZip, zipError);
        return true
    }
    else{
        validZip = false;
        updateError(validZip, zipError, "Enter a valid Zip Code");
        return false 
    }
}

//Check CCV format (exactly 3 numbers)
function checkCVV(){
    if(cvvInput.value.match(/^[0-9]{3}$/)){
        validCVV = true;
        updateError(validCVV, cvvError);
        return true
    }
    else{
        validCVV = false;
        updateError(validCVV, cvvError, "Enter a valid CVV Code");
        return false 
    }
}


//Run  through all validation functions (called on form submit) 
function Validation(){
    if( checkName() && checkEmail() && checkEvents() && creditValidator() ){
        return true;
    }
    else{
        return false;
        
    }
}

//Submit Event
form.addEventListener('submit', (e) => {
    if(!Validation()){
        e.preventDefault();
        checkName();
        checkEmail();
        checkEvents();
        creditValidator();
    }
})

