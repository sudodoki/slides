const NoErrorsPluginBeep = require('./NoErrorsPluginBeep');
const CustomNotification = require('./CustomNotification');
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new NoErrorsPluginBeep(),
    new CustomNotification()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
      // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192!./my-image-loader' }
    ]
  }
};
