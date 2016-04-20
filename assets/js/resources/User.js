VacationApp.factory('User', ['FireResource','$firebase','$firebaseArray','Auth',
function(FireResource,$firebase,$firebaseArray,Auth){
    var db = $firebase.child('users')
    return $firebaseArray(db);
}]);

