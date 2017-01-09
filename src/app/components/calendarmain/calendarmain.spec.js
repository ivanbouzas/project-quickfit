describe('calendarmain component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('calendarmain', function () {
      return {
        templateUrl: 'app/calendarmain.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<calendarmain></calendarmain>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
