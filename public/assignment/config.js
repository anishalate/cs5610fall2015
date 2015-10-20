(function()
{
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider

                .when("/",
                {
                    templateUrl: "home/home.view.html",

                })
                .when("/home",
                {
                    templateUrl: "home/home.view.html",

                })
                .when("/profile",
                {
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/login",
                {
                    templateUrl: "login/login.view.html",
                    controller: "LoginController"
                })
                .when("/register",
                {
                    templateUrl: "register/register.view.html",
                    controller: "RegisterController"

                })
                .when("/form",
                {
                    templateUrl: "form/form.view.html",
                })

        });
})();