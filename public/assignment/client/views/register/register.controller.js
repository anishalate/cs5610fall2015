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
            if(model.user.username==undefined||model.user.password==undefined||
            model.verifyPassword==undefined||model.user.email==undefined
            ||model.user.username.length<=0||model.user.password.length<=0||model.user.email.length<=0){
                alert("Please fill in all the fields");
                return;
            }
           else
            if(model.user.password!=model.verifyPassword){
                alert("Passwords don't match");
                return;
            }
            else{

            UserService.createUser(model.user)
                .then(function(newUser){
                    console.log(newUser);
                    $rootScope.currentUser = newUser;
                    $location.path ("/profile");

                });
            }
        }
    }
})();