"use strict";

$(document).ready(function () {
    mapboxgl.accessToken = mapboxToken;

    //Creation of the map and defining starting coordinates:

    var coord = [32.7555, -97.3308];
    var weatherMap = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/jakechadwell/cknf0f8s64aei17oqvg703v98', // style URL
        center: [coord[1],coord[0]], // starting position [lng, lat]
        zoom: 12 // starting zoom
    });

    //Creation of the marker:

    var mainMarker = new mapboxgl.Marker({color: 'blue', draggable: true})
        .setLngLat([coord[1],coord[0]])
        .addTo(weatherMap)

    //Display weather for starting coordinates:

    weather()

    //Function that gets coordinates of marker on drag end, and then runs the weather function:

    function dragEnd() {
        coord = mainMarker.getLngLat();
        coord = [coord.lat, coord.lng];
        weather()
    }

    mainMarker.on('dragend', dragEnd);

    //Function that takes user search input, and displays weather for that location with geocode after button is clicked, or enter key is hit:

    function userSearch() {
        let searchInput = $('#form1').val()
        geocode(searchInput, mapboxToken).then(function (results){
            coord = [results[1], results[0]]
            weather()
        })
    }
    $('#submit-btn').on('click', userSearch);

    $('.form-control').on('keyup', function (e){
        if (e.keyCode === 13) {
            e.preventDefault();
            userSearch()
        }
    })



    //Defining weather function; gets weather data from api:

    function weather() {
        $.get('https://api.openweathermap.org/data/2.5/onecall', {
            lat: coord[0],
            lon: coord[1],
            appid: OPEN_WEATHER_APPID,
            units: 'imperial',
        }).done(function (results) {

            //Inject Html function that uses data from api and "injects" it into the html:

            function injectHtml(id, data) {
                var iconcode = data.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                var currentLocation = reverseGeocode({lat: coord[0], lng: coord[1]}, mapboxToken).then(function (results){
                    weatherMap.flyTo({
                        center: [coord[1], coord[0]]
                    });
                    var place = (results.features[0].place_name).split(",")
                    document.getElementById("current-location").innerHTML = "Current Location: " + place[1] + ", " + place[2]
                });

                document.getElementById("wicon" + id).setAttribute('src', iconurl);
                document.getElementById(id).children[0].children[0].innerHTML = (new Date(data.dt * 1000)).toDateString()
                document.getElementById(id).children[1].children[0].innerHTML = "Temp: " + data.temp.min + "&deg;/" + data.temp.max + "&deg;";
                document.getElementById(id).children[1].children[3].children[0].innerHTML = "Description: " + data.weather[0].description;
                document.getElementById(id).children[1].children[3].children[1].innerHTML = "Humidity: " + data.humidity;
                document.getElementById(id).children[1].children[3].children[2].innerHTML = "Wind: " + data.wind_speed;
                document.getElementById(id).children[1].children[3].children[3].innerHTML = "Pressure " + data.pressure;

            }

            //Create cards function loops through each day, as well as each individual card in the html:

            function createCards() {
                var apiCallData = results.daily;
                for (var i = 0; i < 5; i++) {
                    injectHtml(i, apiCallData[i]);
                }
            }
            createCards();
        });
    }
});