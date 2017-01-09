describe('calendarDay component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('calendarDay', function () {
      return {
        templateUrl: 'app/calendarDay.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<calendarDay></calendarDay>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
