// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;
webpack(config, function (err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toString({
    chunks: false,
    colors: true,
  });

  console.log(info);
});
