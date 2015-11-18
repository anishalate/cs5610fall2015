module.exports = function(mongoose){

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName : String,
        username: String,
        password: String,
        email: String
    },{collection: "assignment.mongodb.user"});
    return userSchema;
};