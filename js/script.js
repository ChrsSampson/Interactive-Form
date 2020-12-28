// Selectors
const nameInput = document.getElementById("name");
const jobSelect = document.getElementById('title');
const otherBox = document.getElementById('other-job-role');
const colorBox = document.getElementById('color');
const designBox = document.getElementById('design');
const activiesContainer = document.getElementById('activities');
const activitiesTotal = document.getElementById('activities-cost');

// Content loaded event listener
document.addEventListener("DOMContentLoaded", () =>{
    nameInput.focus();
    otherBox.style.display = "none"
    colorBox.disabled = true;
})


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
    let total = 0;
    sessions.forEach((session) => {
        if(session.checked){
            total += parseInt(session.getAttribute('data-cost')) 
        }
    })
     activitiesTotal.textContent = `Total: $${total}`;   

}
