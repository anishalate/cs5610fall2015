module.exports = function(mongoose){

    var listingSchema = mongoose.Schema({

        userId: mongoose.Schema.Types.ObjectId,
        zip: Number,
        address: String,
        beds: Number,
        baths: Number,
        rent: Number,
        startDate: Date,
        leaseDuration: String,
        amenities:[String],
        photosUrl:[String],

    },{collection: "cs5610.project.listing"});
    return listingSchema;
};