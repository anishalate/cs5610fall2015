"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("BrowseProfileController", BrowseProfileController);



    function BrowseProfileController($routeParams,$scope,UserService,$cookieStore,$rootScope) {



        $scope.languages ="";
        $scope.food="";
        $scope.languages1 ="";
        $scope.food1="";
        $scope.user={};
        $scope.browseUserId = $routeParams.browseUserId;
        $scope.isLiked=false;
        $scope.creds = {
            bucket: 'cs5610anish',
            access_key: 'AKIAJNX74V2SPUBGSRLQ',
            secret_key: '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'
        };
        $scope.profilePicUrl = "http://www.gravatar.com/avatar/";
        $scope.showDetails = false;
        init();

        function init(){
            $rootScope.currentUser = $cookieStore.get('user');
            UserService.findUserById( $scope.browseUserId )
                .then(function(user){
                    $scope.user= user;
                    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
                    AWS.config.region = 'us-east-1';
                    if($scope.user.userDetails.profilePicUrl!==undefined){
                        generatePicUrl();

                    }
                    showContactInfo();
                    for(var i=0;i<$rootScope.currentUser.userDetails.likesUser.length;i++){
                        var users = $rootScope.currentUser.userDetails.likesUser[i];
                        if($scope.user._id==users){
                            $scope.isLiked=true;
                        }
                    }

                });






        }

        $scope.likeUser =function(){
            $scope.isLiked=true;
            $rootScope.currentUser.userDetails.likesUser.push($scope.user._id);
            UserService.updateUser($rootScope.currentUser._id,$rootScope.currentUser)
                .then(function(status){
                    $cookieStore.put('user',$rootScope.currentUser);
                });

        }
        function generatePicUrl(){
            var s3 = new AWS.S3();
            var params = {Bucket: $scope.creds.bucket, Key:$scope.user.userDetails.profilePicUrl , Expires: 60};
            var url = s3.getSignedUrl('getObject', params, function (err, url) {
                if (url){
                    console.log("The URL is", url);
                    $scope.profilePicUrl = url;
                }
            });

        }

        function showContactInfo(){
            var check1=false;
            var check2=false;
            if($rootScope.currentUser.userDetails.likesUser!==undefined) {
                for (var i=0 ;i<$rootScope.currentUser.userDetails.likesUser.length;i++) {
                    var users= $rootScope.currentUser.userDetails.likesUser[i];
                    if ($scope.user._id == users) {
                        check1 = true;
                        break;
                    }
                }
            }
            if($scope.user.userDetails.likesUser!==undefined) {
                for (var i=0;i< $scope.user.userDetails.likesUser.length;i++) {
                    var users1 = $scope.user.userDetails.likesUser[i];
                    if (users1== $rootScope.currentUser._id) {
                        check2 = true;
                        break;
                    }

                }
            }
            if(check1&&check2){
                $scope.showDetails=true;
            }


                }












    }



})();