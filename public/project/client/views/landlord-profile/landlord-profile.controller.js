"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("LandlordProfileController", LandlordProfileController);



    function LandlordProfileController($location,$scope,$rootScope,LandlordService,ListingService) {

        $scope.newListing ={};
        $scope.editProfileShow = true;
        $scope.editListingShow = true;

        init();

        function init() {
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
                    console.log("updated"+status);
                })
        }

        $scope.editListing = function(listing){
            $rootScope.currentListing = listing;
            $location.path("/apartments");
        }

        $scope.showModal = function(fieldId){
            $("#myModal").modal();
        }

        $scope.createListing = function(){

            $scope.newListing.userId = $scope.landlord._id;
            ListingService.createListing($scope.landlord._id,$scope.newListing)
                .then(function(landlord){
                    $rootScope.currentLandlord=landlord;
                    init();
                })
        }

    }



})();