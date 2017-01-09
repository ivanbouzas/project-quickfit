describe('ProgramService service', function () {
  beforeEach(module('app'));
  it('should', angular.mock.inject(function (ProgramService) {
    expect(ProgramService.getData()).toEqual(3);
  }));
});
