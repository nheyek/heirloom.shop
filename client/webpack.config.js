const path = require('path');
const webpack = require('webpack');

require('dotenv').config();

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production';

	return {
		mode: isProd ? 'production' : 'development',
		entry: './src/index.tsx',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.[contenthash].js',
			clean: true,
			publicPath: '/',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
		},
		devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
		devServer: {
			static: path.resolve(__dirname, 'public'),
			historyApiFallback: true,
			port: 8080,
			proxy: [
				{
					context: ['/api'],
					target: 'http://localhost:3000',
					changeOrigin: true,
				},
				{
					context: ['/*.png'],
					target: 'http://localhost:3000',
					changeOrigin: true,
				},
			],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env),
			}),
		],
		optimization: {
			minimize: isProd,
		},
		watchOptions: {
			ignored: ['**/node_modules', '**/.git', '**/dist'],
		},
	};
};
