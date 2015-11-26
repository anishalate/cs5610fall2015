module.exports = function(app,model){

   app.get("/api/assignment/user/:userId/form",findFormByUser)
   app.get("/api/assignment/form/:formId", getFormById);
   app.delete("/api/assignment/form/:formId",deleteForm);
   app.post("/api/assignment/user/:userId/form",createForm);
   app.put("/api/assignment/form/:formId",updateForm);


    function getFormById(req,res){
        model
            .findById(req.params.formId)
            .then(function(form){
                res.json(form);
            });

    }

    function findFormByUser(req,res){
       model
           .findFormByUserId(req.params.userId)
           .then(function(forms){
               res.json(forms);
           })

    }

    function deleteForm(req,res){
       model
           .deleteForm(req.params.formId)
           .then(function(status){
               res.json(status);
           });

    }

    function createForm(req,res){
        var form = req.body;
        model
            .createForm(form)
            .then(function(newForm){
                res.json(newForm);
            })

    }
    function updateForm(req,res){
        var form = req.body;
        model
            .updateForm(req.params.formId,form)
            .then(function(updatedForm){
                res.json(updatedForm);
            })

    }

}