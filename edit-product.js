let products =
    JSON.parse(localStorage.getItem("products"))
    || [];



const urlParams =
    new URLSearchParams(window.location.search);



const productId =
    urlParams.get("id");



let currentProduct =
    products.find(
        p => p.id === productId
    );





if (!currentProduct) {

    alert("Product not found");

    window.location.href = "product.html";

}




document.getElementById("productId").value =
    currentProduct.id;


document.getElementById("productName").value =
    currentProduct.name;


document.getElementById("company").value =
    currentProduct.company;


document.getElementById("type").value =
    currentProduct.type;


document.getElementById("price").value =
    currentProduct.price;


document.getElementById("stock").value =
    currentProduct.stock;


document.getElementById("status").value =
    currentProduct.status;


document.getElementById("image").value =
    currentProduct.image;



document.getElementById("previewImage").src =
    currentProduct.image;




document.getElementById("image")
    .addEventListener(
        "input",
        function () {

            document.getElementById("previewImage").src = this.value;

        }
    );





function saveProduct() {


    currentProduct.name =
        document.getElementById("productName").value;


    currentProduct.company =
        document.getElementById("company").value;


    currentProduct.type =
        document.getElementById("type").value;


    currentProduct.price =
        document.getElementById("price").value;


    currentProduct.stock =
        Number(
            document.getElementById("stock").value
        );


    currentProduct.status =
        document.getElementById("status").value;


    currentProduct.image =
        document.getElementById("image").value;



    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );







    window.location.href = "product.html";


}





function goBack() {


    window.location.href = "product.html";


}