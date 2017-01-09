function navbarController() {
  var $ctrl = this;
  $ctrl.text = 'navbar';
}

angular
  .module('app')
  .component('navbar', {
    templateUrl: 'app/components/navbar/navbar.html',
    controller: navbarController
  });

