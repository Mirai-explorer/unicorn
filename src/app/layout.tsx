import type { Metadata } from 'next'
import './globals.css'
import React from "react";

const site_config = {
  title: 'Mirai 探索者',
  page_title: 'Mirai 探索者',
  description: 'Mirai 探索者始终注视技术前沿，探索更多新鲜有趣的事物',
  keywords: ['Mirai', '探索者', 'Mirai 探索者', '二次元', 'ACG', 'IT技术', '前端'],
  url: "https://unicorn.js.org"
}

export const metadata: Metadata = {
  title: {
    template: '%s - ' + site_config.title,
    default: site_config.title
  },
  description: site_config.description,
  keywords: site_config.keywords,
  icons: {
    icon: [{
      url: '/icons/icon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    }, {
      url: '/icons/icon-16x16.png',
      sizes: '16x16',
      type: 'image/png'
    }],
    shortcut: '/favicon.ico',
    apple: [{
      url: '/icons/apple-touch-icon.png'
    }, {
      url: '/icons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png'
    }, {
      url: '/icons/touch-icon-ipad-retina.png', sizes: '167x167', type: 'image/png'
    }, {
      url: '/icons/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png'
    }]
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: site_config.title
  },
  generator: 'Next.js',
  applicationName: site_config.title,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Aubrey Tang', url: site_config.url }],
  creator: 'Aubrey Tang',
  publisher: 'Aubrey Tang',
  formatDetection: {
    telephone: false
  },
  metadataBase: new URL(site_config.url),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ja-JP': '/ja',
    },
  },
  openGraph: {
    type: 'website',
    title: site_config.page_title,
    description: site_config.description,
    siteName: site_config.title,
    url: site_config.url,
    images: '/icons/apple-touch-icon.png',
  },
  twitter: {
    card: 'summary',
    title: site_config.page_title,
    description: site_config.description,
    creator: 'Aubrey Tang',
    creatorId: 'tokai_nahida'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <meta name="baidu-site-verification" content="codeva-e9EzDkx3j5" />
      </head>
      <body>{children}</body>
    </html>
  )
}