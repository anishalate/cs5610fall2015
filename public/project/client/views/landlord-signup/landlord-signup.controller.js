"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("LandlordSignupController", LandlordSignupController);



    function LandlordSignupController($location,$scope,$rootScope) {
        $scope.landlord ={};
        $scope.listing ={};


        $scope.register = function(){


            $location.path("/landlord-profile");
        }




    }



})();/**
 * Created by Anish on 11/20/2015.
 */
