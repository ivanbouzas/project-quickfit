function programsController(ProgramService, $window) {
  var $ctrl = this;
  $ctrl.programs = ProgramService.getPrograms();
  $ctrl.deleteProgram = function (index) {
    if ($window.confirm('Are you sure to delete this workout ?')) {
      $ctrl.programs.splice(index, 1);
      ProgramService.savePrograms($ctrl.programs);
    }
  };
}

angular
  .module('app')
  .component('programs', {
    templateUrl: 'app/components/programs/programs.html',
    controller: programsController
  });

