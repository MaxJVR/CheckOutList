VacationApp.controller('AuthLoginModalCtrl', ['$scope','$location','$mdDialog','$mdBottomSheet','Auth',
  function($scope,$location,$mdDialog,$mdBottomSheet,Auth){
    console.log('AuthModalCtrl running');

    //User Log in
    $scope.login = function  () {
      Auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $mdDialog.hide();
        $mdBottomSheet.hide().then(function  () {
          $location.path('/profile');
        });
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    };

    //Auth login modal close
    $scope.close = function() {
      $mdDialog.hide();
      $mdBottomSheet.hide();
    };

    //Auth login modal cancel
    $scope.cancel = function() {
      $mdDialog.cancel();
      $mdBottomSheet.cancel();
    };

}]);