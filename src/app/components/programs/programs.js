function programsController() {
  var $ctrl = this;
  var p_key = 'programs';
  var programs = JSON.parse(localStorage.getItem(p_key)) || [];
  $ctrl.getPrograms = function () {
  	return programs;
  }
}

angular
  .module('app')
  .component('programs', {
    templateUrl: 'app/components/programs/programs.html',
    controller: programsController
  });

