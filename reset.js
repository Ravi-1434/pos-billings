/*=========================================
    STACKLY RESET PASSWORD
    PART 3 - JAVASCRIPT
=========================================*/

const form = document.getElementById("resetForm");

const otp = document.getElementById("otp");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const strengthBar = document.querySelector("#strengthBar span");

const strengthText = document.getElementById("strengthText");

const matchMessage = document.getElementById("matchMessage");

const successMessage = document.getElementById("successMessage");

const errorMessage = document.getElementById("errorMessage");

const toast = document.getElementById("toast");

const toastText = document.getElementById("toastText");

const resetBtn = document.getElementById("resetBtn");

const loader = document.querySelector(".loader");

const btnText = document.querySelector(".btn-text");

/*=========================================
SHOW / HIDE PASSWORD
=========================================*/

document.querySelectorAll(".togglePassword").forEach(icon => {

    icon.addEventListener("click", () => {

        const target = document.getElementById(
            icon.dataset.target
        );

        if (target.type === "password") {

            target.type = "text";

            icon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            target.type = "password";

            icon.innerHTML = '<i class="fa-solid fa-eye"></i>';

        }

    });

});

/*=========================================
PASSWORD STRENGTH
=========================================*/

password.addEventListener("input", checkStrength);

function checkStrength() {

    const value = password.value;

    let strength = 0;

    if (value.length >= 8) strength++;

    if (/[A-Z]/.test(value)) strength++;

    if (/[0-9]/.test(value)) strength++;

    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;

    document.getElementById("rule1").classList.toggle(
        "valid",
        value.length >= 8
    );

    document.getElementById("rule2").classList.toggle(
        "valid",
        /[A-Z]/.test(value)
    );

    document.getElementById("rule3").classList.toggle(
        "valid",
        /[0-9]/.test(value)
    );

    document.getElementById("rule4").classList.toggle(
        "valid",
        /[!@#$%^&*(),.?":{}|<>]/.test(value)
    );

    switch (strength) {

        case 0:

            strengthBar.style.width = "0%";

            strengthText.innerHTML = "Password Strength";

            break;

        case 1:

            strengthBar.style.width = "25%";

            strengthBar.style.background = "#ff4d4d";

            strengthText.innerHTML = "Weak";

            break;

        case 2:

            strengthBar.style.width = "50%";

            strengthBar.style.background = "#ff9900";

            strengthText.innerHTML = "Medium";

            break;

        case 3:

            strengthBar.style.width = "75%";

            strengthBar.style.background = "#ffd500";

            strengthText.innerHTML = "Good";

            break;

        case 4:

            strengthBar.style.width = "100%";

            strengthBar.style.background = "#34ff8b";

            strengthText.innerHTML = "Strong";

            break;

    }

}

/*=========================================
PASSWORD MATCH
=========================================*/

confirmPassword.addEventListener("keyup", () => {

    if (confirmPassword.value === "") {

        matchMessage.innerHTML = "";

        return;

    }

    if (password.value === confirmPassword.value) {

        matchMessage.innerHTML = "✔ Passwords Match";

        matchMessage.style.color = "#59ff99";

    } else {

        matchMessage.innerHTML = "✖ Passwords Do Not Match";

        matchMessage.style.color = "#ff6666";

    }

});

/*=========================================
SHOW TOAST
=========================================*/

function showToast(message) {

    toastText.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/*=========================================
MESSAGES
=========================================*/

function showError(message) {

    successMessage.style.display = "none";

    errorMessage.style.display = "flex";

    errorMessage.innerHTML = `
        <i class="fa-solid fa-circle-exclamation"></i>
        ${message}
    `;

}

function showSuccess(message) {

    errorMessage.style.display = "none";

    successMessage.style.display = "flex";

    successMessage.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${message}
    `;

}

/*=========================================
FORM SUBMIT
=========================================*/

form.addEventListener("submit", function (e) {

    e.preventDefault();

    successMessage.style.display = "none";

    errorMessage.style.display = "none";

    const code = otp.value.trim();

    const pass = password.value.trim();

    const confirm = confirmPassword.value.trim();

    if (code === "") {

        showError("Please enter verification code.");

        return;

    }

    if (code.length !== 6) {

        showError("Verification code must be 6 digits.");

        return;

    }

    if (pass.length < 8) {

        showError("Password must contain at least 8 characters.");

        return;

    }

    if (!/[A-Z]/.test(pass)) {

        showError("Password must contain one uppercase letter.");

        return;

    }

    if (!/[0-9]/.test(pass)) {

        showError("Password must contain one number.");

        return;

    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pass)) {

        showError("Password must contain one special character.");

        return;

    }

    if (pass !== confirm) {

        showError("Passwords do not match.");

        return;

    }

    btnText.innerHTML = "Updating...";

    loader.style.display = "block";

    resetBtn.disabled = true;

    setTimeout(() => {

        loader.style.display = "none";

        btnText.innerHTML = "Reset Password";

        resetBtn.disabled = false;

        showSuccess("Password reset successfully.");

        showToast("Password changed successfully!");

        form.reset();

        strengthBar.style.width = "0%";

        strengthText.innerHTML = "Password Strength";

        matchMessage.innerHTML = "";

        document
            .querySelectorAll(".password-rules li")
            .forEach(item => {

                item.classList.remove("valid");

            });

    }, 2000);

});

/*=========================================
OTP ONLY NUMBERS
=========================================*/

otp.addEventListener("input", () => {

    otp.value = otp.value.replace(/\D/g, "");

});

/*=========================================
ENTER KEY
=========================================*/

document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        form.requestSubmit();

    }

});

/*=========================================
AUTO HIDE MESSAGE
=========================================*/

setInterval(() => {

    successMessage.style.display = "none";

    errorMessage.style.display = "none";

}, 5000);