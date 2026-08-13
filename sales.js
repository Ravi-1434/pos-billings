/* =====================================================
   SALES ORDER ERP JAVASCRIPT
   ===================================================== */


/* ================= INITIAL LOAD ================= */


document.addEventListener("DOMContentLoaded", () => {


    generateOrderNumber();

    setOrderDate();

    loadCustomers();

    addProductRow();


});





/* ================= CUSTOM POPUP ================= */


let popupAction = null;



function showPopup(title, message, action = null) {


    document.getElementById("popupTitle").innerText =
        title;


    document.getElementById("popupMessage").innerText =
        message;


    popupAction = action;



    document.getElementById("popupOverlay")
        .style.display = "flex";


}





document.addEventListener("DOMContentLoaded", () => {


    document.getElementById("popupCancel")
        .onclick = function () {


            document.getElementById("popupOverlay")
                .style.display = "none";


            popupAction = null;


        };





    document.getElementById("popupOk")
        .onclick = function () {


            document.getElementById("popupOverlay")
                .style.display = "none";



            if (popupAction) {


                popupAction();


            }


        };


});








/* ================= ORDER NUMBER ================= */


function generateOrderNumber() {


    let orders =
        JSON.parse(localStorage.getItem("salesOrders")) || [];



    let number = orders.length + 1;



    document.getElementById("salesOrderNo").value =
        "SO-" + String(number).padStart(5, "0");



}







/* ================= DATE ================= */


function setOrderDate() {


    let today = new Date()
        .toISOString()
        .split("T")[0];



    document.getElementById("orderDate").value =
        today;



}








/* ================= CUSTOMER ================= */



function loadCustomers() {


    let customers =
        JSON.parse(localStorage.getItem("customerDashboard")) || [];



    let select =
        document.getElementById("customerSelect");



    customers.forEach(customer => {



        let option =
            document.createElement("option");



        option.value =
            customer.id;



        option.textContent =
            customer.name;



        select.appendChild(option);



    });



}






function loadCustomerDetails() {


    const id =
        document.getElementById("customerSelect").value;



    const customers =
        JSON.parse(localStorage.getItem("customerDashboard")) || [];



    const customer =
        customers.find(c => c.id == id);



    if (!customer) return;





    document.getElementById("customerId").value =
        customer.id;



    document.getElementById("customerName").value =
        customer.name;



    document.getElementById("customerMobile").value =
        customer.phone;



    document.getElementById("customerGST").value =
        customer.gst || "";



    document.getElementById("customerAddress").value =
        customer.address || customer.city;



}








/* ================= PRODUCT ROW ================= */



function addProductRow() {


    let tbody =
        document.getElementById("productTableBody");



    let row =
        document.createElement("tr");



    row.innerHTML = `


<td>


<select class="product-select"
onchange="productChanged(this)">


<option value="">
Select Product
</option>


</select>


</td>



<td>

<input class="price"
readonly>

</td>



<td>

<input class="stock"
readonly>

</td>



<td>

<input type="number"
class="qty"
value="1"
min="1"
oninput="calculateRow(this)">

</td>




<td>

<input class="gst"
readonly>

</td>





<td>

<input type="number"
class="discount"
value="0"
min="0"
oninput="calculateRow(this)">

</td>





<td>

<input class="row-total"
readonly>

</td>





<td>


<button class="remove-btn"
onclick="removeRow(this)">


<i class="fa-solid fa-trash"></i>


</button>


</td>



`;



    tbody.appendChild(row);



    loadProducts(row);



    row.querySelector(".qty")
        .addEventListener("input", function () {


            calculateRow(this);


        });




    row.querySelector(".discount")
        .addEventListener("input", function () {


            calculateRow(this);


        });



}








/* ================= LOAD PRODUCTS ================= */



function loadProducts(row) {



    let products =
        JSON.parse(localStorage.getItem("products")) || [];



    let select =
        row.querySelector(".product-select");



    products.forEach(product => {



        let option =
            document.createElement("option");



        option.value =
            product.id;



        option.textContent =
            product.name;



        select.appendChild(option);



    });



}








/* ================= PRODUCT CHANGE ================= */


function productChanged(select) {



    let row =
        select.closest("tr");



    let products =
        JSON.parse(localStorage.getItem("products")) || [];



    let product =
        products.find(
            p => p.id == select.value
        );



    if (product) {



        row.querySelector(".price").value =
            product.price;



        row.querySelector(".stock").value =
            product.stock;



        row.querySelector(".gst").value =
            product.gst || 18;


        calculateRow(
            row.querySelector(".qty")
        );

        calculateTotal();

    }



}


/* ================= CALCULATE ROW ================= */



function calculateRow(element) {



    let row =
        element.closest("tr");


    let price =
        parseFloat(
            row.querySelector(".price").value
        ) || 0;


    let qty =
        Number(
            row.querySelector(".qty").value
        ) || 0;



    let gst =
        Number(
            row.querySelector(".gst").value
        ) || 0;



    let discount =
        Number(
            row.querySelector(".discount").value
        ) || 0;




    let subtotal =
        price * qty;



    let discountAmount =
        subtotal * discount / 100;



    let taxable =
        subtotal - discountAmount;



    let gstAmount =
        taxable * gst / 100;



    let total =
        taxable + gstAmount;




    row.querySelector(".row-total").value =
        total.toFixed(2);



    calculateTotal();



}








/* ================= TOTAL ================= */


function calculateTotal() {



    let rows =
        document.querySelectorAll("#productTableBody tr");



    let subtotal = 0;

    let discount = 0;

    let gstTotal = 0;

    let grand = 0;




    rows.forEach(row => {


        let price =
            parseFloat(
                row.querySelector(".price").value.replace(/[^\d.]/g, "")
            ) || 0;


        let qty =
            Number(
                row.querySelector(".qty").value
            ) || 0;



        let gst =
            Number(
                row.querySelector(".gst").value
            ) || 0;



        let dis =
            Number(
                row.querySelector(".discount").value
            ) || 0;



        let sub =
            price * qty;



        let disAmt =
            sub * dis / 100;



        let gstAmt =
            (sub - disAmt) * gst / 100;




        subtotal += sub;

        discount += disAmt;

        gstTotal += gstAmt;



    });




    grand =
        subtotal - discount + gstTotal;





    document.getElementById("subTotal")
        .innerHTML =
        "₹" + subtotal.toFixed(2);



    document.getElementById("totalDiscount")
        .innerHTML =
        "₹" + discount.toFixed(2);



    document.getElementById("totalGST")
        .innerHTML =
        "₹" + gstTotal.toFixed(2);



    document.getElementById("grandTotal")
        .innerHTML =
        "₹" + grand.toFixed(2);



    calculateBalance();



}








/* ================= BALANCE ================= */


function calculateBalance() {



    let grand =
        Number(
            document.getElementById("grandTotal")
                .innerText.replace("₹", "")
        ) || 0;



    let paid =
        Number(
            document.getElementById("paidAmount").value
        ) || 0;



    document.getElementById("balanceAmount")
        .innerHTML =
        "₹" + (grand - paid).toFixed(2);



}








/* ================= REMOVE ROW ================= */


function removeRow(btn) {



    btn.closest("tr").remove();



    calculateTotal();



}








/* ================= SAVE ORDER ================= */



function saveOrder() {



    let products = [];



    let rows =
        document.querySelectorAll("#productTableBody tr");




    rows.forEach(row => {



        let select =
            row.querySelector(".product-select");



        let qty =
            Number(
                row.querySelector(".qty").value
            );



        products.push({



            id:
                select.value,



            name:
                select.options[select.selectedIndex].text,



            price:
                row.querySelector(".price").value,



            qty: qty,



            gst:
                row.querySelector(".gst").value,



            discount:
                row.querySelector(".discount").value,



            total:
                row.querySelector(".row-total").value



        });



    });







    let order = {



        orderNo:
            document.getElementById("salesOrderNo").value,



        date:
            document.getElementById("orderDate").value,



        customer: {


            id:
                customerId.value,


            name:
                customerName.value,


            mobile:
                customerMobile.value,


            gst:
                customerGST.value,


            address:
                customerAddress.value


        },



        products: products,



        grandTotal:
            grandTotal.innerText,



        paid:
            paidAmount.value,



        balance:
            balanceAmount.innerText



    };







    let orders =
        JSON.parse(localStorage.getItem("salesOrders"))
        || [];




    orders.push(order);




    localStorage.setItem(
        "salesOrders",
        JSON.stringify(orders)
    );




    updateStock(products);





    localStorage.setItem(
        "currentInvoice",
        JSON.stringify(order)
    );





    showPopup(
        "Success",
        "Sales Order Saved Successfully"
    );



}









/* ================= STOCK UPDATE ================= */



function updateStock(items) {



    let products =
        JSON.parse(localStorage.getItem("products"))
        || [];




    items.forEach(item => {



        let product =
            products.find(
                p => p.id == item.id
            );



        if (product) {



            product.stock -= Number(item.qty);



        }



    });




    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );



}








/* ================= DRAFT ================= */



function saveDraft() {



    localStorage.setItem(
        "salesDraft",
        JSON.stringify({

            date: new Date(),

            products:
                document.getElementById("productTableBody").innerHTML

        })

    );




    showPopup(
        "Draft Saved",
        "Sales Draft Saved Successfully"
    );



}








/* ================= INVOICE ================= */



function generateInvoice() {



    showPopup(

        "Generate Invoice",

        "Generate invoice for this order?",


        function () {



            saveOrder();



            window.location.href =
                "invoice.html";



        }

    );



}








function printInvoice() {



    window.print();



}








/* ================= CLEAR ================= */



function clearSale() {



    showPopup(

        "Clear Order",

        "Do you want to clear this Sales Order?",


        function () {



            location.reload();



        }


    );



}








function goDashboard() {



    window.location.href =
        "dashboard.html";



}