module.exports = function(app,model) {

    app.get("/api/assignment/form/:formId/field", findAllFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);

    function findAllFields(req,res){
        res.json(model.findAllFormFields(req.params.formId));
    }

    function findField(req,res){
        res.json(model.findFormField(req.params.formId, req.params.fieldId));
    }

    function deleteField(req,res){

    }

    function createField(req,res){

    }

    function updateField(req,res){

    }
}