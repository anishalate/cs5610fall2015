"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("SignupController", SignupController);


    // init_map();
    function SignupController($location,$scope,$rootScope) {

        $scope.user ={};

        $rootScope.newUser={}

        $scope.register = function(){

            console.log($rootScope.newUser);
            for(var prop in $scope.user){
                $rootScope.newUser[prop] = $scope.user[prop];

            }

            $location.path("/signup-form");
            console.log($rootScope.newUser);


        }



    }



})();