function calendarmainController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('calendarmain', {
    templateUrl: 'app/components/calendarmain/calendarmain.html',
    controller: calendarmainController
  });

