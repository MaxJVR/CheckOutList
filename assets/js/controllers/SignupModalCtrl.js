VacationApp.controller('SignupModalCtrl', ['$scope','$mdDialog','$mdBottomSheet','$location','$firebase','Auth','User',
function($scope,$mdDialog,$mdBottomSheet,$location,$firebase,Auth,User){
  console.log('SignupModalCtrl running');

  var userId = '';
  var db = $firebase;

  //User sign up and Auth then add to users model
  $scope.signup = function  () {
    Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        console.log("User created with uid: " + userData.uid);
        userId = userData.uid;
        if (userData) {
          db.child("users").child(userId).set({
            userName: $scope.userName,
            email: $scope.email
          });
          $mdBottomSheet.hide();
          $mdDialog.hide();
        }
      }).catch(function(error) {
        console.log(error);
      });
    };

  //User sign up modal close
  $scope.close = function() {
    $mdDialog.cancel();
    $mdBottomSheet.cancel();
 };

}]);