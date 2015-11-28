module.exports = function(app,model) {

    app.get("/api/project/landlord", find);
    app.get("/api/project/landlord/:id", findById);
    app.delete("/api/project/landlord/:id", deleteLandlord);
    app.put("/api/project/landlord/:id", updateLandlord);
    app.post("/api/project/landlord", createLandlord);


    function find(req, res) {
        var email = req.param('email');
        var password = req.param('password');
        if (email !== undefined && password != undefined) {
            var credentials = {email: email, password: password};

            model
                .findLandlordByCredentials(credentials)
                .then(function (landlord) {
                    res.json(landlord);
                });

        } else {

            model
                .findAll()
                .then(function (landlords) {
                    res.json(landlords);

                });
        }
    }

    function findById(req,res){
        model
            .findLandlordById(req.params.id)
            .then(function(landlord){
                res.json(landlord);
            });

    }

    function deleteLandlord(req,res){

        model
            .deleteLandlord(req.params.id)
            .then(function(status){
                res.json(status);
            });
    }

    function updateLandlord(req,res){
        var updatedLandlord = req.body;
        model
            .updateLandlord(req.params.id,updatedLandlord)
            .then(function(landlord){
                res.json(landlord);
            });
    }
    function createLandlord(req,res){
        var newLandlord = req.body;
        model
            .createLandlord(newLandlord)
            .then(function(landlord){
                res.json(landlord);
            });

    }
}

