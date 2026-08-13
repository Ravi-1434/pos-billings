/*========================================
            INVOICE JAVASCRIPT
========================================*/


document.addEventListener("DOMContentLoaded", () => {

    loadInvoice();

});





/*========================================
            LOAD INVOICE
========================================*/


function loadInvoice() {


    let invoice = JSON.parse(
        localStorage.getItem("currentInvoice")
    );



    if (!invoice) {

        alert("Invoice data not found");

        return;

    }





    /*================ COMPANY DETAILS ================*/


    document.getElementById("companyName").innerHTML =

        localStorage.getItem("companyName")
        ||
        "Stackly";



    document.getElementById("companyGST").innerHTML =

        localStorage.getItem("companyGST")
        ||
        "XXXXXXXXXX6889";



    document.getElementById("companyAddress").innerHTML =

        localStorage.getItem("companyAddress")
        ||
        "Company Address : Bengaluru";







    /*================ INVOICE DETAILS ================*/


    document.getElementById("invoiceNo").innerHTML =

        invoice.orderNo
        ||
        generateInvoiceNumber();




    document.getElementById("invoiceDate").innerHTML =

        invoice.date
        ||
        new Date().toLocaleDateString();







    /*================ CUSTOMER DETAILS ================*/


    document.getElementById("billCustomerName").innerHTML =

        invoice.customer?.name
        ||
        "";



    document.getElementById("billMobile").innerHTML =

        invoice.customer?.mobile
        ||
        "";



    document.getElementById("billGST").innerHTML =

        invoice.customer?.gst
        ||
        "";



    document.getElementById("billAddress").innerHTML =

        invoice.customer?.address
        ||
        "";








    /*================ PRODUCT DETAILS ================*/


    let tbody = document.getElementById("invoiceItems");


    tbody.innerHTML = "";



    let subtotal = 0;

    let discountTotal = 0;

    let gstTotal = 0;





    let products = invoice.products || [];




    products.forEach((item, index) => {



        let name =

            item.name
            ||
            item.product
            ||
            "";




        let price = Number(

            item.price

        )
            ||
            0;





        let qty = Number(

            item.qty

        )
            ||
            0;





        let gst = Number(

            item.gst
            ||
            item.gstPercent

        )
            ||
            0;





        let discount = Number(

            item.discount

        )
            ||
            0;






        let amount =

            price * qty;






        let discountAmount =

            (amount * discount) / 100;






        let taxableAmount =

            amount - discountAmount;






        let gstAmount =

            (taxableAmount * gst) / 100;






        let finalAmount =

            taxableAmount + gstAmount;






        subtotal += amount;


        discountTotal += discountAmount;


        gstTotal += gstAmount;








        let row = document.createElement("tr");



        row.innerHTML = `

        <td>

        ${index + 1}

        </td>



        <td>

        ${name}

        </td>



        <td>

        ${qty}

        </td>



        <td>

        ₹${price.toFixed(2)}

        </td>



        <td>

        ${gst}%

        </td>



        <td>

        ${discount}%

        </td>



        <td>

        ₹${finalAmount.toFixed(2)}

        </td>


        `;



        tbody.appendChild(row);



    });










    /*================ TOTAL CALCULATION ================*/


    let grandTotal =

        subtotal
        -
        discountTotal
        +
        gstTotal;








    document.getElementById("invoiceSubtotal").innerHTML =


        "₹" + subtotal.toFixed(2);





    document.getElementById("invoiceDiscount").innerHTML =


        "₹" + discountTotal.toFixed(2);






    document.getElementById("invoiceGST").innerHTML =


        "₹" + gstTotal.toFixed(2);






    document.getElementById("invoiceGrandTotal").innerHTML =


        "₹" + grandTotal.toFixed(2);










    /*================ PAYMENT DETAILS ================*/


    let paid = Number(invoice.paid)
        ||
        0;



    document.getElementById("invoicePaid").innerHTML =


        "₹" + paid.toFixed(2);







    let balance = Number(

        String(invoice.balance || 0)

            .replace("₹", "")

    )
        ||
        (
            grandTotal - paid
        );






    document.getElementById("invoiceBalance").innerHTML =


        "₹" + balance.toFixed(2);



}










/*========================================
        AUTO INVOICE NUMBER
========================================*/


function generateInvoiceNumber() {


    let invoices = JSON.parse(

        localStorage.getItem("invoices")

    )
        ||
        [];



    let number = invoices.length + 1;



    return (

        "INV-" +

        String(number)

            .padStart(5, "0")

    );


}









/*========================================
            PRINT
========================================*/


function printInvoice() {


    window.print();


}









/*========================================
            PDF DOWNLOAD
========================================*/


function downloadPDF() {



    let element =

        document.querySelector(".invoice-container");



    let options = {


        margin: 10,


        filename: "Invoice.pdf",



        image: {

            type: "jpeg",

            quality: .98

        },



        html2canvas: {

            scale: 2

        },



        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait"

        }


    };






    if (typeof html2pdf !== "undefined") {


        html2pdf()

            .set(options)

            .from(element)

            .save();


    }

    else {


        alert(

            "PDF library not loaded"

        );


    }



}