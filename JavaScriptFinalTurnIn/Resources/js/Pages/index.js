//easter eggs :)
var firstEasterEgg = document.getElementById("easterEgg1");

//This whole first one could 100% be done with CSS with a LOT less lines and it would probably look cleaner
//but with that said, this is a JavaScript final, and I am going to use JavaScript :D
firstEasterEgg.addEventListener("mouseover", function() {
    var firstEasterEggDiv = document.getElementById("easterEggDiv1");
    firstEasterEgg.style.cursor = "pointer";
    firstEasterEggDiv.style.display = "block";
    firstEasterEggDiv.style.margin = "auto";
    firstEasterEggDiv.style.width = "70%";
}, false);
firstEasterEgg.addEventListener('mouseleave', function() {
    var firstEasterEggDiv = document.getElementById("easterEggDiv1");
    var easterEggText = document.getElementById("easterEggText1");
    firstEasterEgg.style.cursor = "default";
    firstEasterEggDiv.style.display = "none";
    firstEasterEggDiv.style.width = "70%";
    easterEggText.style.color = "black";
    easterEggText.innerHTML = "Congrats! You found the first Easter Egg!!";
}, false);
firstEasterEgg.addEventListener("click", function() {
    var firstEasterEggDiv = document.getElementById("easterEggDiv1");
    var easterEggText = document.getElementById("easterEggText1");
    easterEggText.style.color = "Red";
    firstEasterEggDiv.style.width = "75%";
    easterEggText.innerHTML = "Congrats! You found the second easter egg!";
}, false);