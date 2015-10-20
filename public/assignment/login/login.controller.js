(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope,$rootScope,$location,UserService) {

        $scope.login = function(){

            UserService.findUserByUsernameAndPassword($scope.username,$scope.password, function(user){
                console.log(user);
                if(!angular.equals({},user)) {
                    $rootScope.currentUser = user;
                    $location.path("/profile");
                }
                else{
                    console.log("User not found");
                }
            })

        }
    }
})();