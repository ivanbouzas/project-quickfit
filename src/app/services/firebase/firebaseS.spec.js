describe('FirebaseS service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (FirebaseS) {
    expect(FirebaseS.getData()).toEqual(3);
  }));
});
