"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($q,$http) {


        var service ={
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById,
        }
        function  createFormForUser(userId,form){

            form.id = guid();
            form.userId = userId;
            var deferred = $q.defer();
            $http.post("/api/assignment/user/"+userId+"/form",form)
                .success(function(newForm){
                    deferred.resolve(newForm);
                });

            return deferred.promise;

        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+userId+"/form")
                .success(function(formByUsers){
                    deferred.resolve(formByUsers);
                });

            return deferred.promise;

        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId)
                .success(function(forms){
                    deferred.resolve(forms);
                });

            return deferred.promise;
        }

        function updateFormById(formId,newForm){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/"+formId,newForm)
                .success(function(updatedForm){
                    deferred.resolve(updatedForm);
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