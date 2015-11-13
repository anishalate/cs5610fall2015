
var users = require("./user.mock.json");
module.exports = function(app){

    var api = {
        createUser : createUser,
        findAll : findAll,
        findById :findById,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserByUsername : findUserByUsername,
        findUserByCredentials: findUserByCredentials,


    };

    return api;


    function createUser(user){
        users.push(user);
        return user;
    }

    function findAll(){
        return users;

    }

    function findById(id){
        var userById={};
        for(var i=0;i<users.length;i++)
        {
            if(users[i].id==id){
                userById = users[i];
                break;
            }
        }
        return userById;

    }

    function updateUser(id,updatedUser){

        for(var i=0;i<users.length;i++)
        {
            if(users[i].id==id){
                updatedUser.id = id;
                users[i] = updatedUser;

                break;
            }
        }

        return updatedUser;

    }
    function deleteUser(id){
        for(var i=0;i<users.length;i++)
        {
            if(users[i].id==id){
                users.splice(i,1);
                break;
            }
        }
        return users;

    }

    function findUserByUsername(userName){
        var userByUserName={};
        for(var i=0;i<users.length;i++)
        {
            if(users[i].username==userName){
                userByUserName = users[i];
                break;
            }
        }
        return userByUserName;

    }

    function findUserByCredentials(credentials){
        var userByCredentials= {};
        for(var i=0;i<users.length;i++)
        {
            if(users[i].username==credentials.username && users[i].password==credentials.password){
                userByCredentials = users[i];
                break;
            }
        }
        return userByCredentials;

    }
}