VacationApp.factory('List', ['FireResource','$firebase','$firebaseArray',
  function(FireResource,$firebase,$firebaseArray){
  //   return FireResource($firebase.child('lists'), function(){
  //     this.hasOne('users');
  //     this.hasMany('checkouts');
  // });

    var db = $firebase.child('lists');
    return $firebaseArray(db);
}]);
