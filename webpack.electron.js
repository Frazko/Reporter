const path = require('path')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrors = require("friendly-errors-webpack-plugin")


const electronConfig = {

}

module.exports = env => {
  if (!env) { env = "development" };

  return {
    entry: {
      main: "./src/main/main.ts"
    },
    mode: 'development',
    target: "electron-main",
    output: {
      path: path.resolve(__dirname, 'dist/main'),
      filename: '[name].js'
    },
    externals: [nodeExternals()],
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
      alias: {
        //env: path.resolve(__dirname, `./config/env_${env}.json`) does not make sense at this time
      }
    },
    node: {
      __dirname: true,
      __filename: true
    },
    plugins: [
      new FriendlyErrors({ clearConsole: env === "development" })
    ]
  }
}

