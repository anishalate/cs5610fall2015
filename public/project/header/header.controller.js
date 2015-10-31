"use strict";
(function()
{
    angular
        .module("RoomiesApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$location)
    {
        $scope.$location = $location;
    }
})();