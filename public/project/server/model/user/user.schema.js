module.exports = function(mongoose){

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName : String,
        password: String,
        email: String,
        phone: {type: Number},
        sex: String,
        age: {type:Number},
        education: String,
        employment: String,
        languages:[String],
        hometown:String


    },{collection: "cs5610.project.user"});
    return userSchema;
};