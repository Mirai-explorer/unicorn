/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})


const nextConfig = {
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
    async rewrites() {
        return [
            {
                source: '/query:path*',
                destination: 'https://complexsearch.kugou.com/v2/search/song:path*' // Proxy to Backend
            },
            {
                source: '/get_song:path*',
                destination: 'https://wwwapi.kugou.com/yy/index.php:path*' // Proxy to Backend
            },
        ]
    },
}

module.exports = withPWA(nextConfig)
