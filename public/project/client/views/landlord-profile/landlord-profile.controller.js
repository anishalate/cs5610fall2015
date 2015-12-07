"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("LandlordProfileController", LandlordProfileController);



    function LandlordProfileController($location,$scope,$rootScope,LandlordService,ListingService,$cookieStore) {

        $scope.newListing ={};
        $scope.editProfileShow = true;
        $scope.editListingShow = true;
        function initializeAutoComplete() {

            var input = document.getElementById('address');
            var autocomplete = new google.maps.places.Autocomplete(input);

        }


        init();

        function init() {

            $rootScope.currentLandlord=$cookieStore.get('landlord');
            if ($rootScope.currentLandlord !== undefined) {
                $scope.landlord = $rootScope.currentLandlord;


            }
            else{
                $location.path("/signin");
            }
        }

        $scope.editProfile = function(){
            $scope.editProfileShow = false;

        }
        $scope.saveProfile = function(){
            $scope.editProfileShow = true;
            console.log($scope.landlord);

            LandlordService.updateLandlord($scope.landlord._id,$scope.landlord)
                .then(function(status){
                    $cookieStore.put('landlord',$scope.landlord);
                    console.log("updated"+status);
                })
        }

        $scope.editListing = function(listing){
            $rootScope.currentListing = listing;
            $cookieStore.put('listing',listing);
            $location.path("/apartments");
        }
        $scope.deleteListing = function(landlordId,listingId){
            ListingService
                .deleteListing(landlordId,listingId)
                .then(function(landlord){
                    $cookieStore.put('landlord',landlord);
                    init();
                })

        }

        $scope.showModal = function(fieldId){
            $("#myModal").modal();

        }

        $scope.createListing = function(){

            $scope.newListing.userId = $scope.landlord._id;
            ListingService.createListing($scope.landlord._id,$scope.newListing)
                .then(function(landlord){
                    $rootScope.currentLandlord=landlord;
                    $cookieStore.put('landlord',landlord);
                    init();
                })
        }
        google.maps.event.addDomListener(window, 'load', initializeAutoComplete);

    }



})();