(function () {
    'use strict';
    /** Service to return the data */
    angular.module('GeoApp').
    service('dataService',         // the data service name
        ['$q',                     // dependency, $q handles promises, the request initially returns a promise, not the data
            '$http',                  // dependency, $http handles the ajax request
            function($q, $http) {
                var urlBase = '/cm0665-assignment/server/index.php';

                this.getContinents = function () {
                    var defer = $q.defer(),             // The promise
                        data = {                        // the data to be passed to the url
                            action: 'list',
                            subject: 'continents'
                        };
                    /**
                     * make an ajax get call
                     * chain calls to .success and .error which will resolve or reject the promise
                     * @param {string} urlBase The url to call, later we'll to this to pass parameters
                     * @param {object} config a configuration object, can contain parameters to pass, in this case we set cache to true
                     * @return {object} promise The call returns, not data, but a promise which only if the call is successful is 'honoured'
                     */
                    $http.get(urlBase, {params:data, cache: true}).                          // notice the dot to start the chain to success()
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result, // create data property with value from response
                            rowCount: response.ResultSet.RowCount  // create rowCount property with value from response
                        });
                    }).                                                 // another dot to chain to error()
                    error(function(err){
                        defer.reject(err);
                    });
                    // the call to getCourses returns this promise which is fulfilled
                    // by the .get method .success or .failure
                    return defer.promise;
                };
                this.getCountries = function (continentCode) {
                    var defer = $q.defer(),             // The promise
                        data = {                        // the data to be passed to the url
                            action: 'list',
                            subject: 'countries',
                            id: continentCode
                        };

                    $http.get(urlBase , {params:data, cache: true}).                  // notice the dot to start the chain to success()
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result,// create data property with value from response
                            rowCount: response.ResultSet.RowCount  // create rowCount property with value from response

                        });
                    }).                                         // another dot to chain to error()
                    error(function(err){
                        defer.reject(err);
                    });
                    // the call to getCourses returns this promise which is fulfilled
                    // by the .get method .success or .failure
                    return defer.promise;
                };
                this.userLogin = function(username, password){ //attach this function (logInUser) to this (dataService)
                    var defer = $q.defer(), // creating a variable named defer, to be the promise returned by calling $q.defer
                        data = { //new variable called data, initialised as an object. Contains the parameters which we pass to urlBase
                            action: 'post', //first parameter named action which is given the value post.
                            subject: 'Login',
                            data: { //third paramater data is passed both the username and the password.
                                username: username,
                                password: password
                            }
                        };

                    $http.post(urlBase, data). //call to $http.post passing 2 arguments, the url, and data.
                        success(function(response) { //a success function that is passed one argument, a function which also contains 1 parameter, response. which holds the value from the ajax post call()
                            defer.resolve(response);                                //defer is the object which is a promise, defined on line 63. defer.resolve() takes one argument which is the object which the promise will return if the promise is resolved from the ajax post() call.
                        }). //chain the error
                        error(function(err){ //if the post returns an error,
                            defer.reject(err);
                        });
                    return defer.promise; //return the defer promise, this is returned before the call to $http.post runs (asynchronous)
                };

            }
        ]
    )
    .service('applicationData',
        function($rootScope){
            var sharedService = { };
            sharedService.info = { };

            sharedService.publishInfo = function (key, obj) {
                this.info[key] = obj;
                $rootScope.$broadcast('systemInfo_'+key, obj);
            };

            return sharedService;

        });
}());
