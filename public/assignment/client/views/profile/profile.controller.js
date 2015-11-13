"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope,$rootScope,UserService) {

        if($rootScope.currentUser!==undefined) {
            $scope.user = $rootScope.currentUser;
        }
        else{
            $scope.user = {};

        }

        $scope.update = function(){

            UserService.updateUser($rootScope.currentUser.id,$scope.user)
                .then(function(user){
                    $rootScope.currentUser =user;

                });

        }
    }
})();