function createProgramController($http, $state, ProgramService, $window, $location, $stateParams, $timeout) {
  var $ctrl = this;
  $ctrl.$onInit = function () {
    $ctrl.exercisesNew = [];
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
      angular.forEach($ctrl.exercisesNew, function (value) {
        value.showObjectives = false;
      });
    }
    $ctrl.activeDelete = true;
    $ctrl.overBody = false;
    $ctrl.ishideDbList = false;
  };
  $ctrl.selectExercise = function (item, index) {
    item[index].showObjectives = false;
    $ctrl.exercisesNew.push(angular.copy(item[index]));
    angular.element('#DbItem' + index).addClass('fadeOutLeft');
    $timeout(function () {
      angular.element('#DbItem' + index).removeClass('fadeOutLeft');
      angular.element('#DbItem' + index).addClass('fadeIn');
    }, 600);
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
    if ($ctrl.exercisesNew[index].showObjectives) {
      angular.element('#Objective' + index).addClass('animated');
      angular.element('#Objective' + index).addClass('fadeIn');
      $timeout(function () {
        angular.element('#Objective' + index).removeClass('animated');
      }, 500);
    }
  };
  $ctrl.showHideOverBody = function () {
    $ctrl.overBody = !$ctrl.overBody;
  };
  $ctrl.hideDbList = function () {
    $ctrl.ishideDbList = !$ctrl.ishideDbList;
    if ($ctrl.ishideDbList) {
      angular.element('#dataList').addClass('fadeOutRight');
      angular.element('#myWOlist').removeClass('col-sm-offset-2');
      angular.element('#myWOlist').addClass('col-sm-offset-4');
      angular.element('#hideDbList').removeClass('glyphicon-arrow-right');
      angular.element('#hideDbList').addClass('glyphicon-arrow-left');
      angular.element('#dataList').removeClass('fadeInRight');
    } else {
      angular.element('#dataList').removeClass('fadeOutRight');
      angular.element('#myWOlist').removeClass('col-sm-offset-4');
      angular.element('#myWOlist').addClass('col-sm-offset-2');
      angular.element('#dataList').addClass('fadeInRight');
      angular.element('#hideDbList').removeClass('glyphicon-arrow-left');
      angular.element('#hideDbList').addClass('glyphicon-arrow-right');
    }
  };
}

angular
  .module('app')
  .component('createProgram', {
    templateUrl: 'app/components/createProgram/createProgram.html',
    controller: createProgramController
  });

