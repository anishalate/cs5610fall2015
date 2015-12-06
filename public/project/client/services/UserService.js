"use strict";
(function(){
    angular
        .module("RoomiesApp")
        .factory("UserService", UserService);

    function UserService($q,$http) {
        // var currentUsers = [];
        var service ={
            createUser :createUser,
            findUserByEmailAndPassword:findUserByEmailAndPassword,
            findAllUsers:findAllUsers,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            findUserById:findUserById,
        };

        function findUserById(id){
            var deferred = $q.defer();
            $http.get("/api/project/user/"+id)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
        }
        function findUserByEmailAndPassword(email,password){

            var deferred = $q.defer();
            $http.get("/api/project/user?email="+email+"&password="+password)
                .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;

        }

        function findAllUsers(){
            var deferred = $q.defer();
            $http.get("/api/project/user")
                .success(function(users){
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        function createUser(newUser){

            var deferred = $q.defer();
            //newUser.id = guid();
            $http.post("/api/project/user",newUser)
                .success(function(user){

                    deferred.resolve(user);
                });

            return deferred.promise;


        }
        function deleteUserById(id){
            var deferred = $q.defer();
            $http.delete("/api/project/user/"+id)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
        }

        function updateUser(id,updateUser){
            var deferred = $q.defer();
            $http.put("/api/project/user/"+id,updateUser)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;

        }

        return service;
    }
})();