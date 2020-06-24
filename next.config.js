const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer');

const development = process.env.NODE_ENV !== 'production';
const linkPrefix = '/Kindle.FrontEnd';

const config = {
  assetPrefix: !development ? linkPrefix + '/' : '',
  env: {
    linkPrefix: !development ? linkPrefix : '',
    NEXT_PUBLIC_API_ENDPOINT: 'http://161.35.75.249/api',
  },
};

module.exports = withPlugins(
  [
    [
      withBundleAnalyzer,
      {
        enabled: process.env.ANALYZE === 'true',
      },
    ],
  ],
  config,
);
