"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams,FieldService) {
        var model = this;
        model.fields =[];
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        model.selectedField = {};



        init();
        function init(){
            console.log("Form id==" + formId);
            FieldService.getFieldsForForm(formId)
                .then(function(allFieldsForForm){
                    model.fields= allFieldsForForm;

                });
        }

        model.addNewFieldType ={
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

        model.addField = function(fieldType){
            console.log(fieldType);
            var newField ={};
            switch(fieldType){
                case 'option1':
                    newField = {"label": "New Text Field", "fieldType": "TEXT", "placeholder": "New Field"};
                    break;
                case 'option2':
                    newField ={"label": "New Text Field", "fieldType": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case 'option3':
                    newField = {"label": "New Date Field", "fieldType": "DATE"};
                    break;
                case 'option4':
                    newField = {"label": "New Dropdown", "fieldType": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case 'option5':
                    newField ={"label": "New Checkboxes", "fieldType": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;

                case 'option6':
                    newField= {"label": "New Radio Buttons", "fieldType": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
                    break;

            }
           // model.fields.push(newField);
            if(formId==undefined||formId.length<=0){
                alert("Please select a form from forms tab");
                return;
            }
            FieldService.createFieldForForm(formId,newField)
                .then(function(formById){
                    model.fields = formById.fields;

                },
                function(error){
                    alert(error);
                });
            init();

        }


        model.removeField = function (fieldId){
            FieldService.deleteFieldFromForm(formId,fieldId)
                .then(function(formById){
                    model.fields = formById.fields;
                });
            init();
        }

        model.cloneField = function(field){
            var cloneItem = field;
            delete cloneItem['_id'];
            FieldService.createFieldForForm(formId,cloneItem)
                .then(function(formById){
                    model.fields = formById.fields;
                });

            init();

        }

        model.showModal = function(fieldId){


            $("#myModal").modal();
            FieldService.getFieldForForm(formId,fieldId)
                .then(function(field){
                    model.selectedField = field;
                });

        }

        model.updateField = function(){
            console.log(model.selectedField);
            FieldService.updateField(formId,model.selectedField._id,model.selectedField)
                .then(function(formById){
                    model.fields = formById.fields;
                });
            init();
        }


    }
})();