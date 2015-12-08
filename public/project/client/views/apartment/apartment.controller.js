"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("ApartmentController", ApartmentController);




    function ApartmentController($scope,$rootScope,LandlordService,ListingService,$location,$q,$cookieStore) {
        $scope.listing={};
        $scope.landlord={};
        $scope.editListingInfo= true;
        $scope.isLandlord = false;
        $scope.amenities="";
        $scope.showUpload=false;
        $scope.editAdd=false;
        $scope.sizeLimit      = 5292880; //5MB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds = {
            bucket: 'cs5610anish',
            access_key: 'AKIAJNX74V2SPUBGSRLQ',
            secret_key: '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'
        };
        $scope.imgsrc="";
        $scope.images=[];
        init();
        function initializeAutoComplete() {

            var input = document.getElementById('address');
            var autocomplete = new google.maps.places.Autocomplete(input);

        }

        function init(){



            $rootScope.currentLandlord=$cookieStore.get('landlord');
            if($rootScope.currentLandlord===undefined){
                $location.path("/signin");
                return;
            }
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-east-1';
            $rootScope.currentListing=$cookieStore.get('listing');
            $scope.listing = $rootScope.currentListing;
            var userId = $rootScope.currentListing.userId;
            for(var i=0;i<$scope.listing.photosUrl.length;i++){
                generatePicUrl1($scope.listing.photosUrl[i])
                    .then(function(url){
                        $scope.images.push({url:url});
                    })

            }
            $rootScope.currentLandlord=$cookieStore.get('landlord');
            if($rootScope.currentLandlord!==undefined){
                $scope.isLandlord=true;
            }
            LandlordService.findById(userId)
                .then(function(landlord){
                    $scope.landlord= landlord;
                });
            initMap();

        }

        $scope.editListing=function(){
            $scope.editListingInfo = false;
        }
        $scope.editAddress = function(){
            $scope.editAdd= true;
        }

        $scope.saveAddress = function(){
            ListingService.updateListing($scope.landlord._id,$rootScope.currentListing._id,$scope.listing)
                .then(function(listing){
                    $cookieStore.put('listing',$scope.listing);

                    init();
                    $scope.editAdd=false;
                    initMap();
                });
        }

        $scope.saveListing = function(){
            if( $scope.amenities.length>1) {
                $scope.listing.amenities = $scope.amenities;
            }
            ListingService.updateListing($scope.landlord._id,$rootScope.currentListing._id,$scope.listing)
                .then(function(listing){
                    $cookieStore.put('listing',$scope.listing);
                    $scope.editListingInfo=true;
                    initMap();
                    init();
            });

        }

        $scope.addPhotos = function(){
            $scope.showUpload=true;
        }
        $scope.uploadPic = function(){
            var selectedFile = document.getElementById('imgFile').files[0];
            console.log(selectedFile.name + selectedFile.size);


            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

            if(selectedFile) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt(selectedFile.size));
                if (fileSize > $scope.sizeLimit) {
                    alert("Please select files less than 5MB")
                    return false;
                }
                // Prepend Unique String To Prevent Overwrites
                var uniqueFileName = $scope.listing._id+Date.now().toString();

                var params = { Key: uniqueFileName, ContentType: selectedFile.type, Body: selectedFile,ACL:'public-read' };
                /* if($scope.user.userDetails.profilePicUrl!==undefined){
                 bucket.deleteObject({Key:$scope.user.userDetails.profilePicUrl},function(err,data){

                 });
                 }*/

                bucket.putObject(params, function(err, data) {
                    if(err) {
                        alert(err);
                        return false;
                    }
                    else {

                        // Upload Successfully Finished
                        // Reset The Progress Bar
                        setTimeout(function() {
                            $scope.uploadProgress = 0;
                            $scope.$digest();
                        }, 4000);
                    }
                })
                    .on('httpUploadProgress',function(progress) {
                        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                        $scope.$digest();
                        $scope.listing.photosUrl.push(uniqueFileName);
                        ListingService.updateListing($scope.landlord._id,$rootScope.currentListing._id,$scope.listing)
                            .then(function(listing){
                                $cookieStore.put('listing',$scope.listing);
                                init();

                            });



                    });
            }
            else {
                // No File Selected
                alert('Please select a file to upload');
            }




            $scope.showUpload= false;



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
                }
            });

        }
        google.maps.event.addDomListener(window, 'load', initializeAutoComplete);
        google.maps.event.addDomListener(window, 'load', initMap);

    }





})();