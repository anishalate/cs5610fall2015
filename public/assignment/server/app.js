

module.exports = function(app){

    var userModel = require("./models/user.model.js")(app);
    require("./services/user.service.js")(app,userModel);

};