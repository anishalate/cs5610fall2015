"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("BrowseApartmentController", BrowseApartmentController);




    function BrowseApartmentController($scope,$rootScope,$location,$cookieStore,LandlordService,$q) {
        $scope.listing={};
        $scope.landlord={};
        $scope.amenities="";
        $scope.places=[];

        $scope.creds = {
            bucket: 'cs5610anish',
            access_key: 'AKIAJNX74V2SPUBGSRLQ',
            secret_key: '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'
        };
        $scope.imgsrc="";
        $scope.images=[];
        init();


        function init(){


            $rootScope.currentUser = $cookieStore.get('user');

            if($rootScope.currentUser===undefined){
                $location.path("/signin");
                return;
            }
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-east-1';
            $rootScope.currentListing=$cookieStore.get('listing');
            var userId = $rootScope.currentListing.userId;
            $scope.listing = $rootScope.currentListing;
            for(var i=0;i<$scope.listing.photosUrl.length;i++){
                generatePicUrl1($scope.listing.photosUrl[i])
                    .then(function(url){
                        $scope.images.push({url:url});
                    })
            }
            LandlordService.findById(userId)
                .then(function(landlord){
                    $scope.landlord= landlord;
                });


            initMap()
                .then(function(places){
                    $scope.places=places;

                })


        }


        $scope.generatePicUrl =function(imageKey){
            var s3 = new AWS.S3();
            var params = {Bucket: $scope.creds.bucket, Key:imageKey , Expires: 60};
            var url = s3.getSignedUrl('getObject', params, function (err, url) {
                if (url){
                    console.log("The URL is", url);
                    $scope.imgsrc=url;
                }
            });

        };

        function generatePicUrl1(imageKey){
            var deferred = $q.defer();
            var s3 = new AWS.S3();
            var params = {Bucket: $scope.creds.bucket, Key:imageKey , Expires: 60};
            var url = s3.getSignedUrl('getObject', params, function (err, url) {
                if (url){
                    console.log("The URL is", url);
                    deferred.resolve(url);
                }
            });
            return deferred.promise;
        }

        function initMap() {
            var deferred = $q.defer();
            var geocoder = new google.maps.Geocoder();
            var latitude=0;
            var longitude=0;
            var address = "";
            if($scope.listing.address===undefined){
                address = $scope.listing.zip.toString();
            }


            else{
                address=$scope.listing.address;
            }

            geocoder.geocode( { 'address': address}, function(results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    latitude = results[0].geometry.location.lat();
                    longitude = results[0].geometry.location.lng();
                    var latlng = {lat: latitude, lng: longitude}
                    var map = new google.maps.Map(document.getElementById('map1'), {
                        center:latlng ,
                        zoom:15,

                    });
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,

                    });

                   var request ={location:latlng,radius:'500',types:['stores','restaurant']};
                    var service = new google.maps.places.PlacesService(map);
                    var places=[];
                    service.nearbySearch(request,function(results,status){
                        if(status==google.maps.places.PlacesServiceStatus.OK){
                            for(var i=0;i<results.length;i++){
                               // console.log(results[i]);
                                places.push(results[i]);
                               deferred.resolve(places);
                            }
                        }
                    })


                }
            });
            return deferred.promise;
        }
        google.maps.event.addDomListener(window, 'load', initMap);

    }





})();