const path                     = require("path"),
      webpack                  = require("webpack"),
      CleanPlugin              = require("clean-webpack-plugin"),
      HtmlWebpackPlugin        = require("html-webpack-plugin");

module.exports = {
    entry:     {
        app:    "./src/app.js",
        vendor: "jquery"
    },
    output:    {
        filename: "[chunkhash].[name].js",
        path:     path.resolve(__dirname, "dist")
    },
    module:    {
        rules: [
            {
                test:    /\.js$/,
                use:     ["babel-loader", "eslint-loader"],
                include: /src/
            }
        ]
    },
    plugins:   [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject:   "body",
            filename: "index.html"
        }),
        new CleanPlugin(['dist'], {
            root: path.resolve(__dirname),
            verbose: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor", "manifest"]
        })
    ],
    devServer: {
        host: "localhost",
        port: 3000
    }
};