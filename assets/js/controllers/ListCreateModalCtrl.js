VacationApp.controller('ListCreateModalCtrl', ['$scope','$http','$location','$mdDialog','$mdBottomSheet','$firebaseObject','$firebaseArray','CurrentUser','User','List',
  function($scope,$http,$location,$mdDialog,$mdBottomSheet,$firebaseObject,$firebaseArray,CurrentUser,User,List){
    console.log('ListCreateModalCtrl running');

    $scope.createList = function() {
       var userId = CurrentUser.$id;
       List.$add({
        name: $scope.list.name,
        listUser: userId
      }).then(function (ref) {
        var listId = ref.key();
        console.log(listId);
        CurrentUser.userList = listId;
        CurrentUser.$save();
      })
    };

    $scope.close = function() {
      $mdDialog.hide();
      $mdBottomSheet.hide();
   };
   $scope.cancel = function () {
      $mdDialog.cancel();
      $mdBottomSheet.cancel();
   }

}]);