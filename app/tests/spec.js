// describe('Protractor Demo App', function() {
//   	it('should show book lists', function() {
//   		browser.get('http://localhost:8000/app');
//   		var books = element.all(by.repeater('book in books'));

//   		expect(books.count()).toBe(4);

//   		element(by.model('s.title')).sendKeys('cur');

//   		expect(books.count()).toBe(2);

//   		expect(books.get(0).getText()).toEqual('cursus. Integer - Gregory Dotson');

//   		element(by.model('s.title')).sendKeys('ger');

//   		expect(books.count()).toBe(1);
//   	});

// });

describe('Protractor Demo App', function() {
    it('should show book lists', function() {
      browser.get('http://localhost:8000/dist');
      var num = element.all(by.repeater('v in numbers'));

      expect(num.count()).toBe(5);

      expect(num.get(0).getText()).toEqual('1');
    });

});