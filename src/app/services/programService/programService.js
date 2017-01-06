function ProgramService() {
  var p_key = 'programs';
  var programs = JSON.parse(localStorage.getItem(p_key)) || [];
  $ctrl.getPrograms = function () {
  	return programs;
  }
}



angular
  .module('app')
  .service('ProgramService', ProgramService);

