VacationApp.controller('UserEditModalCtrl', ['$scope','$mdDialog','CurrentUser',
  function($scope,$mdDialog,CurrentUser){
    console.log('UserEditModalCtrl running');

    $scope.user = CurrentUser

    //Updates User
    $scope.editUser = function  () {
      $scope.user.$save().then(function() {
        console.log($scope.user);
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.close = function() {
      $mdDialog.hide();
   };

}]);