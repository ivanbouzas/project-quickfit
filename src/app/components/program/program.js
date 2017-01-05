function programController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('program', {
    templateUrl: 'app/components/program/program.html',
    controller: programController
  });

