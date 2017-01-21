function myFunction(data) {
    city = data.location.city;
    state = data.location.state;

    console.log(data);
    //console.log($.getJSON("http://api.wunderground.com/api/b819c4c776539987/geolookup/q/30332.json"));
    //console.log(curr_obs.feelslike_f);


    $.getJSON("http://api.wunderground.com/api/b819c4c776539987/conditions/q/" + state + "/" + city + ".json", "", printStuff)
}

function printStuff(data) {
    console.log(data);
    $("#output1").text(data.current_observation.feelslike_f);
}

$.getJSON("http://api.wunderground.com/api/b819c4c776539987/geolookup/q/30332.json", "", myFunction);
$.getJ
