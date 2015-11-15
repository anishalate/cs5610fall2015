"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope,FormService) {
        var model = this;
        model.form ={};
        model.form.title ="";

        model.forms = [];
        if($rootScope.currentUser!==undefined) {
            init();
        }

        function init(){
            model.forms = [];
            FormService.findAllFormsForUser($rootScope.currentUser.id)
                .then(function(allFormsByUser){
                model.forms= allFormsByUser;
                });
        }

        model.addForm = function(){
            model.newForm ={};
            model.newForm.title = model.form.title;
            model.newForm.fields = [];

            FormService.createFormForUser($rootScope.currentUser.id,model.newForm)
                .then(function(allForms){
                  init();
                })
                //model.forms.push(newForm);

            model.form ={};
            model.form.title ="";


        }

        model.deleteForm = function(formId){
            FormService.deleteFormById(formId)
                .then(function(forms){
                    init();
                });


        }

        model.selectForm = function(formId){
           for(var i=0;i<model.forms.length;i++){
               if(model.forms[i].id===formId){
                   model.form= model.forms[i];
                   break;
               }
           }
        }
        model.updateForm = function(){
            model.newForm = {};
            model.newForm.title = model.form.title;
            model.newForm.fields = model.form.fields;
            FormService.updateFormById(model.form.id,model.newForm)
                .then(function(allForms){
                    //add something for callback later on.
                init();
                model.form ={};
                model.form.title ="";
            });
        }
    }
})();