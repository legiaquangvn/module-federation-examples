const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:4202/",
    uniqueName: "mdmfreact",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4202,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" }
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 10000
          }
        }
      }      
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mdmfreactts",
      library: { type: "var", name: "mdmfreactts" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        MyWrapperReactModule: "./src/components/angular-wrapper/MyWrapperReactModule.tsx",
      },
      shared: {
        "@angular/core": { singleton: true, eager: true },
        "@angular/common": { singleton: true, eager: true },
        "@angular/router": { singleton: true, eager: true },
        "@ngxs/store": { singleton: true, eager: true },
        "mdmf-shared": { singleton: true, eager: true }
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ],
};
