module.exports = function(app,model) {

    app.post("/api/project/landlord/:landlordId/listing", createListing);
    app.get("/api/project/landlord/:landlordId/listing/:listingId", findListingById);
    app.delete("/api/project/landlord/:landlordId/listing/:listingId", deleteListing);
    app.put("/api/project/landlord/:landlordId/listing/:listingId", updateListing);
    app.post("/api/project/landlord/:landlordId/listing", findListingsByLandlord);
    app.get("/api/project/listing",findAllListings);
    app.get("/api/project/listing/:listingId",findListingWithoutLandlordId);



    function findListingWithoutLandlordId(req,res){
        model
            . findListingWithoutLandlordId(req.params.listingId)
            .then(function(listing){
                res.json(listing);
            });
    }
    function findAllListings(req,res){
        model
            .findAllListings()
            .then(function(listings){
                res.json(listings);
            });
    }

    function findListingsByLandlord(req, res) {
            model
                .findListingByLandlord(req.params.landlordId)
                .then(function (listings) {
                    res.json(listings);
                });

    }

    function findListingById(req,res){
        model
            .findListingById(req.params.landlordId,req.params.listingId)
            .then(function(listing){
                res.json(listing);
            });

    }

    function deleteListing(req,res){

        model
            .deleteListing(req.params.landlordId,req.params.listingId)
            .then(function(status){
                res.json(status);
            });
    }

    function updateListing(req,res){
        var updatedListing = req.body;
        model
            .updateListing(req.params.landlordId,req.params.listingId,updatedListing)
            .then(function(listing){
                res.json(listing);
            });
    }
    function createListing(req,res){
        var newListing = req.body;
        model
            .createListing(req.params.landlordId,newListing)
            .then(function(listing){
                res.json(listing);
            });

    }
}

