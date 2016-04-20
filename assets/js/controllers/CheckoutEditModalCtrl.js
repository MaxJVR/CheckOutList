VacationApp.controller('CheckoutEditModalCtrl', ['$scope','$http','$rootScope','$mdDialog','$mdBottomSheet','CurrentUser','User','List','Checkout','UserList','ListCheckout','editCheckout',
function($scope,$http,$rootScope,$mdDialog,$mdBottomSheet,CurrentUser,User,List,Checkout,UserList,ListCheckout,editCheckout){
  console.log('CheckoutEditModalCtrl running');

  $scope.editCheckout = editCheckout
  console.log(editCheckout)
  var checkoutId = editCheckout.$id

  //Checkout 3 way data bind
  Checkout(checkoutId).$bindTo($scope, 'newCheckout');

  //Modal hide
  $scope.updateCheckout = function  () {
    $mdDialog.hide()
    $mdBottomSheet.hide()
  }

  //Modal Cancel
  $scope.close = function() {
    $mdDialog.cancel();
    $mdBottomSheet.cancel();
 };



}])