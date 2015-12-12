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
           $scope.imageIndex=0;
            $rootScope.currentUser = $cookieStore.get('user');
            if ($rootScope.currentUser !== undefined) {
                AWS.config.update({accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key});
                AWS.config.region = 'us-east-1';
                UserService.findAllUsers()
                    .then(function (users) {
                        $scope.userList = users;
                        initList($scope.userList);
                    });
            }
            else{
                $location.path("#/signin")
            }
        }

        function initList(list){
            $scope.actualList = list;
            for(var i=0;i<list.length;i++){

                $scope.generatePicUrl($scope.actualList[i],$scope.actualList[i].userDetails.profilePicUrl);
                var user = $rootScope.currentUser;
                var total = 8;
                var count =0;

                if(list[i].userDetails.age>=user.userRoommatePref.minAge&&list[i].userDetails.age<=user.userRoommatePref.maxAge){
                    count++;
                }
                if(list[i].userDetails.sex==user.userRoommatePref.sex || user.userRoommatePref.sex=="any"){
                    count++;

                }
                if(list[i].userDetails.hometown.toLowerCase()==user.userRoommatePref.hometown.toLowerCase()
                ||user.userRoommatePref.hometown=="any"||user.userRoommatePref.length<=1){
                    count++;
                }
                if(list[i].userLifestyle.smoke.toLowerCase()==user.userRoommatePref.smoke.toLowerCase()){
                    count++
                }
                if(list[i].userLifestyle.alcohol.toLowerCase()==user.userRoommatePref.alcohol.toLowerCase()){
                    count++
                }
                if(list[i].userLifestyle.drugs.toLowerCase()==user.userRoommatePref.drugs.toLowerCase()){
                    count++
                }
                if(list[i].userLifestyle.pets.toLowerCase()==user.userRoommatePref.pets.toLowerCase()){
                    count++
                }
                if(list[i].userLifestyle.parties.toLowerCase()==user.userRoommatePref.parties.toLowerCase()){
                    count++
                }
                $scope.actualList[i].roomMateMatch = count/total*100;
                if($scope.actualList[i]._id==$rootScope.currentUser._id){
                    $scope.actualList.splice(i,1);
                }

            }
        }

        $scope.generatePicUrl =function(user,imageKey){
            var s3 = new AWS.S3();
            var deferred = $q.defer();
            var params = {Bucket: $scope.creds.bucket, Key:imageKey , Expires: 60};
            var url = s3.getSignedUrl('getObject', params, function (err, url) {
                if (url){
                    console.log("The URL is", url);
                    user.userDetails.profilePicUrl=url;
                }
            });
          

        };

        $scope.browseProfile = function(id){
            UserService.findUserById(id)
                .then(function(user){
                    $rootScope.browseUser = user;
                   /*$cookieStore.remove('browseUser');
                    $cookieStore.put('browseUser',user);*/
                })
        }

        $scope.filterResults= function(){

            var list=[];
            for(var i=0;i<$scope.userList.length;i++){
                var user=$scope.userList[i];
                if($scope.ageMin==""||$scope.ageMax==""||$scope.sex==""||$scope.roomType==""){
                    alert("Please fill all search fields");
                    return;
                }
                if(user.userDetails.age>=$scope.ageMin&&user.userDetails.age<=$scope.ageMax
                &&(user.userPref.roomType==$scope.roomType||user.userPref.roomType=="any")&&(user.userDetails.sex==$scope.sex||user.userDetails.sex=="any")){
                    list.push(user);
                }
            }
            initList(list);
        }


    }
})();