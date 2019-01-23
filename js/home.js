$(document).ready(function(){

    // Setup the carousel for the partners
    $('.carousel-partners').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        // centerMode: true,
        autoplay: true,
        arrows: false
    });

    // Setup the partners mouse in/out events
    $('#partners .item-partner').hover(
        // Mouse in
        function(){
            $(this).find('img').attr("src", $(this).data('path') + $(this).data('name') + '-active.png');
        },
        // Mouse out
        function(){
            $(this).find('img').attr("src", $(this).data('path') + $(this).data('name') + '.png');
        }
    );

    // Create the marker object
    var marker = L.icon({
        iconUrl: '/img/icons/marker.svg',
        iconSize:     [48, 48], // size of the icon
        iconAnchor:   [48, 48] // point of the icon which will correspond to marker's location
    });

    // Setup the contact map for the home page
    var map = L.map('map-canvas',{
        center: [-7.162372, -34.817262],
        zoom: 15
    });

    // Setup the tile layer for the map
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Setup the location marker
    L.marker([-7.162372, -34.817262], {icon: marker}).addTo(map);

});