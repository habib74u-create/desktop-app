const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  target: 'electron-main',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [
    // Don't bundle node_modules — this is a Node/Electron main process
    // file, not a browser bundle. Critically, this also keeps native
    // addons (uiohook-napi, sherpa-onnx-node, bufferutil, etc.) as
    // plain runtime requires instead of trying to webpack-bundle
    // compiled .node binaries, which webpack cannot do.
    nodeExternals({
      allowlist: [], // add any package here you DO want inlined
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
};
