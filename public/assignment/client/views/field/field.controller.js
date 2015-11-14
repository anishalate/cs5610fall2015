"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, $location, FieldService) {
        $scope.fields =[];
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;


        init();
        function init(){
            console.log("Form id==" + formId);
            FieldService.getFieldsForForm(formId)
                .then(function(allFieldsForForm){
                    $scope.fields= allFieldsForForm;
                    console.log($scope.fields);
                });
        }

        $scope.addNewFieldType ={
            repeatSelect :null,
            options:[
                {id: 'option1', value : "Single Line Text Field"},
                {id: 'option2', value: "Multiple Line Text Field"},
                {id:'option3',value: "Date Field"},
                {id: 'option4',value: "Dropdown Field"},
                {id:'option5',value: "Checkboxes Field"},
                {id:'option6',value: "Radio Buttons Fields"}
            ],
        };

        $scope.addField = function(fieldType){
            console.log(fieldType);
        }

    }
})();