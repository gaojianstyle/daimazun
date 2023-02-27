const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            // 'path': require.resolve('path-browserify'),
            // 'fs': require.resolve('fs-web'),
        }
    },
    entry: [
        './index.js'
        // './n/n.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    // mode: "development",
    mode: "production",
    performance: {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 99990000000,
        //生成文件的最大体积
        maxAssetSize: 99990000000,
        //只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },
    module: {
        rules: [
            // 指定要加载的规则

            {
                test: /\.ts$/, // test指定的是规则生效的文件
                use: 'ts-loader',
                // 排除要处理的文件
                exclude: /node-modules/
            },

            {
                test: /\.(txt|mmdb|dat|exe|json)$/,
                use: [
                    { loader: 'file-loader', options: {} }
                ]
            },
            // CSS和LESS文件处理规则
            {
                test: /\.(less||css)$/,
                use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
            },
            // Webpack 5图片资源处理规则
            {
                test: /\.(jpg|svg|png)$/i,
                type: "asset",
                generator: { filename: "img/[name]_[hash:6][ext]" },
                parser: {
                    dataUrlCondition: { maxSize: 100 * 1024 }
                }
            },
            // Webpack 5字体资源处理规则
            {
                test: /\.(eot|ttf|woff2?)$/,
                type: "asset/resource",
                generator: { filename: "font/[name]_[hash:6][ext]" }
            }
        ],
        // 模块配置：让webpack了解哪些方法可以被当作模块引入
        // resolve: {
        //     extensions: ['.ts', '.js']
        // }
    }
};
