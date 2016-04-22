VacationApp.controller('HomeCtrl', ['$scope','$mdDialog','$mdBottomSheet','$mdSidenav','$location','$anchorScroll',
  function($scope,$mdDialog,$mdBottomSheet,$mdSidenav,$location,$anchorScroll){
    console.log('HomeCtrl running');

    //Button scroll to examples
    $scope.scrollToAnchor = function (){
      $location.hash('anchor');
      $anchorScroll();
      $location.hash('');
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
      //Fix for bottomsheet now showing on page scroll
      // $location.hash('landingPage');
      // $anchorScroll();
      // $location.hash('');
      $mdBottomSheet.show({
        templateUrl:'/views/main/SignupBottomSheet.html',
        controller:'SignupModalCtrl',
        parent: angular.element(document.getElementById('signupWrapper'))
      });
    };

    //Mobil nav toggle
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

}]);



