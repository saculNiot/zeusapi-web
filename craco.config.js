const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    headers: {
        'X-Frame-Options': 'Deny'
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#270949",
              "@tabs-title-font-size-sm": "12px"
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
