"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope,UserService,$location) {

        $scope.user ={};

        $scope.register = function(){

            UserService.createUser($scope.user)
                .then(function(newUser){
                    //console.log(newUser);
                    $rootScope.currentUser = newUser;
                    $location.path ("/profile");

                })
        }
    }
})();