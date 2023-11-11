/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({ dest: 'public'})

const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: [
            'imge.kugou.com'
        ]
    },
    sentry: {
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        tunnelRoute: "/monitoring-tunnel",

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true
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
module.exports = withSentryConfig(withPWA(nextConfig), sentryWebpackPluginOptions);