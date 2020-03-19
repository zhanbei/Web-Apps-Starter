'use strict';

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'source-map',

	output: {
		...common.output,
		path: path.resolve('./temp'),
	},

	// @see https://webpack.js.org/configuration/dev-server/
	devServer: {
		disableHostCheck: true,
		historyApiFallback: true, /* support for react-router  */
		contentBase: [
			path.resolve('assets'),
			path.resolve('assets/pages'),
			path.resolve('dist'),
			path.resolve('temp'),
		],
		proxy: {
			'/api': {
				target: 'http://loxal.me:8123',
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/v1': '',
				// },
			},
		},
	},
});
