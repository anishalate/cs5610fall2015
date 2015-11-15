"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, $location, FieldService) {
        $scope.fields =[];
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        $scope.selectedField = {};



        init();
        function init(){
            console.log("Form id==" + formId);
            FieldService.getFieldsForForm(formId)
                .then(function(allFieldsForForm){
                    $scope.fields= allFieldsForForm;

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
            var id = guid();
            var newField ={};
            switch(fieldType){
                case 'option1':
                    newField = {"id":id,  "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case 'option2':
                    newField ={"id": id, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case 'option3':
                    newField = {"id": id, "label": "New Date Field", "type": "DATE"};
                    break;
                case 'option4':
                    newField = {"id": id, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case 'option5':
                    newField ={"id": id, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;

                case 'option6':
                    newField= {"id": id, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
                    break;

            }
           // $scope.fields.push(newField);
            FieldService.createFieldForForm(formId,newField)
                .then(function(formById){
                    $scope.fields = formById.fields;
                });
        }


        $scope.removeField = function (fieldId){
            FieldService.deleteFieldFromForm(formId,fieldId)
                .then(function(formById){
                    $scope.fields = formById.fields;
                });
        }

        $scope.cloneField = function(field){
            var cloneItem = field;
            cloneItem.id = guid();
            FieldService.createFieldForForm(formId,cloneItem)
                .then(function(formById){
                    $scope.fields = formById.fields;
                });



        }

        $scope.showModal = function(fieldId){


            $("#myModal").modal();
            FieldService.getFieldForForm(formId,fieldId)
                .then(function(field){
                    $scope.selectedField = field;
                });

        }

        $scope.updateField = function(){
            console.log($scope.selectedField);
            FieldService.updateField(formId,$scope.selectedField.id,$scope.selectedField)
                .then(function(formById){
                    $scope.fields = formById.fields;
                });
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

    }
})();