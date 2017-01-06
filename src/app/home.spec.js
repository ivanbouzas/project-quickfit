describe('home component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('app', function () {
      return {
        templateUrl: 'app/home.html'
      };
    });
  }));
  it('should render hello world', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<app></app>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
