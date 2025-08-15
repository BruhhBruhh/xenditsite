import type { Metadata } from 'next'
import { Oxanium } from 'next/font/google'
import './globals.css'

const oxanium = Oxanium({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-oxanium'
})

export const metadata: Metadata = {
  title: 'JUST XEND IT!',
  description: 'XEND IT // Culture meme on solana',
  icons: {
    icon: 'https://i.imgur.com/ytQ3idg.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${oxanium.variable} font-oxanium`}>{children}</body>
    </html>
  )
}