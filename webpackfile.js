const path                     = require("path"),
      ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"),
      HtmlWebpackPlugin        = require("html-webpack-plugin");

module.exports = {
    entry:   "./src/app.js",
    output:  {
        filename: "boundle.js",
        path:     path.resolve(__dirname, "dist")
    },
    module:  {
        rules: [
            {
                test:    /\.js$/,
                use:     "babel-loader",
                include: /src/
            },
            {
                test: /\.scss$/,
                use:  ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use:      ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject:   "body",
            filename: "index.html"
        })
    ],
    devServer: {
        host: "localhost",
        port: 3000
    }
};