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

    var rainImg = document.getElementById('rainy');
    var cloudImg = document.getElementById('cloudy');
    var sunImg = document.getElementById('sunny');

    var weather = data.current_observation.weather;
    if (rain > 0.01) {
        rainImg.style.display = "block";
        cloudImg.style.display = "none";
        sunImg.style.display = "none";
    } else if(weather.indexOf("Cloud") > -1 || weather.indexOf("Overcast") > -1) {
        rainImg.style.display = "none";
        cloudImg.style.display = "block";
        sunImg.style.display = "none";
    } else if (weather.indexOf("Clear") > -1 || weather.indexOf("Sunny") > -1) {
        rainImg.style.display = "none";
        cloudImg.style.display = "none";
        sunImg.style.display = "block";
    } else {
        rainImg.style.display = "none";
        cloudImg.style.display = "block";
        sunImg.style.display = "none";
    }

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
            switchOut = "Bring an umbrella, brah. It will be raining today."
            break;
        case false:
            switchOut = "No need for an umbrella today!"
            break;
    }
    $("#whatToWear").text(switchOut);


}
}

$(document).ready(main);

