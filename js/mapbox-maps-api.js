"use strict";

mapboxgl.accessToken = mapboxToken;

var newMap = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-97.3322, 32.7518], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

var restaurants = [
    {
        name: 'Pho District',
        location: '2401 W 7th St, Fort Worth, TX',
        dishes: 'Pho'
    },
    {
        name: 'Velvet Taco',
        location: '2700 W 7th St, Fort Worth, TX',
        dishes: 'Tacos'
    },
    {
        name: 'Chipotle',
        location: '3000 W 7th St Ste 110, Fort Worth, TX',
        dishes: 'Burritos and Bowls'
    }
];

restaurants.forEach(function (restaurant){
    geocode( restaurant.location, mapboxToken).then(function (results){
        var popup = new mapboxgl.Popup()
            .setHTML('<h6>'
                + restaurant.name
                +'<br>'
                + restaurant.location
                +'<br>'
                + restaurant.dishes
                + '</h6>')

        new mapboxgl.Marker({color: "orange"})
            .setLngLat(results)
            .setPopup(popup)
            .addTo(newMap)
    })
})

$('#zoom-select').change(function (){
    if(value=='5') {

    }
})

// geocode("2401 W 7th St, Fort Worth, TX", mapboxToken).then(function (results){
//     var popup = new mapboxgl.Popup()
//         .setHTML('<h6>' + resturants.name + '</h6>')
//
//     new mapboxgl.Marker({color: "orange", draggable: true})
//         .setLngLat(results)
//         .setPopup(popup)
//         .addTo(newMap)
//
// })
// geocode("2700 W 7th St, Fort Worth, TX", mapboxToken).then(function (results){
//     var popup = new mapboxgl.Popup()
//         .setHTML('<h6>Velvet Taco</h6>')
//
//     new mapboxgl.Marker({color: "rebeccapurple", draggable: true})
//         .setLngLat(results)
//         .setPopup(popup)
//         .addTo(newMap)
//
// })
// geocode("3000 W 7th St Ste 110, Fort Worth, TX", mapboxToken).then(function (results){
//     var popup = new mapboxgl.Popup()
//         .setHTML('<h6>Chipotle</h6>')
//
//     new mapboxgl.Marker({color: "green", draggable: true})
//         .setLngLat(results)
//         .setPopup(popup)
//         .addTo(newMap)
//
// })