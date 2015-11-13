"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope,$rootScope,$location,UserService) {

        $scope.login = function(){

            UserService.findUserByUsernameAndPassword($scope.username,$scope.password)
                .then(function(user){
                    $rootScope.currentUser =user;
                    $location.path ("/profile");
                });
        }
    }
})();