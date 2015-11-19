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
            model
                .findUserByCredentials(credentials)
                .then(function(user){
                    res.json(user);
                });

        }
        if(username!==undefined && password===undefined){
            model
                .findUserByUsername(username)
                .then(function(user){
                    res.json(user);
                })
        }
        model
            .findAll()
            .then(function(users){
                res.json(users);

            });
    }

    function findById(req,res){
        model
            .findById(req.params.id)
            .then(function(user){
               res.json(user);
            });

    }

    function deleteUser(req,res){

        model
            .deleteUser(req.params.id)
            .then(function(status){
            res.json(status);
        });
    }

   function updateUser(req,res){
       var updatedUser = req.body;
       model
           .updateUser(req.params.id,updatedUser)
           .then(function(user){
               res.json(user);
           });
   }
   function createUser(req,res){
       var newUser = req.body;
       model
           .createUser(newUser)
           .then(function(user){
               res.json(user);
           });

   }
}