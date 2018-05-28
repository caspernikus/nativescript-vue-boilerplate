const path = require('path');
const webpack = require('webpack');
const winston = require('winston-color');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin');
const NativeScriptVueExternals = require('nativescript-vue-externals');
const NativeScriptVueTarget = require('nativescript-vue-target');

// Prepare NativeScript application from template (if necessary)
require('./prepare')();

// Generate platform-specific webpack configuration
const config = (platform, launchArgs, env) => {
  const configData = require(`./src/config/config.${env}.json`);

  winston.info(`Bundling application for ${platform}...`);

  // CSS / SCSS style extraction loaders
  const cssLoader = ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {url: false},
      },
    ],
  });
  const lessLoader = ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          url: false,
          includePaths: [path.resolve(__dirname, 'node_modules')],
        },
      },
      'less-loader',
    ],
  });

  return {

    target: NativeScriptVueTarget,

    entry: path.resolve(__dirname, './src/main.js'),

    output: {
      path: path.resolve(__dirname, './dist/app'),
      filename: `app.${platform}.js`,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },

        {
          test: /\.css$/,
          use: cssLoader,
        },
        {
          test: /\.less$/,
          use: lessLoader,
        },

        {
          test: /\.vue$/,
          loader: 'ns-vue-loader',
          options: {
            loaders: {
              css: cssLoader,
              less: lessLoader,
            },
          },
        },
      ],
    },

    resolve: {
      modules: [
        'node_modules/tns-core-modules',
        'node_modules',
      ],
      extensions: [
        `.${platform}.css`,
        '.css',
        `.${platform}.less`,
        '.less',
        `.${platform}.js`,
        '.js',
        `.${platform}.vue`,
        '.vue',
      ],
    },

    externals: NativeScriptVueExternals,

    plugins: [

      // Extract CSS to separate file
      new ExtractTextPlugin({filename: `app.${platform}.css`}),

      // Optimize CSS output
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          normalizeUrl: false
        },
        canPrint: false,
      }),

      // Set Global Vars based on loaded config file
      new webpack.DefinePlugin({
        ENVIRONMENT: JSON.stringify(env),
      }),

      // Minify JavaScript code
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        output: {comments: false},
      }),

      // Copy src/assets/**/* to dist/
      new CopyWebpackPlugin([
        {from: 'assets', context: 'src'},
      ]),

      // Execute post-build scripts with specific arguments
      new WebpackSynchronizableShellPlugin({
        onBuildEnd: {
          scripts: [
            ... launchArgs ? [`node launch.js ${launchArgs}`] : [],
          ],
          blocking: false,
        },
      }),

    ],

    stats: 'errors-only',

    node: {
      'http': false,
      'timers': false,
      'setImmediate': false,
      'fs': 'empty',
    },

  };
};

// Determine platform(s) and action from webpack env arguments
module.exports = env => {
  const action = (!env || !env.tnsAction) ? 'build' : env.tnsAction;

  var environment = 'local';
  if (env.ENV !== undefined && env.ENV !== null) {
    environment = env.ENV;
  }

  if (!env || (!env.android && !env.ios)) {
    return [config('android', null, environment), config('ios', action, environment)];
  }

  return env.android && config('android', `${action} android`, environment)
    || env.ios && config('ios', `${action} ios`, environment)
    || {};
};
