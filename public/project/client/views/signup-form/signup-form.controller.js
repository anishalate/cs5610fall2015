"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("SignupFormController", SignupFormController);



    function SignupFormController($location,$scope,$rootScope,UserService,$cookieStore) {
        $scope.user ={};
        $rootScope.newUser.userRoommatePref ={};


        $scope.register = function(){

            for(var prop in $scope.user.userDetails){
                $rootScope.newUser.userDetails[prop] = $scope.user.userDetails[prop];

            }
            for(var prop in $scope.user.userPref){
                $rootScope.newUser.userPref[prop] = $scope.user.userPref[prop];

            }
            for(var prop in $scope.user.userRoommatePref){
                $rootScope.newUser.userRoommatePref[prop] = $scope.user.userRoommatePref[prop];

            }
            UserService.createUser($rootScope.newUser)
                .then(function(newUser){
                    $rootScope.currentUser = newUser;
                })
            console.log($rootScope.newUser);
            $cookieStore.put('user',$rootScope.newUser);
            $location.path("/profile");
        }




    }



})();/**
 * Created by Anish on 11/20/2015.
 */
