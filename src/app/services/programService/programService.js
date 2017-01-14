function ProgramService() {
  var pKey = 'programs';
  var pKeyPerso = 'FitPersoExercises';
  var programs = [];
  var OwnExercises = [];
  this.getPrograms = function () {
    if (localStorage.getItem(pKey) !== null) {
      programs = angular.fromJson(localStorage.getItem(pKey));
      angular.forEach(programs, function (value, key, obj) {
        value.exeUnitTime = new Date(value.exeUnitTime !== null ? value.exeUnitTime : '0');
        value.exeUnitRest = new Date(value.exeUnitRest !== null ? value.exeUnitRest : '0');
        value.exeObjTime = new Date(value.exeObjTime !== null ? value.exeObjTime : '0');
        value.exeObjTimeInc = new Date(value.exeObjTimeInc !== null ? value.exeObjTimeInc : '0');
      });
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

