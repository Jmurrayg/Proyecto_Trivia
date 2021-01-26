const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// commonJS
module.exports = {
    module: {
        rules: [ // Cargar los loaders, que necesitamos para que webpack haga lo que se necesita
            {
             test: /\.html/, // Definir lo que tengo que buscar
             use: [ //lo que encontre, qué voy a hacer con ello
                 {
                     loader: "html-loader", // El nombre del loader que va a traducir html para que webpack lo entienda
                     options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|svg|jpeg|gif)$/,
                use:["file-loader"]
            },
            {
                test: /\.scss$/,
                use:["style-loader","css-loader","sass-loader"]
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}
