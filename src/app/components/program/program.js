function programController(ProgramService, $stateParams, $state, $timeout) {
  var $ctrl = this;
  var doneExercises = [];
  $ctrl.$onInit = function () {
    $ctrl.program = ProgramService.getPrograms()[$stateParams.id];
    $ctrl.resumeClass = [];
    $ctrl.showObjectiveTxt = [];
    $ctrl.resume = false;
  };
  $ctrl.nextSet = function (index, exercise) {
    exercise.time = exercise.time === null ? undefined : new Date(exercise.time);
    doneExercises.push(exercise);
    if ($ctrl.program.exercises[index].nbSets === 1) {
      $ctrl.program.exercises.splice(index, 1);
      if ($ctrl.program.exercises.length !== 0) {
        angular.element('#exercise' + index).addClass('bounce');
        $timeout(function () {
          angular.element('#exercise' + index).removeClass('bounce');
        }, 520);
      }
    } else {
      $ctrl.program.exercises[index].nbSets -= 1;
    }
    if ($ctrl.program.exercises.length === 0) {
      $ctrl.resume = true;
      var oldprogram = ProgramService.getPrograms()[$stateParams.id];
      angular.forEach(oldprogram.exercises, function (value, key) {
        if (angular.isDefined(value.reps)) {
          doneExercises[key].diffrepsOldNew = value.reps - doneExercises[key].reps;
          if (value.reps > doneExercises[key].reps) {
            $ctrl.resumeClass[key] = 'worse';
          } else if (value.reps === doneExercises[key].reps) {
            $ctrl.resumeClass[key] = 'same';
          } else {
            $ctrl.resumeClass[key] = 'better';
          }
        }
        if (angular.isDefined(value.time)) {
          if (angular.isDefined(value.exeObjTimeType)) {
            if (value.exeObjTimeType === 'plus') {
              if (value.time > doneExercises[key].time) {
                $ctrl.resumeClass[key] = 'worse';
              } else if (value.time.getTime() === doneExercises[key].time.getTime()) {
                $ctrl.resumeClass[key] = 'same';
              } else {
                $ctrl.resumeClass[key] = 'better';
              }
            } else if (value.exeObjTimeType === 'minus') {
              if (value.time > doneExercises[key].time) {
                $ctrl.resumeClass[key] = 'better';
              } else if (value.time.getTime() === doneExercises[key].time.getTime()) {
                $ctrl.resumeClass[key] = 'same';
              } else {
                $ctrl.resumeClass[key] = 'worse';
              }
            }
          }
        }
        if (angular.isDefined(value.exeObjRep)) {
          if (doneExercises[key].reps >= value.exeObjRep) {
            doneExercises[key].exeUnitWeight += doneExercises[key].exeObjWeightInc;
            $ctrl.resumeClass[key] = 'better objective';
            $ctrl.showObjectiveTxt[key] = true;
          }
        }
        if (angular.isDefined(value.exeObjTime)) {
          if (value.exeObjTimeType === 'plus') {
            if (doneExercises[key].time >= value.exeObjTime) {
              doneExercises[key].exeObjTime.setTime(doneExercises[key].exeObjTime.getTime() + (value.exeObjTimeInc - new Date(-3600000)));
              $ctrl.resumeClass[key] = 'better objective';
              $ctrl.showObjectiveTxt[key] = true;
            }
          } else if (value.exeObjTimeType === 'minus') {
            if (doneExercises[key].time <= value.exeObjTime) {
              doneExercises[key].exeObjTime.setTime(doneExercises[key].exeObjTime.getTime() - (value.exeObjTimeInc - new Date(-3600000)));
              $ctrl.resumeClass[key] = 'better objective';
              $ctrl.showObjectiveTxt[key] = true;
            }
          }
        }
      });
      $ctrl.program.exercises = doneExercises;
    }
  };
  $ctrl.saveCompletedProg = function () {
    ProgramService.saveProgramById($ctrl.program, $stateParams.id);
    $state.go('programs');
  };
}

angular
  .module('app')
  .component('program', {
    templateUrl: 'app/components/program/program.html',
    controller: programController
  });

