"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope,UserService,$location) {
        var model = this;
        model.user ={};
        $rootScope.currentUser={};
        model.register = function(){

            UserService.createUser(model.user)
                .then(function(newUser){
                    console.log(newUser);
                    $rootScope.currentUser = newUser;
                    $location.path ("/profile");

                })
        }
    }
})();