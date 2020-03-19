'use strict';

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const apps = require('./apps');

const entry = process.env.DEV_APP ? apps.getDevApplication(process.env.DEV_APP) : apps.getApplicationsToBeBuilt(process.env.APPS);

// @see https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
module.exports = {
	// Don't attempt to continue if there are any errors.
	bail: true,
	entry: entry,
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.resolve('./dist'),
		publicPath: '/built',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
		modules: [
			// Allow import from 'src/*'.
			// @see https://stackoverflow.com/questions/27502608/resolving-require-paths-with-webpack
			path.resolve('.'),
			path.resolve('./node_modules'),
			path.resolve('../node_modules'),
			path.resolve('../../node_modules'),
			path.resolve('../../../node_modules'),
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: `./public/index.html`,
			filename: './index.html',
		}),
		new CheckerPlugin(),
	],
	module: {
		rules: [{
			test: /\.html$/, use: [{loader: 'html-loader'}],
		}, {
			test: /\.tsx?$/, loader: 'awesome-typescript-loader',
		}, {
			// @see https://github.com/webpack-contrib/less-loader
			test: /\.less$/,
			use: [
				// creates style nodes from JS strings
				{loader: 'style-loader'},
				// translates CSS into CommonJS
				{loader: 'css-loader'},
				// compiles Less to CSS
				{loader: 'less-loader'},
			],
		}, {
			test: /\.css$/,
			use: [
				{loader: 'style-loader'},
				{loader: 'css-loader'},
			],
		}],
	},

	// // When importing a module whose path matches one of the following, just
	// // assume a corresponding global variable exists and use that instead.
	// // This is important because it allows us to avoid bundling all of our
	// // dependencies, which allows browsers to cache those libraries between builds.
	// externals: {
	// 	'react': 'React',
	// 	'react-dom': 'ReactDOM',
	// },
};
