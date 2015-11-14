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


        function createFieldForForm(){

        }

        function getFieldsForForm(formId){
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field")
                .success(function(formByUsers){
                    deferred.resolve(formByUsers);
                });

            return deferred.promise;

        }

        function getFieldForForm(){

        }

        function deleteFieldFromForm(){

        }

        function updateField(){

        }
        return service;
    }
    })();