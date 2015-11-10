"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope,$rootScope,$location,FormService) {
        $scope.form ={};
        $scope.form.name ="";

        $scope.forms = [];
        if($rootScope.currentUser!==undefined) {
            init();
        }

        function init(){
            $scope.forms = [];
            FormService.findAllFormsForUser($rootScope.currentUser.id, function(forms){
                $scope.forms= forms;
            })
        }

        $scope.addForm = function(){
            $scope.newForm ={};
            $scope.newForm.name = $scope.form.name;
            FormService.createFormForUser($rootScope.currentUser.id,$scope.newForm, function(newForm){
                //$scope.forms.push(newForm);
                init();
            })


        }

        $scope.deleteForm = function(formId){
            FormService.deleteFormById(formId,function(allForms){
                init();
            })
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
            $scope.newForm.name = $scope.form.name;
            FormService.updateFormById($scope.form.id,$scope.newForm,function(updatedForm){
                    //add something for callback later on.
                init();
                $scope.form ={};
                $scope.form.name ="";
            })
        }
    }
})();