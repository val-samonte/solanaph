import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solana PH',
  description: 'Home of Solana in the Philippines',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />
      <body className={inter.className}>
        <main className='relative flex min-h-screen flex-col px-4 pb-4 xl:p-16 gap-4 xl:gap-12 items-center'>
          <nav className='sticky top-0 flex min-h-16 w-full items-center justify-between from-white to-white xl:to-white/0 bg-gradient-to-b z-20'>
            <Link
              href='https://www.facebook.com/groups/solanaphilippines'
              target='_blank'
              rel='noreferrer noopener'
              className='flex items-center gap-4'
            >
              <Image
                src={'logo.svg'}
                alt='Solana PH'
                width={200}
                height={200}
                className='h-14 w-14'
              />
              <h1 className='text-gray-600'>Solana Philippines</h1>
            </Link>
            <ul className='flex items-center gap-6 xl:gap-12 flex-auto justify-end'>
              <li>Directory</li>
            </ul>
          </nav>
          {children}
        </main>
        <footer className='max-w-xl xl:max-w-4xl p-4 pb-20 xl:p-16 xl:pt-0 mx-auto text-center text-xs text-gray-400'>
          Disclaimer: This is a community project and is not affiliated with
          Solana Labs. The team behind this project is not responsible for any
          loss of funds or any other damages that may occur from using the
          information provided on this website.
        </footer>
      </body>
    </html>
  )
}
