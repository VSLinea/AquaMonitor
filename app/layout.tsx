import type { Metadata } from 'next'
import './globals.css'
import { MainNav } from '@/components/main-nav'

export const metadata: Metadata = {
  title: 'AquaMonitor',
  description: 'Pool Monitoring System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#001529]">
        <MainNav />
        <div className="container mx-auto px-4">
          {children}
        </div>
      </body>
    </html>
  )
}
