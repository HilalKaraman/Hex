import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './components/LanguageContext'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['italic'],
})

import WhatsAppButton from './components/WhatsAppButton'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hexstudio.com.tr'),
  title: 'Hex Studio - AI & Software Development Agency',
  description: 'Empowering businesses with cutting-edge AI solutions, web development, and digital transformation. From custom AI agents to modern web applications.',
  keywords: 'AI, software development, web design, mobile apps, digital agency, Istanbul',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-32x32.png', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', type: 'image/png' },
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
    },
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
    ]
  },
  openGraph: {
    title: 'Hex Studio - AI & Software Development Agency',
    description: 'Empowering businesses with cutting-edge AI solutions and software development.',
    type: 'website',
    images: [
      {
        url: '/app_icon_512.svg',
        width: 512,
        height: 512,
        alt: 'Hex Studio',
      }
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable}`}>
        <LanguageProvider>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
