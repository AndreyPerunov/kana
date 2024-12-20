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
  description: "Master Japanese Kana effortlessly! Every guess helps you improve, bringing you closer to fluency. Using the Spaced Repetition system, it helps you focus on what needs practice making your journey fun and effective. Note that short daily sessions are more effective than trying to learn everything at once!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={mPlus1p.className + " " + "bg-background overflow-x-hidden overflow-y-scroll pt-16"}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
