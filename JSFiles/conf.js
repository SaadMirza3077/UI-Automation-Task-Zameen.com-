"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');
const protractor_1 = require("protractor");
exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['src/*.js'],
    // this will help to run other js files
    suites: {
        Q1: 'src/spec.js',
        Q2: 'src/spec1.js',
        Q3: 'src/spec2.js',
        All: 'src/*.js'
    },
    framework: 'jasmine',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            useAutomationExtension: false,
            args: ['--disable-browser-side-navigation']
        }
    },
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    onPrepare: function () {
        /// this piece of code is used for reporting purpose
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './',
            filePrefix: 'xmlresults'
        }));
    },
    plugins: [{
            package: 'jasmine2-protractor-utils',
            disableHTMLReport: false,
            disableScreenshot: false,
            screenshotPath: './screenshots',
            screenshotOnExpectFailure: true,
            screenshotOnSpecFailure: true,
            captureOnlyFailedSpecs: true,
            clearFoldersBeforeTest: true
        }],
    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = protractor_1.browser.getCapabilities();
        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            let platform = caps.get('platform');
            //var HTMLReport = require('protractor-html-reporter-2');
            let testConfig = {
                reportTitle: 'Airbnb Test Execution Report',
                outputPath: './',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from('xmlresults.xml', testConfig);
        });
    },
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 3000000,
        isVerbose: true,
        includeStackTrace: true,
    },
    getPageTimeout: 120000,
};
