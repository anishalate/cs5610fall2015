var q = require("q");
module.exports = function(db,mongoose) {

    var landlordSchema = require("./landlord.schema")(mongoose);
    var LandlordModel = mongoose.model("LandlordModel", landlordSchema);

    var api = {
        createLandlord: createLandlord,
        findLandlordById: findLandlordById,
        findAll: findAll,
        findLandlordByCredentials: findLandlordByCredentials,
        deleteLandlord: deleteLandlord,
        updateLandlord: updateLandlord,
        createListing: createListing,
        findListingById: findListingById,
        deleteListing: deleteListing,
        updateListing: updateListing,
        findListingByLandlord: findListingByLandlord,

    };

    return api;

    function createListing(landlordId,listing){
        var deferred = q.defer();

        LandlordModel.findById(landlordId,function(err,landlord){
            landlord.listings.push(listing);
            landlord.save(function(err,listing){
                deferred.resolve(listing);
            });

        });

        return deferred.promise;

    }

    function findListingById(landlordId,listingId){
        var deferred = q.defer();

        LandlordModel.findById(landlordId, function(err,landlord){
            var listings = landlord.fields;
            var listing ={};
            for(var i=0;i<listings.length;i++){
                if(listings[i]._id==listingId)
                {
                    listing = listings[i];
                    break;
                }
            }

            deferred.resolve(listing);

        });
        return deferred.promise;
    }

    function deleteListing(landlordId,listingId){
        var deferred = q.defer();
        LandlordModel.findByIdAndUpdate(landlordId, {$pull:{listings:{_id:listingId}}},function(err,listing){
            if(err)
            {
                deferred.reject(err);
            }
            else {
                deferred.resolve(listing);
            }
        });
        return deferred.promise;

    }

    function findListingByLandlord(landlordId){
        var deferred = q.defer();
        LandlordModel.findById(landlordId,function(err,landlord){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(landlord.listings);
            }
        });
        return deferred.promise;

    }


    function updateListing(landlordId,listingId,updatedListing){
        var deferred = q.defer();

        FormModel.update({_id:landlordId, 'listings._id':listingId},{$set:{'fields.$': updatedListing}},function(err,listing){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(listing);
            }
        });

        return deferred.promise;
    }

    function createLandlord(newLandlord){
        var deferred = q.defer();
        LandlordModel.create(newLandlord,function (err,landlord){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(landlord);
            }
        });
        return deferred.promise;

    }

    function findLandlordById(id){
        var deferred = q.defer();

        LandlordModel.findById(id,function(err,landlord){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(landlord);
            }
        });
        return deferred.promise;

    }

    function findAll(){
        var deferred = q.defer();
        LandlordModel.find(function (err,landlord){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(landlord);
            }
        });
        return deferred.promise;

    }

    function findLandlordByCredentials(credentials){
        var deferred = q.defer();

        LandlordModel.findOne({email:credentials.email,password:credentials.password},function(err,landlord){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(landlord);
            }
        });

        return deferred.promise;

    }

    function deleteLandlord(id){
        var deferred = q.defer();
        LandlordModel.remove({_id:id},function(err,status){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(status);
            }
        });

        return deferred.promise;

    }

    function updateLandlord(id,updatedUser){
        var deferred = q.defer();
        LandlordModel.update({_id:id},{$set:updatedUser},function(err,user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;

    }


}
