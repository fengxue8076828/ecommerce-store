import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components'
import { Footer } from './components'
import Head from 'next/head'
import CartContextProvider from './contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eletronic Store',
  description: 'headphones,speakers,earphones,and more!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CartContextProvider>
      <body>
          <div className='layout'>
            <header>
              <Navbar />
            </header>
            <main className='main-container'>
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </body>
        </CartContextProvider>
    </html>
  )
}
