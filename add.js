/*=========================================
            ADD PRODUCT JS
=========================================*/

const productForm = document.getElementById("productForm");

const productName = document.getElementById("productName");
const companyName = document.getElementById("companyName");
const productType = document.getElementById("productType");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const productStatus = document.getElementById("productStatus");
const productImage = document.getElementById("productImage");

const successMessage = document.getElementById("successMessage");



/*=========================================
        INPUT FILTERS
=========================================*/

// Product Name

productName.addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z0-9\s&().-]/g, "");

});


// Company Name

companyName.addEventListener("input", function () {

    this.value = this.value.replace(/[^a-zA-Z0-9\s&().-]/g, "");

});


// Price

productPrice.addEventListener("input", function () {

    if (this.value < 0) {

        this.value = "";

    }

});


// Stock

productStock.addEventListener("input", function () {

    if (this.value < 0) {

        this.value = "";

    }

});



/*=========================================
        CAPITALIZE WORDS
=========================================*/

function capitalize(text) {

    return text
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, function (letter) {

            return letter.toUpperCase();

        });

}



/*=========================================
        IMAGE URL CHECK
=========================================*/

function isValidImage(url) {

    if (url.trim() === "") return true;

    return /^(https?:\/\/.*\.(png|jpg|jpeg|gif|webp|svg))$/i.test(url);

}



/*=========================================
        FORM SUBMIT
=========================================*/

productForm.addEventListener("submit", function (e) {

    e.preventDefault();



    let name = capitalize(productName.value);

    let company = capitalize(companyName.value);

    let price = Number(productPrice.value);

    let stock = Number(productStock.value);

    let image = productImage.value.trim();



    /*=============================
            VALIDATIONS
    =============================*/

    if (name.length < 3) {

        alert("Enter valid Product Name.");

        productName.focus();

        return;

    }



    if (company.length < 2) {

        alert("Enter valid Company Name.");

        companyName.focus();

        return;

    }



    if (price <= 0 || isNaN(price)) {

        alert("Price must be greater than 0.");

        productPrice.focus();

        return;

    }



    if (stock < 0 || isNaN(stock)) {

        alert("Enter valid Stock Quantity.");

        productStock.focus();

        return;

    }



    if (!isValidImage(image)) {

        alert("Enter a valid Image URL.");

        productImage.focus();

        return;

    }



    /*=============================
        GET SAVED PRODUCTS
    =============================*/

    let products = JSON.parse(localStorage.getItem("products")) || [];



    /*=============================
        DUPLICATE CHECK
    =============================*/

    let duplicate = products.some(function (item) {

        return item.name.toLowerCase() === name.toLowerCase();

    });

    if (duplicate) {

        alert("Product already exists.");

        productName.focus();

        return;

    }



    /*=============================
        AUTO PRODUCT ID
    =============================*/

    let idNumber = 1;

    if (products.length > 0) {

        let lastId = products[products.length - 1].id;

        idNumber = parseInt(lastId.replace("PR", "")) + 1;

    }

    let newId = "PR" + String(idNumber).padStart(3, "0");



    /*=============================
        DEFAULT IMAGE
    =============================*/

    if (image === "") {

        image = "https://placehold.co/60x60";

    }



    /*=============================
        CREATE PRODUCT
    =============================*/

    const newProduct = {

        id: newId,

        name: name,

        company: company,

        category: productType.value,

        type: productType.value,

        price: "£" + price.toFixed(2),

        stock: stock,

        status: productStatus.value,

        image: image

    };



    /*=============================
        SAVE
    =============================*/

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));



    console.log(products);



    /*=============================
        SUCCESS MESSAGE
    =============================*/

    successMessage.classList.add("show");



    productForm.reset();



    /*=============================
        REDIRECT
    =============================*/

    setTimeout(function () {

        window.location.href = "product.html";

    }, 1500);

});



/*=========================================
        BACK BUTTON
=========================================*/

document.querySelector(".back-btn").addEventListener("click", function (e) {

    e.preventDefault();

    window.location.href = "product.html";

});