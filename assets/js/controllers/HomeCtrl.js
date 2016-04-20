VacationApp.controller('HomeCtrl', ['$scope','$mdDialog','$mdBottomSheet','$mdSidenav','$location','$anchorScroll',
  function($scope,$mdDialog,$mdBottomSheet,$mdSidenav,$location,$anchorScroll){
    console.log('HomeCtrl running');

    //Button scroll to examples
    $scope.scrollTo = function (){
      $location.hash('anchor');
      $anchorScroll();
    };

    //User sign up dialog call
    $scope.showSignup = function  () {
      $mdDialog.show({
            templateUrl:'/views/main/SignupModal.html',
            controller:'SignupModalCtrl',
            clickOutsideToClose: true
          });
    };

    //User sign up bottomsheet call
    $scope.showSignupMobile = function  () {
      $mdBottomSheet.show({
            templateUrl:'/views/main/SignupBottomSheet.html',
            controller:'SignupModalCtrl'
          });
    };

    //Mobil nav toggle
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

}]);



