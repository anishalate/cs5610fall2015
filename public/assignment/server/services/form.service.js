module.exports = function(app,model){

   app.get("/api/assignment/user/:userId/form",findFormByUser)
   app.get("/api/assignment/form/:formId", getFormById);
   app.delete("/api/assignment/form/:formId",deleteForm);
   app.post("/api/assignment/user/:userId/form",createForm);
   app.put("/api/assignment/form/:formId",updateForm);


    function getFormById(req,res){
        res.json(model.findById(req.params.formId));
    }

    function findFormByUser(req,res){
        res.json(model.findFormByUserId(req.params.userId));

    }

    function deleteForm(req,res){
        res.json(model.deleteForm(req.params.formId));

    }

    function createForm(req,res){
        var form = req.body;
        res.json(model.createForm(form));

    }
    function updateForm(req,res){
        var form = req.body;
        res.json(model.updateForm(req.params.formId,form));

    }

}