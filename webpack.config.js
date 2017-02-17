module.exports = {
	entry: "./app/scripts/app.jsx",
	output: {
		path: __dirname + '/app/build',
		filename: "bundle.js"
	},
	devServer: {
		host: "0.0.0.0",
		port: 8008,
		contentBase: "./app"
	},

	devtool: '#sourcemap',
	stats: {
		colors: true,
		reasons: true
	},
	watchOptions: {
		poll: true
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: __dirname + '/app',
				loader: 'babel-loader' // 'babel-loader' is also a legal name to reference
			}
		]
	}
}