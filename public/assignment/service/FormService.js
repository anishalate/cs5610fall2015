(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms =[];

        var service ={
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById,
        }
        function  createFormForUser(userId,form,callback){

            form.id = guid();
            form.userid = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId,callback){
            var userForms= [];
            for(var i=0;i<forms.length;i++){
                if(forms[i].userid===userId){
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId,callback){
            for(var i=0;i<forms.length;i++){
                if(forms[i].id===formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId,newForm,callback){
            for(var i=0;i<forms.length;i++){
                if(forms[i].id===formId){}
                newForm.id = formId;
                forms[i] = newForm;
                break;
            }
            callback(newForm);
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