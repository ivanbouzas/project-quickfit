describe('programs component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('programs', function () {
      return {
        templateUrl: 'app/programs.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<programs></programs>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
