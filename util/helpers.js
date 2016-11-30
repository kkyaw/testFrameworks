var wd = require('wd'),
    _ = require("lodash"),
   chai = require("chai"), 
   chaiAsPromised = require("chai-as-promised");




chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

wd.configureHttp({
    timeout: 240000,
    retryDelay: 15000,
    retries: 5
});

var username,
    accessKey,
    saucelabs,
    seRelayHost,
    seRelayPort,
    buildTag,
    sauceSeUri,
    tunnelId,
    actualCount,
    expectedCount;

function setSauceEnv(){
    username = "kkyaw";
    //accessKey = process.env.SAUCE_ACCESS_KEY;
    accessKey = "50e6b83e-4a00-47a9-92d2-46d240b25abb";
    buildTag = process.env.BUILD_TAG;
    tunnelId = process.env.TUNNEL_IDENTIFIER;
    //making sure we have some username and access key
    if (username == undefined || accessKey == undefined){
        console.error("Sauce username and password is not defined!");
        process.exit(1);
    }

    saucelabs = new SauceLabs({
        username: username,
        password: accessKey
    });
}

function beforeEachTest() {
    expectedCount++;
};

function beforeAllTests(done) {
    actualCount = 0;
    expectedCount = 0;
    username = "kkyaw";
    //accessKey = process.env.SAUCE_ACCESS_KEY;
    accessKey = "50e6b83e-4a00-47a9-92d2-46d240b25abb";
    driver =  wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);


    var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "https://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:443/wd/hub";

    var desiredCaps = {
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey,
        'name': this.test.fullTitle()
        };
    //check if buildTag is set if so add to desired caps.
    if (buildTag != undefined){
        desiredCaps['build'] = buildTag;
    }
    //check if there's a tunnel identifier set by CI (Plugin)
    if (tunnelId != undefined){
        desiredCaps['tunnel-identifier'] = tunnelId;
    }
    
    driver.init(desiredCaps).nodeify(done);
};

function afterEachTest(done) {
    if (this.currentTest.state === 'passed') {
        actualCount++;    
    }
    done();
};

function afterAllTests(done) {
    var passed = (expectedCount === actualCount) ? true : false;
    console.log("after all tests");
    driver
      .quit()
      .sauceJobStatus(passed)
      .nodeify(done);
};

function makeSuite(desc, cb) {
    describe(desc, function() {
        var driver;
        this.timeout(240000);
        before(beforeAllTests);
        beforeEach(beforeEachTest);
        afterEach(afterEachTest);
        after(afterAllTests);
        cb();
    });
};

exports.makeSuite = makeSuite;