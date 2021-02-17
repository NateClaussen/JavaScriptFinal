//**Full Disclaimer**
//I could totally do this in pure javascript and I think that I have figrued out how to do this,
//however upon further examination of my situtation, I am going to use JQuery, because instead of having
//lots of lines of code, I can shorten it to just a couple
//WHEREFORE :) I'm just going to animate with JQuery :)


function toggleSlide(element) {
    var picture = element.getElementsByClassName("arrowIcon")
    $(picture).toggleClass("up down");

}


//SlidePanels
//get an instance of the slideHolder
var resumeCardHolder = document.getElementById("resumeCardHolder");
//Get all of the cards
var allCards = resumeCardHolder.getElementsByClassName("resumeCard");
//add Click event to each card
for (var i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener("click", toggleSlide(allcards[i]), false);
}
/*
var dropDowns = document.getElementsByClassName("resumeCard");
for (var i = 0; i < dropDowns.length; i++) {
    dropDowns[i].addEventListener("click", function(event) {
        alert("I was clicked!");
    }, false);
}

var cardHolder = document.getElementById("resumeCardHolder");
var allCards = cardHolder.getElementsByClassName("resumeCard");

for (var i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener("click", function() {
        alert("one of allCards was clicked!");
    }, false);
}
*/