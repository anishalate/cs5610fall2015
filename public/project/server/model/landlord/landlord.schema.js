module.exports = function(mongoose){

    var listingSchema = require("../listing/listing.schema")(mongoose);
    var landlordSchema = mongoose.Schema({
            firstName: String,
            lastName: String,
            password: String,
            email: String,
            phone: {type: Number},
            listings: [listingSchema],
            type:{type: String,
            enum:["Landlord","Broker"]}

    },{collection: "cs5610.project.landlord"});
    return landlordSchema;
};