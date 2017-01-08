function ProgramService() {
  var pKey = 'programs';
  var pKeyPerso = 'FitPersoExercises';
  var programs = [];
  var OwnExercises = [];
  this.getPrograms = function () {
    if (localStorage.getItem(pKey) !== null) {
      programs = angular.fromJson(localStorage.getItem(pKey));
    }
    return programs;
  };
  this.savePrograms = function (pPrograms) {
    localStorage.setItem(pKey, angular.toJson(pPrograms));
  };
  this.saveProgramById = function (pProgram, id) {
    programs = this.getPrograms();
    programs[id] = pProgram;
    this.savePrograms(programs);
  };
  this.getOwnExercises = function () {
    if (angular.fromJson(localStorage.getItem(pKeyPerso)) !== null) {
      OwnExercises = angular.fromJson(localStorage.getItem(pKeyPerso));
    }
    return OwnExercises;
  };
  this.saveOwnExercises = function (pOwnExercises) {
    localStorage.setItem(pKeyPerso, angular.toJson(pOwnExercises));
  };
}

angular
  .module('app')
  .service('ProgramService', ProgramService);

