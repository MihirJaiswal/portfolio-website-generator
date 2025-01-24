import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio Generator PWA",
  description: "Generate your portfolio website easily",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">Portfolio Generator PWA</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <p>&copy; 2023 Portfolio Generator PWA</p>
        </footer>
      </body>
    </html>
  )
}

