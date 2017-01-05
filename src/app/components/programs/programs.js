function programsController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('programs', {
    templateUrl: 'app/components/programs/programs.html',
    controller: programsController
  });

