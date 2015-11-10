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
                    templateUrl: "client/views/home/home.view.html",

                })
                .when("/profile",
                {
                    templateUrl: "client/views/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/login",
                {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/register",
                {
                    templateUrl: "client/views/register/register.view.html",
                    controller: "RegisterController"

                })
                .when("/form",
                {
                    templateUrl: "client/views/form/form.view.html",
                    controller: "FormController"
                })
                .otherwise({
                    redirectTo:"/home"
                });

        });
})();