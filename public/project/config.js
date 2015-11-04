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
                .when("/profile",{
                    templateUrl :"user-profile/user-profile.view.html",
                })
                .when("/profile-likes",{
                    templateUrl :"user-profile/user-profile-likes.view.html",
                })
                .when("/search-roommates",{
                    templateUrl :"search-roommates/search-roommates.view.html",
                })

                .otherwise({
                    redirectTo:"/home"
                });


        });
})();