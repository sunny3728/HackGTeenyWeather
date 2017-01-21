function main(){

    $("#zipcodeText").keyup(function(event){
        if(event.keyCode == 13){
            $("#button").click();
        }   });
    var buttonPress = document.getElementById("button");
    buttonPress.addEventListener("click", getData);

function getData() {
    var myZip = $("#zipcodeText").val()
    $.getJSON("http://api.wunderground.com/api/b819c4c776539987/geolookup/q/" + myZip + ".json", "", myFunction);

}

function myFunction(data) {
    var city = data.location.city;
    var state = data.location.state;
    $("#yourCity").text(city);
    $("#yourState").text(state);

    $.getJSON("http://api.wunderground.com/api/b819c4c776539987/conditions/q/" + state + "/" + city + ".json", "", printStuff)
}

function printStuff(data) {
    console.log(data);
    $("#temperature").text(data.current_observation.feelslike_f + " degrees Fahrenheit.");
    //$("#humidity").text(data.current_observation);

    var rain = data.current_observation.precip_today_in;
    var out = "";
    if(rain > 0.01) {
        out = ("Yup, you're looking at about " + rain + " inches!");

    }
    else {
        out = "Nope!";
    }

    $("#chanceOfRain").text(out);

    var switchOut = "";
    switch(rain > 0.1){
        case true:
            switchOut = "Bring an Umbrella, brah. It will be raining today."
            break;
        case false:
            switchOut = "No need to umbrella today!"
            break;
    }
    $("#whatToWear").text(switchOut);


}
}

$(document).ready(main);

