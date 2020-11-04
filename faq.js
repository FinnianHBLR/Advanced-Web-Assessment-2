//var proxy = 'https://cors-anywhere.herokuapp.com/';
//var url = 'https://raw.githubusercontent.com/Nova-472/Advanced-Web-Assessment-2/master/faqInfo.xml';


//Rad more from: https://www.w3schools.com/xml/ajax_applications.asp
function loadXMLDoc() {
  
    var xmlhttp = new XMLHttpRequest();
    //Creates new xmlhttp request to request the local file.
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    //Open and send the request.
    xmlhttp.open("GET", "faqInfo.xml", true);
    xmlhttp.send();
  }


function myFunction(xml){

    var xmlDoc = xml.responseXML;
    //Init empty var
    var data= "";
    //Gets each element by it's tag name "card". See the faqInfo.xml file for more info
  
      var x = xmlDoc.getElementsByTagName("card");
      
      for (i = 0; i < x.length; i++) {
        //Add starting tags as seen above to data, this goes all the way to the title then next the title will be inserted.
        data += "<div class=\"card w-100 m-4 p-4\"><div class=\"card-body\"><h5 class=\"card-title\">" +
          x[i].getElementsByTagName("heading")[0].childNodes[0].nodeValue +
          "</h5><p class=\"card-text\">" +
          x[i].getElementsByTagName("text")[0].childNodes[0].nodeValue +
          "</p></div></div>";
      }
      //After infomation is set table will now be set to the data and logged out. 
      document.getElementById("cards").innerHTML = data;
      //DEBUG: console.log(data);
    }
 
    /*Below code creates cards that look like this 
    
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




    //Adv JS feature 1.
    function searchCards() {
      //Some code refrenced from: https://codepen.io/r3hab/pen/GBdXEq
      //Init new vars
      var usrInput, searchFor, cards, cardContainer, h5, title, i;
      //Define the search box to get what is entered. 
      usrInput = document.getElementById("searchBox");
      //Changes everyhting to uppercase
      searchFor = usrInput.value.toUpperCase();
      //The card containter is used to get all the elments that are "cards". This is defined when using bootstrap.
      cardContainer = document.getElementById("cardContainer");
      cards = cardContainer.getElementsByClassName("card");
      //For every card (cards.length is the amoung of cards) add 1 and update information.
      for (i = 0; i < cards.length; i++) {
        //This defins the title of the cards
        title = cards[i].querySelector(".card-body h5.card-title");
        if (title.innerText.toUpperCase().indexOf(searchFor) > -1) {
          //If the innerText index is more than -1 change the display to ""
          cards[i].style.display = "";
        } else {
          //Else set the display to none.
          cards[i].style.display = "none";
        }
      }
    }

//Cookie and other code is in main.js.