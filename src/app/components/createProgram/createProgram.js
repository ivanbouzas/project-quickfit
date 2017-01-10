function createProgramController($http, $state, ProgramService, $window, $anchorScroll, $location, $stateParams) {
  var $ctrl = this;
  $ctrl.exercisesNew = [];
  $ctrl.$onInit = function () {    
    $http.get('https://wger.de/api/v2/exercise/?language=2&format=json').then(function (response) {
      $ctrl.data = angular.fromJson(response.data);
      $ctrl.exercises = angular.fromJson(response.data.results);
    });
    $http.get('https://wger.de/api/v2/exercisecategory/?format=json').then(function (response) {
      $ctrl.categories = angular.fromJson(response.data.results);
    });
    if (angular.isDefined($stateParams.id)) {
      $ctrl.oldProgram = ProgramService.getPrograms()[$stateParams.id];
      $ctrl.programTitle = $ctrl.oldProgram.title;
      $ctrl.exercisesNew = $ctrl.oldProgram.exercises;
    }
    $ctrl.activeDelete = true;
    $ctrl.overBody = false;
  };
  $ctrl.selectExercise = function (item) {
    item.showObjectives = false;
    $ctrl.exercisesNew.push(angular.copy(item));
  };
  $ctrl.removeExercise = function (index) {
    $ctrl.exercisesNew.splice(index, 1);
  };
  $ctrl.HighlowChange = function (index, item, change) {
    $ctrl.exercisesNew.splice(index, 1);
    if (change) {
      $ctrl.exercisesNew.splice(index + 1, 0, item);
    } else {
      $ctrl.exercisesNew.splice(index - 1, 0, item);
    }
  };
  $ctrl.saveProgram = function () {
    if (angular.isDefined($ctrl.programTitle) && $ctrl.programTitle !== "") {
      var programs = ProgramService.getPrograms();
      var newprog = {
        title: $ctrl.programTitle,
        exercises: $ctrl.exercisesNew
      };
      if (angular.isDefined($ctrl.oldProgram)) {
        programs[$stateParams.id] = newprog;
      } else {
        programs.push(newprog);
      }      
      ProgramService.savePrograms(programs);
      $state.go('programs');
    } else {
      if (angular.isUndefined($ctrl.missingTitle)) {
        angular.element('#progTitle').css('border', 'solid 3px red');
        angular.element('#progTitle').after('<span style="color:red;"> Missing Title</span>');
        $ctrl.missingTitle = true;
      }
      $location.hash('progTitle');
      $anchorScroll();
    }
  };
  $ctrl.getDetail = function (index) {
    $ctrl.exeDetailId = index;
    angular.element('#popDetailExe').css('display', 'block');
    $ctrl.showHideOverBody();
  };
  $ctrl.createExe = function () {
    angular.element('#popNewExe').css('display', 'block');
    $ctrl.showHideOverBody();
  };
  $ctrl.afficherPlus = function () {
    $ctrl.query = $ctrl.data.next;
    $http.get($ctrl.query + '&format=json').then(function (response) {
      $ctrl.data = angular.fromJson(response.data);
      Array.prototype.push.apply($ctrl.exercises, angular.fromJson(response.data.results));
      if ($ctrl.data.next === null) {
        angular.element('#affPlusBtn').css('display', 'none');
      }
    });
  };
  $ctrl.changeCat = function () {
    if (parseInt($ctrl.selectedCat, 10) === 0 || angular.isUndefined($ctrl.selectedCat)) {
      angular.element('#affPlusBtn').css('display', 'none');
      $ctrl.exercises = ProgramService.getOwnExercises();
      $ctrl.activeDelete = false;
    } else {
      $http.get('https://wger.de/api/v2/exercise/?category=' + $ctrl.selectedCat + '&language=2&format=json').then(function (response) {
        $ctrl.data = angular.fromJson(response.data);
        $ctrl.exercises = angular.fromJson(response.data.results);
        angular.element('#affPlusBtn').css('display', 'inline');
        $ctrl.activeDelete = true;
      });
    }
  };
  $ctrl.deleteExe = function (index) {
    if ($window.confirm('Are you sure to delete this exercise ?')) {
      $ctrl.exercises.splice(index, 1);
      ProgramService.saveOwnExercises($ctrl.exercises);
    }
  };
  $ctrl.showObjectives = function (index) {
    $ctrl.exercisesNew[index].showObjectives = !$ctrl.exercisesNew[index].showObjectives;
  };
  $ctrl.showHideOverBody = function () {
    $ctrl.overBody = !$ctrl.overBody;
  }
}

angular
  .module('app')
  .component('createProgram', {
    templateUrl: 'app/components/createProgram/createProgram.html',
    controller: createProgramController
  });

