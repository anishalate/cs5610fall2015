"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,$rootScope,UserService) {

        $scope.user ={};

        $scope.register = function(){

            UserService.createUser($scope.user, function(newUser){
               // console.log(newUser);
                $rootScope.currentUser = newUser;
            })

        }
    }
})();