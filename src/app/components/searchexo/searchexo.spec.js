describe('searchexo component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('searchexo', function () {
      return {
        templateUrl: 'app/searchexo.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<searchexo></searchexo>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
