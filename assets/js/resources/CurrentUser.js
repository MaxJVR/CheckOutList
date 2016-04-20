VacationApp.factory('CurrentUser', ['FireResource','$firebase','$firebaseObject','$firebaseArray','Auth','User',
function(FireResource,$firebase,$firebaseObject,$firebaseArray,Auth,User){

  return currentAuthUser = function(authData) {
    var userId = authData.uid
    var db = $firebase.child('users').child(userId);
    return $firebaseObject(db);
  }


    // var authData = Auth.$getAuth();
    // var fail = false
    // if(authData) {
    //   var userId = authData.uid
    //   var db = $firebase.child('users').child(userId);
    //   return $firebaseObject(db);
    // }else{
    //   return fail
    // }

}]);