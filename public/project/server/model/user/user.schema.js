module.exports = function(mongoose){

    var userSchema = mongoose.Schema({
        userDetails: {
            firstName: String,
            lastName: String,
            password: String,
            email: String,
            phone: {type: Number},
            sex: String,
            age: {type: Number},
            education: String,
            employment: String,
            languages: [String],
            hometown: String,
            profilePicUrl: String
        },

        userPref: {
            budgetLow: {type: Number},
            budgetHigh: {type: Number},
            zip:{type:Number},
            roomType: String,
            hasApartment: Boolean,
            wantApartment: Boolean,
            lookingFor: String,
            startDate: Date,
            period: String,
        },

        userLifestyle:{
            smoke: String,
            alcohol: String,
            parties: String,
            drugs: String,
            food:[String],
            pets:String,

        },

        userRoommatePref:{
            sex: String,
            minAge: {type:Number},
            maxAge: {type:Number},
            languages:[String],
            hometown:String,
            smoke:String,
            alcohol:String,
            parties: String,
            education: String,
            pets: String,
            drugs: String
        }




    },{collection: "cs5610.project.user"});
    return userSchema;
};