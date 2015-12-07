"use strict";
(function()
{
    angular
        .module("RoomiesApp")
        .controller("SearchApartmentController", SearchApartmentController);

    function SearchApartmentController($scope,$location,$cookieStore,UserService,ListingService,$rootScope,$q)
    {


        $scope.apartmentList=[];
        $scope.actualList=[];
        $scope.creds = {
            bucket: 'cs5610anish',
            access_key: 'AKIAJNX74V2SPUBGSRLQ',
            secret_key: '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'
        };
        init();

        function init() {
            $rootScope.currentUser = $cookieStore.get('user');
            if ($rootScope.currentUser !== undefined) {
                AWS.config.update({accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key});
                AWS.config.region = 'us-east-1';
                ListingService.findAll()
                    .then(function (listings) {
                        $scope.apartmentList = listings;
                        initList(listings);

                    });
            }
            else{
                $location.path("#/signin")
            }
        }

        function initList(list){
            $scope.actualList = list;
        }
        $scope.generatePicUrl =function(imageKey){
            var s3 = new AWS.S3();
            var deferred = $q.defer();
            var params = {Bucket: $scope.creds.bucket, Key:imageKey , Expires: 60};
            var url = s3.getSignedUrl('getObject', params, function (err, url) {
                if (url){
                    console.log("The URL is", url);
                    deferred.resolve(url);
                }
            });
            return deferred.promise;

        };

        $scope.browseApartment = function(apartment){
            $rootScope.currentListing = apartment;
            $cookieStore.put('listing',apartment);
            $location.path("/browse-apartment");
        }

        $scope.filterList = function(){
            var tempList=[];
            if($scope.beds===""||$scope.baths===""||$scope.rentMin==undefined||$scope.rentMax==undefined){
                alert("Please enter all the search fields");
                return;
            }

            for(var i=0;i<$scope.apartmentList.length;i++){

                if($scope.apartmentList[i].beds==$scope.beds&& $scope.apartmentList[i].baths==$scope.baths&&
                    $scope.apartmentList[i].rent>=$scope.rentMin&&$scope.apartmentList[i].rent<=$scope.rentMax
                ){
                    tempList.push($scope.apartmentList[i]);
                }
            }
            initList(tempList);


        }



    }
})();