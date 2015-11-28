

module.exports = function(app,mongoose,db){

    var userModel = require("./model/user/user.model.js")(db,mongoose);
    require("./services/user.service.js")(app,userModel);

    var landlordModel = require("./model/landlord/landlord.model.js")(db,mongoose);
    require("./services/landlord.service.js")(app,landlordModel);

};