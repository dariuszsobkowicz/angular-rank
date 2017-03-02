const config       = require("./webpackfile"),
      webpack      = require("webpack"),
      webpackMerge = require("webpack-merge");

module.exports = webpackMerge(config, {
    devtool: "cheap-eval-source-map",
    cache:   true,

    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  ["style-loader", "css-loader", "postcss-loader", "sass-loader"]

            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
});