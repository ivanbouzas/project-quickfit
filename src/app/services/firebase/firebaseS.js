function FirebaseS($q) {
  var user = null;
  var $ctrl = this;

  $ctrl.getUser = function () {    
    return user;
  };
  $ctrl.setUser = function () {
    user = firebase.auth().currentUser;
  }
  $ctrl.createUser = function (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    });
  }
  $ctrl.loginUser = function (email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      if (error.code === 400) {
        $q(function () {
          $ctrl.createUser(email, password);
        }).then(function () {
          $ctrl.loginUser(email, password);
        });            
      }
    }); 
    while ($ctrl.getUser() === null) {
      $ctrl.setUser();
    }
  };
}

angular
  .module('app')
  .service('FirebaseS', FirebaseS);

