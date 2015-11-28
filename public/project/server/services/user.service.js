module.exports = function(app,model){

    app.get("/api/project/user", find );
    app.get("/api/project/user/:id",findById);
    app.delete("/api/project/user/:id",deleteUser);
    app.put("/api/project/user/:id",updateUser);
    app.post("/api/project/user",createUser);


    function find(req,res){

        var email = req.param('email');
        var password = req.param('password');
        if(email!==undefined && password != undefined){
            var credentials = {email: email, password:password};

            model
                .findUserByCredentials(credentials)
                .then(function(user){
                    res.json(user);
                });

        }else {

            model
                .findAll()
                .then(function (users) {
                    res.json(users);

                });
        }
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