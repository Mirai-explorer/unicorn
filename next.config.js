/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})


const nextConfig = {
    output: 'standalone'
}

module.exports = withPWA(nextConfig)
