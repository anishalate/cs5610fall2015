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
            updateUser:updateUser
        };

        function findUserByEmailAndPassword(email,password){

            var deferred = $q.defer();
            $http.get("/api/assignment/user?email="+email+"&password="+password)
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
            //newUser.id = guid();
            $http.post("/api/assignment/user",newUser)
                .success(function(user){

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

        return service;
    }
})();