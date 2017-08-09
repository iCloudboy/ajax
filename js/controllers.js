(function () {
    "use strict";

    angular.module('GeoApp').
    controller('IndexController',   // controller given two params, a name and an array
        [
            '$scope', // angular variable as a string
            'applicationData',
            function ($scope, appData) {
                // add a title property which we can refer to in our view (index.html in this example)
                $scope.title = 'Continent & Country Information';
                $scope.subTitle = '';

                $scope.$on('systemInfo_continent', function (ev, continent){
                    $scope.subTitle = continent.continenttitle;
                });
            }
        ]
    ).
    controller('ContinentController',  // create a ContinentController
        [
            '$scope',
            'dataService',
            'applicationData',
            '$location',
            function ($scope, dataService, appData, $location) {
                appData.publishInfo('continent', {});
                var getContinents = function () {
                    dataService.getContinents().then(  // then() is called when the promise is resolve or rejected
                        function(response){
                            $scope.continentCount  = response.rowCount + '';
                            $scope.continents      = response.data;
                        },
                        function(err){
                            $scope.status = 'Unable to load data ' + err;
                        },
                        function(notify){
                            console.log(notify);
                        }
                    ); // end of getContinents().then
                };
                $scope.selectedContinent = {}; //attached a $scope property called selectedContinent and initialize it with the value of an empty object
                var continentInfo = $location.path().substr(1).split('/');
                if (continentInfo.length === 2) {
                    // use the continent code from the path and assign to
                    // selectedContinent so if the page is reloaded it's highlighted
                    $scope.selectedContinent = {continentcode: continentInfo[1]};
                }
                $scope.selectContinent = function ($event, continent) {
                    $scope.selectedContinent = continent; //asign to $scope.selectectedContinent the continent passed in as the second argument when the continent is clicked on.
                    $location.path('/continents/' + continent.ID);
                    appData.publishInfo('continent', continent);
                }

                getContinents();  // call the method just defined
            }
        ]
    ).
    controller('CountriesController',
        [
            '$scope',
            'dataService',
            'applicationData',
            '$location',
            '$routeParams',

            function ($scope, dataService, appData, $location, $routeParams ){
                // $scope.countries = [ ];
                // $scope.countryCount = 0;
                // appData.publishInfo('country', {});

                var getCountries = function (continentcode) {
                    $scope.noCountries = false; //initialize
                    dataService.getCountries(continentcode).then(
                        function (response) {
                            $scope.countryCount = response.rowCount + ' countries';
                            $scope.countries = response.data;
                        },
                        function (err){
                            $scope.noCountries = true; //sets no country variable to true.
                            $scope.status = 'Unable to load data ' + err;
                        }
                    );  // end of getCountries().then
                };

                // only if there has been a continentcode passed in do we bother trying to get the countries
                if ($routeParams && $routeParams.ID) {
                    console.log($routeParams.ID);
                    getCountries($routeParams.ID);
                }
                $scope.showDetailsCountry = function ($event, country, detailsID) { //attach to a scope property, showDetailsCountry defined as a function with three parameters: $event variable to represent object that calls the function, the country clicked on, id of the details div.
                    var element = $event.currentTarget, //start a var list, 1st one defines element to be whatever the event currentTarget is.
                        padding = 25, //padding
                        posY = (element.offsetTop + element.clientTop + padding) - (element.scrollTop + element.clientTop), //holds where bottom of current row is
                        countryDetailsElement = document.getElementById(detailsID); //store a reference to the div element using the id passed.

                    console.log(country);
                    $scope.selectedCountry = angular.copy(country); //store into scope selected country a copy of the country just clicked on.
                    $scope.detailsVisible = true; //make details window visible.

                    countryDetailsElement.style.position = 'absolute';
                    countryDetailsElement.style.top = posY + 'px';
                };
                //abandons the display in progress
                $scope.abandonDisplay = function () {
                    $scope.detailsVisible = false;
                    $scope.selectedCountry = null;
                };
                $scope.saveCountry = function (){
                    var n, //loop counter
                        scount = $scope.countries.length,
                        currentCountry;

                    $scope.editorVisible = false;
                    // call dataService method
                    dataService.displayCountry($scope.selectedCountry).then(
                        function (response) {
                            $scope.status = response.status;
                            if (response.status === 'ok') { // if we saved the file then update the screen
                                for (n = 0; n < scount; n += 1) {
                                    currentCountry = $scope.countries[n];
                                    if (currentCountry.countryid === $scope.selectedStudent.countryid) {
                                        $scope.countries[n] = angular.copy($scope.selectedCountry);
                                        break;
                                    }
                                }
                            }
                            console.log(response);
                            // reset selectedStudent
                            $scope.selectedCountry = null;
                        },
                        function (err) {
                            $scope.status = "Error with save " + err;
                        }
                    );
                };
            }
        ]
    ).
    controller('LoginController',
        [
            '$scope', //acts as a link between controller and html views
            'dataService',
            function($scope, dataService)
            {
                $scope.loginProcess = function (){

                    dataService.userLogin($scope.username, $scope.password).then(
                        function (response) {
                            $scope.status = response.status;
                            //$scope.username = response.data.username;
                            //$scope.password = response.data.password;
                            if (response.status === 'ok') {
                                console.log(response.ResultSet.Result);
                            } else {
                                console.log(response);
                            }

                        },
                        function (err) {
                            $scope.status = "Error with login " + err;
                        }

                    );
                };
            }
        ]
    );
}());
