function timerController($interval) {
  var $ctrl = this;
  $ctrl.sec0 = 0;
  $ctrl.sec00 = 0;
  $ctrl.min0 = 0;
  $ctrl.min00 = 0;
  $ctrl.now = 0;
  $ctrl.start = function () {
    angular.element('#timer').removeClass('flash');
    angular.element('#timer').addClass('pulse');
    $ctrl.timer = $interval(function () {
      if ($ctrl.now !== 0 && Math.floor(($ctrl.now + 1000) / 1000) !== Math.floor(Date.now() / 1000)) {
        $ctrl.diff = Math.floor((Date.now() - $ctrl.now) / 1000);
      } else {
        $ctrl.diff = 1;
      }
      $ctrl.now = Date.now();
      $ctrl.sec0 += $ctrl.diff;
      if ($ctrl.sec0 >= 10) {
        $ctrl.sec00 += Math.floor($ctrl.sec0 / 10);
        $ctrl.sec0 -= Math.floor($ctrl.sec0 / 10) * 10;
        if ($ctrl.sec00 >= 6) {
          $ctrl.min0 += Math.floor($ctrl.sec00 / 6);
          $ctrl.sec00 -= Math.floor($ctrl.sec00 / 6) * 6;
          if ($ctrl.min0 >= 10) {
            $ctrl.min00 += Math.floor($ctrl.min0 / 10);
            $ctrl.min0 -= Math.floor($ctrl.min0 / 10) * 10;
          }
        }
      }
    }, 1000);
  };
  $ctrl.stop = function () {
    angular.element('#timer').removeClass('pulse');
    angular.element('#timer').addClass('flash');
    $interval.cancel($ctrl.timer);
    $ctrl.timer = undefined;
    $ctrl.now = 0;
  };
  $ctrl.reset = function () {
    $ctrl.sec0 = 0;
    $ctrl.sec00 = 0;
    $ctrl.min0 = 0;
    $ctrl.min00 = 0;
  };
  $ctrl.close = function () {
    angular.element('#timer').attr('style', 'display:none;');
    $ctrl.overBody();
  };
}

angular
  .module('app')
  .component('timer', {
    templateUrl: 'app/components/timer/timer.html',
    controller: timerController,
    bindings: {
      overBody: '&'
    }
  });

