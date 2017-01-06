function programsController(ProgramService) {
  var $ctrl = this;
  $ctrl.getPrograms = function () {
    return ProgramService.getPrograms();
  };
  $ctrl.programs = $ctrl.getPrograms();
}

angular
  .module('app')
  .component('programs', {
    templateUrl: 'app/components/programs/programs.html',
    controller: programsController
  });

