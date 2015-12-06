"use strict";
(function()
{
    angular
        .module("RoomiesApp")
        .controller("SearchRoommateController", SearchRoommateController);

    function SearchRoommateController($scope,$location,$cookieStore,UserService,$rootScope,$q)
    {

        $scope.userList=[];
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
                UserService.findAllUsers()
                    .then(function (users) {
                        $scope.userList = users;
                    });
            }
            else{
                $location.path("#/signin")
            }
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

        $scope.browseProfile = function(id){
            UserService.findUserById(id)
                .then(function(user){
                    $rootScope.browseUser = user;
                   /*$cookieStore.remove('browseUser');
                    $cookieStore.put('browseUser',user);*/
                })
        }


    }
})();