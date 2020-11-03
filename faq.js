
//https://www.w3schools.com/xml/ajax_applications.asp
function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xmlhttp.open("GET", "faqInfo.xml", true);
    xmlhttp.send();
  }

/*Creates cards that look like this 

<div class="card w-75">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
  </div>
</div>

<div class="card w-75">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
  </div>
</div>
https://getbootstrap.com/docs/4.3/components/card/
*/

  function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    //Init empty var
    var data= "";
    var x = xmlDoc.getElementsByTagName("card");
    for (i = 0; i <x.length; i++) { 
        //Add starting tags as seen above to data, this goes all the way to the title then next the title will be inserted.
      data += "<div class=\"card w-100 m-4 p-4\"><div class=\"card-body\"><h5 class=\"card-title\">" +
      x[i].getElementsByTagName("heading")[0].childNodes[0].nodeValue +
      "</h5><p class=\"card-text\">" +
      x[i].getElementsByTagName("text")[0].childNodes[0].nodeValue +
      "</p></div></div>";
    }
    document.getElementById("cards").innerHTML = data;
    //DEBUG: console.log(data);
  }


//Adv JS feature 1.
  function searchCards() {
    //Some code refrenced from: https://codepen.io/r3hab/pen/GBdXEq
    //Init new vars
    var input, filter, cards, cardContainer, h5, title, i;
    //Define the search box to get what is entered. 
    input = document.getElementById("searchBox");
    //Changes everyhting to uppercase
    filter = input.value.toUpperCase();
    //The card containter is used to get all the elments that are "cards". This is defined when using bootstrap.
    cardContainer = document.getElementById("myItems");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        //This defins the title of the cards
        title = cards[i].querySelector(".card-body h5.card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            //If the innerText index is more than -1 change the display to ""
            cards[i].style.display = "";
        } else {
            //Else set the display to none.
            cards[i].style.display = "none";
        }
    }
}


function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
      alert("Your Theme Has Been Saved Theme:" + user);
    }
  }

  function setCookieBtn(){
    setCookie("username", document.getElementById("fname").value, 30);
  }

  function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }