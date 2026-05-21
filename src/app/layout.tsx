import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChainIntel - Cross-Chain Whale Tracker',
  description: 'AI-powered cross-chain whale movement tracking with 9 specialized agents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
