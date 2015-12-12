"use strict";
(function() {
    angular
        .module("RoomiesApp")
        .controller("UserProfileController", UserProfileController);



    function UserProfileController($location,$scope,$rootScope,UserService,$cookieStore,$q) {

        $scope.showDisplay = true;
        $scope.showEdit = false;
        $scope.languages ="";
        $scope.food="";
        $scope.languages1 ="";
        $scope.food1="";
        $scope.user={};
        $scope.editContactInfo =true;
        $scope.showUpload=false;
        $scope.sizeLimit      = 5292880; //5MB in Bytes
        $scope.uploadProgress = 0;
        $scope.editProfile=false;
        $scope.likedByUsers=[];
        $scope.likesUser=[];
        $scope.creds = {
            bucket: 'cs5610anish',
            access_key: 'AKIAJNX74V2SPUBGSRLQ',
            secret_key: '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'
        };
        $scope.profilePicUrl = "http://www.gravatar.com/avatar/";
        init();

        function init(){
            $rootScope.currentUser=$cookieStore.get('user');
            if($rootScope.currentUser!==undefined){
                $scope.user= $rootScope.currentUser;

                AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
                AWS.config.region = 'us-east-1';
                if($scope.user.userDetails.profilePicUrl!==undefined){
                    generatePicUrl();

                }
              generateLikesInfo()
                  .then(function(likesUserName){
                      $scope.likesUser=likesUserName;

                  });
                generateLikedByInfo()
                    .then(function(likedByUsers){
                        $scope.likedByUsers=likedByUsers;
                        console.log(likedByUsers);
                    })


            }
            else{
             $location.path("/signin");
            }
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

        $scope.edit=function(){
            $scope.showEdit = true;
            $scope.showDisplay = false;

        }

        $scope.editPic =function(){
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
                var uniqueFileName = $scope.user._id;

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
                        generatePicUrl();
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
                        if($scope.user.userDetails.profilePicUrl != uniqueFileName) {
                            $scope.user.userDetails.profilePicUrl = uniqueFileName;
                            UserService.updateUser($scope.user._id, $scope.user)
                                .then(function (user) {
                                    //$cookieStore.remove('user');
                                    $cookieStore.put('user',user);
                                });
                        }


                    });
            }
            else {
                // No File Selected
                alert('Please select a file to upload');
            }




            $scope.showUpload= false;

        }
        $scope.updatePref =function(){

            $scope.showDisplay = true;
            $scope.showEdit = false;
            $scope.user.userDetails.languages = $scope.languages.split(",");
            $scope.user.userLifestyle.food=$scope.food.split(",");
            $scope.user.userRoommatePref.languages = $scope.languages1.split(",");
            $scope.user.userRoommatePref.food=$scope.food1.split(",");
            console.log($scope.user);
            UserService.updateUser($scope.user._id,$scope.user)
                .then(function(user){
                //    $cookieStore.remove('user');
                    $cookieStore.put('user',user);

                })
        }

        $scope.editContact = function(){
            $scope.editContactInfo =false;

        }
        $scope.saveContact = function(){
            $scope.editContactInfo =true;
            UserService.updateUser($scope.user._id,$scope.user)
                .then(function(user){
                    $cookieStore.remove('user');
                    $cookieStore.put('user',user);

                })


        }
        $scope.editProfileInfo=function(){
            $scope.editProfile = true;
        }
        $scope.saveProfileInfo =function(){
            UserService.updateUser($scope.user._id,$scope.user)
                .then(function(user){
                  //  $cookieStore.remove('user');
                    $cookieStore.put('user',user);
                    $scope.editProfile = false;

                })


        }

       function generateLikesInfo() {

           var likesUserName = [];
           var deferred = $q.defer();
           for (var i = 0; i < $scope.user.userDetails.likesUser.length; i++) {
               var userId = $scope.user.userDetails.likesUser[i];
               UserService.findUserById(userId)
                   .then(function (user) {
                       likesUserName.push(user.userDetails.firstName + " " + user.userDetails.lastName);
                       deferred.resolve(likesUserName);
                   });


           }
           return deferred.promise;
       }
        function generateLikedByInfo(){

             var likedByUsers=[];
            var deferred = $q.defer();
             UserService.findAllUsers()
                 .then(function(users){
                     for(var j=0;j<users.length;j++) {
                         var user = users[j];
                         for (var i=0;i<user.userDetails.likesUser.length;i++)  {
                            var userId = user.userDetails.likesUser[i];
                             if (userId == $scope.user._id) {
                                 likedByUsers.push(user.userDetails.firstName + " " + user.userDetails.lastName);
                                 deferred.resolve(likedByUsers);
                             }
                         }
                     }

              });
            return deferred.promise;
        }




    }



})();