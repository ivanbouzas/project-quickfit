describe('exeDetail component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('exeDetail', function () {
      return {
        templateUrl: 'app/exeDetail.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<exeDetail></exeDetail>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
