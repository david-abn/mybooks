import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './ui/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mybooks | your digital bookshelf',
  description: 'Manage books that you have read or plan to read.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <>
      <html lang="en">
        <body className={inter.className}>
            <NavBar />
            {children}
        </body>
      </html>
    </>
  )
}
