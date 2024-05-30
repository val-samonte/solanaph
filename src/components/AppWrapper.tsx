'use client'

import { atom } from 'jotai'
import { ReactNode } from 'react'
import AppNav from './AppNav'
import ConnectPrompt from './ConnectPrompt'
import ContactsPanel from './ContactsPanel'
import WalletAdapterWrapper from './WalletAdapterWrapper'

export const currencies = ['USDC', 'SOL']
export const selectedCurrencyAtom = atom(currencies[0])
export const modeAtom = atom<'buy' | 'sell'>('buy')

export default function AppWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <WalletAdapterWrapper>
      <main className='fixed inset-0 p-4 gap-4 flex'>
        <ConnectPrompt>
          <AppNav />
          <ContactsPanel />
          {children}
        </ConnectPrompt>
      </main>
      {/* <div className='fixed inset-0 xl:hidden flex items-center justify-center text-center'>
        We do not support small devices yet! 😁
      </div> */}
    </WalletAdapterWrapper>
  )
}
