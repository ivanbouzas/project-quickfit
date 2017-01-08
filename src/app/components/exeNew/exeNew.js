function exeNewController(ProgramService) {
  var $ctrl = this;
  $ctrl.close = function () {
    angular.element('#popNewExe').attr('style', 'display:none;');
    angular.element('#newExeName').attr('style', 'border:solid 0px red;');
    angular.element('#newExeName').next().html('');
    $ctrl.exercise = {name: ""};
    $ctrl.exercise = {description: ""};
  };
  $ctrl.savePersoExe = function () {
    if (angular.isDefined($ctrl.exercise.name) && $ctrl.exercise.name !== "") {
      var exercises = ProgramService.getOwnExercises();
      $ctrl.exercise.category = 'Own Exercise';
      $ctrl.exercise.id = angular.isUndefined(exercises[0]) ? 0 : exercises[exercises.length - 1].id + 1;
      exercises.push($ctrl.exercise);
      ProgramService.saveOwnExercises(exercises);
      $ctrl.close();
      $ctrl.onSave();
    } else {
      angular.element('#newExeName').attr('style', 'border:solid 2px red;');
      angular.element('#newExeName').after('<strong style="color:red;">Missing Title</strong>');
    }
  };
}

angular
  .module('app')
  .component('exeNew', {
    templateUrl: 'app/components/exeNew/exeNew.html',
    controller: exeNewController,
    bindings: {
      onSave: '&'
    }
  });

