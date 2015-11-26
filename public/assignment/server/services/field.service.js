module.exports = function(app,model) {

    app.get("/api/assignment/form/:formId/field", findAllFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);

    function findAllFields(req,res){
        model
            .findAllFormFields(req.params.formId)
            .then(function(fields){
                res.json(fields);
            });
    }

    function findField(req,res){
       model
           .findFormField(req.params.formId, req.params.fieldId)
           .then(function(field){
               res.json(field);
           });
    }

    function deleteField(req,res){
        model
            .deleteFormField(req.params.formId,req.params.fieldId)
            .then(function(status){
                res.json(status);
            });

    }

    function createField(req,res){
        var field = req.body;
       model
           .createFormField(req.params.formId,field)
           .then(function(field){
               res.json(field);
           });
    }

    function updateField(req,res){
        var updatedField = req.body;
        model
            .updateFormField(req.params.formId,req.params.fieldId,updatedField)
            .then(function(form){
                res.json(form);
            })

    }
}