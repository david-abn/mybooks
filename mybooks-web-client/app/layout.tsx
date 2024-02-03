import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './ui/navbar'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
          <GoogleOAuthProvider clientId="278040362433-vigipnck7ki9mllo4djqg52gu6ogm8pe.apps.googleusercontent.com">

            <NavBar />
            {children}
          </GoogleOAuthProvider>
        </body>
      </html>
    </>
  )
}
