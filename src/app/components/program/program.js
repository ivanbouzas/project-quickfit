function programController(ProgramService, $stateParams, $filter) {
  var $ctrl = this;
  $ctrl.program = ProgramService.getPrograms()[$stateParams.id];
  var doneExercises = [];
  console.log($ctrl.program);
  $ctrl.nextSet = function (index, exercise) {   
  	exercise.reps = $ctrl.reps;	
  	doneExercises.push(exercise);
  	if ($ctrl.program.exercises[index].nbSets == 1) {
  		$ctrl.program.exercises.splice(index, 1);
  	} else {
  		$ctrl.program.exercises[index].nbSets = $ctrl.program.exercises[index].nbSets - 1;
  	}
  }
}

angular
  .module('app')
  .component('program', {
    templateUrl: 'app/components/program/program.html',
    controller: programController
  });

