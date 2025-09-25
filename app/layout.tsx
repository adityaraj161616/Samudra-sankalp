import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { PageTransition } from "@/components/ui/page-transition"
import "./globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Samudra Sankalp - Ocean's Pledge",
  description: "Ocean conservation platform connecting NGOs and verifiers for environmental impact tracking",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${poppins.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
