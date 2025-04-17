import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mega Market - Multi-Vendor Ecommerce Platform",
  description: "Shop from multiple vendors across various categories including clothes, watches, glasses, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* @ts-expect-error Server Component */}
        <Navbar />
        {children}
      </body>
    </html>
  )
}


import './globals.css'