"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("ApartmentController", ApartmentController);



    function ApartmentController($scope,$rootScope,LandlordService,ListingService,$location) {
        $scope.listing={};
        $scope.landlord={};
        $scope.editListingInfo= true;
        $scope.isLandlord = false;
        $scope.amenities="";
        init();
        function init(){

            if($rootScope.currentUser===undefined&&$rootScope.currentLandlord===undefined){
                $location.path("/signin");
                return; 
            }
            $scope.listing = $rootScope.currentListing;
            var userId = $rootScope.currentListing.userId;
            if($rootScope.currentLandlord!==undefined){
                $scope.isLandlord=true;
            }
            LandlordService.findById(userId)
                .then(function(landlord){
                    $scope.landlord= landlord;
                });

        }

        $scope.editListing=function(){
            $scope.editListingInfo = false;
        }

        $scope.saveListing = function(){
            if( $scope.amenities.length>1) {
                $scope.listing.amenities = $scope.amenities.split(",");
            }
            ListingService.updateListing($scope.landlord._id,$rootScope.currentListing._id,$scope.listing)
                .then(function(listing){
                    $scope.editListingInfo=true;
            });

        }
    }




})();