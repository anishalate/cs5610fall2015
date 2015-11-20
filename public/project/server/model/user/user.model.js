var q = require("q");
//var users = require("./user.mock.json");
module.exports = function(db,mongoose) {

    var userSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", userSchema);

    var api = {
        createUser: createUser,
        findUserById :findUserById,
        findAll: findAll,
        findUserByCredentials:findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser


    };

    return api

    function createUser(newUser){
        var deferred = q.defer();
        UserModel.create(newUser,function (err,user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;

    }

    function findUserById(id){
        var deferred = q.defer();
        UserModel.findById(id,function(err,user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;

    }

    function findAll(){
        var deferred = q.defer();
        UserModel.find(function (err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;

    }

    function findUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne({username:credentials.email,password:credentials.password},function(err,user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });

        return deferred.promise;

    }

    function deleteUser(id){
        var deferred = q.defer();
        UserModel.remove({_id:id},function(err,status){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(status);
            }
        });

        return deferred.promise;

    }

    function updateUser(id,updatedUser){
        var deferred = q.defer();
        UserModel.update({_id:id},{$set:updatedUser},function(err,user){
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