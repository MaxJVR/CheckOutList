VacationApp.factory('UserList', ['FireResource','$firebase','$firebaseObject','$firebaseArray','CurrentUser','User',
function(FireResource,$firebase,$firebaseObject,$firebaseArray,CurrentUser,User){

  return function(listId){
    var db = $firebase.child('lists');
    var userList = db.child(listId);
    return $firebaseObject(userList);
  }

}]);