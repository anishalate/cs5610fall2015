var forms = require("./form.mock.json");

module.exports = function(app) {

    var api = {
        createForm: createForm,
        findAll: findAll,
        findById: findById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUser,
        findAllFormFields : findAllFormFields,
        findFormField : findFormField,
        deleteFormField: deleteFormField,
        createFormField: createFormField,
        updateFormField: updateFormField,


    };

    return api;
    function createForm(form){
        forms.push(form);
        return form;
    }

    function findAll(){
        return forms;

    }

    function findById(id){
        var formById={};
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==id){
                formById = forms[i];
                break;
            }
        }
        return formById;

    }

    function updateForm(id,updatedForm){
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==id){
                updatedForm.id = id;
                updatedForm.userId = forms[i].userId;
                forms[i] = updatedForm;
                break;
            }
        }
        return updatedForm;

    }
    function deleteForm(id){
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==id){
                forms.splice(i,1);
                break;
            }
        }
        return forms;

    }
    function findFormByTitle(title){
        var formByTitle={};
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].title==title){
                formByTitle = forms[i];
                break;
            }
        }
        return formByTitle;

    }

    function findFormByUser(userId){
        var formsByUser = [];
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].userId==userId){
                formsByUser.push(forms[i]);
            }
        }
        return formsByUser;
    }

    function findAllFormFields(formId){
        var formById={};
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==formId){
                formById = forms[i];
                break;
            }
        }
        if(Object.keys(formById).length>0) {
            if(formById.fields!==undefined) {
                return formById.fields;
            }
        }
        return null;



    }

    function findFormField(formId,fieldId){
        var formById={};
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==formId){
                formById = forms[i];
                break;
            }
        }
        var field ={};
        if(Object.keys(formById).length>0) {
            if (formById.fields !== undefined) {
                var fields = formById.fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id==fieldId){
                        field =  fields[j];
                        break;
                    }
                        }
                }
            }

        return field;
    }

    function deleteFormField(formId,fieldId){
        var formById={};
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==formId){
                formById = forms[i];
                break;
            }
        }

        if(Object.keys(formById).length>0) {
            if (formById.fields !== undefined) {
                var fields = formById.fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id==fieldId){
                        fields.splice(j,1);
                    }
                }
            }
        }

        return formById;

    }

    function createFormField(formId,field){
        var formById={};

        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==formId){
                formById = forms[i];
                break;
            }
        }
        formById.fields.push(field);
        return formById;
    }

    function updateFormField(formId,fieldId,updatedField){
        var formById={};
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].id==formId){
                formById = forms[i];
                break;
            }
        }

        if(Object.keys(formById).length>0) {
            if (formById.fields !== undefined) {
                var fields = formById.fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id==fieldId){
                        updatedField.id = fieldId;
                        fields[j] = updatedField;
                    }
                }
            }
        }
        return formById;
    }


}