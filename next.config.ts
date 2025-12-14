import type { NextConfig } from 'next';

import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imgessl.kugou.com',
                port: '',
                pathname: '/**',
            },]
    }
}

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

    org: "mirai-explorer",
    project: "javascript-nextjs",

    // An auth token is required for uploading source maps.
    authToken: process.env.SENTRY_AUTH_TOKEN,

    silent: true, // Suppresses all logs

    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);