"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("SignInController", SignInController);



    function SignInController($location,$scope,$rootScope,UserService) {

        $scope.signin = function(){

            if($scope.isLandlord===undefined){
                alert("Please select if you are a landlord or not");
                return;
            }
            console.log($scope.isLandlord);

            if($scope.email.length<=0||$scope.password.length<=0){
                alert("Please input all fields");
                return;
            }

            if($scope.isLandlord=="no") {
                UserService.findUserByEmailAndPassword($scope.email, $scope.password)
                    .then(function (user) {
                        if (user == null) {
                            alert("User not found, Please check email and/or password");
                            return;
                        }
                        $rootScope.currentUser = user;

                        $location.path("/profile");
                    });
            }
            else
            {
                if($scope.isLandlord=="yes"){
                    console.log("Is landlord login");
                }
            }
        }

    }



})();
