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
        var underWarrenty = validateWarrenty();//This only needs to check if it is under warrenty.
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

        var courtesyPhone = document.getElementById('courtesyPhone');
        var selectedCoutesyPhone = courtesyPhone.options[courtesyPhone.selectedIndex].text;

        var fault = document.getElementById('fault');
        var selectedFault = fault.options[fault.selectedIndex].text;

        var description = document.getElementById('description').value;

        //console.log(customer);

        addInvoice(consumer, business, firstName, lastName, phoneNumber, email, purcahseDate, repairDate, underWarrenty, IMEI, street, suburb, city, postCode, selectedTitle, selectedMake, selectedCoutesyPhone, selectedFault, description, modelNumber);

        var opened = window.open("");
        opened.document.write("<!DOCTYPE html><html><head><script src=\"main.js\"></script></head><body><section><hr><h1>Exercise 3: Use IndexedDB API to create database for \"Phone Fix Booking System\"</h1><div id=\"allInvoices\" class=\"all-invoices\"></div><table id=\"invoice_table\"></table></section><script type=\"text/javascript\">displayInvoices();</script></body></html>");
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
function addInvoice(consumerData, businessData, firstNameData, lastNameData, phoneNumberData, emailData, purchaseDateData, repairDateData, warrentyData, IMEIData, streetData, suburbData, cityData, postCodeData, titleData, makeData, courtesyPhoneData, faultData, descriptionData, modelData) {
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


    let total_cost = 'test';
    let GST = 'test';

    let invoiceID = 0;

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
                    selectedFault: selectedFault, description: description, modelNumber: modelNumber, total_cost: total_cost, GST: GST
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


function displayInvoices() {
    //Wais for databse to be open before displaying.
    request.onsuccess = function (event) {
        db = request.result;
        //console.log("success: " + db);

        //Get the entire object store "invoice" which contains all invoice info
        var objectStore = db.transaction("invoice").objectStore("invoice");
        //Get "table" element
        var invoice_table = document.getElementById("invoice_table");
        var row, cell;
        var id, consumer, business, firstName, lastName, phoneNumber, email, purcahseDate, repairDate, underWarrenty, IMEI, street, suburb,
            city, postCode, selectedTitle,
            selectedMake, selectedCoutesyPhone, selectedFault, description, modelNumber, total_cost, GST;
        var allInfo = "";

        //If the "get" transaction was successful, traverse all the records of the data table
        // by using the pointer object IDBCursor
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            //For each cursor (each invoice object), get invoice info and add it to the "invoice_table"
            if (cursor) {
                //Add a new row inside the invoice_table to display invoice info
                id = cursor.key;
                consumer = cursor.value.consumer;
                business = cursor.value.business;
                firstName = cursor.value.firstName;
                lastName = cursor.value.lastName;
                phoneNumber = cursor.value.phoneNumber;
                email = cursor.value.email;
                purcahseDate = cursor.value.purcahseDate;
                repairDate = cursor.value.repairDate;
                underWarrenty = cursor.value.underWarrenty;
                IMEI = cursor.value.IMEI;
                street = cursor.value.street;
                suburb = cursor.value.suburb;
                city = cursor.value.city;
                postCode = cursor.value.postCode;
                selectedTitle = cursor.value.selectedTitle;
                selectedMake = cursor.value.selectedMake;
                selectedCoutesyPhone = cursor.value.selectedCoutesyPhone;
                selectedFault = cursor.value.selectedFault;
                description = cursor.value.description;
                modelNumber = cursor.value.modelNumber;

                total_cost = cursor.value.total_cost;
                GST = cursor.value.GST;
                //
                allInfo += "ID: " + id + ". consumer: " + consumer + ". Firstname: " + firstName + ". Lastname: " + lastName + ". PhoneNumber " + phoneNumber
                    + ". email: " + email + ". purchaseDate: " + purcahseDate + ". RepairDate: " + repairDate + ". underWarrenty " + underWarrenty
                    + ". IMEI " + IMEI + ". Street: " + street + ". Suburb: " + suburb + ". City " + city + ". PostCode: " + postCode + ". Title "
                    + selectedTitle + ". SlectedMake: " + selectedMake + ". SelectedCoutesyPhone: " + selectedCoutesyPhone + ". SelectedFault: "
                    + selectedFault + ". description: " + description + ". modelNumber: " + modelNumber
                    + ". total_cost: " + total_cost + ". GST: " + GST + "<br>";

                //Move to next object
                cursor.continue();

            } else {
                //alert("No more entries!");
            }
            //
            document.getElementById("allInvoices").innerHTML = allInfo;
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

