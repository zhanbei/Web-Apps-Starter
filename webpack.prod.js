'use strict';

const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',
	// [ ] Make the HTML-things fulfilled and deployed automatically by apps.
	optimization: process.env.SPLIT_NODE_MODULES ? {
		splitChunks: {
			// chunks: 'all',
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	} : undefined,
	plugins: [
		new Webpack.DefinePlugin({
			'__ENV__': JSON.stringify('prod'),
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
});
