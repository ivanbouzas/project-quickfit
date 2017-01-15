function ProgramService() {
  var pKey = 'programs';
  var pKeyPerso = 'FitPersoExercises';
  var programs = [];
  var OwnExercises = [];
  this.getPrograms = function () {
    if (localStorage.getItem(pKey) !== null) {
      programs = angular.fromJson(localStorage.getItem(pKey));
      angular.forEach(programs, function (value) {
        angular.forEach(value.exercises, function (value) {
          value.exeUnitTime = value.exeUnitTime === null ? undefined : new Date(value.exeUnitTime);
          value.exeUnitRest = value.exeUnitRest === null ? undefined : new Date(value.exeUnitRest);
          value.exeObjTime = value.exeObjTime === null ? undefined : new Date(value.exeObjTime);
          value.exeObjTimeInc = value.exeObjTimeInc === null ? undefined : new Date(value.exeObjTimeInc);
          value.time = value.time === null ? undefined : new Date(value.time);
        });
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

