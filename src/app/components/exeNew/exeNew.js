function exeNewController(ProgramService, $q) {
  var $ctrl = this;
  $ctrl.$onInit = function () {
    $ctrl.exercise = {};
  };
  $ctrl.close = function () {
    angular.element('#popNewExe').attr('style', 'display:none;');
    angular.element('#newExeName').attr('style', 'border:border 1px;');
    angular.element('#newExeName').next().html('');
    $ctrl.exercise = {name: ""};
    $ctrl.exercise = {description: ""};
    $ctrl.overBody();
  };
  $ctrl.savePersoExe = function () {
    if (angular.isDefined($ctrl.exercise.name) && $ctrl.exercise.name !== "") {
      var exercises = ProgramService.getOwnExercises();
      $ctrl.exercise.category = 'Own Exercise';
      $ctrl.exercise.id = angular.isUndefined(exercises[0]) ? 0 : exercises[exercises.length - 1].id + 1;
      exercises.push($ctrl.exercise);
      ProgramService.saveOwnExercises(exercises);
      $ctrl.close();
      $q($ctrl.onSave).then($ctrl.overBody);
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
      onSave: '&',
      overBody: '&'
    }
  });

