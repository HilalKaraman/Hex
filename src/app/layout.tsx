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
import JsonLd from './components/JsonLd'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hexstudio.com.tr'),
  title: {
    default: 'Hex Studio - AI Solutions & Software Development | Yapay Zeka & Yazılım Ajansı',
    template: '%s | Hex Studio'
  },
  description: 'Hex Studio: Istanbul-based AI & software agency. Custom AI agents, web development, mobile apps. | İstanbul merkezli yapay zeka ve yazılım ajansı. Özel AI çözümleri, web ve mobil uygulama geliştirme.',
  keywords: ['AI', 'software development', 'web design', 'mobile apps', 'digital agency', 'Istanbul', 'Malatya', 'Yapay Zeka', 'Yazılım Geliştirme', 'Web Tasarım', 'Mobil Uygulama', 'Dijital Ajans', 'İstanbul', 'Malatya Yazılım'],
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
    title: 'Hex Studio - AI & Software Development | Yapay Zeka & Yazılım',
    description: 'Empowering businesses with cutting-edge AI solutions and software development. | İşletmeleri en son teknoloji yapay zeka çözümleri ve yazılım geliştirme ile güçlendiriyoruz.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    siteName: 'Hex Studio',
    images: [
      {
        url: '/app_icon_512.svg',
        width: 512,
        height: 512,
        alt: 'Hex Studio AI & Software',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hex Studio - AI & Software Development',
    description: 'Cutting-edge AI solutions and software development.',
    images: ['/app_icon_512.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.hexstudio.com.tr',
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
        <JsonLd />
        <LanguageProvider>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  )
}
