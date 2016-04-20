VacationApp.factory('ListCheckout', ['FireResource','$firebase','$firebaseObject','$firebaseArray','Auth','User',
function(FireResource,$firebase,$firebaseObject,$firebaseArray,Auth,User){

  return function(listId) {
    var checkouts = []
    var db = $firebase.child('checkouts')
    var query = db.orderByChild('checkoutList').equalTo(listId)
    return $firebaseArray(query)
  }

}]);