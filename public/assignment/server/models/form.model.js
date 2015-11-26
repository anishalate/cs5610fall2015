var q = require("q");

module.exports = function(db,mongoose){

    var formSchema =    require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel",formSchema);

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
        var deferred = q.defer();
        FormModel.create(form,function (err,newForm){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(newForm);
            }
        });
        return deferred.promise;

    }

    function findAll(){
            var deferred = q.defer();
            FormModel.find(function (err,forms){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(forms);
                }
            });
            return deferred.promise;

        }



    function findById(id){
        var deferred = q.defer();
        FormModel.findById(id,function(err,form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form);
            }
        });
        return deferred.promise;

    }


    function updateForm(id,updatedForm){

        var deferred = q.defer();
        FormModel.update({_id:id},{$set:updatedForm},function(err,form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form);
            }
        });

        return deferred.promise;

    }
    function deleteForm(id){
        var deferred = q.defer();
        FormModel.remove({_id:id},function(err,status){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(status);
            }
        });

        return deferred.promise;

    }

    function findFormByTitle(title){
        var deferred = q.defer();

        FormModel.find({title:title},function(err,form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form);
            }
        });

        return deferred.promise;

    }

    function findFormByUser(userId){
        var deferred = q.defer();

        FormModel.find({userId:userId},function(err,forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function findAllFormFields(formId){
        var deferred = q.defer();
        FormModel.findById(formId,function(err,form){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;


    }

    function findFormField(formId,fieldId){
        var deferred = q.defer();
        FormModel.find({_id:formId, 'fields._id':fieldId},function(err,field){
            if(err)
            {
                deferred.reject(err);
            }
            else {
                deferred.resolve(field);
            }
        });
        return deferred.promise;

    }

    function deleteFormField(formId,fieldId){
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, {$pull:{fields:{_id:fieldId}}},function(err,form){
            if(err)
            {
                deferred.reject(err);
            }
            else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;


    }

    function createFormField(formId,field){
        var deferred = q.defer();

        FormModel.findById(formId,function(err,form){
            form.fields.push(field);
            form.save(function(err,field){
                deferred.resolve(field);
            });

        });

        return deferred.promise;


    }

    function updateFormField(formId,fieldId,updatedField) {
        var deferred = q.defer();
        FormModel.update({
            _id: formId,
            'fields._id': fieldId
        }, {$set: {"fields.$": updatedField}}, function (err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

}