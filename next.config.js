/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        domains: [
            'imge.kugou.com'
        ]
    }
}

module.exports = withPWA(nextConfig)
