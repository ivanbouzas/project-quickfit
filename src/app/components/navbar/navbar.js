function navbarController() {
  var $ctrl = this;
  $ctrl.showTimer = function () {
    angular.element('#timer').css('display', 'block');
    $ctrl.showHideOverBody();
  };
  $ctrl.overBody = false;
  // met un fond sur le body lorsqu'un pop up s'affiche
  $ctrl.showHideOverBody = function () {
    $ctrl.overBody = !$ctrl.overBody;
  };
}

angular
  .module('app')
  .component('navbar', {
    templateUrl: 'app/components/navbar/navbar.html',
    controller: navbarController
  });

