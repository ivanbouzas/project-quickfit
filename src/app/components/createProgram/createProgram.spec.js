describe('createProgram component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('createProgram', function () {
      return {
        templateUrl: 'app/createProgram.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<createProgram></createProgram>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
