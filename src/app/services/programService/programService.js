function ProgramService() {
  // clé pour la sauvegarde des routines
  var pKey = 'programs';
  // clé pour la sauvegarde des exercices crées
  var pKeyPerso = 'FitPersoExercises';
  var programs = [];
  var OwnExercises = [];
  this.getPrograms = function () {
    if (localStorage.getItem(pKey) !== null) {
      programs = angular.fromJson(localStorage.getItem(pKey));
      var date = new Date(-3600000);
      angular.forEach(programs, function (value) {
        angular.forEach(value.exercises, function (value) {
          value.exeUnitTime = value.exeUnitTime === null ? date : new Date(value.exeUnitTime);
          value.exeUnitRest = value.exeUnitRest === null ? date : new Date(value.exeUnitRest);
          value.exeObjTime = value.exeObjTime === null ? date : new Date(value.exeObjTime);
          value.exeObjTimeInc = value.exeObjTimeInc === null ? date : new Date(value.exeObjTimeInc);
          value.time = value.time === null ? date : new Date(value.time);
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

