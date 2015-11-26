"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope,$location,UserService) {
        var model = this;
        model.login = function(){

            UserService.findUserByUsernameAndPassword(model.username,model.password)
                .then(function(user){
                    if(user==null){
                        alert("User not found. Please check username and/or password");
                        return;
                    }
                    $rootScope.currentUser =user;

                    $location.path ("/profile");
                });
        }
    }
})();