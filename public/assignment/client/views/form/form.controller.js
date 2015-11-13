"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope,$rootScope,$location,FormService) {
        $scope.form ={};
        $scope.form.title ="";

        $scope.forms = [];
        if($rootScope.currentUser!==undefined) {
            init();
        }

        function init(){
            $scope.forms = [];
            FormService.findAllFormsForUser($rootScope.currentUser.id)
                .then(function(allFormsByUser){
                $scope.forms= allFormsByUser;
                });
        }

        $scope.addForm = function(){
            $scope.newForm ={};
            $scope.newForm.title = $scope.form.title;
            FormService.createFormForUser($rootScope.currentUser.id,$scope.newForm)
                .then(function(newForm){
                    init();
                })
                //$scope.forms.push(newForm);

            $scope.form ={};
            $scope.form.title ="";


        }

        $scope.deleteForm = function(formId){
            FormService.deleteFormById(formId)
                .then(function(forms){
                    init();
                });


        }

        $scope.selectForm = function(formId){
           for(var i=0;i<$scope.forms.length;i++){
               if($scope.forms[i].id===formId){
                   $scope.form= $scope.forms[i];
                   break;
               }
           }
        }
        $scope.updateForm = function(){
            $scope.newForm = {};
            $scope.newForm.title = $scope.form.title;
            FormService.updateFormById($scope.form.id,$scope.newForm)
                .then(function(updatedForm){
                    //add something for callback later on.
                init();
                $scope.form ={};
                $scope.form.title ="";
            });
        }
    }
})();