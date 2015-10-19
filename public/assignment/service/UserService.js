(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var currentUsers = [];

        var service = {
            getAllCourses: getAllCourses
        };
        return service;

        function getAllCourses() {
            return courses;
        }

        function findUserByUsernameAndPassword(username,password,callback){
            for(var i=0;i< currentUsers.length;i++)
            {
                if(currentUsers[i].username===username && currentUsers[i].password=== password)
                {
                    callback("User Found");
                }
                else{
                    callback("Null");
                }
            }

        }

        function findAllUsers(callback){
            callback(currentUsers);
        }
    }
})();