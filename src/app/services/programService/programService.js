function ProgramService() {
  var pKey = 'programs';
  var programs = [];
  this.getPrograms = function () {
    if (localStorage.getItem(pKey) !== null) {
      programs = angular.fromJson(localStorage.getItem(pKey));
    }
    return programs;
  };
  this.savePrograms = function (pPrograms) {
    localStorage.setItem(pKey, angular.toJson(pPrograms));  
  };
}

angular
  .module('app')
  .service('ProgramService', ProgramService);

