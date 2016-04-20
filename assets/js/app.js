var VacationApp = angular.module('VacationApp', ['ngRoute','ngAnimate','ngMessages','ngMaterial','firebase','angularfire-resource','ng-mfb','scroll-animate-directive','ng-fx']);
console.log('VacationApp running');

VacationApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // If $requireAuth promise is rejected then redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);

VacationApp.config(['$routeProvider','$locationProvider','$mdThemingProvider',
function($routeProvider,$locationProvider,$mdThemingProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl:'/views/main/home.html',
      controller:'HomeCtrl'
    })
    .when('/about', {
      templateUrl:'/views/main/about.html',
      contoroller:'AboutCtrl'
    })
    .when('/list', {
      templateUrl: '/views/user/list.html',
      controller: 'ListCtrl',
        resolve: {
        // controller will not be loaded until $waitForAuth resolves
        "CurrentAuth": ["Auth", function(Auth) {
          return Auth.$waitForAuth();
        }]
      }
    })
    .when('/profile', {
      templateUrl:'/views/user/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        "CurrentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    })
    .otherwise({
      templateUrl:'/404.html'
    });

  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '900'
    })
    .accentPalette('amber')
    .warnPalette('red')
    .dark('');

}]);