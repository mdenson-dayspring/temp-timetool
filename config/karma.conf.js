var webpackConfig = require('./webpack.test');

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine', 'intl-shim'],

        plugins: [
            require('karma-jasmine'),
            require('karma-intl-shim'),
            require('karma-phantomjs-launcher'),
            require('karma-junit-reporter'),
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-spec-reporter'),
        ],

        files: [
            {pattern: './config/karma-test-shim.js', watched: false}
        ],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['spec', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,

        // the default configuration
        junitReporter: {
            outputDir: 'results', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'karma.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: true, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {} // key value pair of properties to add to the <properties> section of the report
        }
    });
};
