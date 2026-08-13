/*====================================
        DASHBOARD JAVASCRIPT
====================================*/


document.addEventListener("DOMContentLoaded", function () {


    /*==============================
            ELEMENTS
    ==============================*/

    const dashboardBtn = document.querySelector(".menu .active");

    const productsBtn = document.getElementById("productsBtn");

    const customersBtn = document.getElementById("customersBtn");

    const notificationBtn = document.getElementById("notificationBtn");

    const profileBtn = document.getElementById("profileBtn");



    /*==============================
            DASHBOARD CLICK
    ==============================*/


    dashboardBtn.addEventListener("click", function (e) {

        e.preventDefault();

        window.location.href = "index.html";

    });



    /*==============================
            PRODUCTS 404
    ==============================*/


    productsBtn.addEventListener("click", function (e) {

        e.preventDefault();

        window.location.href = "product.html";

    });



    /*==============================
            CUSTOMERS 404
    ==============================*/


    customersBtn.addEventListener("click", function (e) {

        e.preventDefault();

        window.location.href = "comt.html";

    });



    /*==============================
            PROFILE 404
    ==============================*/


    profileBtn.addEventListener("click", function () {

        window.location.href = "profile.html";

    });



    /*==============================
        NOTIFICATION POPUP
    ==============================*/

    notificationBtn.addEventListener("click", function () {

        let notificationBox = document.querySelector(".notification-box");

        if (notificationBox) {
            notificationBox.remove();
            return;
        }

        notificationBox = document.createElement("div");
        notificationBox.className = "notification-box";

        notificationBox.innerHTML = `
        <h3>🔔 Notifications</h3>

        <div class="notification-item">
            📈 Dashboard: Today's sales increased by 15%.
        </div>

        <div class="notification-item">
            📦 Product: New product added successfully.
        </div>

        <div class="notification-item">
            👤 Customer: 5 new customers registered today.
        </div>

        <div class="notification-item">
            ⚠️ Stock Alert: Laptop stock is running low.
        </div>

        <div class="notification-item">
            ✅ Order #1025 delivered successfully.
        </div>
    `;

        document.querySelector(".notification-wrapper").appendChild(notificationBox);
        setTimeout(() => {
            if (notificationBox) {
                notificationBox.remove();
            }
        }, 5000);

    });




    /*==============================
            SALES CHART
    ==============================*/


    const chart = document.getElementById("salesChart");


    if (chart) {


        new Chart(chart, {


            type: "bar",


            data: {


                labels: [

                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"

                ],


                datasets: [{


                    label: "Target",


                    data: [

                        120000,
                        150000,
                        180000,
                        220000,
                        260000,
                        300000

                    ],


                    borderWidth: 2


                },

                {


                    label: "Actual",


                    data: [

                        100000,
                        170000,
                        160000,
                        250000,
                        280000,
                        350000

                    ],


                    borderWidth: 2


                }]

            },



            options: {


                responsive: true,


                maintainAspectRatio: false,


                plugins: {


                    legend: {


                        position: "top"


                    }


                },


                scales: {


                    y: {


                        beginAtZero: true


                    }


                }


            }



        });


    }



});



const userEmail = localStorage.getItem("loggedInUser");

if (!userEmail) {
    window.location.href = "login.html";
}
// ==============================
// DASHBOARD SEARCH
// ==============================


const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("keyup", function () {


    let value = searchInput.value.toLowerCase();


    let cards = document.querySelectorAll(
        ".card, .small-card"
    );


    cards.forEach(function (card) {


        let text = card.innerText.toLowerCase();


        if (text.includes(value)) {

            card.style.display = "block";

        }
        else {

            card.style.display = "none";

        }


    });


});