function calendarDayController() {
  this.text = 'My brand new component!';
}

angular
  .module('app')
  .component('calendarDay', {
    templateUrl: 'app/components/calendarDay/calendarDay.html',
    controller: calendarDayController
  });

