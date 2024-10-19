import type { Metadata } from 'next'

import './globals.css'
import { Orbit } from 'next/font/google'

const orbit = Orbit({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TeamProject',
  description: '팀프로젝트 입니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={orbit.className}>{children}</body>
    </html>
  )
}
