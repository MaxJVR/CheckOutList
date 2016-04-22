VacationApp.controller('ListCtrl', ['$scope','$http','$rootScope','$mdToast','$firebase','$firebaseArray','CurrentAuth','User','List','UserList','Checkout','ListCheckout','CurrentUser',
function($scope,$http,$rootScope,$mdToast,$firebase,$firebaseArray,CurrentAuth,User,List,UserList,Checkout,ListCheckout,CurrentUser){
  // console.log('ListCtrl running');

  $rootScope.loading = true;
  $scope.allCheckouts = [];

  var db = $firebase.child('checkouts');
  var checkouts = $firebaseArray(db);
  var showCheckouts = [];
  var listId = '';

  //GET 21 Checkouts that do no belong to CurrentUser then shuffle them before display
  CurrentUser(CurrentAuth).$loaded().then(function (user) {
    listId = user.userList;
    checkouts.$loaded().then(function (checkouts) {
      // console.log(listId);
     var shuffledCheckouts = shuffleArray(checkouts);

      shuffledCheckouts.forEach(function(checkout){
        if(checkout.checkoutList != listId){
          showCheckouts.push(checkout);
        };
      });

      for(i = 0; i < 21; i++) {
        $scope.allCheckouts.push(showCheckouts[i]);
      };
      $rootScope.loading = false;
    });
  });

// Shuffle function
  var shuffleArray = function(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    };
    return array;
  };

  // POST call to add this as new checkout and add to UsersList
  $scope.copyCheckout = function  (checkout) {
    console.log(checkout);
    var addCheckout = $firebaseArray(db);
    addCheckout.$add({
      title: checkout.title,
      body: checkout.body,
      image: checkout.image,
      checked: false,
      checkoutList: listId
    }).then(function (checkout) {
      // console.log(checkout);
      var checkoutId = checkout.key();
      // console.log(checkoutId);
      $firebase.child('lists').child(listId).child('listCheckouts').child(checkoutId).set({
        checkout: true
      });
    });
  };

  //Toast for copyCheckout
  $scope.copyCheckoutToast = function ($event) {
    $mdToast.showSimple('Checkout Added');
  };

  //Call to display more checkouts
  $scope.getCheckouts = function () {
    //Total # of checkouts to be added
    var totalCheckouts = 6;
    //Filters new checkouts
    filterCheckouts = function (checkout) {
      // console.log(checkout);
      var counter = 0;
      var duplicate = false;
      //Checks its conditions are met to add checkout from forEach to display
      check = function() {
        if(duplicate == false && counter == $scope.allCheckouts.length && totalCheckouts > 0) {
          totalCheckouts--
          $scope.allCheckouts.push(checkout);
        };
      };

      //Loop over current checkouts and looks for already matching keys
      angular.forEach($scope.allCheckouts, function(value, key){
        counter++
        if(checkout.$id == value.$id){
          console.log('duplicate');
          duplicate = true;
        }else{
          check();
        };
      });
    };

    //Loop through all loaded and randomized checkouts and then filter
    angular.forEach(showCheckouts, function(value, key){
      return filterCheckouts(value);
    });

  };

}]);