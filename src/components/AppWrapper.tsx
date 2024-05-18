'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import WalletAdapterWrapper from './WalletAdapterWrapper'

const ConnectButton = dynamic(() => import('./ConnectButton'), {
  ssr: false,
})

const ConnectPrompt = dynamic(() => import('./ConnectPrompt'), {
  ssr: false,
})

export default function AppWrapper({
  children,
  sessionHash,
}: Readonly<{ children: ReactNode; sessionHash: string }>) {
  return (
    <WalletAdapterWrapper>
      <main className='relative flex min-h-screen flex-col px-4 pb-4 xl:p-16 gap-4 xl:gap-12 items-center'>
        <nav className='sticky top-0 flex min-h-16 w-full bg-white/75 backdrop-blur z-20'>
          <div className='flex items-center justify-between w-full max-w-7xl mx-auto'>
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
              <h1 className='text-gray-600 portrait:hidden'>
                Solana Philippines
              </h1>
            </Link>
            <ConnectButton />
          </div>
        </nav>
        <ConnectPrompt sessionHash={sessionHash} children={children} />
      </main>
      <footer className='max-w-xl xl:max-w-4xl p-4 pb-20 xl:p-16 xl:pt-0 mx-auto text-center text-xs text-gray-400'>
        Disclaimer: This is a community project and is not affiliated with
        Solana Labs. The team behind this project is not responsible for any
        loss of funds or any other damages that may occur from using the
        information provided on this website.
      </footer>
    </WalletAdapterWrapper>
  )
}
