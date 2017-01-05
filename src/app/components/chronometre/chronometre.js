function chronometreController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('chronometre', {
    templateUrl: 'app/components/chronometre/chronometre.html',
    controller: chronometreController
  });

