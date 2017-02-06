function programController(ProgramService, $stateParams, $state, $timeout) {
  var $ctrl = this;
  var doneExercises = [];
  var id = $stateParams.id;
  $ctrl.$onInit = function () {
    $ctrl.program = ProgramService.getPrograms()[id];
    if (angular.isDefined($ctrl.program.notDone)) {
      doneExercises = angular.copy($ctrl.program.doneExercises);
      $ctrl.program.doneExercises = undefined;
      $ctrl.program.notDone = undefined;
      angular.forEach(ProgramService.getPrograms(), function (value, key) {
        if (value.title === $ctrl.program.title && angular.isUndefined(value.notDone)) {
          id = key;
        }
      });
    }
    // gestion dynamique des class de chaque exercice
    // permet d'afficher des bordures différentes
    $ctrl.resumeClass = [];
    // Boolean, affichage du texte 'Objectif exceeded'
    $ctrl.showObjectiveTxt = [];
    // true si la routine est terminée
    $ctrl.resume = false;
    $ctrl.restPeriod = 0;
  };
  $ctrl.nextSet = function (index, exercise) {
    var date = new Date(-3600000);
    exercise.time = exercise.time === null ? date : new Date(exercise.time);
    doneExercises.push(exercise);
    // Gestion d'un exercice avec plusieurs séries
    // Animation pour le prochaine exercice
    if ($ctrl.program.exercises[index].nbSets === 1) {
      $ctrl.program.exercises.shift();
      if ($ctrl.program.exercises.length !== 0) {
        angular.element('#exercise' + index).addClass('bounce');
        $timeout(function () {
          angular.element('#exercise' + index).removeClass('bounce');
        }, 650);
      }
    } else {
      $ctrl.program.exercises[index].nbSets -= 1;
    }
    $ctrl.restPeriod = 0;
    $ctrl.restPeriod = Math.round((exercise.exeUnitRest - date.getTime()) / 1000);
    if ($ctrl.restPeriod !== 0) {
      $ctrl.showTimer();
      angular.element('body').scrollTop(150);
    }
    // Gestion des objectifs, ajout dynamique de class
    if ($ctrl.program.exercises.length === 0) {
      $ctrl.resume = true;
      var oldprogram = ProgramService.getPrograms()[id];
      angular.forEach(oldprogram.exercises, function (value, key) {
        // Compare les 'Reps' avec la séance précédente
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
        // Compare 'Time' avec la séance précédente
        // Suivant le type d'objectif fixé
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
        // Si objectif pour 'Reps' atteint
        if (angular.isDefined(value.exeObjRep) && value.exeObjRep !== null) {
          if (doneExercises[key].reps >= value.exeObjRep) {
            doneExercises[key].exeUnitWeight += doneExercises[key].exeObjWeightInc;
            $ctrl.resumeClass[key] = 'better objective';
            $ctrl.showObjectiveTxt[key] = true;
          }
        }
        // Si objectif pour 'Time' atteint
        if (angular.isDefined(value.exeObjTime) && value.exeObjTime !== -3600000) {
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
      // Affiche le résumé de la séance
      $ctrl.program.exercises = doneExercises;
    } else {
      if (angular.isUndefined(ProgramService.getPrograms()[0].notDone)) {
        id = parseInt(id, 10) + 1;
      }
      var programNotDone = {notDone: true};
      programNotDone.title = $ctrl.program.title;
      programNotDone.doneExercises = angular.copy(doneExercises);
      programNotDone.exercises = angular.copy($ctrl.program.exercises);
      ProgramService.saveCurrentProgram(programNotDone);
    }
  };
  $ctrl.saveCompletedProg = function () {
    ProgramService.saveProgramById($ctrl.program, id);
    ProgramService.removeNotDoneProgram();
    $state.go('programs');
  };
  $ctrl.showTimer = function () {
    angular.element('#timer').css('display', 'block');
  };
}

angular
  .module('app')
  .component('program', {
    templateUrl: 'app/components/program/program.html',
    controller: programController
  });

