"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/home",
                {
                    templateUrl: "views/home/home.view.html",

                })
                .when("/profile",
                {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/login",
                {
                    templateUrl: "views/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/register",
                {
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController"

                })
                .when("/form",
                {
                    templateUrl: "views/form/form.view.html",
                    controller: "FormController"
                })
                .otherwise({
                    redirectTo:"/home"
                });

        });
})();