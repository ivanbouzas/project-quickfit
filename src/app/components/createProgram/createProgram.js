function createProgramController($http, $state) {
  var $ctrl = this;
  $ctrl.exercisesNew = [];
  $http.get('https://wger.de/api/v2/exercise/?language=2&format=json').then(function (response) {
	$ctrl.exercises = angular.fromJson(response.data.results);
  });
  $ctrl.selectExercise = function (item) {
  	$ctrl.exercisesNew.push(item);
  }
  $ctrl.saveProgram = function (argument) {
  	console.log($ctrl.exercisesNew);
  	if (angular.isDefined($ctrl.programTitle) && $ctrl.programTitle != "") {
  		
  	} else {
  		return;
  	}
  	$state.go('programs');
  }
}

angular
  .module('app')
  .component('createProgram', {
    templateUrl: 'app/components/createProgram/createProgram.html',
    controller: createProgramController
  });

