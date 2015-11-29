"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("LandlordSignupController", LandlordSignupController);



    function LandlordSignupController($location,$scope,$rootScope,LandlordService,ListingService) {
        $scope.landlord ={};
        $scope.listing ={};


        $scope.register = function(){
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
