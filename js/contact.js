$(document).ready(function(){
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

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if(form.checkValidity() === false) {
                event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
        
});