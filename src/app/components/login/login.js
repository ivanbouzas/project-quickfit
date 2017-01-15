function loginController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('login', {
    templateUrl: 'app/components/login/login.html',
    controller: loginController
  });

