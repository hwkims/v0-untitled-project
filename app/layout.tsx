import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "트레이드 마스터 - 주식 및 암호화폐 투자 플랫폼",
  description: "실시간 주식 및 암호화폐 정보와 모의투자 게임을 제공하는 종합 투자 플랫폼",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        sizes: "any",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
