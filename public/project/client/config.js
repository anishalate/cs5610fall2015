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
                    templateUrl: "views/home/home.view.html",

                })
                .when("/signin",
                {
                    templateUrl: "views/signin/signin.view.html",

                })
                .when("/signup",
                {
                    templateUrl: "views/signup/signup.view.html",

                })
                .when("/landlord-signup",
                {
                    templateUrl: "views/landlord-signup/landlord-signup.view.html",

                })
                .when("/signup-form",
                {
                    templateUrl: "views/signup-form/signup-form.view.html",

                })
                .when("/profile",{
                    templateUrl :"views/user-profile/user-profile.view.html",
                })
                .when("/profile-likes",{
                    templateUrl :"views/user-profile/user-profile-likes.view.html",
                })
                .when("/search-roommates",{
                    templateUrl :"views/search-roommates/search-roommates.view.html",
                })
                .when("/search-apartments",{
                    templateUrl :"views/search-apartments/search-apartments.view.html",
                })
                .when("/apartments",{
                    templateUrl :"views/apartment/apartment.view.html",
                    controller: "ApartmentController"
                })

                .otherwise({
                    redirectTo:"/home"
                });


        });
})();