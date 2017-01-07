function createProgramController($http, $state, ProgramService, $window, $filter) {
  var $ctrl = this;
  $ctrl.exercisesNew = [];
  $ctrl.$onInit = function (argument) {
    $http.get('https://wger.de/api/v2/exercise/?language=2&format=json').then(function (response) {
      $ctrl.data = angular.fromJson(response.data);
      $ctrl.exercises = angular.fromJson(response.data.results);
    });
    $http.get('https://wger.de/api/v2/exercisecategory/?format=json').then(function (response) {
      $ctrl.categories = angular.fromJson(response.data.results);
    });
    $ctrl.activeDelete = true;
  }
  var missing = false;
  $ctrl.selectExercise = function (item) {
    $ctrl.exercisesNew.push(item);
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
      programs.push(newprog);
      ProgramService.savePrograms(programs);
    } else {
      if (!missing) {
        angular.element('#progTitle').attr('style', 'border:solid 2px red;');
        angular.element('#progTitle').after('<strong style="color:red;">Missing Title</strong>');
        missing = true;
      }
      return;
    }
    $state.go('programs');
  };
  $ctrl.getDetail = function (index) {
    $ctrl.exeDetailId = index;
    angular.element('#popDetailExe').css('display', 'block');    
  }
  $ctrl.createExe = function () {
    angular.element('#popNewExe').css('display', 'block');
  }
  $ctrl.afficherPlus = function () {
    $ctrl.query = $ctrl.data.next;
    $http.get($ctrl.query + '&format=json').then(function (response) {
      $ctrl.data = angular.fromJson(response.data);
      Array.prototype.push.apply($ctrl.exercises, angular.fromJson(response.data.results));
      if ($ctrl.data.next === null) {
        angular.element('#affPlusBtn').css('display', 'none');
      }
    });    
  }  
  $ctrl.changeCat = function () {
    if ($ctrl.selectedCat == 0 || $ctrl.selectedCat == undefined) {
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
    console.log($ctrl.exercises, index);
    if ($window.confirm('Are you sure to delete this exercise ?')) {
      $ctrl.exercises.splice(index, 1);
      ProgramService.saveOwnExercises($ctrl.exercises);
    }
  };
}

angular
  .module('app')
  .component('createProgram', {
    templateUrl: 'app/components/createProgram/createProgram.html',
    controller: createProgramController
  });

