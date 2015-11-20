"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("SignupFormController", SignupFormController);



    function SignupFormController($location,$scope,$rootScope) {
        $scope.user ={};
        $scope.userPref ={};

        $scope.register = function(){

            for(var prop in $scope.user){
                $rootScope.newUser[prop] = $scope.user[prop];

            }
            for(var prop in $scope.userPref){
                $rootScope.newUserPref[prop] = $scope.userPref[prop];

            }

            console.log($rootScope.newUser);
            console.log($rootScope.newUserPref);
            $location.path("/profile");
        }




    }



})();/**
 * Created by Anish on 11/20/2015.
 */
