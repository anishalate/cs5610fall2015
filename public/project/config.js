"use strict";
(function()
{
    angular
        .module("RoomiesApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/home",
                {
                    templateUrl: "home/home.view.html",

                })
                .when("/signin",
                {
                    templateUrl: "signin/signin.view.html",

                })
                .when("/signup",
                {
                    templateUrl: "signup/signup.view.html",

                })
                .when("/landlord-signup",
                {
                    templateUrl: "landlord-signup/landlord-signup.view.html",

                })
                .when("/signup-form",
                {
                    templateUrl: "signup-form/signup-form.view.html",

                })

                .otherwise({
                    redirectTo:"/home"
                });


        });
})();