const withFonts = require('next-fonts');

module.exports = withFonts({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false,
            }
          }
        }
      }],
    });

    return config;
  },
  images: {
    domains: process.env.ENV === 'production'
      ? ['pctr.app']
      : ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/:slug/settings',
        destination: '/:slug/settings/profile',
        permanent: true,
      },
    ]
  },
}); 