describe('WhiteLotusCtrl', function(){

  describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index-old.html');
    });

    it('should filter the phone list as a user types into the search box', function() {
      var day = element(by.model('vm.date.day'));
      var month = element(by.model('vm.date.month'));
      var year = element(by.model('vm.date.year'));

      day.sendKeys('23');
      month.sendKeys('4');
      year.sendKeys('1984');
      
      var digits = [0];
      console.info('  Getting digits');
      for(var i=1; i <= 9; i++) {
        digits[i] = element(by.css('.psq-' + i));
      }

      console.info('  Validating digits');
      expect(digits[1].getText()).toBe('11');
      expect(digits[2].getText()).toBe('22');
      expect(digits[4].getText()).toBe('444');
      expect(digits[7].getText()).toBe('7');
    });

  });
});