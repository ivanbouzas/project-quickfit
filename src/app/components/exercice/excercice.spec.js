describe('excercice component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('excercice', function () {
      return {
        templateUrl: 'app/excercice.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<excercice></excercice>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
