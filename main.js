function validate() {
    newArray = new Array();

    if (validationFirstAndLastName() == false) {
        return;
    } else if (validatePostCode() == false) {
        return;
    } else if (validatePhoneNumber() == false) {
        return;
    } else if (validateEmail() == false) {
        return;
    } else if (validateDates() == false) {
        return;
    } else if (validateIMEI() == false) {
        return;
    } else {

        var consumer = document.getElementById('consumer').checked;
        var business = document.getElementById('business').checked;
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var phoneNumber = document.getElementById('phoneNumber').value;
        var email = document.getElementById('email').value;
        var purcahseDate = document.getElementById('purcahseDate').value;
        var repairDate = document.getElementById('repairDate').value;
        //var underWarrenty = validateWarrenty();//This only needs to check if it is under warrenty.
        if ($('#warrenty').is(':checked') && validateWarrenty() == "Under Warrenty") {
            //This means that if the user accidentally left the warrenty box checked, then the purchase date is invalid it will avoid a warrenty being applied.
            underWarrenty = true;
        } else {
            underWarrenty = false;
        }

        var IMEI = document.getElementById('imeiNumber').value;
        var street = document.getElementById('street').value;
        var suburb = document.getElementById('suburb').value;
        var city = document.getElementById('city').value;
        var postCode = document.getElementById('postCode').value;
        var modelNumber = document.getElementById('modelNumber').value;

        var title = document.getElementById("title");
        var selectedTitle = title.options[title.selectedIndex].text;

        var make = document.getElementById("make");
        var selectedMake = make.options[make.selectedIndex].text;

        //var courtesyPhone = document.getElementById('courtesyPhone');
        //var selectedCoutesyPhone = courtesyPhone.options[courtesyPhone.selectedIndex].text;

        //Below is code in case the user has not entered any cortesy equipment, or only half.
        try {
            var selectedCoutesyPhone = document.getElementById("itemCostTable").rows[1].cells[0].innerHTML + " " + document.getElementById("itemCostTable").rows[2].cells[0].innerHTML;
        } catch (e) {
            try {
                var selectedCoutesyPhone = document.getElementById("itemCostTable").rows[1].cells[0].innerHTML;
            } catch (e) {
                var selectedCoutesyPhone = "No courtesy equipment";
            }
        }


        var fault = document.getElementById('fault');
        var selectedFault = fault.options[fault.selectedIndex].text;

        var description = document.getElementById('description').value;

        //var bond = "test";
        //var serviceFee = "test";
        //var total = "test";
        //var totalGst = "test";
        //var gst = "test";

        var bond = document.getElementById('bond').value;
        var serviceFee = document.getElementById('serviceFee').value;
        var total = document.getElementById('total').value;
        var totalGst = document.getElementById('totalGST').value;
        var gst = document.getElementById('gst').value;
        //console.log(customer);
        //Calls the add invoice to add all the data defined above to the database.
        addInvoice(consumer, business, firstName, lastName, phoneNumber, email, purcahseDate, repairDate, underWarrenty, IMEI, street, suburb, city, postCode, selectedTitle, selectedMake, selectedCoutesyPhone, selectedFault, description, modelNumber, bond, serviceFee, total, totalGst, gst);

        var opened = window.open("");
        opened.document.write("<!DOCTYPE html><html><head><script src=\"main.js\"></script><link rel=\"stylesheet\" href=\"style.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js\"></script><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css\"integrity=\"sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z\" crossorigin=\"anonymous\"><script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js\"integrity=\"sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV\"crossorigin=\"anonymous\"></script><script src=\"https://code.jquery.com/jquery-3.5.1.slim.min.js\"integrity=\"sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj\"crossorigin=\"anonymous\"></script><script src=\"https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js\"integrity=\"sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN\"crossorigin=\"anonymous\"></script></head><body><section><div class=\"repair\"><h1>Repair Booking</h1><h3 class=\"text-right px-3\">Amount Due</h3><h4 class=\"text-right px-3\" id=\"outputAmountDue\"></h4></div></section><div class=\"text-center\"><a class=\"previous round selbutton\" onclick=\"previous()\">&#8249;</a><a class=\"next round selbutton\" onclick=\"next()\">&#8250;</a></div><div class=\"px-2\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm\"><h4>Customer</h4><p id=\"outPutfullName\">Full Name:</p><p id=\"outputStreet\">Street:</p><p id=\"outputSuburb\">Suburb:</p><p id=\"outputCity\">City:</p><p id=\"outputPostCode\">PostCode:</p><p id=\"outputPhoneNumber\">Phone Number</p><p id=\"outputEmail\">Email:</p></div><div class=\"col-sm\"></div><div class=\"col-sm\"><h4>Repair Job</h4><p class=\"ml-5\" id=\"outputJobNumber\">Job number:</p><p class=\"ml-5\" id=\"outputInvoice\">Invoice Date:</p></div></div></div><hr><div class=\"container\"><div class=\"row\"><div class=\"col-sm\"><div><h2>Repair Details</h2></div><div><p id=\"outPutpurchaseDate\">Purcahse Date:</p><p id=\"outputRepairDate\">Repair Date:</p><p id=\"outputWarrenty\">Under Warrenty:</p><p id=\"outputIMEINumber\">IMEI Number:</p><p id=\"outputDeviceMake\">Device Make:</p><p id=\"outputFault\">Fault category:</p><p id=\"outputDescription\">Description:</p><h4>Cortesy Phone:</h4><p id=\"outputItems\">Item(s):</p><p id=\"outputCost\">Cost:</p></div><div class=\"col-sm\"></div></div></div></div><div class=\"container\"><div class=\"row\"><div class=\"col-sm\"><div><div class=\"col-sm\"></div><div class=\"text-right px-4 py-2\"><div class=\"col-sm\"><h2>Totals</h2><p id=\"outputBond\">Bond:</p><p id=\"outputServiceFee\">Service Fee:</p><p id=\"outputTotal\">Total:</p><p id=\"outputGST\">GST:</p><p id=\"outputTotalGST\">Total(+GST):</p></div></div></div></div></div></div></div><hr><div class=\"px-5\"><h4>WeFixPhones&co</h4><p>+64 021234567</p><p>wefixphones@example.co.nz</p><p onload=\"displayInvoices()\">4322 Ritter Street, Anniston, Basin, New Zealand, 4543</p></div></body><script type=\"text/javascript\">displayInvoices();</script></html>");
        //displayInvoices();

    }

}

console.log('logging');

//DATABASE----------------------------------------------------------
//Based of lab work.
//Brower checks if indeDB will work.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
//Browser support IndexedDB API or not?
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}



//db is defined as the dabase
var db;
//Open database
var request = window.indexedDB.open("PhoneRepairSystem", 1);

//If an onerror is called this will log it to console.
request.onerror = function (event) {
    console.log("Database Error.");
};


//If succsessful the database (db) and sends a request (request). As defined above.

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};



request.onupgradeneeded = function (event) {
    //When openupgrade is called the database will be created as one does not alredy exist.

    var db = event.target.result;
    //Create a new table called "invoice" and assign it to a "objectStore" variable
    // the primary key of the databse if autoincremented. 
    var objectStore;
    if (!db.objectStoreNames.contains('invoice')) {

        objectStore = db.createObjectStore('invoice', { autoIncrement: true });
    }

}



//Adding to database
function addInvoice(consumerData, businessData, firstNameData, lastNameData, phoneNumberData, emailData, purchaseDateData, repairDateData, warrentyData, IMEIData, streetData, suburbData, cityData, postCodeData, titleData, makeData, courtesyPhoneData, faultData, descriptionData, modelData, bond, serviceFee, total, totalGST, gst) {
    //Get data entered
    //consumer, business, firstName, lastName, phoneNumber, email, purcahseDate, repairDate, underWarrenty, IMEI, street, suburb, city, postCode, selectedTitle, selectedMake, selectedCoutesyPhone, selectedFault, description, modelNumber);
    var consumer = consumerData;
    var business = businessData;
    var firstName = firstNameData;
    var lastName = lastNameData;
    var phoneNumber = phoneNumberData;
    var email = emailData;
    var purcahseDate = purchaseDateData;
    var repairDate = repairDateData;
    var underWarrenty = warrentyData;
    var IMEI = IMEIData;
    var street = streetData;
    var suburb = suburbData;
    var city = cityData;
    var postCode = postCodeData;
    var selectedTitle = titleData;
    var selectedMake = makeData;
    var selectedCoutesyPhone = courtesyPhoneData;
    var selectedFault = faultData;
    var description = descriptionData;
    var modelNumber = modelData;
    var bond = bond;
    var serviceFee = serviceFee;
    var total = total;
    var totalGST = totalGST;
    var gst = gst;

    var invoiceID = 0;

    //ASYNCHRONOOUS TRANSACTION: ISSUE
    //Traverse all the records of the data table by using the pointer object IDBCursor
    //Read more here: https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor

    var tx = db.transaction("invoice", "readwrite");
    //Allows the database to be read/written

    tx.objectStore("invoice").openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        //For each cursor (each invoice object)
        if (cursor) {
            //Get id
            let id = cursor.key;
            if (id >= invoiceID) {
                invoiceID = id;
            }
            //Move to next object
            cursor.continue();
        } else {
            //alert("No more entries!");
        }
    };

    //WAIT UNTIL THE TRANSACTION COMPLETE ==> ADD NEW INVOICE
    tx.oncomplete = function () {
        //Read back updated data once complete.

        db.transaction("invoice").objectStore("invoice").get(0).onsuccess = function (event) {
            //Increase the invoiceID by 1, this is so it can be added to the object. This is also done by autoIncrement above.
            invoiceID++;
            alert("invoiceID =" + invoiceID);

            //Open a transaction to access to table "invoice" in the mode of "readwrite" & add a new invoice
            var request = db.transaction(["invoice"], "readwrite")
                .objectStore("invoice")
                .add({
                    id: invoiceID, consumer: consumer, business: business, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber,
                    email: email, purcahseDate: purcahseDate, repairDate: repairDate,
                    underWarrenty: underWarrenty, IMEI: IMEI, street: street, suburb: suburb, city: city,
                    postCode: postCode, selectedTitle: selectedTitle, selectedMake: selectedMake, selectedCoutesyPhone: selectedCoutesyPhone,
                    selectedFault: selectedFault, description: description, modelNumber: modelNumber, bond: bond, serviceFee: serviceFee, total: total, totalGST: totalGST, gst: gst
                });

            //If the addition was successful, alert an successful message
            request.onsuccess = function (event) {
                alert("SUCCESSFUL! New invoice = " + invoiceID + " has been added to your database.");
            };
            //If the addition failed, alert an error message
            request.onerror = function (event) {
                alert("ERROR! Unable to add a new invoice to your database! invoiceID =" + invoiceID);
            }
        }
    }
}


//Placeholder is the index number of the database that this code will access. This allows the user to go back, and forward through the invoices.
var placeholder = 1;
var placeHolderSettable = true;

function setplaceHolder() {
    //Read more here: https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/count
    //once called by the display function this code below opens a new instance of the database, then counts the databas and sets the placeholder (newest entry). Once the placeholder is set, this is then displayed.
    if (placeHolderSettable == true) {
        //Open databse 
        var transaction = db.transaction(['invoice'], 'readonly');
        var objectStore = transaction.objectStore('invoice');
        //Request a count
        var countRequest = objectStore.count();
        countRequest.onsuccess = function () {
            console.log(countRequest.result + 1);
            //Set placeholder to the display function will now display the newest entry. +1 needs to be added as the count starts from 0 and the get starts from 0.
            placeholder = countRequest.result + 1;
            //Set placeholder to false so it does not activate again unless the page is reloaded.
            placeHolderSettable = false;
            //Calls display, now with the new placeholder
            displayInvoices();
        }
    }
}


function next() {
    //Adds one to the placeholder, this is so the object can be found.
    placeholder = placeholder + 1;
    displayInvoices();
    //Calls display so the new item can be displayed

}

function previous() {
    //Takes away one from the placeholder, this is so the object can be found.
    //Avoids going into negatives.
    if (placeholder == 1) {
        //Don't change the number
    } else {
        placeholder = placeholder - 1;
        displayInvoices();
        //Calls display so the new item can be displayed
    }
}





function displayInvoices() {
    //calls setPlaceholder to get the lastest item if the page has JUST been loaded.

    //Requests to open the databse again.
    var request = window.indexedDB.open("PhoneRepairSystem", 1);
    //Wais for databse to be open before displaying.
    //If succsessful return the result 

    request.onsuccess = function (event) {
        db = request.result;
        //console.log("success: " + db);

        //Read more :https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
        //Then use the result to find the object.
        db.transaction("invoice").objectStore("invoice").get(placeholder).onsuccess = function (event) {
            //From the found object, log out the information.

            //DEBUG console.log(event.target.result.consumer);
            //DEBUG: console.log("Full Name: " + event.target.result.selectedTitle + " "+ event.target.result.firstName + " " + event.target.result.lastName);

            document.getElementById('outPutfullName').innerText = "Full Name: " + event.target.result.selectedTitle + " " + event.target.result.firstName + " " + event.target.result.lastName;

            document.getElementById('outputStreet').innerText = "Street: " + event.target.result.street;

            document.getElementById('outputSuburb').innerText = "Suburb: " + event.target.result.suburb;

            document.getElementById('outputCity').innerText = "City: " + event.target.result.city;

            document.getElementById('outputPhoneNumber').innerText = "Phone Number: " + event.target.result.phoneNumber;

            document.getElementById('outputEmail').innerText = "Email: " + event.target.result.email;

            //Set the job number to the id.
            document.getElementById('outputJobNumber').innerText = "Job number: " + event.target.result.id;
            //Sets the invoice date to the day the form was created.

            var date = Date();

            document.getElementById('outputInvoice').innerText = "Invoice Date: " + date.toString();
            //document.getElementById('outputPaymentDue').innerText = "Payment Due: ";// +date.setDate(date.getDate + 5).toString();
            document.getElementById('outPutpurchaseDate').innerText = "Purcahse Date: " + event.target.result.purcahseDate;
            document.getElementById('outputRepairDate').innerText = "Repair Date: " + event.target.result.repairDate;
            if (event.target.result.underWarrenty == true) {
                document.getElementById('outputWarrenty').innerText = "Under Warrenty: " + "✔";
            } else {
                document.getElementById('outputWarrenty').innerText = "Under Warrenty: " + "✖";
            }

            document.getElementById('outputIMEINumber').innerText = "IMEI Number: " + event.target.result.IMEI;

            document.getElementById('outputDeviceMake').innerText = "Device Make: " + event.target.result.selectedMake;

            document.getElementById('outputFault').innerText = "Fault category: " + event.target.result.selectedFault;

            document.getElementById('outputDescription').innerText = "Description: " + event.target.result.description;

            document.getElementById('outputItems').innerText = "Item(s): " + event.target.result.selectedCoutesyPhone;

            document.getElementById('outputCost').innerText = "Cost: $" + event.target.result.bond;

            document.getElementById('outputBond').innerText = innerText = "Bond: " + event.target.result.bond

            document.getElementById('outputServiceFee').innerText = "Service Fee: $" + event.target.result.serviceFee;
            document.getElementById('outputTotal').innerText = "Total: $" + event.target.result.total;
            document.getElementById('outputGST').innerText = "GST: $" + event.target.result.gst;
            document.getElementById('outputTotalGST').innerText = "Total(+GST): $" + event.target.result.totalGST;
            document.getElementById('outputAmountDue').innerText = "$" + event.target.result.totalGST;
            //innerText = event.target.result.repairDate.toString();
            document.getElementById('outputPostCode').innerText = "PostCode: " + event.target.result.postCode;
            //console.log(event.target.result.street);


            if (placeHolderSettable == true) {
                setplaceHolder();
                //Look, I'm gonna be honest this code is not perfect but it works. 
                //This code is a work around for an issue with opening the database with setplaceHolder();
            }
        };

    };
}

//Database-----------------------------------------------------------




function validationFirstAndLastName() {
    //fnln code below rejects any inputs that are not a-zA-Z white space and -.
    var fnlnNameReject = /^[a-zA-Z\s-]+$/;
    var fn = document.getElementById("firstName").value;
    var ln = document.getElementById("lastName").value;


    if (fn.match(fnlnNameReject) && ln.match(fnlnNameReject)) {
        //CORRECT!
        //If first and last name valid this will return true
        //DEBUG: console.log("is letter a-z with space" + fn)
        return true;
    } else {
        //If not faild this will alert the user and return false.
        alertUser("First or Last Name Contains a number or invalid symbol.");
        return false;
    }
}

function validatePostCode() {
    //The value of postCode is gathered with the code below.
    var postcode = document.getElementById('postCode').value.toString();
    //DEBUG: console.log(postcode);

    if (postcode.length == 4) {
        //CORRECT!
        //If the postcode is valid this will return true.
        //DEBUG: console.log("Email is less than 4" + postcode);
        return true;
    } else {
        //If the postcode is invalid this will retun false.
        alertUser("INVALID POST CODE!");
        return false;
    }
}

function validatePhoneNumber() {
    //Phone number
    var phoneNumber = document.getElementById('phoneNumber').value.toString();
    //DEBUG: console.log(phoneNumber);
    //Code below accepts most number patterns that beloing to phone numbers.
    const phoneNumbervalidation = /(?!:\A|\s)(?!(\d{1,6}\s+\D)|((\d{1,2}\s+){2,2}))(((\+\d{1,3})|(\(\+\d{1,3}\)))\s*)?((\d{1,6})|(\(\d{1,6}\)))\/?(([ -.]?)\d{1,5}){1,5}((\s*(#|x|(ext))\.?\s*)\d{1,5})?(?!:(\Z|\w|\b\s))/gm;
    //Phone number verification reject (Line above) refrenced from regexr.com/2rhsc by Dan G. Switzer, II


    if (phoneNumber.match(phoneNumbervalidation)) {
        //CORRECT!
        //If phone number is valid the, this will return true.
        //DEBUG: console.log("working" + phoneNumber);
        return true;
    } else {
        //Else the user will be alerted to enter in another phone number.
        alertUser("The phone number: " + phoneNumber + " seems to be invalid. Try another format.");
        return false;
    }
}


function validateEmail() {
    //Email got from document as seen below.
    var email = document.getElementById('email').value.toString();
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    //Email verification (Line above) uses the RFC2822 standard for verfication. This is refrenced from regexr.com/2rhq7 by Tripleaxis.

    if (email.match(emailValidation)) {
        //CORRECT!
        //DEBUG: console.log("email working: " + email);
        return true;
    } else {
        //If the email does not match the RFC2822 standard, this below will be logged out.
        alertUser("Email Verification Failed please try a differnet format: " + email);
        return false;
    }
}


function validateDates() {
    //NOTE: This could be done with JQuery https://eonasdan.github.io/bootstrap-datetimepicker/

    //var date = document.getElementById('purcahseDate').value.toString();
    //Check if real date.
    //console.log("input: " + date);

    //Date does not need to be checked as it is not possible to enter in a wrong date with the date picker.
    //Although for good measure, this try cath will send an error if, (somehow) the user entered a wrong date.
    try {
        var purcahseDate = new Date(document.getElementById("purcahseDate").value); //Must NOT be in future
        var repairDate = new Date(document.getElementById("repairDate").value); //Must NOT be in the future, must be later than purcahse
        //As time creates problems with comparing dates (As time is taken into account), time has been reset!
        purcahseDate.setHours(0, 0, 0, 0);
        repairDate.setHours(0, 0, 0, 0);
    } catch (e) {
        console.log("Something went wrong!")
        alertUser("DATE ERROR!")
    }


    var today = new Date();
    //Reset time!
    today.setHours(0, 0, 0, 0);

    //new Date() automatically gets the current date. Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

    //DEBUG: console.log(today);
    //OLD CODE: var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //From https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript

    if (purcahseDate > today || repairDate > today) {
        //If purcahseDate is more than today or repairDate is more than today this will tell the user below.
        //DEBUG: console.log("Purcahse or Repair date is in future. Please try again.");
        //DEBUG: console.log('purcahseDate > today = ' + purcahseDate + today + "|| >" + repairDate + today)
        alertUser("Purcahse or Repair date is in future. Please try again!");
        return false;
    } else if (repairDate < purcahseDate) {
        //If repair date is less than purcahse date, this will alert the user.
        alertUser("repair date is before purcase date. Please try again!")
        return false;
        //DEBUG: console.log("repair date is before purcase date. Please try again.");
    } else {
        //CORRECT!
        //If everthing is valid this will allow the dates to be used.
        console.log("Seems to be correct");
        return true;
    }
}


function validateWarrenty() {
    //Warrenty, disabeld after 24 months
    var purchaseDate = new Date(document.getElementById("purcahseDate").value);
    //Above is the purcahse date of the phone, this is used to create a Date object.
    //DEBUG: console.log(purchaseDate);

    var today = new Date();
    //today will be created as the date today as this is the default for a Date object.

    today.setMonth(today.getMonth() - 24); //Reduce todays date by 24 months

    if (purchaseDate <= today) {
        //if purchase date is less than the today
        console.log("out of date");
        document.getElementById('warrenty').hidden = true;
        //Above hides the warrenty button if warrenty is out of date.
        return "No Warrenty";
    } else {
        //CORRECT!
        document.getElementById('warrenty').hidden = false;
        //Above does not hide if the warrenty is valid.
        //DEBUG: console.log("Still in date");
        return "Under Warrenty";
    }
}


function validateIMEI() {
    //IMEI Number in document.
    var imeiNumber = document.getElementById("imeiNumber").value;

    if (imeiNumber.length >= 15) {
        //If the number is too long this will tell the user.
        alertUser("YOUR IMEI NUMBER IS TOO LONG!");
        return false;
    } else {
        //CORRECT
        //If a number is not too long this will return true.
        //DEBUG: console.log("IMEI Number not too long");
        return true;
    }
}

function alertUser(message) {
    //Allows a message to be taken in and sent to the user through an alert.
    alert(message);
}

//Global variables to keep track of things.
var ableToAdd = true;
var ableToAddCharger = true;
var totalCost = 0;
var serviceFee = 0;


function addTocourtesyTable() {
    //The pricipal of this function is when the add button is clicked, the table (and variables) will be updated with new information.

    if (ableToAdd == true && document.getElementById('courtesyPhone').value == "iPhone 7") {
        //In this code below, if the value of the selector == 'courtesyPhone' the table called 'table' will be found and new rows and cells added.

        var table = document.getElementById('table');
        var row = table.insertRow(1);
        var cellItem = row.insertCell(0);
        var cellCost = row.insertCell(1);
        //The cells the need to be updated with the price of the phone, in this case 275.
        cellCost.innerText = "275";
        totalCost += 275;
        //Adds 275 to the total.
        cellItem.innerText = document.getElementById('courtesyPhone').value;
        ableToAdd = false;
        //Disables the ability to add a new phone. Although as ableToAddCharger is still enabled below, so you can add a charger.

    } else if (ableToAdd == true && document.getElementById('courtesyPhone').value == "Other") {
        //In this code below, if the value of the selector == 'courtesyPhone' and other is selected. The table called 'table' will be found and new rows and cells added.

        var table = document.getElementById('table');
        var row = table.insertRow(1);
        var cellItem = row.insertCell(0);
        var cellCost = row.insertCell(1);
        //The cells the need to be updated with the price of the phone, in this case 275.
        cellCost.innerText = "100";
        //Adds 100 to the total.
        totalCost += 100;
        cellItem.innerText = document.getElementById('courtesyPhone').value;
        ableToAdd = false;
        //Disables the ability to add a new phone. Although as ableToAddCharger is still enabled below, so you can add a charger.
    } else if (ableToAddCharger == true && document.getElementById('courtesyPhone').value == "Charger") {
        //In this code below, if the value of the selector == 'courtesyPhone' and charger is selected. The table called 'table' will be found and new rows and cells added.
        var table = document.getElementById('table');
        var row = table.insertRow(1);
        var cellItem = row.insertCell(0);
        var cellCost = row.insertCell(1);
        //The cells the need to be updated with the price of the charger, in this case 30.
        cellCost.innerText = "30";
        totalCost += 30;
        cellItem.innerText = document.getElementById('courtesyPhone').value;
        ableToAddCharger = false;
        //Disables the ability to add a new charger. Although as ableToAdd is still enabled below, so you can still add a phone, if not already added.
    }

    //Update Bond and costs.
    if (document.getElementById('consumer').checked == true) {
        //If you are a consumer you pay a bond
        document.getElementById('bond').value = totalCost;
    } else {
        //If you are a busness you DO NOT pay a bond
        //As this gets handeled elsewhere, this does not do anything. It is simply for logic purposes. 
    }

}

function upDateCosts() {

    //ServiceFee
    //DEBUG: console.log('working');
    if (document.getElementById('warrenty').checked == true) {
        //This is where the 'warrenty' of the product is checked. If it is still under warrenty (checked) the service fee will be set to 0.
        document.getElementById('serviceFee').value = 0;
        serviceFee = 0;
    } else if (document.getElementById('warrenty').hidden == false) {
        //If the 'warrenty' is checked the service fee will be set to 85.
        serviceFee = 85;
        document.getElementById('serviceFee').value = 85;
    }
    //As this above is the only place where the serviceFee gets set, it does not need to be set to 0 with an else statement.

    //bond
    if (document.getElementById('consumer').checked == true) {
        //If you are a consumer the cost is calculated as totalcost (Or bond) + service fee (which can be 0 or 85 depending on the warrenty).
        document.getElementById('bond').value = totalCost;
        document.getElementById('total').value = totalCost + serviceFee;
        document.getElementById('gst').value = (totalCost + serviceFee) * 0.15;
        document.getElementById('totalGST').value = (totalCost + serviceFee) * 1.15;
        //DEBUG: console.log("trying to add bond + service" + totalCost + serviceFee);
    } else if (document.getElementById('business').checked == true) {
        //If you are a business you do not pay a bond. Although, in this case the website will need to remeber the bond price
        //incase the user clicks the consumer button. 
        document.getElementById('total').value = serviceFee;
        document.getElementById('bond').value = 0;


        document.getElementById('gst').value = serviceFee * 0.15;
        document.getElementById('totalGST').value = serviceFee * 1.15;
        //DEBUG: console.log("trying to add service fee only");
    }

}

function removeFromTable() {
    //From https://www.w3schools.com/jsref/met_table_deleterow.asp
    //Below the code retrieves the cost to take down by the first (1) row (row and cell index starts at 0) and the first cell. This is where the price is located.
    costToTakeDown = document.getElementById("itemCostTable").rows[1].cells[1].innerHTML;

    if (costToTakeDown == "275") {
        ableToAdd = true;
        //If the price that is detected in row 1 and cell 1 is equal to 275, the item IS a phone. The var ableToAdd then enables the website to add a new phone
    } else if (costToTakeDown == "100") {
        ableToAdd = true;
        //If the price that is detected in row 1 and cell 1 is equal to 100, the item IS also a phone.
    } else if (costToTakeDown == "30") {
        ableToAddCharger = true;
        //ALthough, if the price detected is 30, this is a chrager.
    }

    totalCost = totalCost - costToTakeDown;
    //Totalcost (or bond) is now set to the totalcost - the detected costToTakeDown. Eg, 100 is detected, this will be taken down by 100.
    if (document.getElementById('consumer').checked == true) {
        //If you are a business you do not pay a bond. Although this is already handeled in upDateCosts(), this is just to make sure it works.
        document.getElementById('bond').value = totalCost;
    }

    //Finally delete the row after all the prices are found.
    document.getElementById('table').deleteRow(1);

    //Now reload the costs as these have now changed.
    upDateCosts();

}

function reset() {
    //Goes through the entire document and resets everything.
    document.getElementById('consumer').checked = false;
    document.getElementById('business').checked = false;
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('phoneNumber').value = "";
    document.getElementById('email').value = "";
    document.getElementById('purcahseDate').value = "";
    document.getElementById('repairDate').value = "";
    document.getElementById('warrenty').checked = false;//This only needs to check if it is under warrenty.
    document.getElementById('imeiNumber').value = "";
    document.getElementById('street').value = "";
    document.getElementById('suburb').value = "";
    document.getElementById('city').value = "";
    document.getElementById('postCode').value = "";
    document.getElementById('description').value = "";
    document.getElementById('modelNumber').value = "";
    //Rest selection options.
    document.getElementById('make').selectedIndex = 0;
    document.getElementById('fault').selectedIndex = 0;
    document.getElementById('title').selectedIndex = 0;
    //Reset global vars
    ableToAdd = true;
    ableToAddCharger = true;
    totalCost = 0;
    serviceFee = 0;

    //Gets the table index and deletes the entire table leaving the header row https://stackoverflow.com/questions/47214759/how-to-reset-an-html-table-to-its-original-after-changing-it-with-a-javascript-f
    var table = document.getElementById("table");

    while (table.rows.length > 1) {
        table.deleteRow(1);

    }

    //Resets all bond, service and tax values.
    document.getElementById('bond').value = 0;
    document.getElementById('total').value = 0;
    document.getElementById('gst').value = 0;
    document.getElementById('totalGST').value = 0;
    //Now finally update all costs. 
    upDateCosts();
}

function openFAQ() {
    //Opens the FAQ file.
    window.open("faq.html");
}

function phones() {
    //DEBUG console.log("test");
    //Opens the window for the 3D phones.
    window.open("phones.html");
}

function changeTheme() {
    //Read More about Cookies Here: https://www.w3schools.com/js/tryit.asp?filename=tryjs_cookie_username
    //var currentTheme = document.getElementById()
    //document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

    //Set cookie here. 
    var color = document.getElementById("theme");
    var selectedcolor = color.options[color.selectedIndex].text;

    if (selectedcolor == "Default") {
        document.getElementById("customHeader").style.backgroundColor = "#2a3a4a";
        document.getElementById("customFooter").style.backgroundColor = "#2a3a4a";
        setCookie("#2a3a4a");
    } else {
        document.getElementById("customHeader").style.backgroundColor = selectedcolor;
        document.getElementById("customFooter").style.backgroundColor = selectedcolor;
        setCookie(selectedcolor);
    }

        
}

function setCookie(color){
    document.cookie = color + ";path=/";
    
}

function onloadCookie(){
    try{
        document.getElementById("customHeader").style.backgroundColor = document.cookie;
        document.getElementById("customFooter").style.backgroundColor = document.cookie;
        
        console.log("Trying to reload Cookie " + document.cookie);

        if(document.cookie == "#2a3a4a") {
            
        } else {
            //alertUser("We saw you liked " + document.cookie + " so we saved it just for you");
            if(document.cookie == "Orange") {
                document.getElementById("theme").selectedIndex = 1;
            } else {
                document.getElementById("theme").selectedIndex = 2;
            }
        }
        
    } catch(e) {
        console.log("Cookie Error");
    }
    
}


//Using Adderess API. Read more: https://www.addy.co.nz/address-finder-code-example
function initAddy() {
    //Using the libaray included at the top of this js this will call a search when you enter in the search feature.
    var addyComplete = new AddyComplete(document.getElementById("street"));
    //When this then complets, this will then update all the boxes with new information.
    addyComplete.fields = {
        address1: document.getElementById("street"),
        suburb: document.getElementById("suburb"),
        city: document.getElementById("city"),
        postcode: document.getElementById("postCode"),
    }
}