const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
  // Find the HtmlWebpackPlugin instance and customize it
  const htmlPlugin = config.plugins.find(
    (plugin) => plugin instanceof HtmlWebpackPlugin
  );

  if (htmlPlugin) {
    // Customize the HtmlWebpackPlugin options if needed
    htmlPlugin.options.template = './public/index.html'; // Adjust the path if necessary
  }

  return config;
};
