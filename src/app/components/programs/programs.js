function programsController(ProgramService) {
  var $ctrl = this;
  $ctrl.programs = ProgramService.getPrograms();
  $ctrl.sortableOptions = {
    stop: function() { ProgramService.savePrograms($ctrl.programs); }
  };
}

angular
  .module('app')
  .component('programs', {
    templateUrl: 'app/components/programs/programs.html',
    controller: programsController
  });

