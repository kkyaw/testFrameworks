var assert = require('assert'),
makeSuite = require('../util/helpers').makeSuite;
var fs = require('fs');
var performEvent = require('../util/helperevents').performEvent;



/*makeSuite('Create App Type 1', function() {

  it('Login', function(done) {
    
    driver.get('https://applydevel.csu.edu.au')
    .waitForElementByCss('[href*="signon"]', 1000)
    .elementByCss('[href*="signon"]').click()
    .elementById('paper-input-emailId').clear().sendKeys("tt21@tt.com")
    .elementById('paper-input-pindId').clear().sendKeys("123456")
    .elementById('loginBtn').click()
    .setWaitTimeout(30000)
    .nodeify(done);
    
  });

  it('Create', function(done) {
    driver.elementByCss("paper-button[title='start your application']")
    .click()
    .nodeify(done);
  });
  

});*/

function runTests() {
  var tests = JSON.parse(fs.readFileSync('testData/testJson.json', 'utf8'));

  tests.forEach(function(test) {
    makeTestSuite(test);  
  });
  
}

function makeTestSuite(obj) {
  makeSuite(obj.testSuite, function() {
    var tests = obj.tests;
    tests.forEach(function(test) {
      it(test.testName, function(done) {
        var steps = test.steps;
        var promise = Promise.resolve(null);
        steps.forEach(function(step){
            promise = promise.then(function(){
                return performEvent(step);
            });
        });

        promise.then(function(){
            done();
        });
      });
    });
  });
}

runTests();


