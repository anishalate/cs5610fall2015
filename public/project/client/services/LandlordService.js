"use strict";
(function(){
    angular
        .module("RoomiesApp")
        .factory("LandlordService", LandlordService);

    function LandlordService($q,$http) {
        // var currentUsers = [];
        var service ={
            createLandlord :createLandlord,
            findLandlordByCredentials:findLandlordByCredentials,
            findAllLandlords:findAllLandlords,
            deleteLandlordById:deleteLandlordById,
            updateLandlord:updateLandlord,
            findById:findById
        };

        function findById(id){
            var deferred =$q.defer();

            $http.get("/api/project/landlord/"+id)
                .success(function(landlord){
                    deferred.resolve(landlord);
                });
            return deferred.promise;
        }
        function findLandlordByCredentials(email,password){

            var deferred = $q.defer();
            $http.get("/api/project/landlord?email="+email+"&password="+password)
                .success(function(landlord){
                    deferred.resolve(landlord);
                });
            return deferred.promise;

        }

        function findAllLandlords(){
            var deferred = $q.defer();
            $http.get("/api/project/landlord")
                .success(function(landlords){
                    deferred.resolve(landlords);
                });
            return deferred.promise;
        }

        function createLandlord(newLandlord){

            var deferred = $q.defer();
           $http.post("/api/project/landlord",newLandlord)
                .success(function(landlord){

                    deferred.resolve(landlord);
                });

            return deferred.promise;


        }
        function deleteLandlordById(id){
            var deferred = $q.defer();
            $http.delete("/api/project/landlord/"+id)
                .success(function(landlords){
                    deferred.resolve(landlords);
                });

            return deferred.promise;
        }

        function updateLandlord(id,updatedLandlord){
            var deferred = $q.defer();
            $http.put("/api/project/landlord/"+id,updatedLandlord)
                .success(function(landlord){
                    deferred.resolve(landlord);
                });

            return deferred.promise;

        }

        return service;
    }
})();