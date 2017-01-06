function createProgramController($http, $state, ProgramService) {
  var $ctrl = this;
  $ctrl.exercisesNew = [];
  $http.get('https://wger.de/api/v2/exercise/?language=2&format=json').then(function (response) {
    $ctrl.exercises = angular.fromJson(response.data.results);
  });
  var missing = false;
  $ctrl.selectExercise = function (item) {
    $ctrl.exercisesNew.push(item);
  };
  $ctrl.removeExercise = function (index) {
    $ctrl.exercisesNew.splice(index, 1);
  }
  $ctrl.saveProgram = function () {
    if (angular.isDefined($ctrl.programTitle)) {
      var programs = ProgramService.getPrograms();
      var newprog = {
        title: $ctrl.programTitle,
        exercises: $ctrl.exercisesNew
      };
      programs.push(newprog);
      ProgramService.savePrograms(programs);
    } else {
      if (!missing) {
        angular.element('#progTitle').attr('style', 'border:solid 2px red;');
        angular.element('#progTitle').parent().html(angular.element('#progTitle').parent().html() +
        '<strong style="color:red;">Missing Title</strong>');
        missing = true;
      }
      return;
    }
    $state.go('programs');
  };
}

angular
  .module('app')
  .component('createProgram', {
    templateUrl: 'app/components/createProgram/createProgram.html',
    controller: createProgramController
  });

