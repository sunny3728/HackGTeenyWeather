function buttonPress() {
    var buttonPress = index.getElementByID("button");
    buttonPress.attachEvent("onclick", myFunction);
}

function getData() {
    $.getJSON("http://api.wunderground.com/api/b819c4c776539987/geolookup/q/30332.json", "", myFunction);

}

function myFunction(data) {
    var city = data.location.city;
    var state = data.location.state;
    $("#yourCity").text(city);
    $("#yourState").text(state);

    //console.log(data);
    //console.log($.getJSON("http://api.wunderground.com/api/b819c4c776539987/geolookup/q/30332.json"));
    //console.log(curr_obs.feelslike_f);


    $.getJSON("http://api.wunderground.com/api/b819c4c776539987/conditions/q/" + state + "/" + city + ".json", "", printStuff)
}

function printStuff(data) {
    console.log(data);
    $("#temperature").text(data.current_observation.feelslike_f);
    //$("#humidity").text(data.current_observation);

    var rain = data.current_observation.precip_today_in;
    var out = "";
    if(rain > 0.01) {
        out = "Yup!";
    }
    else {
        out = "Nope!";
    }

    $("#chanceOfRain").text(out);


}

buttonPress();
