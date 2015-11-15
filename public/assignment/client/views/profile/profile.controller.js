"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope,UserService) {
        var model = this;
        init();
        function init() {
            console.log($rootScope.currentUser);
            if ($rootScope.currentUser !== undefined) {
                model.user = $rootScope.currentUser;
            }
            else {
                model.user = {};

            }
        }

        model.update = function(){

            UserService.updateUser($rootScope.currentUser.id,model.user)
                .then(function(user){
                    $rootScope.currentUser =user;

                });

        }
    }
})();