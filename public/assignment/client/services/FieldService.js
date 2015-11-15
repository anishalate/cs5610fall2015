"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($q,$http) {


        var service = {
            createFieldForForm:createFieldForForm ,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField:updateField

        }


        function createFieldForForm(formId,field){

            var deferred = $q.defer();
            $http.post("/api/assignment/form/"+formId+"/field",field)
                .success(function(formById){
                     deferred.resolve(formById)
            })
                .error(function(errorMessage){
                        deferred.resolve(errorMessage);
            });
            return deferred.promise;
        }

        function getFieldsForForm(formId){
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field")
                .success(function(formByUsers){
                    deferred.resolve(formByUsers);
                });

            return deferred.promise;

        }

        function getFieldForForm(formId,fieldId){
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(field){
                    deferred.resolve(field);

            });

            return deferred.promise;
        }

        function deleteFieldFromForm(formId,fieldId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(function(formById){
                    deferred.resolve(formById);
                });
            return deferred.promise;


        }

        function updateField(formId,fieldId,updatedField){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/"+formId+"/field/"+fieldId,updatedField)
                .success(function(formById){
                    deferred.resolve(formById);
                });
            return deferred.promise;

        }
        return service;
    }
    })();