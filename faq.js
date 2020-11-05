

//Read more: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
//To avoid cross origin I have put the file on pastebin here:https://raw.githubusercontent.com/Nova-472/Advanced-Web-Assessment-2/master/faq.json and for a backup https://pastebin.pl/view/raw/1ce318c8

function loadXMLDoc() {
  //Try for a first request from github raw file.
  try {
    fetch("https://raw.githubusercontent.com/Nova-472/Advanced-Web-Assessment-2/master/faq.json")
      .then(response => response.json())
      .then(json => (setData(json)));

      //This data that is got is then put into cards
    function setData(data) {
      //For each card 
      tempData = "";

      for (i = 0; i < data.cards.length; i++) {
        console.log(data.cards[i].card);
          //Add starting tags as seen above to data, this goes all the way to the title then next the title will be inserted.
          tempData += "<div class=\"card w-100 m-4 p-4\"><div class=\"card-body\"><h5 class=\"card-title\">" +
            data.cards[i].heading +
            "</h5><p class=\"card-text\">" +
            data.cards[i].text +
            "</p></div></div>";
      }
      document.getElementById("cards").innerHTML = tempData;
    }

  } catch (e) {

    //In case this is blocked for some reason, refer to backup
    fetch("https://pastebin.pl/view/raw/1ce318c8")
      .then(response => response.json())
      .then(json => (setData(json)));

      function setData(data) {
        //For each card 
        tempData = "";
  
        for (i = 0; i < data.cards.length; i++) {
          console.log(data.cards[i].card);
            //Add starting tags as seen above to data, this goes all the way to the title then next the title will be inserted.
            tempData += "<div class=\"card w-100 m-4 p-4\"><div class=\"card-body\"><h5 class=\"card-title\">" +
              data.cards[i].heading +
              "</h5><p class=\"card-text\">" +
              data.cards[i].text +
              "</p></div></div>";
        }
        document.getElementById("cards").innerHTML = tempData;
      }
  }
}
/*Above code creates cards that look like this 
 
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