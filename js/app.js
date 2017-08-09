(function () { //IIFE wrapper
    "use strict";  // turn on javascript strict syntax mode

    angular.module("GeoApp", //call the module method of angular, the first argument is the application name.
        [
            'ngRoute'   // a module which enables URL routing
        ]
    ).            //dot to chain method call on next line.
    config(
        [
            '$routeProvider',     // built in variable which injects functionality, passed as a string
            function($routeProvider) { //second argument to config which is invoked when the app runs. $routeProvider is the first parameter.
                $routeProvider.
                when('/continents', { //chain a call to routeProvider. The first argument is a URL. second argument is a brace indicating the start of an object literal.
                    controller: 'ContinentController'
                }).
                when('/continents/:ID', { //chain a call to routeProvider. The first argument is a URL.
                    templateUrl: 'js/partials/country-list.html',
                    controller: 'CountriesController'
                }).
                when('/login', {
                    templateUrl: 'js/partials/login-form.html',
                    controller: 'LoginController'
                }).
                otherwise({
                    redirectTo: '/'
                });
            }
        ]
    );  // end of config method
}());   // end of IIFE
