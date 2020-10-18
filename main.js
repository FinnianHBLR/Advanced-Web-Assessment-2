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

        var title = document.getElementById("title");
        var selectedTitle = title.options[title.selectedIndex].text;

        var make = document.getElementById("make");
        var selectedMake = make.options[make.selectedIndex].text;

        var courtesyPhone = document.getElementById('courtesyPhone');
        var selectedCoutesyPhone = courtesyPhone.options[courtesyPhone.selectedIndex].text;

        var fault = document.getElementById('fault');
        var selectedFault = fault.options[fault.selectedIndex].text;

        var description = document.getElementById('description').value;

        var customer = new Customer(consumer, business, firstName, lastName, phoneNumber, email, purcahseDate, repairDate, underWarrenty, IMEI, street, suburb, city, postCode, selectedTitle, selectedMake, selectedCoutesyPhone, selectedFault, description);

        newArray.push(customer);

        console.log(customer);

    }

}

var Customer = function (consumer, business, firstName, lastName, phoneNumber, email, purcahseDate, repairDate, IMEI, street, suburb, city, postCode, selectedTitle, selectedMake, selectedCoutesyPhone, selectedFault, description) {
    this.consumber = consumer;
    this.business = business;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.purcahseDate = purcahseDate;
    this.repairDate = repairDate;
    this.IMEInumber = IMEI;
    this.street = street;
    this.suburb = suburb;
    this.city = city;
    this.postCode = postCode;
    this.selectedTitle = selectedTitle;
    this.selectedMake = selectedMake;
    this.selectedCoutesyPhone = selectedCoutesyPhone;
    this.selectedFault = selectedFault;
    this.description = description;
}


Customer.prototype.getConsumer = function () {
    return this.consumber;
}

Customer.prototype.getBusiness = function () {
    return this.business;
}
Customer.prototype.getFirstName = function () {
    return this.firstName;
}

Customer.prototype.getLastName = function () {
    return this.lastName;
}

Customer.prototype.getPhoneNumber = function () {
    return this.phoneNumber;
}

Customer.prototype.getEmail = function () {
    return this.email;
}

Customer.prototype.getPurcahseDate = function () {
    return this.purcahseDate;
}

Customer.prototype.getRepairDate = function () {
    return this.repairDate;
}

Customer.prototype.getIMEI = function () {
    return this.IMEInumber;
}

Customer.prototype.getStreet = function () {
    return this.street;
}

Customer.prototype.getSuburb = function () {
    return this.suburb;
}

Customer.prototype.getCity = function () {
    return this.city;
}

Customer.prototype.getPostCode = function () {
    return this.postCode;
}

Customer.prototype.getCustomerTitle = function () {
    return this.selectedTitle;
}

Customer.prototype.getPhoneMake = function () {
    return this.selectedMake;
}

Customer.prototype.getCourtesyPhone = function () {
    return this.selectedCoutesyPhone;
}

Customer.prototype.getFault = function () {
    return this.selectedFault;
}

Customer.prototype.getDescription = function () {
    return this.description;
}


function validationFirstAndLastName() {
    var fnlnNameReject = /^[a-zA-Z\s-]+$/;
    var fn = document.getElementById("firstName").value;
    var ln = document.getElementById("lastName").value;

    //First and last name
    if (fn.match(fnlnNameReject) && ln.match(fnlnNameReject)) {
        //CORRECT!
        console.log("is letter a-z with space" + fn)
        return true;
    } else {
        //Call alert function
        alertUser("First or Last Name Contains a number or invalid symbol.");
        return false;
    }
}

function validatePostCode() {
    //PostCode
    var postcode = document.getElementById('postCode').value.toString();
    console.log(postcode);

    if (postcode.length == 4) {
        //CORRECT!
        console.log("yall this less than 4" + postcode);
        return true;
    } else {
        alertUser("INVALID POST CODE!");
        return false;
    }
}

function validatePhoneNumber() {
    //Phone number
    var phoneNumber = document.getElementById('phoneNumber').value.toString();
    //console.log(phoneNumber);
    //Code below accepts most number patterns that beloing to phone numbers.
    const phoneNumbervalidation = /(?!:\A|\s)(?!(\d{1,6}\s+\D)|((\d{1,2}\s+){2,2}))(((\+\d{1,3})|(\(\+\d{1,3}\)))\s*)?((\d{1,6})|(\(\d{1,6}\)))\/?(([ -.]?)\d{1,5}){1,5}((\s*(#|x|(ext))\.?\s*)\d{1,5})?(?!:(\Z|\w|\b\s))/gm;
    //Phone number verification reject (Line above) refrenced from regexr.com/2rhsc by Dan G. Switzer, II


    if (phoneNumber.match(phoneNumbervalidation)) {
        //CORRECT!
        console.log("workin" + phoneNumber);
        return true;
    } else {
        alertUser("The phone number: " + phoneNumber + " seems to be invalid. Try another format.");
        return false;
    }
}


function validateEmail() {
    //Email
    var email = document.getElementById('email').value.toString();
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    //Email verification (Line above) uses the RFC2822 standard for verfication. This is refrenced from regexr.com/2rhq7 by Tripleaxis.

    if (email.match(emailValidation)) {
        //CORRECT!
        console.log("email working: " + email);
        return true;
    } else {
        alertUser("Email Verification Failed please try a differnet format: " + email);
        return false;
    }
}


function validateDates() {
    //Repair date::
    //NOTE: This should be done with JQuery and would save a lot of time by stopping the user in the first place! https://eonasdan.github.io/bootstrap-datetimepicker/

    //var date = document.getElementById('purcahseDate').value.toString();
    //Check if real date.
    //console.log("input: " + date);

    //Date does not need to be checked as it is not possible to enter in a wrong date with the date picker.
    //Although for good measure, this try cath will send an error if, (somnehow) the user entered a wrong date.
    try {
        var purcahseDate = new Date(document.getElementById("purcahseDate").value); //Must NOT be in future
        var repairDate = new Date(document.getElementById("repairDate").value); //Must NOT be in the future, must be later than purcahse

    } catch (e) {
        console.log("Something went wrong!")
        alertUser("DATE ERROR!")
    }


    var today = new Date();
    //new Date() automatically gets the current date. Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

    //console.log(today);
    //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //From https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript

    //Results in the next day
    if (purcahseDate > today || repairDate > today) {
        //console.log("Purcahse or Repair date is in future. Please try again.");
        alertUser("Purcahse or Repair date is in future. Please try again.");
        return false;
    } else if (repairDate < purcahseDate) {
        alertUser("repair date is before purcase date. Please try again.")
        return false;
        //console.log("repair date is before purcase date. Please try again.");
    } else {
        //CORRECT!
        console.log("seems to be correct");
        return true;
    }
}


function validateWarrenty() {
    //Warrenty, disabeld after 24 months
    var purchaseDate = new Date(document.getElementById("purcahseDate").value);
    console.log(purchaseDate);

    var today = new Date();

    today.setMonth(today.getMonth() - 24); //reduce todays date by 24 months

    if (purchaseDate <= today) {//if purchase date is less than the today
        console.log("out of date");
        document.getElementById('warrenty').hidden = true;
        return "No Warrenty";
    } else {
        //CORRECT!
        document.getElementById('warrenty').hidden = false;

        console.log("Still in date");
        return "Under Warrenty";
    }
}


function validateIMEI() {
    //IMEI Number
    var imeiNumber = document.getElementById("imeiNumber").value;

    if (imeiNumber.length >= 15) {
        alertUser("YOUR IMEI NUMBER IS TOO LONG!")
        return false;
    } else {
        //CORRECT

        console.log("IMEI Number not too long");
        return true;
    }
}

function alertUser(message) {
    alert(message);
}


var ableToAdd = true;
var ableToAddCharger = true;
var totalCost = 0;

function addTocourtesyTable() {


    if (ableToAdd == true && document.getElementById('courtesyPhone').value == "iPhone 7") {

        var table = document.getElementById('table');
        var row = table.insertRow(1);
        var cellItem = row.insertCell(0);
        var cellCost = row.insertCell(1);

        cellCost.innerText = "275";
        totalCost += 275;
        cellItem.innerText = document.getElementById('courtesyPhone').value;
        ableToAdd = false;

    } else if (ableToAdd == true && document.getElementById('courtesyPhone').value == "Other") {

        var table = document.getElementById('table');
        var row = table.insertRow(1);
        var cellItem = row.insertCell(0);
        var cellCost = row.insertCell(1);

        cellCost.innerText = "100";
        totalCost += 100;
        cellItem.innerText = document.getElementById('courtesyPhone').value;
        ableToAdd = false;
    } else if (ableToAddCharger == true && document.getElementById('courtesyPhone').value == "Charger") {

        var table = document.getElementById('table');
        var row = table.insertRow(1);
        var cellItem = row.insertCell(0);
        var cellCost = row.insertCell(1);

        cellCost.innerText = "30";
        totalCost += 30;
        cellItem.innerText = document.getElementById('courtesyPhone').value;
        ableToAddCharger = false;
    }

    //Update Bond and costs
    if(document.getElementById('consumer').checked == true) {
        //If you are a business you do not pay a bond
        document.getElementById('bond').value = totalCost;
    }
    
}

function removeFromTable() {
    //From https://www.w3schools.com/jsref/met_table_deleterow.asp
    
    costToTakeDown = document.getElementById("itemCostTable").rows[1].cells[1].innerHTML;
    
    if(costToTakeDown == "275"){
        ableToAdd = true;
    } else if(costToTakeDown == "100") {
        ableToAdd = true;
    } else if(costToTakeDown == "30") {
        ableToAddCharger = true;
    }

    totalCost = totalCost - costToTakeDown;
    if(document.getElementById('consumer').checked == true) {
        //If you are a business you do not pay a bond
        document.getElementById('bond').value = totalCost;
    }
    
    document.getElementById('table').deleteRow(1);

}