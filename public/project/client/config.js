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
                    controller:"SignInController"

                })
                .when("/signup",
                {
                    templateUrl: "views/signup/signup.view.html",
                    controller: "SignupController"

                })
                .when("/landlord-signup",
                {
                    templateUrl: "views/landlord-signup/landlord-signup.view.html",
                    controller:"LandlordSignupController"

                })
                .when("/signup-form",
                {
                    templateUrl: "views/signup-form/signup-form.view.html",
                    controller:"SignupFormController"

                })
                .when("/profile",{
                    templateUrl :"views/user-profile/user-profile.view.html",
                    controller:"UserProfileController"
                })
                .when("/profile-likes",{
                    templateUrl :"views/user-profile/user-profile-likes.view.html",
                })
                .when("/search-roommates",{
                    templateUrl :"views/search-roommates/search-roommates.view.html",
                    controller:"SearchRoommateController"
                })
                .when("/search-apartments",{
                    templateUrl :"views/search-apartments/search-apartments.view.html",
                    controller:"SearchApartmentController"
                })
                .when("/apartments",{
                    templateUrl :"views/apartment/apartment.view.html",
                    controller: "ApartmentController"
                })
                .when("/apartments/:apartmentId",{
                    templateUrl :"views/apartment/apartment.view.html",
                    controller: "ApartmentController"
                })
                .when("/landlord-profile",{
                    templateUrl :"views/landlord-profile/landlord-profile.view.html",
                    controller: "LandlordProfileController"

                })
                .when("/browse-profile/:browseUserId",{
                    templateUrl:"views/browse-profile/browse-profile.view.html",
                    controller:"BrowseProfileController"
                })
                .when("/browse-apartment",{
                    templateUrl:"views/browse-apartment/browse-apartment.view.html",
                    controller:"BrowseApartmentController"
                })

                .otherwise({
                    redirectTo:"/home"
                });


        });
})();