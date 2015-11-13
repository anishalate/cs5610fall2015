//var model = require("../models/user.model.js")(app);

module.exports = function(app,model){

    //app.get("/api/assignment/user",findByUsername);
    app.get("/api/assignment/user", find );
    app.get("/api/assignment/user/:id",findById);
    app.delete("/api/assignment/user/:id",deleteUser);
    app.put("/api/assignment/user/:id",updateUser);
    app.post("/api/assignment/user",createUser);


    function find(req,res){

        var username = req.param('username');
        var password = req.param('password');
        if(username!==undefined && password != undefined){
            var credentials = {username: username, password:password};
            res.json(model.findUserByCredentials(credentials));
        }
        if(username!==undefined && password===undefined){
            res.json(model.findUserByUsername(username));
        }
        res.json(model.findAll());
    }

    function findById(req,res){
        res.json(model.findById(req.params.id));

    }

    function deleteUser(req,res){

        res.json(model.deleteUser(req.params.id));
    }

   function updateUser(req,res){
       var updatedUser = req.body;
       res.json(model.updateUser(req.params.id,updatedUser));
   }
   function createUser(req,res){
       var newUser = req.body;
       res.json(model.createUser(newUser));
   }
}