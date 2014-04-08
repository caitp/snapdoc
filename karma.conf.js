function hasFlag(flag) {
  return process.argv.indexOf(flag) >= 0;
}

module.exports = function(config) {
  config.set({
    port: 9018,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,

    singleRun: true,
    autoWatch: false,

    basePath: '.',

    frameworks: ['jasmine'],

    files: [
      { pattern: 'test/fixtures/**/*', included: false, served: true },
      'test/helpers/browser.helper.js',
      'snapdoc.js',
      'test/*.js'
    ],

    reporters: ['dots']
  });

  if (hasFlag('--watch') || hasFlag('--autowatch')) {
    config.set({
      singleRun: false,
      autoWatch: true
    });
  }
};
