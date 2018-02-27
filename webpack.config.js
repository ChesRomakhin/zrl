const path = require("path");

module.rules = [
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
];

module.exports = {
    entry: {
        game: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};