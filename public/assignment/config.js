(function()
{
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider
              /*  .when("/",
                {
                    templateUrl: "index.html",

                })*/
                .when("/",
                {
                    templateUrl: "home/home.view.html",

                })
                .when("/home",
                {
                    templateUrl: "home/home.view.html",

                })
        });
})();