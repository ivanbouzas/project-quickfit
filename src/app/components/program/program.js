function programController(ProgramService, $stateParams, $state) {
  var $ctrl = this;
  $ctrl.program = ProgramService.getPrograms()[$stateParams.id];
  var doneExercises = [];
  $ctrl.resumeClass = [];
  $ctrl.resume = false;
  /*$ctrl.$onInit = function () {
    angular.forEach($ctrl.program.exercises, function (value, key) {
      if (key % 2) {        
        angular.element('#exe' + key).addClass('fadeInLeft');
      } else {
        console.log('#exe' + key);
        angular.element('#exe' + key).addClass('fadeInRight');
      }
    });
    
  };*/
  $ctrl.nextSet = function (index, exercise) {
    doneExercises.push(exercise);
    console.log(doneExercises);
    if ($ctrl.program.exercises[index].nbSets === 1) {
      $ctrl.program.exercises.splice(index, 1);
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
        if (angular.isDefi
          ned(value.time)) {
          doneExercises[key].difftimeOldNew = value.time.getTime() - doneExercises[key].time.getTime();
          if (angular.isDefined(value.exeObjTimeType)) {
            if (value.exeObjTimeType === 'plus') {
              if (value.time > doneExercises[key].time) {
                $ctrl.resumeClass[key] = 'worse';
              } else if (value.time === doneExercises[key].time) {
                $ctrl.resumeClass[key] = 'same';
              } else {
                $ctrl.resumeClass[key] = 'better';
              }
            } else if (value.exeObjTimeType === 'minus') {
              if (value.time > doneExercises[key].time) {
                $ctrl.resumeClass[key] = 'better';
              } else if (value.time === doneExercises[key].time) {
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
          }
        }
        if (angular.isDefined(value.exeObjTime)) {
          if (value.exeObjTimeType === 'plus') {
            if (doneExercises[key].time >= value.exeObjTime) {
              doneExercises[key].exeObjTime.setTime(doneExercises[key].exeObjTime.getTime() + (value.exeObjTimeInc - new Date(-3600000)));
              $ctrl.resumeClass[key] = 'better objective';
            }
          } else if (value.exeObjTimeType === 'minus') {
            if (doneExercises[key].time <= value.exeObjTime.getTime()) {
               doneExercises[key].exeObjTime.setTime(doneExercises[key].exeObjTime.getTime() - (value.exeObjTimeInc - new Date(-3600000)));
              $ctrl.resumeClass[key] = 'better objective';
            }
          }
        }
      });
      console.log(doneExercises);
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

