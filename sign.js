// PASSWORD TOGGLE

function togglePassword(id) {

    const input = document.getElementById(id);

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";

    }

}


document
    .getElementById("togglePassword")
    .addEventListener("click", () => {

        togglePassword("password");

    });


document
    .getElementById("toggleConfirmPassword")
    .addEventListener("click", () => {

        togglePassword("confirmPassword");

    });



// OTP BUTTONS

const sendBtn = document.getElementById("sendOtpBtn");
const verifyBtn = document.getElementById("verifyOtpBtn");

const otp = document.getElementById("otp");

const password = document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

sendBtn.onclick = function () {

    let emailPattern =
        /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|thestackly\.com|stackly\.in)$/i;


    if (!emailPattern.test(document.getElementById("email").value.trim())) {

        showPopup("Incorrect Email Address", "error");

        return;
    }


    otp.disabled = false;
    verifyBtn.disabled = false;

    showPopup("OTP sent successfully", "success");

};


verifyBtn.onclick = function () {

    password.disabled = false;
    confirmPassword.disabled = false;

    showPopup("OTP verified successfully", "success");

};




// CAPS LOCK WARNING

password.addEventListener("keyup", (e) => {

    const warning =
        document.getElementById("capsWarningSignup");

    if (e.getModifierState("CapsLock")) {

        warning.style.display = "block";

    } else {

        warning.style.display = "none";

    }

});




// FORM SUBMIT

document
    .getElementById("signupForm")
    .addEventListener("submit", (e) => {

        e.preventDefault();


        if (password.value !== confirmPassword.value) {

            showPopup("Passwords do not match", "error");

            return;

        }


        showPopup("Account created successfully", "success");

    });
// ================================
// SIGNUP FORM VALIDATION
// ================================


// Name fields - only letters allowed

const firstName = document.querySelector('input[name="firstName"]');
const lastName = document.querySelector('input[name="lastName"]');


firstName.addEventListener("input", function () {

    this.value = this.value.replace(/[^A-Za-z ]/g, "");

});


lastName.addEventListener("input", function () {

    this.value = this.value.replace(/[^A-Za-z ]/g, "");

});




// Phone number - only numbers allowed

const phone = document.getElementById("phone");


phone.addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});




// Email validation before OTP

const emailInput = document.getElementById("email");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const statusMsg = document.getElementById("statusMsg");


sendOtpBtn.addEventListener("click", function () {


    let emailValue = emailInput.value.trim();


    let emailPattern =
        /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|thestackly\.com|stackly\.in)$/i;



    if (!emailPattern.test(emailValue)) {


        statusMsg.className = "error-box";

        statusMsg.style.display = "block";

        statusMsg.innerHTML =
            "❌ Please enter a valid email address";


        emailInput.classList.add("invalid");

        emailInput.classList.remove("valid");


        return;


    }



    statusMsg.className = "success-box";

    statusMsg.style.display = "block";

    statusMsg.innerHTML =
        "✅ Verification code sent successfully";


    emailInput.classList.add("valid");

    emailInput.classList.remove("invalid");



    // Enable OTP field

    document.getElementById("otp").disabled = false;

    document.getElementById("verifyOtpBtn").disabled = false;


});





// Phone validation before signup submit

const signupForm = document.getElementById("signupForm");


signupForm.addEventListener("submit", function (e) {


    let phoneValue = phone.value.trim();



    if (phoneValue.length !== 10) {


        e.preventDefault();


        statusMsg.className = "error-box";

        statusMsg.style.display = "block";

        statusMsg.innerHTML =
            "❌ Phone number must contain exactly 10 digits";


        phone.classList.add("invalid");


        return false;


    }



});
// ======================================
// FINAL INPUT VALIDATION
// ======================================


// First Name - Letters only

document.querySelector('input[name="firstName"]').addEventListener("input", function () {

    this.value = this.value.replace(/[^A-Za-z ]/g, '');

});



// Last Name - Letters only

document.querySelector('input[name="lastName"]').addEventListener("input", function () {

    this.value = this.value.replace(/[^A-Za-z ]/g, '');

});



// Company Name - Letters only

document.querySelector('input[name="companyName"]').addEventListener("input", function () {

    this.value = this.value.replace(/[^A-Za-z ]/g, '');

});



// Company Code - Numbers only

document.querySelector('input[name="companyCode"]').addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, '');

});




// Phone Number - Only 10 digits

const phoneInput = document.querySelector('input[name="phone"]');


phoneInput.addEventListener("input", function () {


    this.value = this.value.replace(/[^0-9]/g, '');



    if (this.value.length === 10) {

        this.classList.add("valid");

    }

});





// Email validation before OTP


const emailBox = document.getElementById("email");

const otpButton = document.getElementById("sendOtpBtn");



otpButton.addEventListener("click", function () {


    let emailValue = emailBox.value.trim();



    let emailPattern =

        /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|thestackly\.com|stackly\.in)$/i;


    if (!emailPattern.test(emailValue)) {


        showPopup("Please enter a valid email address", "error");


        emailBox.focus();


        return;


    }



    showPopup("Verification code sent successfully", "success");



    document.getElementById("otp").disabled = false;

    document.getElementById("verifyOtpBtn").disabled = false;



});
// ======================================
// OTP VALIDATION (6 DIGITS ONLY)
// ======================================


const otpInput = document.getElementById("otp");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");



otpInput.addEventListener("input", function () {


    // Remove letters and symbols

    this.value = this.value.replace(/[^0-9]/g, '');



    // Maximum 6 digits

    if (this.value.length > 6) {

        this.value = this.value.slice(0, 6);

    }


});





verifyOtpBtn.addEventListener("click", function () {


    let otpValue = otpInput.value.trim();



    if (otpValue.length !== 6) {


        showPopup("Invalid OTP. Enter 6 digit OTP", "error");


        return;


    }

    verifyOtpBtn.addEventListener("click", function () {


        let otpValue = otpInput.value.trim();



        if (otpValue.length !== 6) {


            showPopup("Invalid OTP. Enter 6 digit OTP", "error");


            return;


        }



        // Enable password fields after OTP verification

        document.getElementById("password").disabled = false;

        document.getElementById("confirmPassword").disabled = false;


    });
    // Enable password fields after OTP verification

    document.getElementById("password").disabled = false;

    document.getElementById("confirmPassword").disabled = false;



});
// ===============================
// CUSTOM POPUP SYSTEM
// ===============================


function showPopup(message, type = "success") {


    const popup =
        document.getElementById("popupMessage");


    const text =
        document.getElementById("popupText");


    text.innerHTML = message;


    popup.className =
        "popup-message show popup-" + type;



    setTimeout(() => {


        popup.classList.remove("show");


    }, 2500);


}
/****************************************
     STEP BY STEP FIELD ACTIVATION
****************************************/

const fName = document.querySelector('input[name="firstName"]');
const lName = document.querySelector('input[name="lastName"]');
const companyName = document.querySelector('input[name="companyName"]');
const companyCode = document.querySelector('input[name="companyCode"]');
const phoneNumber = document.querySelector('input[name="phone"]');
const email = document.getElementById("email");
const signupButton = document.getElementById("signupBtn");


// Initially disable everything

lName.disabled = true;
companyName.disabled = true;
companyCode.disabled = true;
phoneNumber.disabled = true;
document.getElementById("countryCode").disabled = true;
email.disabled = true;
sendOtpBtn.disabled = true;
otp.disabled = true;
verifyOtpBtn.disabled = true;
password.disabled = true;
confirmPassword.disabled = true;
signupButton.disabled = true;


// First Name

fName.addEventListener("input", function () {

    if (this.value.trim().length > 0) {

        lName.disabled = false;

    }

});


// Last Name

lName.addEventListener("input", function () {

    if (this.value.trim().length > 0) {

        companyName.disabled = false;

    }

});


// Company Name

companyName.addEventListener("input", function () {

    if (this.value.trim().length > 0) {

        companyCode.disabled = false;

    }

});


// Company Code

companyCode.addEventListener("input", function () {

    if (this.value.trim().length > 0) {

        phoneNumber.disabled = false;
        document.getElementById("countryCode").disabled = false;

    }

});


// Phone Number

phoneNumber.addEventListener("input", function () {

    if (this.value.length === 10) {

        email.disabled = false;
        sendOtpBtn.disabled = false;

    }

});


// Email Validation

sendOtpBtn.addEventListener("click", function () {
    let emailPattern =
        /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|thestackly\.com|stackly\.in)$/i;

    if (!emailPattern.test(email.value.trim())) {

        showPopup("Enter valid email address", "error");
        return;

    }

    otp.disabled = false;
    verifyOtpBtn.disabled = false;

});


// OTP Validation

verifyOtpBtn.addEventListener("click", function () {

    if (otp.value.trim().length !== 6) {

        showPopup("Enter valid 6 digit OTP", "error");
        return;

    }

    password.disabled = false;
    confirmPassword.disabled = false;

});


// Password Validation

function enableSignupButton() {

    if (

        password.value.length >= 8 &&

        confirmPassword.value.length >= 8 &&

        password.value === confirmPassword.value

    ) {

        signupButton.disabled = false;

    }

    else {

        signupButton.disabled = true;

    }

}


password.addEventListener("input", enableSignupButton);

confirmPassword.addEventListener("input", enableSignupButton);
function validatePassword() {

    if (password.value.length < 8 ||
        password.value.length > 16) {

        signupBtn.disabled = true;

        return;
    }

    if (password.value !== confirmPassword.value) {

        signupBtn.disabled = true;

        return;
    }

    signupBtn.disabled = false;

}


password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);