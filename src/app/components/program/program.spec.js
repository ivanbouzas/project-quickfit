describe('program component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('program', function () {
      return {
        templateUrl: 'app/program.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<program></program>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
