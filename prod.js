const config                   = require("./webpackfile"),
      webpack                  = require("webpack"),
      webpackMerge             = require("webpack-merge"),
      ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = webpackMerge(config, {
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use:      ["css-loader?minimize=true", "postcss-loader", "sass-loader"],
                })
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress:  {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextWebpackPlugin("[chunkhash].[name].css")
    ]
});