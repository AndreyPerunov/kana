import type { Metadata } from "next"
import "./globals.css"
import React from "react"
import { M_PLUS_1p } from "next/font/google"
import { ReduxProvider } from "@/redux/provider"

const mPlus1p = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["400", "700"] // Specify the weights you need
})

export const metadata: Metadata = {
  title: "Learn Kana",
  description: "Learn Japanese Kana with ease"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={mPlus1p.className + " " + "bg-background"}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
