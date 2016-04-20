VacationApp.controller('CheckoutCreateModalCtrl', ['$scope','$rootScope','$mdDialog','$mdBottomSheet','$firebase','$firebaseObject','$firebaseArray','CurrentUser','List','Checkout','UserList','listId',
  function($scope,$rootScope,$mdDialog,$mdBottomSheet,$firebase,$firebaseObject,$firebaseArray,CurrentUser,List,Checkout,UserList,listId){
    console.log('CheckoutCreateModalCtrl running');

    console.log(listId);
    var db = $firebase.child('checkouts');
    var checkout = $firebaseArray(db)

    //Checkout Create
    $scope.createCheckout = function  () {
      checkout.$add({
        title: $scope.checkout.title,
        body: $scope.checkout.body,
        image: $scope.checkout.image,
        checked: false,
        checkoutList: listId,
      }).then(function (checkout) {
        var checkoutId = checkout.key()
        var db = $firebase.child('lists').child(listId).child('listCheckouts').child(checkoutId).set({
            checkout: true
        })
      });
    }

    //Modal Close
    $scope.close = function() {
      $mdDialog.cancel();
      $mdBottomSheet.cancel();
   };

}])