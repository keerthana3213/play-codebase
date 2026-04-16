module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-jasmine-html-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            jasmine: {},
            clearContext: false
        },
        reporters: ['progress', 'kjhtml', 'coverage'],
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage'),
            subdir: '.',
            reporters: [
                { type: 'text' },         // ✅ line-by-line breakdown
                { type: 'html' },          // ✅ HTML report
                { type: 'text-summary' } // ✅ final summary

            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO, // You can set LOG_DISABLE if needed
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
    });
};
