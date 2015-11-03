"use strict";
(function()
{



       // init_map();
        function init_map() {
            var myLocation = new google.maps.LatLng(42.3806,-71.2350);

            var mapOptions = {
                center: myLocation,
                zoom: 14
            };

            var marker = new google.maps.Marker({
                position: myLocation,
            });

            var map = new google.maps.Map(document.getElementById("map1"),
                mapOptions);

            marker.setMap(map);

        }

        google.maps.event.addDomListener(window, 'load', init_map);







})();