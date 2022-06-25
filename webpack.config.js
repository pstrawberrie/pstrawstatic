const path = require("path");
const SITE = require("./config");
const isProd = process.env.NODE_ENV === "production";

const postcssPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// Setup Pages
const {
  getPages,
  getPagesEntryObject,
  getNicePageName,
} = require("./src/scripts/fs");
const pages = getPages();
const pageEntries = getPagesEntryObject();
const pageHead = require("./src/pages/partials/head");
const pageNav = require("./src/pages/partials/nav");

// Start Config
module.exports = {
  mode: isProd ? "production" : "development",

  /**
   * Entry + Output
   */
  entry: {
    main: "./src/main.js",
    ...pageEntries,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  /**
   * Modules
   */
  module: {
    rules: [
      {
        /**
         * SCSS
         * @TODO - split media queries, themes by breakpoint for faster device loading
         * @TODO - print style split (entries?)
         */
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    autoprefixer: {
                      grid: true,
                    },
                  }),
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  /**
   * Plugins
   * @TODO - efficient chunk loading for css & scripts per-page
   */
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),

    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          title: `${getNicePageName(page)} @ ${SITE.TITLE}`,
          filename: `${page}.html`,
          chunks: [`${page}`],
          template: `./src/pages/${page}/${page}.html`,
          inject: "body",
          minify: isProd,
          cache: false,
          pageName: `${page}`,
          pageHead,
          pageNav,
        })
    ),

    new CopyPlugin({
      patterns: [
        {
          from: "assets/*.*",
          to: "assets/[name][ext]",
          context: "./src/",
          force: true,
        },
        {
          from: "assets/fonts/*.*",
          to: "assets/fonts/[name][ext]",
          context: "./src/",
          force: true,
        },
      ],
    }),
  ],

  /**
   * Dev Server
   */
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    //compress: true,
    port: 3000,
    open: ["home.html"],
    watchFiles: ["src/**/*"],
  },

  /**
   * Etc
   */
  devtool: "source-map",
};
