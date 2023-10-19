import type { Metadata } from 'next'
import './globals.css'
import React from "react";

export const metadata: Metadata = {
  title: {
    template: '%s - Mirai探索者',
    default: 'Mirai探索者'
  },
  description: '探索新世界',
  icons: './favicon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mirai 探索者" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/public/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="baidu-site-verification" content="codeva-e9EzDkx3j5" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://unicorn.js.org" />
        <meta name="twitter:title" content="Mirai 探索者" />
        <meta name="twitter:description" content="探索新世界" />
        <meta name="twitter:image" content="https://unicorn.js.org/icons/icon-192x192.png" />
        <meta name="twitter:creator" content="@Aubrey Tang" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mirai 探索者" />
        <meta property="og:description" content="探索新世界" />
        <meta property="og:site_name" content="Mirai 探索者" />
        <meta property="og:url" content="https://unicorn.js.org" />
        <meta property="og:image" content="https://unicorn.js.org/icons/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
