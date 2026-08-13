// ==========================================
// CUSTOMER MANAGEMENT DASHBOARD JS
// ==========================================


const tableBody = document.getElementById("customerTable");
const searchInput = document.getElementById("searchInput");

const totalCustomers = document.getElementById("totalCustomers");
const activeCustomers = document.getElementById("activeCustomers");
const newCustomers = document.getElementById("newCustomers");

const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const inactiveCount = document.getElementById("inactiveCount");

const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const addCustomerBtn = document.getElementById("addCustomerBtn");

let customers = [];
let filteredCustomers = [];

let currentPage = 1;
const rowsPerPage = 5;

let deleteId = null;


// ==========================================
// SAMPLE DATA
// ==========================================


const names = [
    "Ravi", "Rahul", "Kiran", "Teja", "Arjun",
    "Suresh", "Ramesh", "Anil", "Mahesh", "Ajay",
    "Praveen", "Naresh", "Sai", "Lokesh", "Harish",
    "Venkat", "Naveen", "Vijay", "Krishna", "Srinivas",
    "Pavan", "Rohit", "Manoj", "Santosh", "Charan",
    "Ganesh", "Rajesh", "Madhu", "Vamsi", "Karthik"
];


const cities = [
    "Hyderabad",
    "Vijayawada",
    "Visakhapatnam",
    "Tirupati",
    "Warangal",
    "Kurnool",
    "Nellore",
    "Guntur",
    "Kadapa"
];



function generateCustomers() {

    customers = [];

    for (let i = 1; i <= 30; i++) {

        customers.push({

            id: i,

            name: names[i - 1],

            phone: "98" + Math.floor(Math.random() * 90000000 + 10000000),

            email: names[i - 1].toLowerCase() + "@gmail.com",

            city: cities[Math.floor(Math.random() * cities.length)],

            status: i % 5 === 0 ? "Inactive" : "Active"

        });

    }

    filteredCustomers = [...customers];

}



// ==========================================
// STORAGE
// ==========================================


function saveCustomers() {

    localStorage.setItem(
        "customerDashboard",
        JSON.stringify(customers)
    );

}



function loadCustomers() {

    let data = localStorage.getItem("customerDashboard");


    if (data) {

        customers = JSON.parse(data);

        filteredCustomers = [...customers];

    }
    else {

        generateCustomers();

        saveCustomers();

    }

}


// ==========================================
// DASHBOARD COUNT
// ==========================================


function updateDashboard() {

    let total = customers.length;

    let active = customers.filter(
        c => c.status === "Active"
    ).length;


    let inactive = total - active;


    totalCustomers.textContent = total;

    activeCustomers.textContent = active;

    newCustomers.textContent =
        total >= 6 ? 6 : total;


    totalCount.textContent = total;

    activeCount.textContent = active;

    inactiveCount.textContent = inactive;


}



// ==========================================
// TABLE DISPLAY
// ==========================================


function renderTable() {


    tableBody.innerHTML = "";


    let start = (currentPage - 1) * rowsPerPage;

    let data = filteredCustomers.slice(
        start,
        start + rowsPerPage
    );



    data.forEach(customer => {


        let tr = document.createElement("tr");


        tr.innerHTML = `

<td>${customer.id}</td>

<td>${customer.name}</td>

<td>${customer.phone}</td>

<td>${customer.email}</td>

<td>${customer.city}</td>


<td>
<span class="status ${customer.status.toLowerCase()}">
${customer.status}
</span>
</td>


<td>

<button class="action-btn edit-btn"
data-id="${customer.id}">
<i class="fa-solid fa-pen"></i>
</button>


<button class="action-btn delete-btn"
data-id="${customer.id}">
<i class="fa-solid fa-trash"></i>
</button>


</td>


`;


        tableBody.appendChild(tr);


    });


    createPagination();

    updateDashboard();


}



// ==========================================
// PAGINATION
// ==========================================


function createPagination() {

    pageNumbers.innerHTML = "";


    let totalPages = Math.ceil(
        filteredCustomers.length / rowsPerPage
    );



    for (let i = 1; i <= totalPages; i++) {


        let btn = document.createElement("div");

        btn.className = "page-number";

        btn.innerText = i;


        if (i === currentPage) {

            btn.classList.add("active");

        }


        btn.onclick = () => {

            currentPage = i;

            renderTable();

        };


        pageNumbers.appendChild(btn);


    }


    prevBtn.disabled = currentPage === 1;

    nextBtn.disabled = currentPage === totalPages;


}




prevBtn.onclick = () => {

    if (currentPage > 1) {

        currentPage--;

        renderTable();

    }

};



nextBtn.onclick = () => {

    let pages = Math.ceil(
        filteredCustomers.length / rowsPerPage
    );


    if (currentPage < pages) {

        currentPage++;

        renderTable();

    }

};



// ==========================================
// SEARCH
// ==========================================


searchInput.addEventListener("input", () => {


    let value = searchInput.value.toLowerCase();


    filteredCustomers = customers.filter(c =>

        c.name.toLowerCase().includes(value) ||

        c.phone.includes(value) ||

        c.email.toLowerCase().includes(value) ||

        c.city.toLowerCase().includes(value)

    );



    currentPage = 1;

    renderTable();


});




// ==========================================
// ADD CUSTOMER
// ==========================================


addCustomerBtn.onclick = () => {

    window.location.href = "addcomt.html";

};




// ==========================================
// EDIT + DELETE BUTTONS
// ==========================================


tableBody.addEventListener("click", (e) => {


    let edit = e.target.closest(".edit-btn");

    let del = e.target.closest(".delete-btn");

    if (edit) {

        const id = Number(edit.dataset.id);

        const customer = customers.find(c => c.id === id);

        const oldRow = edit.closest("tr");

        const row = document.createElement("tr");

        row.dataset.id = customer.id;

        row.innerHTML = `

        <td>${customer.id}</td>

        <td>
            <input class="edit-name" value="${customer.name}">
        </td>

        <td>
            <input class="edit-phone" value="${customer.phone}">
        </td>

        <td>
            <input class="edit-email" value="${customer.email}">
        </td>

        <td>
            <input class="edit-city" value="${customer.city}">
        </td>

        <td>

            <select class="edit-status">

                <option ${customer.status == "Active" ? "selected" : ""}>
                    Active
                </option>

                <option ${customer.status == "Inactive" ? "selected" : ""}>
                    Inactive
                </option>

            </select>

        </td>

        <td>

            <button class="save-btn">
                <i class="fa-solid fa-floppy-disk"></i>
            </button>


            <button class="cancel-btn">
                <i class="fa-solid fa-xmark"></i>
            </button>

        </td>

    `;


        oldRow.replaceWith(row);

    }
    // SAVE EDIT

    let save = e.target.closest(".save-btn");

    if (save) {

        let row = save.closest("tr");

        let id = Number(row.dataset.id);

        let customer = customers.find(c => c.id === id);


        customer.name =
            row.querySelector(".edit-name").value;


        customer.phone =
            row.querySelector(".edit-phone").value;


        customer.email =
            row.querySelector(".edit-email").value;


        customer.city =
            row.querySelector(".edit-city").value;


        customer.status =
            row.querySelector(".edit-status").value;



        saveCustomers();

        renderTable();


        showNotification(
            "Customer Updated Successfully"
        );


    }



    // CANCEL EDIT

    let cancel = e.target.closest(".cancel-btn");


    if (cancel) {

        renderTable();

    }
    // DELETE OPEN POPUP


    if (del) {


        deleteId = Number(del.dataset.id);


        document
            .getElementById("deletePopup")
            .classList.add("show");


    }


});



// ==========================================
// DELETE POPUP BUTTONS
// ==========================================



document
    .getElementById("cancelDelete")
    .onclick = () => {


        document
            .getElementById("deletePopup")
            .classList.remove("show");


    };



document
    .getElementById("confirmDelete")
    .onclick = () => {


        customers = customers.filter(
            c => c.id !== deleteId
        );


        filteredCustomers = [...customers];


        saveCustomers();


        document
            .getElementById("deletePopup")
            .classList.remove("show");


        renderTable();


        showNotification(
            "Customer Deleted Successfully"
        );



    };



// ==========================================
// NOTIFICATION
// ==========================================


function showNotification(msg, type = "success") {


    let box = document.getElementById(
        "notification"
    );


    box.innerHTML = msg;


    if (type === "error") {

        box.style.background =
            "linear-gradient(135deg,#ff3f7f,#ff0055)";

    }
    else {

        box.style.background =
            "linear-gradient(135deg,#18e7ff,#4b8dff,#9b4dff)";

    }


    box.classList.add("show");


    setTimeout(() => {

        box.classList.remove("show");

    }, 3000);


}



// ==========================================
// EXIT
// ==========================================


document
    .getElementById("exitBtn")
    .onclick = () => {


        showNotification(
            "Returning to Dashboard"
        );


        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1500);


    };



// ==========================================
// START
// ==========================================


loadCustomers();

renderTable();

updateDashboard();
