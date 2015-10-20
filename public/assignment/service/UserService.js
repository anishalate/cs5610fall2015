(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var currentUsers = [];
        var service ={
            createUser :createUser,
            findUserByUsernameAndPassword:findUserByUsernameAndPassword,
            findAllUsers:findAllUsers,
            deleteUserById:deleteUserById,
            updateUser:updateUser
        };

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
            //var guid = Guid.create();
            newUser.id = guid();
            currentUsers.push(newUser);
            callback(newUser);
            //console.log("rootscope object"+ $rootScope.currentUser.username);


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
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        return service;
    }
})();