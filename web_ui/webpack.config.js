// @ts-check
const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
/** @type {typeof import("@wasm-tool/wasm-pack-plugin").default} */
// @ts-ignore default export typing issues
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const TypeScriptDefinitionPlugin = require("./webpack/TypeScriptDefinitionPlugin");

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: root("src/index.ts"),
  output: {
    path: root("dist/"),
    filename: "index.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [root("src"), root("packages/shipyard-ts")],
        use: {
          options: {
            // use fork checker
            transpileOnly: true,
            compilerOptions: {
              sourceMap: true,
            },
          },
          loader: require.resolve("ts-loader"),
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg|png|jpe?g)$/,
        use: [require.resolve("file-loader")],
        include: [root("src")],
      },
      {
        // tailwind
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          require.resolve("css-loader"),
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          },
        ],
        include: [root("src/index.css")],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
    // @ts-ignore
    plugins: [new TsconfigPathsPlugin({ configFile: root("tsconfig.json") })],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: root("src/index.html"),
    }),
    new WasmPackPlugin({
      crateDirectory: root("../web_executor"),
      outDir: root("src/executor/wasm_pkg"),
    }),
    // Works alongside typescript_definitions crate to add values to typescript output
    new TypeScriptDefinitionPlugin({
      inputDTsFile: root("src/executor/wasm_pkg/index.d.ts"),
      outputTsFile: root("src/executor/wasm_pkg/index.fixed.ts"),
    }),
    // Have this example work in Edge which doesn't ship `TextEncoder` or
    // `TextDecoder` at this time.
    new webpack.ProvidePlugin({
      TextDecoder: ["text-encoding", "TextDecoder"],
      TextEncoder: ["text-encoding", "TextEncoder"],
    }),
  ],
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: root("static"),
  },
};

function root(...args) {
  return path.resolve(__dirname, ...args);
}
