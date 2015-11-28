"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("UserProfileController", UserProfileController);



    function UserProfileController($location,$scope,$rootScope,UserService) {

        $scope.showDisplay = true;
        $scope.showEdit = false;
        $scope.languages ="";
        $scope.food="";
        $scope.languages1 ="";
        $scope.food1="";
        $scope.user={};
        $scope.editContactInfo =true;
        init();

        function init(){
            if($rootScope.currentUser!==undefined){
                $scope.user= $rootScope.currentUser;
            }
            else{
             $location.path("/signin");
            }
        }

        $scope.edit=function(){
            $scope.showEdit = true;
            $scope.showDisplay = false;

        }
        $scope.updatePref =function(){

            $scope.showDisplay = true;
            $scope.showEdit = false;
            $scope.user.userDetails.languages = $scope.languages.split(",");
            $scope.user.userLifestyle.food=$scope.food.split(",");
            $scope.user.userRoommatePref.languages = $scope.languages1.split(",");
            $scope.user.userRoommatePref.food=$scope.food1.split(",");
            console.log($scope.user);
            UserService.updateUser($scope.user._id,$scope.user)
                .then(function(user){

                })
        }

        $scope.editContact = function(){
            $scope.editContactInfo =false;

        }
        $scope.saveContact = function(){
            $scope.editContactInfo =true;
            UserService.updateUser($scope.user._id,$scope.user)
                .then(function(user){

                })


        }




    }



})();