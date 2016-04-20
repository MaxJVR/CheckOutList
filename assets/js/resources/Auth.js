VacationApp.factory("Auth", ['$firebase','$firebaseAuth',
function($firebase,$firebaseAuth) {

  var db = $firebase
  return $firebaseAuth(db);

}]);