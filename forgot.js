const emailInput = document.getElementById("fpEmail");
const emailError = document.getElementById("fpEmailError");
const sendBtn = document.getElementById("fpSendBtn");
const statusMsg = document.getElementById("fpStatus");


// Allowed Email Domains
const allowedEmailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|thestackly\.com|stackly\.in)$/i;



// Validate Email Function
function validateEmail() {

    const email = emailInput.value.trim();


    // Empty Field
    if (email === "") {

        emailError.textContent = "Email address is required.";
        return false;

    }


    // Invalid Email
    if (!allowedEmailRegex.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        return false;

    }


    // Valid Email
    emailError.textContent = "";

    return true;

}



// Validate While Typing
emailInput.addEventListener("input", () => {

    validateEmail();

});




// Button Click
sendBtn.addEventListener("click", () => {

    statusMsg.textContent = "";


    // Stop if email is invalid
    if (!validateEmail()) {

        statusMsg.style.color = "#ff6767";
        statusMsg.textContent =
            "Invalid email address.";

        return;

    }


    // Valid Email
    statusMsg.style.color = "#00ffb7";
    statusMsg.textContent =
        "Reset link verification successful.";



    // Redirect after 1 second
    setTimeout(() => {

        window.location.href = "rest.html";

    }, 1000);

});