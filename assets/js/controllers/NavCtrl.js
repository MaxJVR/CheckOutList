VacationApp.controller('NavCtrl', ['$scope','$rootScope','$window','$location','$mdDialog','$mdBottomSheet','$mdSidenav','$firebase','$firebaseObject','Auth','CurrentUser','UserList',
function($scope,$rootScope,$window,$location,$mdDialog,$mdBottomSheet,$mdSidenav,$firebase,$firebaseObject,Auth,CurrentUser,UserList){
  console.log('NavCtrl running');

  $rootScope.loading = true;

  //Check for current user
  Auth.$onAuth(function (authData) {
    if(authData) {
      $scope.currentUser = CurrentUser(authData)
    };
  });

 $rootScope.loading = false;

  //User login modal call
  $scope.showLogin = function  () {
    $mdDialog.show({
      templateUrl:'/views/auth/loginModal.html',
      controller:'AuthLoginModalCtrl'
    });
  };

  //User login on mobile device
   $scope.showBottomSheet = function() {
    $mdBottomSheet.show({
      templateUrl:'/views/auth/loginBottomSheet.html',
      controller:'AuthLoginModalCtrl',
    });
  };

  //User logout
  $scope.logout = function  () {
    Auth.$unauth();
    $scope.currentUser = false
    $location.path('/');
  };

  //Mobil nav toggle
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.showSignupMobile = function  () {
    $mdBottomSheet.show({
      templateUrl:'/views/main/SignupBottomSheet.html',
      controller:'SignupModalCtrl'
    });
  };

}]);