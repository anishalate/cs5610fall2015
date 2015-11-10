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

            UserService.updateUser($rootScope.currentUser.id,$scope.user, function(newUser){
                //console.log(newUser);
                $rootScope.currentUser = newUser;
            })

        }
    }
})();