const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssUrlRelativePlugin = require("css-url-relative-plugin");

const isDev = process.env.NODE_ENV === "development";

console.log("isDev: ", isDev);

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		}
	};

	if (!isDev) {
		config.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		];
	}

	return config;
};

const filename = ext =>
	isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[hash].${ext}`;

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true
			}
		},
		{
			loader: "css-loader",
			options: {
				sourceMap: true,
				importLoaders: 2
			}
		}
	];

	if (extra) {
		loaders.concat(extra);
	}

	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, "src"),
	// mode: "development",
	// entry: {
	// 	main: ["@babel/polyfill", "./index.js"],
	// 	analytics: "./analytics.js"
	// },
	entry: ["@babel/polyfill", "./index.js"],
	output: {
		filename: filename("js"),
		path: path.resolve(__dirname, "build"),
		publicPath: "/"
	},
	resolve: {
		extensions: [".js", ".json", ".png"],
		alias: {
			"@assets": path.resolve(__dirname, "src/assets")
		}
	},
	optimization: optimization(),
	devServer: {
		port: process.env.PORT || 3000,
		hot: isDev,
		historyApiFallback: true
	},
	devtool: isDev ? "source-map" : "",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
			inject: "body",
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "./src/public/favicon.ico"),
				to: path.resolve(__dirname, "build")
			}
		]),
		new MiniCssExtractPlugin({
			filename: filename("css")
		}),
		new CssUrlRelativePlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: ["@babel/plugin-proposal-class-properties"]
					}
				}
			},
			{
				test: /\.css$/,
				use: cssLoaders(),
				exclude: /node_modules/
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders([
					{ loader: "resolve-url-loader" },
					{ loader: "sass-loader" }
				]),
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: ["file-loader?name=assets/images/[name].[ext]"],
				exclude: /node_modules/
			},
			{
				test: /\.(ttf|woff2?|eot)$/,
				use: ["file-loader?name=assets/fonts/[name].[ext]"],
				exclude: /node_modules/
			}
			// {
			// 	test: /\.svg$/,
			// 	loader: "svg-inline-loader"
			// }
		]
	}
};
