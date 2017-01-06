function exeDetailController() {
  $ctrl = this;
  $ctrl.close = function () {
    angular.element('#popDetailExe').attr('style', 'display:none;');
  };
  $http.get('https://wger.de/api/v2/exercise/?language=2&format=json').then(function (response) {
    $ctrl.exercise = angular.fromJson(response.data.results);
  });
}

angular
  .module('app')
  .component('exeDetail', {
    templateUrl: 'app/components/exeDetail/exeDetail.html',
    controller: exeDetailController,
    bindings: {
    exeDetailId: '<',
    }
  });

