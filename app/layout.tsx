import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Navigation from '@/components/shared/layout/Navigation'

export const metadata = {
  title: 'Money Tracker - PhakeApp',
  description: 'Money Tracker - PhakeApp',
}

const FontFamily = Inter({ subsets: ['latin', 'vietnamese'], weight: ['400', '300', '500', '600', '700'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={FontFamily.className}>
        <Toaster
          toastOptions={{
            className: 'text-sm',
          }}
        />
        <Navigation />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
