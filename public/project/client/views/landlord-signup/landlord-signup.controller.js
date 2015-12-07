"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("LandlordSignupController", LandlordSignupController);



    function LandlordSignupController($location,$scope,$rootScope,LandlordService,ListingService) {
        $scope.landlord ={};
        $scope.listing ={};
        init();

        function initializeAutoComplete() {

            var input = document.getElementById('address');
            var autocomplete = new google.maps.places.Autocomplete(input);

        }

        function init()
        {
            google.maps.event.addDomListener(window, 'load', initializeAutoComplete);
        }
        $scope.register = function(){
            var geocoder = new google.maps.Geocoder();
            var latitude=0;
            var longitude=0;
            var address = $scope.listing.address;
            geocoder.geocode( { 'address': address}, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    latitude = results[0].geometry.location.lat();
                    longitude = results[0].geometry.location.lng();
                    $scope.listing.latitude=latitude;
                    $scope.listing.longitude=longitude;
                }

            });

            LandlordService.createLandlord($scope.landlord)
                .then(function(landlord){
                    $rootScope.currentLandlord = landlord;
                    $scope.listing.userId = landlord._id;
                    ListingService.createListing(landlord._id,$scope.listing)
                        .then(function(listing){
                            $rootScope.currentListing = listing;
                            $location.path("/landlord-profile");
                        })
                });



        }




    }



})();
