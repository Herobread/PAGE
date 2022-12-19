const path = require('path')

module.exports = {
    mode: 'development',
    // devtool: 'eval-source-map',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: "/PAGE/", /* github repository name */
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            lib: path.resolve(__dirname, 'src/lib'),
            pages: path.resolve(__dirname, 'src/pages'),
            utilityPages: path.resolve(__dirname, 'src/utilityPages'),
            objects: path.resolve(__dirname, 'src/objects')
        }
    },
}