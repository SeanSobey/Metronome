const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	publicPath: isProd ? '/Metronome/' : '/',
	configureWebpack: (webpackConfig) => {
		if (!isProd) {
			webpackConfig.devtool = 'source-map';
		}
	},
};
