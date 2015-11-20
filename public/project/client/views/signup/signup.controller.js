"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("SignupController", SignupController);


    // init_map();
    function SignupController($location,$scope,$rootScope) {

        $scope.user ={};
        $scope.userPref ={};
        $rootScope.newUserPref={};
        $rootScope.newUser={}

        $scope.register = function(){

            console.log($rootScope.newUser);
            for(var prop in $scope.user){
                $rootScope.newUser[prop] = $scope.user[prop];

            }
            for(var prop in $scope.userPref){
                $rootScope.newUserPref[prop] = $scope.userPref[prop];

            }
            $location.path("/signup-form");
            console.log($rootScope.newUser);


        }



    }



})();