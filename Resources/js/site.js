//Time Div in Nav
$(document).ready(function() {
    setInterval(setTime(), 8.64e+7);
});

function setTime() {
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsInYear = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var timeArea = document.getElementById("currentTime");
    var d = new Date();
    var day = daysOfWeek[d.getDay()];
    var month = monthsInYear[d.getMonth()];
    var date = d.getDate();
    var year = d.getFullYear();
    $("#currentTime").html(`${day}, ${month} ${date}, ${year}`);
}