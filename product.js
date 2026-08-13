/*=========================================
        NEO GALAXY ERP PRODUCT MASTER JS
=========================================*/


//=========================================
//              VARIABLES
//=========================================

let products = [];

let filteredProducts = [];

let currentPage = 1;

const itemsPerPage = 6;

let deleteProductId = null;


//=========================================
//              LOAD DATA
//=========================================

function loadProductsData() {

    const savedProducts =
        localStorage.getItem("products");


    if (savedProducts) {

        products =
            JSON.parse(savedProducts);

    }

    else {

        for (let i = 1; i <= 30; i++) {

            products.push({

                id:
                    "PR" +
                    String(i).padStart(3, "0"),

                name:
                    "Neo Product " + i,

                company:
                    i % 2 === 0
                        ?
                        "Galaxy Technologies"
                        :
                        "NeoX Pvt Ltd",

                category:
                    i % 2 === 0
                        ?
                        "Electronics"
                        :
                        "Software",

                type:
                    i % 3 === 0
                        ?
                        "Laptop"
                        :
                        "Accessories",

                price:
                    Number(100 + i),
                gst: 18,
                stock:
                    50 + i,

                status:
                    i % 5 === 0
                        ?
                        "Inactive"
                        :
                        "Active",

                image:
                    "https://placehold.co/60x60"

            });

        }


        saveProducts();

    }


    filteredProducts =
        [...products];

}


//=========================================
//              SAVE DATA
//=========================================

function saveProducts() {

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

}


//=========================================
//              ELEMENTS
//=========================================

const tableBody =
    document.querySelector("tbody");


const searchInputs =
    document.querySelectorAll(
        ".search-section input"
    );


const filterSelects =
    document.querySelectorAll(
        ".filters select"
    );


const clearButton =
    document.querySelector(
        ".filters button"
    );


const pageText =
    document.querySelector(
        ".pagination span"
    );


const searchButton =
    document.querySelector(
        ".search-section button"
    );


const nextButton =
    document.querySelector(
        ".page-buttons button:last-child"
    );


const prevButton =
    document.querySelector(
        ".page-buttons button:first-child"
    );


const addButton =
    document.querySelector(
        ".add-btn"
    );


const exitButton =
    document.getElementById(
        "exitBtn"
    );



//=========================================
//          TABLE DISPLAY
//=========================================

function createTable(data) {

    tableBody.innerHTML = "";


    data.forEach(product => {

        let row =
            document.createElement("tr");


        row.innerHTML = `

        <td>${product.id}</td>

        <td>
        <img src="${product.image}" alt="product">
        </td>

        <td>${product.name}</td>

        <td>${product.company}</td>

        <td>${product.type}</td>

        <td>${product.price}</td>

        <td>${product.stock}</td>

        <td>

        <span class="${product.status === "Active"
                ?
                "active"
                :
                "inactive"
            }">

        ${product.status}

        </span>

        </td>

        <td>

        <button
        onclick="editProduct('${product.id}')">

        Edit

        </button>


        <button
        onclick="openDeletePopup('${product.id}')">

        Delete

        </button>

        </td>

        `;


        tableBody.appendChild(row);

    });

}



//=========================================
//          DISPLAY PRODUCTS
//=========================================

function displayProducts() {

    let start =
        (currentPage - 1)
        * itemsPerPage;


    let end =
        start + itemsPerPage;


    let pageData =
        filteredProducts.slice(
            start,
            end
        );


    createTable(pageData);


    let totalPages =
        Math.ceil(

            filteredProducts.length
            /
            itemsPerPage

        );


    if (totalPages < 1) {

        totalPages = 1;

    }


    if (pageText) {

        pageText.innerText =

            `Page ${currentPage}
            of ${totalPages}`;

    }

}



//=========================================
//          DASHBOARD
//=========================================

function updateDashboard() {


    const total =

        document.querySelector(
            ".card:nth-child(1) h2"
        );


    const active =

        document.querySelector(
            ".card:nth-child(2) h2"
        );


    const lowStock =

        document.querySelector(
            ".card:nth-child(3) h2"
        );


    const companies =

        document.querySelector(
            ".card:nth-child(4) h2"
        );



    if (total) {

        total.innerText =
            products.length;

    }


    if (active) {

        active.innerText =

            products.filter(

                p => p.status ===
                    "Active"

            ).length;

    }


    if (lowStock) {

        lowStock.innerText =

            products.filter(

                p => Number(
                    p.stock
                ) < 100

            ).length;

    }



    if (companies) {

        companies.innerText =

            [

                ...new Set(

                    products.map(

                        p => p.company

                    )

                )

            ].length;

    }

}



//=========================================
//              SEARCH
//=========================================

function applyFilters() {


    const id =

        searchInputs[0]
            ?.value
            .toLowerCase()

        || "";


    const name =

        searchInputs[1]
            ?.value
            .toLowerCase()

        || "";


    const category =

        filterSelects[0]
            ?.value

        || "Category";


    const type =

        filterSelects[1]
            ?.value

        || "Product Type";


    const status =

        filterSelects[2]
            ?.value

        || "Status";



    filteredProducts =

        products.filter(product => {


            return (

                product.id

                    .toLowerCase()

                    .includes(id)

                &&

                product.name

                    .toLowerCase()

                    .includes(name)

                &&

                (

                    category ===
                    "Category"

                    ||

                    product.category
                    === category

                )

                &&

                (

                    type ===
                    "Product Type"

                    ||

                    product.type
                    === type

                )

                &&

                (

                    status ===
                    "Status"

                    ||

                    product.status
                    === status

                )

            );

        });


    currentPage = 1;


    displayProducts();

}



//=========================================
//          SEARCH EVENTS
//=========================================

searchInputs.forEach(input => {

    input.addEventListener(

        "input",

        applyFilters

    );

});


filterSelects.forEach(select => {

    select.addEventListener(

        "change",

        applyFilters

    );

});


if (searchButton) {

    searchButton.onclick = () => {

        applyFilters();

    };

}



//=========================================
//          CLEAR FILTER
//=========================================

if (clearButton) {

    clearButton.onclick = () => {

        searchInputs.forEach(input => {

            input.value = "";

        });


        filterSelects.forEach(select => {

            select.selectedIndex = 0;

        });


        filteredProducts =
            [...products];


        currentPage = 1;


        displayProducts();

    };

}



//=========================================
//              ADD
//=========================================

if (addButton) {

    addButton.onclick = () => {

        window.location.href =
            "add.html";

    };

}



//=========================================
//              EDIT
//=========================================

function editProduct(id) {

    window.location.href =

        "edit-product.html?id="
        + id;

}



//=========================================
//          DELETE POPUP
//=========================================

function createDeletePopup() {


    if (

        document.getElementById(
            "deletePopup"
        )

    ) {

        return;

    }


    let popup =

        document.createElement(
            "div"
        );


    popup.id = "deletePopup";


    popup.style.cssText = `

    display:none;
    position:fixed;
    inset:0;
    background:
    rgba(0,0,0,0.45);
    justify-content:center;
    align-items:center;
    z-index:9999;

    `;


    popup.innerHTML = `

    <div
    style="

    background:#f6f1f1;
    padding:25px;
    border-radius:20px;
    min-width:330px;
    text-align:center;
    border-top:6px solid #a12828;
    box-shadow:0 10px 30px rgba(0,0,0,.20);

    ">

    <h3
    style="
    color:#a12828;
    margin-bottom:10px;
    ">

    Delete Product?

    </h3>

    <p>

    Are you sure you want
    to delete this product?

    </p>


    <button
    id="cancelDelete"

    style="
    padding:10px 20px;
    margin-right:10px;
    cursor:pointer;
    ">

    Cancel

    </button>


    <button

    id="confirmDelete"

    style="
    padding:10px 20px;
    background:#a12828;
    color:white;
    border:none;
    cursor:pointer;
    border-radius:6px;
    ">

    Delete

    </button>

    </div>

    `;


    document.body
        .appendChild(
            popup
        );


    document
        .getElementById(
            "cancelDelete"
        )

        .onclick = () => {

            closeDeletePopup();

        };


    document
        .getElementById(
            "confirmDelete"
        )

        .onclick = () => {

            deleteProduct();

        };

}



//=========================================
//          OPEN POPUP
//=========================================

function openDeletePopup(id) {

    deleteProductId = id;


    createDeletePopup();


    document
        .getElementById(
            "deletePopup"
        )

        .style.display =

        "flex";

}



//=========================================
//          CLOSE POPUP
//=========================================

function closeDeletePopup() {

    document
        .getElementById(
            "deletePopup"
        )

        .style.display =

        "none";

}



//=========================================
//          DELETE PRODUCT
//=========================================

function deleteProduct() {


    products =

        products.filter(

            product =>

                product.id
                !== deleteProductId

        );


    filteredProducts =
        [...products];


    saveProducts();


    updateDashboard();


    displayProducts();


    closeDeletePopup();

}



//=========================================
//          NEXT PAGE
//=========================================

if (nextButton) {

    nextButton.onclick = () => {


        let totalPages =

            Math.ceil(

                filteredProducts.length
                /
                itemsPerPage

            );


        if (totalPages < 1) {

            totalPages = 1;

        }


        if (

            currentPage
            < totalPages

        ) {

            currentPage++;

            displayProducts();

        }

    };

}



//=========================================
//          PREVIOUS PAGE
//=========================================

if (prevButton) {

    prevButton.onclick = () => {


        if (

            currentPage > 1

        ) {

            currentPage--;

            displayProducts();

        }

    };

}



//=========================================
//          EXIT BUTTON
//=========================================

if (exitButton) {

    exitButton.onclick = () => {

        window.location.href =
            "dashboard.html";

    };

}



//=========================================
//      AUTO REFRESH NEW PRODUCTS
//=========================================

window.addEventListener(

    "focus",

    () => {

        const savedProducts =

            localStorage.getItem(
                "products"
            );


        if (savedProducts) {

            products =

                JSON.parse(
                    savedProducts
                );


            filteredProducts =
                [...products];


            updateDashboard();

            displayProducts();

        }

    }

);



//=========================================
//              START
//=========================================

loadProductsData();

updateDashboard();

displayProducts();


console.log(

    "Neo Galaxy ERP Product Master Loaded Successfully"

);