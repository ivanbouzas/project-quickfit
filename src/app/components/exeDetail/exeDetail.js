function exeDetailController($http) {
  var $ctrl = this;
  $ctrl.close = function () {
    angular.element('#popDetailExe').attr('style', 'display:none;');
  };
  $ctrl.$onChanges = function (argument) {
    if (angular.isDefined($ctrl.exeDetailId)) {
      $http.get('https://wger.de/api/v2/exercise/' + $ctrl.exeDetailId + '/?language=2&format=json').then(function (response) {
        $ctrl.exercise = angular.fromJson(response.data);
        $http.get('https://wger.de/api/v2/exercisecategory/' + $ctrl.exercise.category + '/?language=2&format=json').then(function (response) {
          $ctrl.category = angular.fromJson(response.data);
        });
        angular.element('#descExe').html('<strong>Description</strong>' + $ctrl.exercise.description);
      });  
      $http.get('https://wger.de/api/v2/exerciseimage/?exercise='+ $ctrl.exeDetailId +'&format=json').then(function (response) {        
          if (response.data.count == 0) {
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

