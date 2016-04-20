VacationApp.factory('Checkout', ['FireResource','$firebase','$firebaseObject','$firebaseArray',
function(FireResource,$firebase,$firebaseObject,$firebaseArray){

  return function(checkoutId){

    if(checkoutId){
      var db = $firebase.child('checkouts').child(checkoutId);
      return $firebaseObject(db);
    }else{
      var db = $firebase.child('checkouts')
      return $firebaseArray(db);
    }

  }

}]);
