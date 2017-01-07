function createProgramController($http, $state, ProgramService) {
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
    angular.element('#popDetailExe').attr('style', 'display:block;');
  }
  $ctrl.afficherPlus = function () {
    console.log($ctrl.exercises);
    $ctrl.query = $ctrl.data.next;
    $http.get($ctrl.query + '&format=json').then(function (response) {
      $ctrl.data = angular.fromJson(response.data);
      Array.prototype.push.apply($ctrl.exercises, angular.fromJson(response.data.results));
      if ($ctrl.data.next === null) {
        angular.element('#affPlusBtn').attr('style', 'display:none;');
      }
    });
    
  }  
  $ctrl.changeCat = function () {
    console.log($ctrl.selectedCat);
    $http.get('https://wger.de/api/v2/exercise/?category=' + $ctrl.selectedCat + '&language=2&format=json').then(function (response) {
      $ctrl.data = angular.fromJson(response.data);
      $ctrl.exercises = angular.fromJson(response.data.results);
      angular.element('#affPlusBtn').attr('style', 'display:inline;');
    });
  }
}

angular
  .module('app')
  .component('createProgram', {
    templateUrl: 'app/components/createProgram/createProgram.html',
    controller: createProgramController
  });

