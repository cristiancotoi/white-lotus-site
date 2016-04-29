describe('WhiteLotusCtrl', function(){
  var $rootScope = null;
  var controller = null;

  beforeEach(module('WhiteLotusApp'));

  describe('using the controller as syntax', function() {

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();

      ctrl = $controller('WhiteLotusCtrl', {
        $scope: $scope
      });

    }));

    it('should create "numbers" model with 9 numbers', function() {
      expect(Object.keys(ctrl.numbers).length).toEqual(10);
    });

    it('test 23/4/1984', function() {
      ctrl.date.day = '23';
      ctrl.date.month = '4';
      ctrl.date.year = '1984';
      $scope.$digest();

      expect(ctrl.date.day).toEqual('23');
      expect(ctrl.date.month).toEqual('4');
      expect(ctrl.date.year).toEqual('1984');

      expect(ctrl.op).toEqual([31,4,27,9]);
    });

    it('test 28/1/1985', function() {
      ctrl.date.day = '28';
      ctrl.date.month = '1';
      ctrl.date.year = '1985';
      $scope.$digest();

      expect(ctrl.op).toEqual([34,7,30,3]);
    });

    it('test 5/1/1956', function() {
      ctrl.date.day = '5';
      ctrl.date.month = '1';
      ctrl.date.year = '1956';
      $scope.$digest();

      expect(ctrl.op).toEqual([27,9,17,8]);
    });
    
    
    // Fix this!!
    it('test updating values', function() {
      ctrl.date.day = '28';
      ctrl.date.month = '1';
      ctrl.date.year = '1985';
      //$scope.$apply();

      //expect(ctrl.op).toEqual([34,7,30,3]);

      ctrl.date.day = '5';
      ctrl.date.month = '1';
      ctrl.date.year = '1956';
      $scope.$apply();

      expect(ctrl.op).toEqual([27,9,17,8]);
    });

    it('test summing parts of day', function() {
      ctrl.date.day = '5';
      expect(ctrl.getDaySum()).toEqual(5);
      ctrl.date.day = '29';
      expect(ctrl.getDaySum()).toEqual(11);
    });
    
    it('test summing parts of month', function() {
      ctrl.date.month = '5';
      expect(ctrl.getMonthSum()).toEqual(5);
      ctrl.date.month = '11';
      expect(ctrl.getMonthSum()).toEqual(2);
    });
    
    it('test summing parts of year', function() {
      ctrl.date.year = '1990';
      expect(ctrl.getYearSum()).toEqual(19);
      ctrl.date.year = '1999';
      expect(ctrl.getYearSum()).toEqual(28);
      ctrl.date.year = '2015';
      expect(ctrl.getYearSum()).toEqual(8);
    });

    it('test long text', function() {
      ctrl.date.day = '5';
      ctrl.date.month = '1';
      ctrl.date.year = '1956';
      $scope.$digest();

      expect(ctrl.op).toEqual([27,9,17,8]);
      expect(ctrl.getLongText(1)).toEqual('111');
      expect(ctrl.getLongText(2)).toEqual('2');
      expect(ctrl.getLongText(ctrl.numbers[2])).toEqual('2');
    });
    
  });
    
});