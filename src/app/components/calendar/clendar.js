function clendarController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('clendar', {
    templateUrl: 'app/components/calendar/clendar.html',
    controller: clendarController
  });

