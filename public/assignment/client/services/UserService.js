"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope,$q,$http) {
       // var currentUsers = [];
        var service ={
            createUser :createUser,
            findUserByUsernameAndPassword:findUserByUsernameAndPassword,
            findAllUsers:findAllUsers,
            deleteUserById:deleteUserById,
            updateUser:updateUser
        };

        function findUserByUsernameAndPassword(username,password){

                var deferred = $q.defer();
                $http.get("/api/assignment/user?username="+username+"&password="+password)
                    .success(function(user){
                        deferred.resolve(user);
            });
            return deferred.promise;

        }

        function findAllUsers(){
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function(users){
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        function createUser(newUser){

            var deferred = $q.defer();
            newUser.id = guid();
            $http.post("/api/assignment/user",newUser)
                .success(function(user){
                    console.log(user);
                    deferred.resolve(user);
                });

            return deferred.promise;


        }
        function deleteUserById(id){
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/"+id)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function updateUser(id,updateUser){
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+id,updateUser)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;

        }
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        return service;
    }
})();