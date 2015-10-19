(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms =[];

        function  createFormForUser(userId,form,callback){
            var guid = Guid.create();
            form.id = guid.value;
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
                if(forms[i].id===formId){}
                forms.splice(i,1);
                break;
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
    }
    })();