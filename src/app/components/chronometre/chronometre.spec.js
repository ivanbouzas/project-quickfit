describe('chronometre component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('chronometre', function () {
      return {
        templateUrl: 'app/chronometre.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<chronometre></chronometre>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
