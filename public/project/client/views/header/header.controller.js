"use strict";
(function()
{
    angular
        .module("RoomiesApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$location,$cookieStore)
    {
        $scope.$location = $location;
        $scope.headerType="";

        $scope.init =function() {
            if ($scope.$location.url().indexOf('landlord-profile') != -1||$scope.$location.url().indexOf('apartment') != -1){
                $scope.headerType="type3";
            }
            else if ($scope.$location.url().indexOf('profile') != -1 || $scope.$location.url().indexOf('search') != -1||$scope.$location.url().indexOf('profile-likes') != -1||$scope.$location.url().indexOf('browse-apartment') != -1||$scope.$location.url().indexOf('browse-profile') != -1) {
                $scope.headerType = "type2";
            }

            else {
                $scope.headerType = "type1";
            }
        }
        $scope.$on('$locationChangeStart', function(event) {
            if ($scope.$location.url().indexOf('landlord-profile') != -1||$scope.$location.url().indexOf('apartment') != -1){
                $scope.headerType="type3";
            }
           else if ($scope.$location.url().indexOf('profile') != -1 || $scope.$location.url().indexOf('search') != -1||$scope.$location.url().indexOf('profile-likes') != -1||$scope.$location.url().indexOf('browse-apartment') != -1||$scope.$location.url().indexOf('browse-profile') != -1) {
                $scope.headerType = "type2";
            }

            else {
                $scope.headerType = "type1";
            }
        });
        $scope.logout = function(){

                $cookieStore.remove('user');
                $cookieStore.remove('landlord');
                $cookieStore.remove('listing');
            $location.path("#/home");

        }
    }
})();