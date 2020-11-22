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
          {loader: "babel-loader"}
      ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "mdmfreact",
      library: { type: "var", name: "mdmfreact" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        MyWrapperReactModule: "./src/components/angular-wrapper/MyWrapperReactModule.tsx",
      },      
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "@ngxs/store": {singleton: true, eager: true },
        "mdmf-shared": { singleton: true, eager: true }  
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
