/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imge.kugou.com',
                port: '',
                pathname: '/stdmusic/**',
            },
        ],
    },
    compiler: {
        reactStrictMode: true
    },
    styledComponents: true
}

module.exports = withPWA(nextConfig)
