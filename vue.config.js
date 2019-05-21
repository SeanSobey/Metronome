const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	publicPath: isProd ? '/Metronome/' : '/',
	devServer: {
		clientLogLevel: 'silent', // ValidationError: webpack Dev Server Invalid Options :(
	},
	configureWebpack: (webpackConfig) => {
		if (!isProd) {
			webpackConfig.devtool = 'source-map';
		}
	},
};
