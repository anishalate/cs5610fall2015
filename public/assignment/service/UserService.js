(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var currentUsers = [];

        function findUserByUsernameAndPassword(username,password,callback){
            var flag= false;
            for(var i=0;i< currentUsers.length;i++)
            {
                if(currentUsers[i].username===username && currentUsers[i].password=== password)
                {
                    flag = true;
                    break;
                }

            }
          callback(flag);

        }

        function findAllUsers(callback){
            callback(currentUsers);
        }

        function createUser(newUser,callback){
            var guid = Guid.create();
            newUser.id = guid.value;
            currentUsers.push(newUser);


        }
        function deleteUserById(id,callback){
            for(var i=0;i<currentUsers.length;i++)
            {
                if(currentUsers[i].id===id){
                    currentUsers.splice(i,1);
                    break;
                }
            }
            callback(currentUsers);
        }

        function updateUser(id,updateUser,callback){

            for(var i=0;i<currentUsers.length;i++)
            {
                if(currentUsers[i].id===id){
                    updateUser.id = id;
                    currentUsers[i] = updateUser;
                    break;
                }
            }
            callback(updateUser);
        }
    }
})();