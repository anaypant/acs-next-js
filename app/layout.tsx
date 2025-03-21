import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ACS - AI Solutions for Real Estate",
  description:
    "Empowering realtors with AI tools for pricing prediction, virtual staging, marketing optimization, and lead scoring.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} font-sans font-semibold`}>
        {children}
      </body>
    </html>
  )
}

