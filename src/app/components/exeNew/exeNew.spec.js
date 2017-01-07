describe('exeNew component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('exeNew', function () {
      return {
        templateUrl: 'app/exeNew.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<exeNew></exeNew>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
