const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4201/",
    uniqueName: "mdmfprofile",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "profile",
      library: { type: "var", name: "profile" },
      filename: "remoteEntry.js",
      exposes: {
        ProfileModule:
          "./src/app/profile/profile.module.ts",
      },
      shared: {
        "@angular/core": { singleton: true, eager: false },
        "@angular/common": { singleton: true, eager: false },
        "@angular/router": { singleton: true, eager: false },
        "@ngxs/store": {singleton: true, eager: false },
        "mdmf-shared": { singleton: true, eager: false }
      },
    }),
  ],
};
