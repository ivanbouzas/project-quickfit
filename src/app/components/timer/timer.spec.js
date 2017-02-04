describe('timer component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('timer', function () {
      return {
        templateUrl: 'app/timer.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<timer></timer>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
