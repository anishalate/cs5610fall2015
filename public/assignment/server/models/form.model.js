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


    };

    return api;
    function createForm(form){
        forms.push(form);
        return forms;
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
                forms[i] = updatedForm;
                break;
            }
        }
        return forms;

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
        var formsByUser = []
        for(var i=0;i<forms.length;i++)
        {
            if(forms[i].userId==userId){
                formsByUser.push(forms[i]);
            }
        }
        return formsByUser;
    }

}