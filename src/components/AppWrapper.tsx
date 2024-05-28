'use client'

import { atom } from 'jotai'
import { ReactNode } from 'react'
import AppNav from './AppNav'
import ChatPanel from './ChatPanel'
import ConnectPrompt from './ConnectPrompt'
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
          <ChatPanel />
          {children}
        </ConnectPrompt>
      </main>
    </WalletAdapterWrapper>
  )
}
