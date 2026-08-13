/* ==========================================
   STACKLY LOGIN PAGE
   JavaScript
========================================== */

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

/* ==========================================
   EMAIL VALIDATION
========================================== */

function validateEmail(mail) {

    const pattern =
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|thestackly\.com|stackly\.in)$/i;

    return pattern.test(mail);

}
/* ==========================================
   SHOW MESSAGE
========================================== */

function showMessage(message, color) {

    let toast = document.createElement("div");

    toast.innerHTML = message;

    toast.style.position = "fixed";
    toast.style.top = "25px";
    toast.style.right = "25px";
    toast.style.padding = "15px 25px";
    toast.style.background = color;
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.borderRadius = "10px";
    toast.style.zIndex = "9999";
    toast.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.3)";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}


/* ==========================================
   LOGIN SUBMIT
========================================== */

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (userEmail === "") {

        showMessage(
            "Use a valid email (@gmail.com, @yahoo.com, @outlook.com, @hotmail.com, @thestackly.com, @stackly.in).",
            "#ff9800"
        );
        email.focus();

        return;
    }

    if (!validateEmail(userEmail)) {

        showMessage(
            "Please enter a valid email address.",
            "#ff9800"
        );

        email.focus();

        return;
    }

    if (userPassword === "") {

        showMessage(
            "Please enter your password.",
            "#ff4d4f"
        );

        password.focus();

        return;
    }

    /* PASSWORD VALIDATION */

    const passwordPattern =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;


    if (userPassword === "") {

        showMessage(
            "Please enter your password.",
            "#ff4d4f"
        );

        password.focus();

        return;
    }


    if (!passwordPattern.test(userPassword)) {

        showMessage(
            "Password must contain 8-16 characters, at least 1 uppercase letter, 1 number and 1 special character.",
            "#ff9800"
        );

        password.focus();

        return;
    }

    const button =
        loginForm.querySelector("button");

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Logging In...';

    setTimeout(() => {

        showMessage(
            "Login Successful!",
            "#22c55e"
        );

        // Store the logged in user's email
        localStorage.setItem("loggedInUser", userEmail);

        // Redirect to dashboard page
        window.location.href = "dashboard.html";

    }, 2000);
});


/* ==========================================
   INPUT GLOW EFFECT
========================================== */

const inputs =
    document.querySelectorAll(".input-box input");

inputs.forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.style.transform =
            "scale(1.02)";

    });

    input.addEventListener("blur", () => {

        input.parentElement.style.transform =
            "scale(1)";

    });

});


/* ==========================================
   LOGO ANIMATION
========================================== */

const logo =
    document.querySelector(".logo-icon");

setInterval(() => {

    logo.animate(

        [

            {
                transform: "rotate(0deg)"
            },

            {
                transform: "rotate(6deg)"
            },

            {
                transform: "rotate(-6deg)"
            },

            {
                transform: "rotate(0deg)"
            }

        ],

        {

            duration: 1500

        }

    );

}, 4000);


/* ==========================================
   BACKGROUND FLOAT EFFECT
========================================== */

const circles =
    document.querySelectorAll(".bg-circle");

circles.forEach((circle, index) => {

    circle.style.animationDuration =
        (8 + index * 2) + "s";

});


/* ==========================================
   CONSOLE
========================================== */

console.log("✅ Stackly Login UI Loaded Successfully");
/* ==========================================
   SHOW MESSAGE POPUP (CENTER TOP OF CARD)
========================================== */

function showMessage(message, color) {

    let toast = document.createElement("div");

    toast.innerHTML = message;

    toast.style.position = "absolute";
    toast.style.top = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";

    toast.style.padding = "15px 25px";
    toast.style.minWidth = "300px";
    toast.style.maxWidth = "500px";

    toast.style.textAlign = "center";

    toast.style.background = color;
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.fontSize = "16px";

    toast.style.borderRadius = "10px";
    toast.style.zIndex = "9999";

    toast.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.3)";

    // Add popup inside login card
    document.querySelector(".login-box").appendChild(toast);


    setTimeout(() => {

        toast.remove();

    }, 3000);

}