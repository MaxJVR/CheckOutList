VacationApp.controller('ProfileCtrl', ['$scope','$http','$location','$rootScope','$mdToast','$mdDialog','$mdBottomSheet','$firebase','$firebaseObject','$firebaseArray','CurrentAuth','Auth','User','List','Checkout','CurrentUser','UserList','ListCheckout',
function($scope,$http,$location,$rootScope,$mdToast,$mdDialog,$mdBottomSheet,$firebase,$firebaseObject,$firebaseArray,CurrentAuth,Auth,User,List,Checkout,CurrentUser,UserList,ListCheckout){
  console.log('ProfileCtrl running');

  hover = false;
  $rootScope.loading = true;
  $scope.hover = false;
  var listId = "";
  $scope.checkouts = [];
  $scope.userNameEdit = false;
  $scope.aboutEdit = false;

  //User and List three way data bind
  CurrentUser(CurrentAuth).$bindTo($scope, 'user').then(function () {
    listId = $scope.user.userList;
    // console.log(listId);
    if(listId) {
      UserList(listId).$bindTo($scope, 'list').then(function () {
        console.log($scope.list);
      }).then(function () {
        $scope.checkouts = ListCheckout(listId)
        // console.log($scope.checkouts);
        $rootScope.loading = false;
      });
    }else{
       List.$add({
        name: 'list name',
        listUser: $scope.user.$id
      }).then(function (ref) {
        listId = ref.key();
        console.log(listId);
        $scope.user.userList = listId;
          // CurrentUser.$save();
        UserList(listId).$bindTo($scope, 'list').then(function () {
        console.log($scope.list);
        }).then(function () {
          $scope.checkouts = ListCheckout(listId)
          // console.log($scope.checkouts);
          $rootScope.loading = false;
        });
      });
    }
  });

  //User edit modal call
  $scope.updateUser = function  () {
   $mdDialog.show({
      templateUrl:'/views/user/UserEditModal.html',
      controller:'UserEditModalCtrl',
      clickOutsideToClose: true
    });
  };

  //User edit bottomSheet call
  $scope.updateUserMobile = function  () {
   $mdBottomSheet.show({
      templateUrl:'/views/user/UserEditBottomSheet.html',
      controller:'UserEditModalCtrl'
    });
  };

  //User add Checkout modal call
  $scope.addList = function  () {
   $mdDialog.show({
      templateUrl:'/views/user/ListCreateModal.html',
      controller:'ListCreateModalCtrl',
      clickOutsideToClose: true
    });
  };

  //User add Checkout BottomSheet call
  $scope.addListMobile = function  () {
   $mdBottomSheet.show({
      templateUrl:'/views/user/ListCreateBottomSheet.html',
      controller:'ListCreateModalCtrl',
    });
  }

  //User add Checkout modal call
  $scope.addCheckout = function  () {
   $mdDialog.show({
      templateUrl:'/views/user/CheckoutCreateModal.html',
      controller:'CheckoutCreateModalCtrl',
      locals: { listId: listId  },
      clickOutsideToClose: true
    });
  };

  //NOT WORKING SAVED UNTIL BUG FIX
  //User add Checkout BottomSheet call
  $scope.addCheckoutMobile = function  () {
   $mdBottomSheet.show({
      templateUrl:'/views/user/CheckoutCreateBottomSheet.html',
      controller:'CheckoutCreateModalCtrl',
      locals: { listId: listId  }
    });
  };

  //User edit Checkout Modal call
  $scope.editCheckout = function  (checkout) {
   console.log(checkout);
   $mdDialog.show({
      templateUrl:'/views/user/CheckoutEditModal.html',
      controller:'CheckoutEditModalCtrl',
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {editCheckout: checkout}
    });
  };

  //NOT WORKING SAVED UNTIL BUG FIX
  //User edit Checkout on mobile device
  $scope.editCheckoutMobile = function  (checkout) {
    $mdBottomSheet.show({
      templateUrl:'/views/user/CheckoutEditBottomSheet.html',
      controller:'CheckoutEditModalCtrl',
      locals: {editCheckout: checkout}
    });
  };

  //Checkout Delete
  $scope.deleteCheckout = function  (checkout) {
    // console.log(checkout);
    var checkoutId = checkout.$id;
    Checkout(checkoutId).$remove();
    var db = $firebase.child('lists').child(listId).child('listCheckouts').child(checkoutId);
    var listCheckout = $firebaseObject(db);
    listCheckout.$remove();
  };

  //Checkout check box
  $scope.checkCheckout = function  (checkout) {

    var checkoutId = checkout.$id;
    // console.log(checkoutId);

    Checkout(checkoutId).$loaded().then(function (checkoutCheck) {
        // console.log(checkoutCheck);
          if (checkoutCheck.checked == false) {
            checkoutCheck.checked = true;
            checkoutCheck.$save();
          }else{
            checkoutCheck.checked = false;
            checkoutCheck.$save();
        }
    });

  };

}]);