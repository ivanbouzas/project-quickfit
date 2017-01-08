function programsController(ProgramService) {
  var $ctrl = this;
  $ctrl.programs = ProgramService.getPrograms();
}

angular
  .module('app')
  .component('programs', {
    templateUrl: 'app/components/programs/programs.html',
    controller: programsController
  });

