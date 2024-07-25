// Import necessary modules and plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Export the webpack configuration as a function
module.exports = () => {
  return {
    // Set the mode to development for this build
    mode: 'development',
    // Define the entry points for the application
    entry: {
      main: './src/js/index.js', // Main entry point
      install: './src/js/install.js' // Install entry point
    },
    // Define the output settings for the build
    output: {
      filename: '[name].bundle.js', // Output file name pattern
      path: path.resolve(__dirname, 'dist'), // Output directory
    },
    // Define the plugins to be used in the build
    plugins: [
      // Plugin to generate an HTML file based on a template
      new HtmlWebpackPlugin({
        template: './index.html', // Template file
        title: 'Text Editor' // Title for the generated HTML
      }),
      // Plugin to generate a PWA manifest
      new WebpackPwaManifest({
        fingerprints: false, // Disable fingerprints for file names
        inject: true, // Inject the manifest into the HTML
        name: 'Text Editor Management', // Name of the PWA
        short_name: 'Text Editor', // Short name of the PWA
        description: 'An App for editing and styling text!', // Description of the PWA
        background_color: '#272822', // Background color for the PWA
        theme_color: '#31a9e1', // Theme color for the PWA
        start_url: './', // Start URL for the PWA
        publicPath: './', // Public path for the PWA
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Source image for the icons
            sizes: [96, 128, 192, 256, 384, 512], // Sizes for the icons
            destination: path.join('assets', 'icons'), // Destination directory for the icons
          },
        ],
      }),
      // Plugin to inject the service worker script
      new InjectManifest({
        swSrc: './src-sw.js', // Source service worker script
        swDest: 'src-sw.js', // Destination service worker script
      }),
    ],

    // Define the module rules for loading different file types
    module: {
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
        },
        {
          test: /\.m?js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude files in node_modules directory
          use: {
            loader: 'babel-loader', // Use babel-loader for JavaScript files
            options: {
              presets: ['@babel/preset-env'], // Use preset-env for transpiling JavaScript
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Use additional Babel plugins
            },
          },
        },
      ],
    },
  };
};
