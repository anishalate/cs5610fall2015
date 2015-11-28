"use strict";
(function(){
    angular
        .module("RoomiesApp")
        .factory("ListingService", ListingService);

    function ListingService($q,$http) {
        // var currentUsers = [];
        var service ={
            createListing :createListing,
            findListingsByLandlord:findListingsByLandlord,
            findListingById:findListingById,
            deleteListing:deleteListing,
            updateListing:updateListing
        };

        function findListingsByLandlord(landlordId){

            var deferred = $q.defer();
            $http.get("/api/project/landlord/"+landlordId+"/listing")
                .success(function(listings){
                    deferred.resolve(listings);
                });
            return deferred.promise;

        }

        function findListingById(landlordId,listingId){
            var deferred = $q.defer();
            $http.get("/api/project/landlord/"+landlordId+"/listing/"+listingId)
                .success(function(listing){
                    deferred.resolve(listing);
                });
            return deferred.promise;
        }

        function createListing(landlordId,newListing){

            var deferred = $q.defer();
            $http.post("/api/project/landlord/"+landlordId+"/listing",newListing)
                .success(function(listing){

                    deferred.resolve(listing);
                });

            return deferred.promise;


        }
        function deleteListing(landlordId,listingId){
            var deferred = $q.defer();
            $http.delete("/api/project/landlord/"+landlordId+"/listing/"+listingId)
                .success(function(status){
                    deferred.resolve(status);
                });

            return deferred.promise;
        }

        function updateListing(landlordId,listingId,updatedLandlord){
            var deferred = $q.defer();
            $http.put("/api/project/landlord/"+landlordId+"/listing/"+listingId,updatedLandlord)
                .success(function(listing){
                    deferred.resolve(listing);
                });

            return deferred.promise;

        }

        return service;
    }
})();