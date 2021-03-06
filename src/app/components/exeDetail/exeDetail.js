function exeDetailController($http, $filter, ProgramService) {
  var $ctrl = this;
  $ctrl.close = function () {
    angular.element('#popDetailExe').attr('style', 'display:none;');
    $ctrl.overBody();
  };
  // s'active lorsqu'on ouvre le détail d'un exercice
  $ctrl.$onChanges = function () {
    if (angular.isDefined($ctrl.exeDetailId)) {
      // Exercices personnelles cherché en local
      if ($ctrl.ownExe === '0') {
        var exercises = ProgramService.getOwnExercises();
        $ctrl.exercise = $filter('filter')(exercises, {id: $ctrl.exeDetailId})[0];
        $ctrl.category = {name: 'Own Exercise'};
        if (angular.isDefined($ctrl.exercise.description)) {
          angular.element('#descExe').html($ctrl.exercise.description);
        }
      // Exercices cherché dans l'api par categorie
      } else {
        $http.get('https://wger.de/api/v2/exercise/' + $ctrl.exeDetailId + '/?language=2&format=json').then(function (response) {
          $ctrl.exercise = angular.fromJson(response.data);
          $http.get('https://wger.de/api/v2/exercisecategory/' + $ctrl.exercise.category + '/?language=2&format=json').then(function (response) {
            $ctrl.category = angular.fromJson(response.data);
          });
          angular.element('#descExe').html($ctrl.exercise.description);
        });
        // Cherche les images des exercices
        // Ces dernières se trouve ailleurs dans l'api
        $http.get('https://wger.de/api/v2/exerciseimage/?exercise=' + $ctrl.exeDetailId + '&format=json').then(function (response) {
          if (response.data.count === 0) {
            $ctrl.image1 = null;
            $ctrl.image2 = null;
          } else {
            var images = angular.fromJson(response.data.results);
            $ctrl.image1 = images[0].image;
            $ctrl.image2 = images[1].image;
          }
        });
      }
    }
  };
}

angular
  .module('app')
  .component('exeDetail', {
    templateUrl: 'app/components/exeDetail/exeDetail.html',
    controller: exeDetailController,
    bindings: {
      exeDetailId: '<',
      ownExe: '<',
      overBody: '&'
    }
  });

