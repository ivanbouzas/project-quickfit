describe('clendar component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('clendar', function () {
      return {
        templateUrl: 'app/clendar.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<clendar></clendar>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
